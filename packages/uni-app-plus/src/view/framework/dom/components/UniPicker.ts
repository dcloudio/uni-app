import { UniNodeJSON } from '@dcloudio/uni-shared'
import Picker from '../../../components/picker'
import { UniComponent } from './UniComponent'

export class UniPicker extends UniComponent {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, 'uni-picker', Picker, nodeJson)
  }
}
