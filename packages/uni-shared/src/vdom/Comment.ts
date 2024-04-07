import type { UniElement } from './Element'
import { type IUniPageNode, NODE_TYPE_COMMENT, UniNode } from './Node'

export class UniCommentNode extends UniNode {
  constructor(text: string, container: UniElement | IUniPageNode) {
    super(NODE_TYPE_COMMENT, '#comment', container)
    this._text = __DEV__ ? text : ''
  }
  toJSON(opts: { attr?: boolean } = {}) {
    // 暂时不传递 text 到 view 层，没啥意义，节省点数据量
    return opts.attr
      ? {}
      : {
          i: this.nodeId!,
        }
    // return opts.attr
    //   ? { t: this._text as string }
    //   : {
    //       i: this.nodeId!,
    //       t: this._text as string,
    //     }
  }
}
