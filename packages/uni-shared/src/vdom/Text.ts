import { NODE_TYPE_TEXT, UniBaseNode } from './Node'

export class UniTextNode extends UniBaseNode {
  constructor(text: string) {
    super(NODE_TYPE_TEXT, '#text')
    this._text = text
  }

  get nodeValue() {
    return this._text || ''
  }

  set nodeValue(text: string) {
    this._text = text
  }
}
