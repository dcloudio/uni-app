import { UniNodeJSON } from '@dcloudio/uni-shared'
import CoverView from '../../../components/cover-view'

import { UniComponent } from './UniComponent'

export class UniCoverView extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-cover-view', CoverView, parentNodeId, nodeJson)
  }
}
