import '@dcloudio/uni-components/style/picker-view-column.css'
import { PickerViewColumn } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniPickerViewColumn extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-picker-view-column', PickerViewColumn)
  }
}
