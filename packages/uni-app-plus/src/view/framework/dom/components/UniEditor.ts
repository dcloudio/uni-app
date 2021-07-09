import '@dcloudio/uni-components/style/editor.css'
import { Editor } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniEditor extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-editor', Editor)
  }
}
