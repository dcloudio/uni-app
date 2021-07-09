import '@dcloudio/uni-components/style/textarea.css'
import { Textarea } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniTextarea extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-textarea', Textarea)
  }
}
