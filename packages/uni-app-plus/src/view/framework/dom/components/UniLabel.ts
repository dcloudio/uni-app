import '@dcloudio/uni-components/style/label.css'
import { Label } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniLabel extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, 'uni-label', Label, nodeJson)
  }
}
