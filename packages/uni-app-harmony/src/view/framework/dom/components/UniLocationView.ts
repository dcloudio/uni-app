import type { UniNodeJSON } from '@dcloudio/uni-shared'
import LocationView from '../../../components/map/LocationView'
import '../../../../../style/map.css'
import '../../../../../style/api/location-view.css'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniLocationView extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-location-view',
      LocationView,
      parentNodeId,
      refNodeId,
      nodeJson
    )
  }
}
