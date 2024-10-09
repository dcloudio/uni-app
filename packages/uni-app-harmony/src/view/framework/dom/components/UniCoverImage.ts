import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '@dcloudio/uni-h5/style/cover-image.css'
import CoverImage from '@dcloudio/uni-h5/view/components/cover-image'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniCoverImage extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-cover-image', CoverImage, parentNodeId, refNodeId, nodeJson)
  }
}
