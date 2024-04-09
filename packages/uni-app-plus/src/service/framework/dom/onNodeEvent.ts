import type { ACTION_TYPE_EVENT, UniEvent } from '@dcloudio/uni-shared'
import type UniPageNode from './Page'
import { hookKeyboardEvent } from './keyboard'

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
  const type = evt.type
  if (type === 'onFocus' || type === 'onBlur') {
    hookKeyboardEvent(evt, (evt) => {
      pageNode.fireEvent(nodeId, evt)
    })
  } else {
    pageNode.fireEvent(nodeId, evt)
  }
}
