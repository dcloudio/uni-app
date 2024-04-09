import '@dcloudio/uni-components/style/canvas.css'
import { Canvas } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniCanvas extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-canvas',
      Canvas,
      parentNodeId,
      refNodeId,
      nodeJson,
      'uni-canvas > div'
    )
  }
}
