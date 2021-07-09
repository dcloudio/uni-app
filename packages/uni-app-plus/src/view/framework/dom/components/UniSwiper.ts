import '@dcloudio/uni-components/style/swiper.css'
import { Swiper } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniSwiper extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-swiper', Swiper)
  }
}
