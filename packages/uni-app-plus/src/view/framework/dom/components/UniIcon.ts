import '@dcloudio/uni-components/style/icon.css'
import { Icon } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniIcon extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-icon', Icon)
  }
}
