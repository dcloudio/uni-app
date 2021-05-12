import { Fragment, VNode, isVNode } from 'vue'

export function flatVNode(nodes: any): VNode[] {
  const array: VNode[] = []
  if (Array.isArray(nodes)) {
    nodes.forEach((vnode) => {
      if (isVNode(vnode)) {
        if (vnode.type === Fragment) {
          array.push(...flatVNode(vnode.children))
        } else {
          array.push(vnode)
        }
      } else if (Array.isArray(vnode)) {
        array.push(...flatVNode(vnode))
      }
    })
  }
  return array
}
