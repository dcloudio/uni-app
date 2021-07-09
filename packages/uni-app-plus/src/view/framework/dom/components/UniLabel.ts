import '@dcloudio/uni-components/style/label.css'
import { Label } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniLabel extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-label', Label)
  }
}
