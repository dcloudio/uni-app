import '@dcloudio/uni-components/style/canvas.css'
import { Canvas } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniCanvas extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-canvas', Canvas)
  }
}
