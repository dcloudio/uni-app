import '@dcloudio/uni-components/style/radio.css'
import { Radio } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent, setHolderText } from './UniComponent'

export class UniRadio extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-radio',
      Radio,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-radio-wrapper'
    )
  }
  setText(text: string) {
    setHolderText(this.$holder!, 'uni-radio-input', text)
  }
}
