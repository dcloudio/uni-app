import '@dcloudio/uni-components/style/scroll-view.css'
import { ScrollView } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniScrollView extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-scroll-view', ScrollView, '.uni-scroll-view-content')
  }
}
