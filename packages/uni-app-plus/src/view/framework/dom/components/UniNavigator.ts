import '@dcloudio/uni-components/style/navigator.css'
import { Navigator } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniNavigator extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-navigator',
      Navigator,
      parentNodeId,
      refNodeId,
      nodeJson,
      'uni-navigator'
    )
  }
}
