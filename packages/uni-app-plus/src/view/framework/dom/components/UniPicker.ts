import Picker from '../../../components/picker'

import { UniComponent } from './UniComponent'

export class UniPicker extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-picker', Picker)
  }
}
