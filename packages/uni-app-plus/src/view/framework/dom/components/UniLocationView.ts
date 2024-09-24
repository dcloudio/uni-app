import type { UniNodeJSON } from '@dcloudio/uni-shared'
import LocationView from '../../../components/map/LocationView'
import '../../../../../style/map.css'
import '../../../../../style/api/location-view.css'

import { UniComponent } from './UniComponent'

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
