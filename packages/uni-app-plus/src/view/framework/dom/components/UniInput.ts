import '@dcloudio/uni-components/style/input.css'
import { Input } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniInput extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-input', Input, parentNodeId, refNodeId, nodeJson)
  }
}
