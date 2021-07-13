import '@dcloudio/uni-components/style/movable-view.css'
import { MovableView } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniMovableView extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-movable-view', MovableView, parentNodeId, nodeJson)
  }
}
