import '@dcloudio/uni-components/style/view.css'
import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniHoverElement } from './UniHoverElement'
export class UniViewElement extends UniHoverElement {
  constructor(id: number, nodeJson: Partial<UniNodeJSON>) {
    super(id, document.createElement('uni-view'), nodeJson)
  }
}
