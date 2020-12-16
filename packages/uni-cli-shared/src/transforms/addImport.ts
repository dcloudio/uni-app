import {
  ElementNode,
  ConstantTypes,
  TransformContext,
  createSimpleExpression
} from '@vue/compiler-core'

export function addImport(
  path: string,
  node: ElementNode,
  context: TransformContext
) {
  // remove resolveComponent
  context.components.delete(node.tag)
  // add import
  const importsArray = Array.from(context.imports)
  const existing = importsArray.find(i => i.path === path)
  if (existing) {
    return
  }
  context.imports.add({
    path,
    exp: createSimpleExpression(name, false, node.loc, ConstantTypes.CAN_HOIST)
  })
}
