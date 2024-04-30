import '@dcloudio/uni-components/style/image.css'
import { Image } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniImage extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-image', Image, parentNodeId, refNodeId, nodeJson)
  }
}
