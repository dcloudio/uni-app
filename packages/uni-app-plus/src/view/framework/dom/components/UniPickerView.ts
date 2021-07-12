import '@dcloudio/uni-components/style/picker-view.css'
import { PickerView } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniPickerView extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-picker-view', PickerView, '.uni-picker-view-wrapper')
  }
}
