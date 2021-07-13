import { UniNodeJSON } from '@dcloudio/uni-shared'
import Ad from '../../../components/ad'

import { UniComponent } from './UniComponent'

export class UniAd extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-ad', Ad, parentNodeId, nodeJson)
  }
}
