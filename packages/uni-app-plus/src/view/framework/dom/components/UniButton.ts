import '@dcloudio/uni-components/style/button.css'
import { Button } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniButton extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-button', Button)
  }
}
