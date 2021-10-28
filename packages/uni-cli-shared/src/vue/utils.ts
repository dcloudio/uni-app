import { isComponentTag } from '@dcloudio/uni-shared'
import {
  ComponentNode,
  ElementTypes,
  isCoreComponent,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-core'

export function isUserComponent(
  node: RootNode | TemplateChildNode,
  context: TransformContext
): node is ComponentNode {
  return (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.COMPONENT &&
    !isComponentTag(node.tag) &&
    !isCoreComponent(node.tag) &&
    !context.isBuiltInComponent(node.tag)
  )
}
