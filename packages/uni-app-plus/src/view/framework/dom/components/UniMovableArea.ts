import '@dcloudio/uni-components/style/movable-area.css'
import { MovableArea } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniContainerComponent } from './UniComponent'

export class UniMovableArea extends UniContainerComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-movable-area',
      MovableArea,
      parentNodeId,
      refNodeId,
      nodeJson
    )
  }
}
