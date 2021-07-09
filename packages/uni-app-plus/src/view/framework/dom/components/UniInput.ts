import '@dcloudio/uni-components/style/input.css'
import { Input } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniInput extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-input', Input)
  }
}
