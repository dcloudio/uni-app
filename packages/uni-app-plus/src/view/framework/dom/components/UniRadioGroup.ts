import '@dcloudio/uni-components/style/radio-group.css'
import { RadioGroup } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniRadioGroup extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-radio-group', RadioGroup)
  }
}
