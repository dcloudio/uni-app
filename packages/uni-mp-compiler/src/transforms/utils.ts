import {
  conditionalExpression,
  Expression,
  Identifier,
  identifier,
  isIdentifier,
  isLiteral,
  isReferenced,
  isTemplateLiteral,
  MemberExpression,
  numericLiteral,
  objectProperty,
  SpreadElement,
  stringLiteral,
} from '@babel/types'
import { SLOT_DEFAULT_NAME } from '@dcloudio/uni-shared'
import {
  createSimpleExpression,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  SourceLocation,
  TransformContext as VueTransformContext,
} from '@vue/compiler-core'
import { walk, BaseNode } from 'estree-walker'
import { isUndefined, parseExpr } from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import { CodegenScope } from '../options'
import { isVForScope, isVIfScope, TransformContext } from '../transform'
// v-i,v-s 不能在 quickapp-webview 中使用，估计是内部处理成了指令之类的
export const ATTR_VUE_ID = 'u-i'
export const ATTR_VUE_SLOTS = 'u-s'
export const SCOPED_SLOT_IDENTIFIER = '__SCOPED_SLOT__'

export function renameSlot(name: string) {
  return name === 'default' ? SLOT_DEFAULT_NAME : name
}

export function rewriteSpreadElement(
  name: symbol,
  expr: SpreadElement,
  loc: SourceLocation,
  context: TransformContext
) {
  return rewirteWithHelper(name, expr.argument, loc, context)
}

export function rewirteWithHelper(
  name: symbol,
  expr: Expression,
  loc: SourceLocation,
  context: TransformContext
) {
  return parseExprWithRewrite(
    context.helperString(name) + '(' + genBabelExpr(expr) + ')',
    loc,
    context
  )
}

export function parseExprWithRewrite(
  code: string,
  loc: SourceLocation,
  context: TransformContext,
  node?: Expression
) {
  return parseExpr(
    rewriteExpression(createSimpleExpression(code, false, loc), context, node),
    context
  ) as Identifier | MemberExpression | undefined
}

export function parseExprWithRewriteClass(
  code: string,
  loc: SourceLocation,
  context: TransformContext,
  node: Expression
) {
  // a?1:0
  return parseExpr(
    rewriteExpression(
      createSimpleExpression(code, false, loc),
      context,
      !isUndefined(node)
        ? conditionalExpression(node, numericLiteral(1), stringLiteral(''))
        : node
    ),
    context
  ) as Identifier | MemberExpression | undefined
}

export function rewriteExpressionWithoutProperty(
  node: ExpressionNode,
  context: TransformContext,
  babelNode?: Expression,
  scope: CodegenScope = context.currentScope
) {
  return rewriteExpression(node, context, babelNode, scope, {
    property: false,
    ignoreLiteral: false,
  })
}
export function rewriteExpression(
  node: ExpressionNode,
  context: TransformContext | VueTransformContext,
  babelNode?: Expression,
  scope: CodegenScope = (context as TransformContext).currentScope,
  { property, ignoreLiteral } = { property: true, ignoreLiteral: false }
) {
  if (node.type === NodeTypes.SIMPLE_EXPRESSION && node.isStatic) {
    return node
  }
  if (!babelNode) {
    const code = genExpr(node)
    babelNode = parseExpr(code, context as TransformContext, node)
    if (!babelNode) {
      return createSimpleExpression(code)
    }
  }
  if (!ignoreLiteral && isStaticLiteral(babelNode)) {
    return node as SimpleExpressionNode
  }
  if (isUndefined(babelNode)) {
    return createSimpleExpression('undefined', false, node.loc)
  }

  // wxs 等表达式
  if ((context as TransformContext).filters?.length) {
    if (isReferencedByIds(babelNode, (context as TransformContext).filters)) {
      return createSimpleExpression(genExpr(node), false, node.loc)
    }
  }

  scope = findReferencedScope(babelNode, scope)
  const id = scope.id.next()
  if (property) {
    scope.properties.push(objectProperty(identifier(id), babelNode!))
  }
  // 在v-for中包含的v-if块，所有变量需要补充当前v-for value前缀
  if (isVIfScope(scope)) {
    if (isVForScope(scope.parentScope)) {
      return createSimpleExpression(scope.parentScope.valueAlias + '.' + id)
    }
    return createSimpleExpression(id)
  } else if (isVForScope(scope)) {
    return createSimpleExpression(scope.valueAlias + '.' + id)
  }
  return createSimpleExpression(id)
}

function findReferencedScope(
  node: Expression,
  scope: CodegenScope
): CodegenScope {
  if (isVIfScope(scope)) {
    return scope
  } else if (isVForScope(scope)) {
    if (isReferencedByIds(node, scope.locals)) {
      return scope
    }
    return findReferencedScope(node, scope.parent!)
  }
  return scope
}

function isReferencedByIds(node: Expression, knownIds: string[]) {
  let referenced = false
  walk(node as unknown as BaseNode, {
    enter(node: BaseNode, parent: BaseNode) {
      if (referenced) {
        return this.skip()
      }
      if (!isIdentifier(node)) {
        return
      }
      if (
        knownIds.includes(node.name) &&
        (!parent || isReferenced(node, parent as any))
      ) {
        referenced = true
        return this.skip()
      }
    },
  })
  return referenced
}

export function isStaticLiteral(value: object | null | undefined) {
  return isLiteral(value) && !isTemplateLiteral(value)
}
