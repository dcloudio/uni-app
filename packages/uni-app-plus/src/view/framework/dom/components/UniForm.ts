import '@dcloudio/uni-components/style/form.css'
import { Form } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniForm extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-form', Form, parentNodeId, refNodeId, nodeJson, 'span')
  }
}
