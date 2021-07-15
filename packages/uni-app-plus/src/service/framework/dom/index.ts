import { getPageById } from '@dcloudio/uni-core'
import { ACTION_TYPE_EVENT, formatLog } from '@dcloudio/uni-shared'
import { ComponentPublicInstance } from 'vue'
import { EventAction, onNodeEvent } from './onNodeEvent'
import UniPageNode from './Page'

export function onVdSync(actions: EventAction[], pageId: string) {
  const page = getPageById(parseInt(pageId))
  if (!page) {
    if (__DEV__) {
      console.error(formatLog('onVdSync', 'page', pageId, 'not found'))
    }
    return
  }
  const pageNode = (page as ComponentPublicInstance).$.appContext.app
    ._container as UniPageNode
  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_EVENT:
        onNodeEvent(action[1], action[2], pageNode)
        break
    }
  })
}
