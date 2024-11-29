import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'
import Ad from '../../../components/ad'
import '../../../../../style/ad.css'

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
