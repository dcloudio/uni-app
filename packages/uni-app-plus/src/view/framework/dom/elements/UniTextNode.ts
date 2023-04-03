import { LINEFEED, UniNodeJSON } from '@dcloudio/uni-shared'
import { UniNode } from './UniNode'
import { parseText } from '@dcloudio/uni-components'
import { UniTextElement } from './UniTextElement'

export class UniTextNode extends UniNode {
  private _text: string = ''
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, '#text', parentNodeId, document.createTextNode(''))
    this.init(nodeJson)
    this.insert(parentNodeId, refNodeId)
  }
  init(nodeJson: Partial<UniNodeJSON>, isCreate: boolean = true) {
    this._text = nodeJson.t || ''
    if (isCreate) {
      this.update()
    }
  }

  setText(text: string) {
    this._text = text
    this.update()
    this.updateView()
  }

  update() {
    const {
      $props: { space, decode },
    } = this.$parent as UniTextElement
    this.$.textContent = parseText(this._text, { space, decode }).join(LINEFEED)
  }
}
