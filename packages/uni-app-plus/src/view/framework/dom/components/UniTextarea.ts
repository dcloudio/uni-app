import '@dcloudio/uni-components/style/textarea.css'
import { Textarea } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent, initVModel } from './UniComponent'

export class UniTextarea extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-textarea', Textarea, parentNodeId, refNodeId, nodeJson)
  }

  init(nodeJson: Partial<UniNodeJSON>): void {
    super.init(nodeJson)
    initVModel(this.$props)
  }
}
