import '@dcloudio/uni-components/style/picker-view-column.css'
import { PickerViewColumn } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniContainerComponent } from './UniComponent'

export class UniPickerViewColumn extends UniContainerComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-picker-view-column',
      PickerViewColumn,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-picker-view-content'
    )
  }
}
