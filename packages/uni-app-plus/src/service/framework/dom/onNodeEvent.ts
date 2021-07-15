import { ACTION_TYPE_EVENT, UniEvent } from '@dcloudio/uni-shared'
import UniPageNode from './Page'

export type EventAction = [
  typeof ACTION_TYPE_EVENT,
  Parameters<typeof onNodeEvent>[0],
  Parameters<typeof onNodeEvent>[1]
]

export function onNodeEvent(
  nodeId: number,
  evt: UniEvent,
  pageNode: UniPageNode
) {
  pageNode.fireEvent(nodeId, evt)
}
