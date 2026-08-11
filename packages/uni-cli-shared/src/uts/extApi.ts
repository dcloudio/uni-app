import type { Node, SourceFile } from 'typescript'

type TypeScriptCompiler = typeof import('typescript')

export function initUts2jsExtApiOptions() {
  return { collectExtApiUsageAst }
}

export function collectExtApiUsageAst(
  sourceFile: SourceFile,
  typescript: TypeScriptCompiler
): string[] | undefined {
  const extApis = new Set<string>()

  const visit = (node: Node) => {
    // 保持与 uts2js 原有 parser transformer 相同的后序遍历顺序。
    typescript.forEachChild(node, visit)

    if (
      !typescript.isCallExpression(node) ||
      !typescript.isPropertyAccessExpression(node.expression)
    ) {
      return
    }

    const { expression, name } = node.expression
    if (
      !typescript.isIdentifier(expression) ||
      !typescript.isIdentifier(name) ||
      (expression.text !== 'uni' && expression.text !== 'uniCloud')
    ) {
      return
    }

    extApis.add(`${expression.text}.${name.text}`)
  }

  visit(sourceFile)
  return extApis.size ? [...extApis] : undefined
}
