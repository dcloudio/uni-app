import '@dcloudio/uni-components/style/rich-text.css'
import { RichText } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniRichText extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-rich-text', RichText, parentNodeId, refNodeId, nodeJson)
  }
}
