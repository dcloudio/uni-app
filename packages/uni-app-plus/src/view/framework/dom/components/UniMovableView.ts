import '@dcloudio/uni-components/style/movable-view.css'
import { MovableView } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniMovableView extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-movable-view', MovableView)
  }
}
