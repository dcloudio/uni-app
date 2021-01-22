import {
  ExpressionNode,
  SimpleExpressionNode,
  TransformContext,
} from '@vue/compiler-core'

interface ImportItem {
  exp: string | ExpressionNode
  path: string
}

export function addAutoImport(
  importItem: ImportItem,
  context: TransformContext
) {
  const importPath = importItem.path
  const importContent = (importItem.exp as SimpleExpressionNode).content
  const importsArray = Array.from(context.imports)
  const existing = importsArray.find(
    (i) =>
      i.path === importPath &&
      (i.exp as SimpleExpressionNode).content === importContent
  )
  if (existing) {
    return
  }
  context.imports.add(importItem)
  return true
}
