import '@dcloudio/uni-components/style/checkbox.css'
import { Checkbox } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniCheckbox extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-checkbox',
      Checkbox,
      parentNodeId,
      nodeJson,
      '.uni-checkbox-wrapper'
    )
  }
}
