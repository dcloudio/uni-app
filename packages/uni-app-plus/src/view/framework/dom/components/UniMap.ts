import Map from '../../../components/map'

import { UniComponent } from './UniComponent'

export class UniMap extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-map', Map)
  }
}
