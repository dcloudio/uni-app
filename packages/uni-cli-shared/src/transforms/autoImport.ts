import {
  ComponentNode,
  ElementNode,
  ElementTypes,
  ExpressionNode,
  RootNode,
  SimpleExpressionNode,
  TemplateChildNode,
  TransformContext
} from '@vue/compiler-core'

interface ImportItem {
  exp: string | ExpressionNode
  path: string
}

const tags = new Set<string>()

export function isAutoImported(tag: string) {
  return tags.has(tag)
}

export function addAutoImport(
  tag: string,
  importItem: ImportItem,
  context: TransformContext
) {
  tag && tags.add(tag)
  const importPath = importItem.path
  const importContent = (importItem.exp as SimpleExpressionNode).content
  const importsArray = Array.from(context.imports)
  const existing = importsArray.find(
    i =>
      i.path === importPath &&
      (i.exp as SimpleExpressionNode).content === importContent
  )
  if (existing) {
    return
  }
  context.imports.add(importItem)
  return true
}

export const isComponentNode = (
  node: RootNode | TemplateChildNode
): node is ComponentNode =>
  (node as ElementNode).tagType === ElementTypes.COMPONENT
