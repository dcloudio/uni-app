import type { ElementNode, NodeTransform } from '@vue/compiler-core'
import { ElementTypes } from '@vue/compiler-core'
import { checkElementNodeTag } from '../../utils'

export const transformPageHead: NodeTransform = (node, context) => {
  // 发现是page-meta下的head,直接remove该节点
  if (
    checkElementNodeTag(node, 'head') &&
    checkElementNodeTag(context.parent, 'page-meta')
  ) {
    if (process.env.UNI_APP_X === 'true') {
      ;(node as ElementNode).tag = 'page-meta-head'
      ;(node as ElementNode).tagType = ElementTypes.COMPONENT
    } else {
      context.removeNode(node)
    }
  }
}
