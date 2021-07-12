import '@dcloudio/uni-components/style/switch.css'
import { Switch } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniSwitch extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, 'uni-switch', Switch, nodeJson)
  }
}
