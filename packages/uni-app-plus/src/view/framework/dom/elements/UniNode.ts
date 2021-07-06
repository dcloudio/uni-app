import { hasOwn } from '@vue/shared'
import { UniNodeJSON } from '@dcloudio/uni-shared'

import { $ } from './utils'

export class UniNode {
  id: number
  tag: string
  $!: Element | Text
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
    const parentNode = $(parentNodeId).$
    if (refNodeId === -1) {
      parentNode.appendChild(node)
    } else {
      parentNode.insertBefore(node, $(refNodeId).$)
    }
  }
  remove() {
    const { $ } = this
    $.parentNode!.removeChild($)
  }
}
