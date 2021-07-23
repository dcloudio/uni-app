import '@dcloudio/uni-components/style/textarea.css'
import { Textarea } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniTextarea extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-textarea', Textarea, parentNodeId, refNodeId, nodeJson)
  }
}
