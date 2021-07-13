import '@dcloudio/uni-components/style/swiper.css'
import { Swiper } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniSwiper extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-swiper',
      Swiper,
      parentNodeId,
      nodeJson,
      '.uni-swiper-slide-frame'
    )
  }
}
