import '@dcloudio/uni-components/style/audio.css'
import { Audio } from '@dcloudio/uni-components'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniComponent } from './UniComponent'

export class UniAudio extends UniComponent {
  constructor(
    id: number,
    parentNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, 'uni-audio', Audio, parentNodeId, nodeJson)
  }
}
