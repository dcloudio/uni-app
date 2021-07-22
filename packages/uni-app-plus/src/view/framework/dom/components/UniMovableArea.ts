import '@dcloudio/uni-components/style/movable-area.css'
import { MovableArea } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniContainerComponent } from './UniComponent'

export class UniMovableArea extends UniContainerComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-movable-area', MovableArea, parentNodeId, nodeJson)
  }
}
