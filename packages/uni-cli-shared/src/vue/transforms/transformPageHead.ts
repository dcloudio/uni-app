import type { NodeTransform } from '@vue/compiler-core'
import { checkElementNodeTag } from '../../utils'

export const transformPageHead: NodeTransform = (node, context) => {
  // 发现是page-meta下的head,直接remove该节点
  checkElementNodeTag(node, 'head') &&
    checkElementNodeTag(context.parent, 'page-meta') &&
    context.removeNode(node)
}
