import '@dcloudio/uni-components/style/slider.css'
import { Slider } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniSlider extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-slider', Slider)
  }
}
