import '@dcloudio/uni-components/style/editor.css'
import { Editor } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniEditor extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-editor', Editor, parentNodeId, refNodeId, nodeJson)
  }
}
