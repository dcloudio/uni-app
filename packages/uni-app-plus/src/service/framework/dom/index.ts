import { ACTION_TYPE_EVENT, formatLog } from '@dcloudio/uni-shared'
import { getPageById } from '../page/getCurrentPages'
import { type EventAction, onNodeEvent } from './onNodeEvent'
import type UniPageNode from './Page'

export function onVdSync(actions: EventAction[], pageId: string) {
  // 从所有pages中获取
  const page = getPageById(parseInt(pageId))
  if (!page) {
    if (__DEV__) {
      console.error(formatLog('onVdSync', 'page', pageId, 'not found'))
    }
    return
  }
  const pageNode = (page as any).__page_container__ as UniPageNode
  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_EVENT:
        onNodeEvent(action[1], action[2], pageNode)
        break
    }
  })
}
