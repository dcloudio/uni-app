import '@dcloudio/uni-components/style/view.css'
import { UniHoverElement } from './UniHoverElement'
export class UniViewElement extends UniHoverElement {
  constructor(id: number) {
    super(id, document.createElement('uni-view'))
  }
}
