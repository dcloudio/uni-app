import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '../../../../../style/cover-view.css'
import CoverView from '../../../components/cover-view'

import { UniContainerComponent } from './UniComponent'

export class UniCoverView extends UniContainerComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-cover-view',
      CoverView,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-cover-view'
    )
  }
}
