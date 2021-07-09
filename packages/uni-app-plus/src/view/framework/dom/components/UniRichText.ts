import '@dcloudio/uni-components/style/rich-text.css'
import { RichText } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniRichText extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-rich-text', RichText)
  }
}
