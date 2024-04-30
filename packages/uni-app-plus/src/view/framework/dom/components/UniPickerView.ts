import '@dcloudio/uni-components/style/picker-view.css'
import { PickerView } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniContainerComponent } from './UniComponent'

export class UniPickerView extends UniContainerComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-picker-view',
      PickerView,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-picker-view-wrapper'
    )
  }
}
