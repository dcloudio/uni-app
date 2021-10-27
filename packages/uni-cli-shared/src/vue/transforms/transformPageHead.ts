import { NodeTransform } from '@vue/compiler-core'

export const transformPageHead: NodeTransform = (_node, _context) => {
  // 发现是page-meta下的page-head,直接remove该节点
}
