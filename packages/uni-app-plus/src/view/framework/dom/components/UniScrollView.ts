import '@dcloudio/uni-components/style/scroll-view.css'
import { ScrollView } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniScrollView extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(
      id,
      'uni-scroll-view',
      ScrollView,
      nodeJson,
      '.uni-scroll-view-content'
    )
  }
}
