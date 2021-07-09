import '@dcloudio/uni-components/style/checkbox.css'
import { Checkbox } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniCheckbox extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-checkbox', Checkbox)
  }
}
