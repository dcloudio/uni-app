import '@dcloudio/uni-components/style/text.css'
import { LINEFEED, type UniNodeJSON } from '@dcloudio/uni-shared'
import { type DecodeOptions, parseText } from '@dcloudio/uni-components'
import { UniAnimationElement } from './UniAnimationElement'

export interface TextProps {
  space: DecodeOptions['space']
  decode: boolean
}

const PROP_NAMES_HOVER = ['space', 'decode']

export class UniTextElement extends UniAnimationElement<TextProps> {
  private _text: string = ''

  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      document.createElement('uni-text'),
      parentNodeId,
      refNodeId,
      nodeJson,
      PROP_NAMES_HOVER
    )
  }

  init(nodeJson: Partial<UniNodeJSON>) {
    this._text = nodeJson.t || ''
    super.init(nodeJson)
  }

  setText(text: string) {
    this._text = text
    this.update()
    this.updateView()
  }

  update(isMounted: boolean = false) {
    const {
      $props: { space, decode },
    } = this

    this.$.textContent = parseText(this._text, { space, decode }).join(LINEFEED)

    super.update(isMounted)
  }
}
