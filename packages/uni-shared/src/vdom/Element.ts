import { NODE_TYPE_ELEMENT, UniBaseNode } from './Node'

export class UniElement extends UniBaseNode {
  tagName: string
  constructor(nodeName: string) {
    super(NODE_TYPE_ELEMENT, nodeName.toUpperCase())
    this.tagName = this.nodeName
  }
}

export class UniInputElement extends UniElement {
  get value() {
    return this.getAttribute('value') as string | number
  }
  set value(val: string | number) {
    this.setAttribute('value', val)
  }
}

export class UniTextAreaElement extends UniInputElement {}
