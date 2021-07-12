import '@dcloudio/uni-components/style/rich-text.css'
import { RichText } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniRichText extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, 'uni-rich-text', RichText, nodeJson)
  }
}
