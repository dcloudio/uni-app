import '@dcloudio/uni-components/style/checkbox.css'
import { Checkbox } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent, setHolderText } from './UniComponent'

export class UniCheckbox extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-checkbox',
      Checkbox,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-checkbox-wrapper'
    )
  }
  setText(text: string) {
    setHolderText(this.$holder!, 'uni-checkbox-input', text)
  }
}
