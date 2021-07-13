import '@dcloudio/uni-components/style/picker-view.css'
import { PickerView } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniPickerView extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-picker-view',
      PickerView,
      parentNodeId,
      nodeJson,
      '.uni-picker-view-wrapper'
    )
  }
}
