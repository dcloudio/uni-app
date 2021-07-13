import '@dcloudio/uni-components/style/picker-view-column.css'
import { PickerViewColumn } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniPickerViewColumn extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-picker-view-column',
      PickerViewColumn,
      parentNodeId,
      nodeJson,
      '.uni-picker-view-content'
    )
  }
}
