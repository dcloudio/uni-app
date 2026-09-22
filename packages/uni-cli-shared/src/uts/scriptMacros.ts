import type { Node, SourceFile, TransformerFactory } from 'typescript'

export type ScriptMacrosTypeScript = typeof import('typescript')

export interface UniAppXScriptMacroSourceEdit {
  start: number
  end: number
  content: string
}

export interface UniAppXScriptMacrosTransformerOptions {
  typescript: ScriptMacrosTypeScript
  onSourceEdit?: (edit: UniAppXScriptMacroSourceEdit) => void
}

const UNI_APP_X_SCRIPT_MACROS = new Set(['defineMixin', 'definePlugin'])

export function hasUniAppXScriptMacros(code: string) {
  return code.includes('defineMixin') || code.includes('definePlugin')
}

export function createUniAppXScriptMacrosTransformer(
  options: UniAppXScriptMacrosTransformerOptions
): TransformerFactory<SourceFile> {
  const { typescript, onSourceEdit } = options

  return (context) => {
    return (sourceFile) => {
      const visitor = (node: Node): Node => {
        const transformed = typescript.visitEachChild(node, visitor, context)
        if (
          !typescript.isCallExpression(node) ||
          !typescript.isIdentifier(node.expression) ||
          node.arguments.length === 0 ||
          !UNI_APP_X_SCRIPT_MACROS.has(node.expression.text)
        ) {
          return transformed
        }

        if (onSourceEdit) {
          // 保留原调用括号，只移除宏名称及其余参数，局部编辑之间可以安全嵌套。
          onSourceEdit({
            start: node.getStart(sourceFile),
            end: node.arguments.pos,
            content: '(',
          })
          if (node.arguments.length > 1 || node.arguments.hasTrailingComma) {
            const children = node.getChildren(sourceFile)
            const syntaxList = children.find(
              (child) =>
                child.kind === typescript.SyntaxKind.SyntaxList &&
                child.pos === node.arguments.pos &&
                child.end === node.arguments.end
            )!
            const separator = syntaxList
              .getChildren(sourceFile)
              .find((child) => child.kind === typescript.SyntaxKind.CommaToken)!
            const closeParen = children.find(
              (child) => child.kind === typescript.SyntaxKind.CloseParenToken
            )!
            onSourceEdit({
              start: separator.getStart(sourceFile),
              end: closeParen.getStart(sourceFile),
              content: '',
            })
          }
        }
        return typescript.isCallExpression(transformed)
          ? transformed.arguments[0]
          : transformed
      }

      return typescript.visitNode(sourceFile, visitor) as SourceFile
    }
  }
}
