import '@dcloudio/uni-components/style/image.css'
import { Image } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniImage extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-image', Image)
  }
}
