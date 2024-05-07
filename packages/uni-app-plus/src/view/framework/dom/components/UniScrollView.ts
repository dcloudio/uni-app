import '@dcloudio/uni-components/style/scroll-view.css'
import '@dcloudio/uni-components/style/refresher.css'
import { ScrollView } from '@dcloudio/uni-components'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent, setHolderText } from './UniComponent'

export class UniScrollView extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      'uni-scroll-view',
      ScrollView,
      parentNodeId,
      refNodeId,
      nodeJson,
      '.uni-scroll-view-content'
    )
  }
  setText(text: string) {
    setHolderText(this.$holder!, 'uni-scroll-view-refresher', text)
  }
}
