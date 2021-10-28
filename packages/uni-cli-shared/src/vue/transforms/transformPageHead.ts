import { NodeTransform } from '@vue/compiler-core'
import { checkElementNodeTag } from '../../utils'

export const transformPageHead: NodeTransform = (node, context) => {
  // 发现是page-meta下的page-meta-head,直接remove该节点
  checkElementNodeTag(node, 'page-meta-head') &&
    checkElementNodeTag(context.parent, 'page-meta') &&
    context.removeNode(node)
}
