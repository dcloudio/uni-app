import '@dcloudio/uni-components/style/swiper-item.css'
import { SwiperItem } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniSwiperItem extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-swiper-item', SwiperItem)
  }
}
