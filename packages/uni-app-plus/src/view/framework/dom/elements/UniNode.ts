import { hasOwn } from '@vue/shared'
import { UniNodeJSON } from '@dcloudio/uni-shared'

import { $ } from '../page'

export class UniNode {
  id: number
  tag: string
  $!: Element | Text | Comment
  isMounted: boolean = false
  isUnmounted: boolean = false
  constructor(id: number, tag: string) {
    this.id = id
    this.tag = tag
  }
  init(nodeJson: Partial<UniNodeJSON>) {
    if (hasOwn(nodeJson, 't')) {
      this.$.textContent = nodeJson.t || ''
    }
  }
  setText(text: string) {
    this.$.textContent = text
  }
  insert(
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    this.init(nodeJson)
    const node = this.$
    const parentNode = $(parentNodeId)
    if (refNodeId === -1) {
      parentNode.appendChild(node)
    } else {
      parentNode.insertBefore(node, $(refNodeId).$)
    }
    this.isMounted = true
  }
  remove() {
    const { $ } = this
    $.parentNode!.removeChild($)
    this.isUnmounted = false
  }
  appendChild(node: Element) {
    return this.$.appendChild(node)
  }
  insertBefore(newChild: Node, refChild: Node) {
    return this.$.insertBefore(newChild, refChild)
  }
}
