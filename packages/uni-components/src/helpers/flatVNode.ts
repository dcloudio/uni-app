import { Fragment, VNode, isVNode } from 'vue'
import { isArray } from '@vue/shared'

export function flatVNode(nodes: any): VNode[] {
  const array: VNode[] = []
  if (isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (isVNode(vnode)) {
        if (vnode.type === Fragment) {
          array.push(...flatVNode(vnode.children))
        } else {
          array.push(vnode)
        }
      } else if (isArray(vnode)) {
        array.push(...flatVNode(vnode))
      }
    })
  }
  return array
}
