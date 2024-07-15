import type { UniNodeJSON } from '@dcloudio/uni-shared'
import LocationPicker from '../../../components/map/LoctaionPicker'
import '../../../../../style/map.css'
import '../../../../../style/api/location-picker.css'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniLocationPicker extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-location-picker',
      LocationPicker,
      parentNodeId,
      refNodeId,
      nodeJson
    )
  }
}
