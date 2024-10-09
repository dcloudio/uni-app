import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '@dcloudio/uni-h5/style/cover-view.css'
import CoverView from '@dcloudio/uni-h5/view/components/cover-view'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniCoverView extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-cover-view', CoverView, parentNodeId, refNodeId, nodeJson)
  }
}
