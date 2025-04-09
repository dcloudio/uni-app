import type { UniNodeJSON } from '@dcloudio/uni-shared'
import Embed from '../../../components/embed'

import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'

export class UniEmbed extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-embed', Embed, parentNodeId, refNodeId, nodeJson)
  }
}
