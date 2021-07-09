import '@dcloudio/uni-components/style/checkbox-group.css'
import { CheckboxGroup } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniCheckboxGroup extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-checkbox-group', CheckboxGroup)
  }
}
