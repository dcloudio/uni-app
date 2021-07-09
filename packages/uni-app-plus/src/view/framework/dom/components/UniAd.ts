import Ad from '../../../components/ad'

import { UniComponent } from './UniComponent'

export class UniAd extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-ad', Ad)
  }
}
