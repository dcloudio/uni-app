import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '../../../../../style/ad.css'
import Ad from '../../../components/ad'

import { UniComponent } from './UniComponent'

export class UniAd extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-ad', Ad, parentNodeId, refNodeId, nodeJson)
  }
}
