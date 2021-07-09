import '@dcloudio/uni-components/style/switch.css'
import { Switch } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniSwitch extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-switch', Switch)
  }
}
