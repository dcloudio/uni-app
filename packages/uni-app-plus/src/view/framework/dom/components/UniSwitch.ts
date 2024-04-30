import '@dcloudio/uni-components/style/switch.css'
import { Switch } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniSwitch extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-switch', Switch, parentNodeId, refNodeId, nodeJson)
  }
}
