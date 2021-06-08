import { NODE_TYPE_COMMENT, UniNode } from './Node'

export class UniCommentNode extends UniNode {
  constructor(text: string) {
    super(NODE_TYPE_COMMENT, '#comment')
    this._text = text
  }
}
