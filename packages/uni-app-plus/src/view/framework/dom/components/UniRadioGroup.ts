import '@dcloudio/uni-components/style/radio-group.css'
import { RadioGroup } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniRadioGroup extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-radio-group', RadioGroup, parentNodeId, refNodeId, nodeJson)
  }
}
