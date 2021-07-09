import '@dcloudio/uni-components/style/text.css'
import { Text } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniText extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-text', Text)
  }
}
