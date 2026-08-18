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
  // 解除 uniCloud 对 uni-push 的强制依赖，与旧 JS 收集插件保持一致。
  if (sourceFile.fileName.endsWith('uni-cloud-x.es.js')) {
    extApis.delete('uni.getPushClientId')
    extApis.delete('uni.onPushMessage')
    extApis.delete('uni.offPushMessage')
  }
  return extApis.size ? [...extApis] : undefined
}
