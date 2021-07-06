import { UniEvent } from '@dcloudio/uni-shared'
import UniPageNode from './Page'

export function onNodeEvent(
  nodeId: number,
  evt: UniEvent,
  pageNode: UniPageNode
) {
  pageNode.fireEvent(nodeId, evt)
}
