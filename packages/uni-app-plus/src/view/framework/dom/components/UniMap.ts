import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '../../../../../style/map.css'
import Map from '../../../components/map/index'

import { UniComponent } from './UniComponent'

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
      __uniConfig.qqMapKey ? undefined : '.uni-map-slot'
    )
  }
}
