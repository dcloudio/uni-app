import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '@dcloudio/uni-h5/style/video.css'
import Video from '@dcloudio/uni-h5/view/components/video'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniLivePlayer extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-live-player', Video, parentNodeId, refNodeId, nodeJson)
  }
}
