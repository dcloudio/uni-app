import type {
  BinaryExpression,
  BindingElement,
  DeleteExpression,
  ElementAccessExpression,
  ForInStatement,
  ForOfStatement,
  HeritageClause,
  Node,
  ParameterDeclaration,
  PropertyAccessExpression,
  SourceFile,
  VariableDeclaration,
} from 'typescript'

type TypeScriptCompiler = typeof import('typescript')

const enum VisitFlags {
  InType = 1,
  WriteTarget = 2,
}

export function initUts2jsExtApiOptions() {
  return { collectExtApiUsageAst }
}

export function collectExtApiUsageAst(
  sourceFile: SourceFile,
  typescript: TypeScriptCompiler
): string[] | undefined {
  const extApis = new Set<string>()
  const ts = typescript
  const { SyntaxKind } = ts

  const isWrapper = (node: Node): node is Node & { expression: Node } =>
    node.kind === SyntaxKind.ParenthesizedExpression ||
    node.kind === SyntaxKind.AsExpression ||
    node.kind === SyntaxKind.TypeAssertionExpression ||
    node.kind === SyntaxKind.NonNullExpression ||
    node.kind === SyntaxKind.SatisfiesExpression ||
    node.kind === SyntaxKind.ExpressionWithTypeArguments ||
    node.kind === SyntaxKind.PartiallyEmittedExpression

  const unwrap = (node: Node): Node => {
    while (isWrapper(node)) node = node.expression
    return node
  }

  const literalName = (node: Node): string | undefined => {
    node = unwrap(node)
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      return node.text
    }
  }

  const addReference = (root: Node, name: string | undefined) => {
    if (!name) return
    root = unwrap(root)
    // 延续旧版按名称收集的行为，不因局部绑定或导入而删除已有依赖。
    if (
      ts.isIdentifier(root) &&
      (root.text === 'uni' || root.text === 'uniCloud')
    ) {
      extApis.add(`${root.text}.${name}`)
    }
  }

  const collectDestructuring = (pattern: Node, value: Node) => {
    pattern = unwrap(pattern)
    const properties = ts.isObjectBindingPattern(pattern)
      ? pattern.elements
      : ts.isObjectLiteralExpression(pattern)
      ? pattern.properties
      : undefined
    if (!properties) return
    value = unwrap(value)
    properties.forEach((property) => {
      let name: Node
      if (ts.isBindingElement(property)) {
        if (property.dotDotDotToken) return
        name = property.propertyName || property.name
      } else if (
        ts.isPropertyAssignment(property) ||
        ts.isShorthandPropertyAssignment(property)
      ) {
        name = property.name
      } else {
        return
      }
      addReference(
        value,
        ts.isIdentifier(name)
          ? name.text
          : literalName(
              ts.isComputedPropertyName(name) ? name.expression : name
            )
      )
    })
  }

  // 分开保存节点和状态，避免为每个节点分配栈帧对象。
  const stack: Node[] = [sourceFile]
  const states: number[] = [0]
  while (stack.length) {
    const node = stack.pop()!
    const state = states.pop()!
    const writeTarget = !!(state & VisitFlags.WriteTarget)
    // 泛型实例化表达式和 class extends 的表达式会在运行时求值。
    const inType =
      !!(state & VisitFlags.InType) ||
      (ts.isTypeNode(node) &&
        node.kind !== SyntaxKind.ExpressionWithTypeArguments) ||
      node.kind === SyntaxKind.InterfaceDeclaration ||
      (node.kind === SyntaxKind.HeritageClause &&
        (node as HeritageClause).token === SyntaxKind.ImplementsKeyword)
    let writtenChild: Node | undefined
    let writeChildren = false
    // 写入上下文只沿赋值目标传递，对象、下标及默认值中的表达式仍按读取处理。
    switch (node.kind) {
      case SyntaxKind.BinaryExpression: {
        const assignment = node as BinaryExpression
        if (assignment.operatorToken.kind === SyntaxKind.EqualsToken)
          writtenChild = assignment.left
        break
      }
      case SyntaxKind.DeleteExpression: {
        const expression = (node as DeleteExpression).expression
        const target = unwrap(expression)
        if (
          ts.isPropertyAccessExpression(target) ||
          ts.isElementAccessExpression(target)
        ) {
          writtenChild = expression
        }
        break
      }
      case SyntaxKind.ForInStatement:
      case SyntaxKind.ForOfStatement:
        writtenChild = (node as ForInStatement | ForOfStatement).initializer
        break
      default:
        if (writeTarget) {
          if (ts.isPropertyAssignment(node)) writtenChild = node.initializer
          else
            writeChildren =
              isWrapper(node) ||
              ts.isObjectLiteralExpression(node) ||
              ts.isArrayLiteralExpression(node) ||
              ts.isSpreadElement(node) ||
              ts.isSpreadAssignment(node)
        }
    }
    // 显式栈避免深层 AST 递归溢出；结果按集合使用，无需维护访问顺序。
    const typeFlag = inType ? VisitFlags.InType : 0
    ts.forEachChild(node, (child) => {
      stack.push(child)
      states.push(
        typeFlag |
          (writeChildren || child === writtenChild ? VisitFlags.WriteTarget : 0)
      )
      // 编译器生成的 AST 可能复用左右节点，写入状态只用于目标位置。
      if (child === writtenChild) writtenChild = undefined
    })

    // 保留旧版直接调用判断，新增引用的过滤规则不影响已有依赖。
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression)
    ) {
      const { expression, name } = node.expression
      if (
        ts.isIdentifier(expression) &&
        ts.isIdentifier(name) &&
        (expression.text === 'uni' || expression.text === 'uniCloud')
      ) {
        extApis.add(`${expression.text}.${name.text}`)
      }
    }

    // 纯写入只排除成员本身，解构默认值和复合赋值仍可能读取 API。
    if (inType) continue
    switch (node.kind) {
      case SyntaxKind.PropertyAccessExpression: {
        if (writeTarget) break
        const member = node as PropertyAccessExpression
        if (ts.isIdentifier(member.name))
          addReference(member.expression, member.name.text)
        break
      }
      case SyntaxKind.ElementAccessExpression: {
        if (writeTarget) break
        const member = node as ElementAccessExpression
        addReference(member.expression, literalName(member.argumentExpression))
        break
      }
      case SyntaxKind.VariableDeclaration:
      case SyntaxKind.Parameter:
      case SyntaxKind.BindingElement: {
        const declaration = node as
          | VariableDeclaration
          | ParameterDeclaration
          | BindingElement
        if (declaration.initializer)
          collectDestructuring(declaration.name, declaration.initializer)
        break
      }
      case SyntaxKind.BinaryExpression: {
        const assignment = node as BinaryExpression
        if (assignment.operatorToken.kind === SyntaxKind.EqualsToken)
          collectDestructuring(assignment.left, assignment.right)
        break
      }
    }
  }

  // 解除 uniCloud 对 uni-push 的强制依赖，与旧 JS 收集插件保持一致。
  if (
    sourceFile.fileName.endsWith('uni-cloud-x.es.js') ||
    sourceFile.fileName.endsWith('uni-cloud-x-vapor.es.js')
  ) {
    extApis.delete('uni.getPushClientId')
    extApis.delete('uni.onPushMessage')
    extApis.delete('uni.offPushMessage')
  }
  return extApis.size ? [...extApis] : undefined
}
