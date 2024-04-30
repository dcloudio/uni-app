import { checkElementNodeTag } from '@dcloudio/uni-cli-shared'
import type { ElementNode, NodeTransform } from '@vue/compiler-core'

export const transformPageHead: NodeTransform = (node, context) => {
  if (checkElementNodeTag(node, 'page-meta')) {
    const headNode = node.children.find((child) =>
      checkElementNodeTag(child, 'head')
    ) as ElementNode
    if (headNode) {
      headNode.tag = 'page-meta-head'
    }
    return
  }
  if (
    checkElementNodeTag(node, 'head') &&
    checkElementNodeTag(context.parent, 'page-meta')
  ) {
    ;(node as ElementNode).tag = 'page-meta-head'
  }
}
