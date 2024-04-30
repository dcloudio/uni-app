import '@dcloudio/uni-components/style/icon.css'
import { Icon } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'

import { UniComponent } from './UniComponent'

export class UniIcon extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-icon', Icon, parentNodeId, refNodeId, nodeJson)
  }
}
