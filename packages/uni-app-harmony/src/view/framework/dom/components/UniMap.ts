import type { UniNodeJSON } from '@dcloudio/uni-shared'
import Map from '../../../components/map'
import '../../../../../style/map.css'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniMap extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-map',
      Map,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-map-slot'
    )
  }
}
