import '@dcloudio/uni-components/style/radio.css'
import { Radio } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniRadio extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-radio', Radio, '.uni-radio-wrapper')
  }
}
