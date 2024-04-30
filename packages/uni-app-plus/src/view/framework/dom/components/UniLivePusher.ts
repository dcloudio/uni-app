import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '../../../../../style/live-pusher.css'
import LivePusher from '../../../components/live-pusher'

import { UniComponent } from './UniComponent'

export class UniLivePusher extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-live-pusher',
      LivePusher,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-live-pusher-slot'
    )
  }
}
