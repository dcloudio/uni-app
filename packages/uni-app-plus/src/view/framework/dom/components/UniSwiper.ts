import '@dcloudio/uni-components/style/swiper.css'
import { Swiper } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniContainerComponent } from './UniComponent'

export class UniSwiper extends UniContainerComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-swiper',
      Swiper,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-swiper-slide-frame'
    )
  }
}
