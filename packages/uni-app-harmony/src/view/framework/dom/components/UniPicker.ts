import type { UniNodeJSON } from '@dcloudio/uni-shared'
import Picker from '../../../components/picker'
import { UniComponent } from '@dcloudio/uni-app-plus/view/framework/dom/components/UniComponent'
import '../../../../../style/picker.css'

export class UniPicker extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-picker',
      Picker,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-picker-slot'
    )
  }
}
