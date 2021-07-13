import { UniNodeJSON } from '@dcloudio/uni-shared'
import CoverImage from '../../../components/cover-image'

import { UniComponent } from './UniComponent'

export class UniCoverImage extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-cover-image', CoverImage, parentNodeId, nodeJson)
  }
}
