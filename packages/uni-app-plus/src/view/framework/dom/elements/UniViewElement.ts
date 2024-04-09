import '@dcloudio/uni-components/style/view.css'
import type { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniHoverElement } from './UniHoverElement'
export class UniViewElement extends UniHoverElement {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(
      id,
      document.createElement('uni-view'),
      parentNodeId,
      refNodeId,
      nodeJson
    )
  }
}
