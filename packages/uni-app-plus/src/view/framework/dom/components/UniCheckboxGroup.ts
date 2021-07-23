import '@dcloudio/uni-components/style/checkbox-group.css'
import { CheckboxGroup } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniCheckboxGroup extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-checkbox-group',
      CheckboxGroup,
      parentNodeId,
      refNodeId,
      nodeJson
    )
  }
}
