import '@dcloudio/uni-components/style/progress.css'
import { Progress } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniProgress extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-progress', Progress, parentNodeId, nodeJson)
  }
}
