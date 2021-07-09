import '../../../../../style/video.css'
import Video from '../../../components/video'

import { UniComponent } from './UniComponent'

export class UniVideo extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-video', Video)
  }
}
