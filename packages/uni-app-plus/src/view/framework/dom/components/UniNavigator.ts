import '@dcloudio/uni-components/style/navigator.css'
import { Navigator } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniNavigator extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-navigator', Navigator)
  }
}
