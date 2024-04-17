import type { UniElement } from './Element'
import { type IUniPageNode, NODE_TYPE_TEXT, UniBaseNode } from './Node'

export class UniTextNode extends UniBaseNode {
  constructor(text: string, container: UniElement | IUniPageNode) {
    super(NODE_TYPE_TEXT, '#text', container)
    this._text = text
  }

  get nodeValue() {
    return this._text || ''
  }

  set nodeValue(text: string) {
    this._text = text
    if (this.pageNode && !this.pageNode.isUnmounted) {
      this.pageNode.onNodeValue(this, text)
    }
  }
}
