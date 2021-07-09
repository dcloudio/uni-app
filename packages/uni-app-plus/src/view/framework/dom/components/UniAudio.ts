import '@dcloudio/uni-components/style/audio.css'
import { Audio } from '@dcloudio/uni-components'

import { UniComponent } from './UniComponent'

export class UniAudio extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-audio', Audio)
  }
}
