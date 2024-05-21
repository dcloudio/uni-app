import { checkElementNodeTag } from '@dcloudio/uni-cli-shared'
import type { ElementNode, NodeTransform } from '@vue/compiler-core'
import { ElementTypes } from '@vue/compiler-core'

export const transformPageHead: NodeTransform = (node, context) => {
  if (checkElementNodeTag(node, 'page-meta')) {
    const headNode = node.children.find((child) =>
      checkElementNodeTag(child, 'head')
    ) as ElementNode
    if (headNode) {
      headNode.tag = 'page-meta-head'
      headNode.tagType = ElementTypes.COMPONENT
    }
    return
  }
  if (
    checkElementNodeTag(node, 'head') &&
    checkElementNodeTag(context.parent, 'page-meta')
  ) {
    ;(node as ElementNode).tag = 'page-meta-head'
    ;(node as ElementNode).tagType = ElementTypes.COMPONENT
  }
}
