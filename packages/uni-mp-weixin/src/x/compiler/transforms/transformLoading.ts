import { isElementNode } from '@dcloudio/uni-cli-shared'
import {
  ElementTypes,
  type RootNode,
  type TemplateChildNode,
  type TransformContext,
} from '@vue/compiler-core'

export function transformLoading(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (!isElementNode(node)) {
    return
  }

  if (node.tag === 'loading') {
    node.tag = 'uniloading'
    node.tagType = ElementTypes.COMPONENT
  }
}
