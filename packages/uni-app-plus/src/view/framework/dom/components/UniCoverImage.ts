import CoverImage from '../../../components/cover-image'

import { UniComponent } from './UniComponent'

export class UniCoverImage extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-cover-image', CoverImage)
  }
}
