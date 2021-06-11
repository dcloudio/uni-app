import { UniElement } from './Element'
import { IUniPageNode, NODE_TYPE_COMMENT, UniNode } from './Node'

export class UniCommentNode extends UniNode {
  constructor(text: string, container: UniElement | IUniPageNode) {
    super(NODE_TYPE_COMMENT, '#comment', container)
    this._text = text
  }
  toJSON(opts: { attr?: boolean } = {}) {
    return opts.attr
      ? { t: this._text as string }
      : {
          i: this.nodeId!,
          t: this._text as string,
        }
  }
}
