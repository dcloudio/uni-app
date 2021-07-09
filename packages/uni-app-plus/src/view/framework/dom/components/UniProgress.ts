import '@dcloudio/uni-components/style/progress.css'
import { Progress } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniProgress extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-progress', Progress)
  }
}
