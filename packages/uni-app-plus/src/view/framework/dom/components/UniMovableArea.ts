import '@dcloudio/uni-components/style/movable-area.css'
import { MovableArea } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniMovableArea extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-movable-area', MovableArea, parentNodeId, nodeJson)
  }
}
