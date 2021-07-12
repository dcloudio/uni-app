import '@dcloudio/uni-components/style/swiper-item.css'
import { SwiperItem } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniSwiperItem extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, 'uni-swiper-item', SwiperItem, nodeJson)
  }
}
