import {
  ElementTypes,
  NodeTypes,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core'
import { TransformContext } from '../transform'

export function transformElements(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.ELEMENT
  ) {
    context.elements.add(node.tag)
  }
}
