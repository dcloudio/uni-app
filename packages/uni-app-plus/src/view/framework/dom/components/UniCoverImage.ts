import type { UniNodeJSON } from '@dcloudio/uni-shared'
import '../../../../../style/cover-image.css'
import CoverImage from '../../../components/cover-image'

import { UniComponent } from './UniComponent'

export class UniCoverImage extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-cover-image', CoverImage, parentNodeId, refNodeId, nodeJson)
  }
}
