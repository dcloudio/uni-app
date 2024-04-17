import '@dcloudio/uni-components/style/slider.css'
import { Slider } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniSlider extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-slider', Slider, parentNodeId, refNodeId, nodeJson)
  }
}
