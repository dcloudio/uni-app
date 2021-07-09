import '@dcloudio/uni-components/style/form.css'
import { Form } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniForm extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-form', Form)
  }
}
