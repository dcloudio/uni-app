import '@dcloudio/uni-components/style/canvas.css'
import { Canvas } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniCanvas extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, 'uni-canvas', Canvas, nodeJson, 'canvas > div')
  }
}
