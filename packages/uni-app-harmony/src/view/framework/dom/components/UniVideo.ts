import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '@dcloudio/uni-h5/style/video.css'
import Video from '@dcloudio/uni-h5/view/components/video'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniVideo extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-video',
      Video,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-video-slots'
    )
  }
}
