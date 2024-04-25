import {
  ACTION_TYPE_ADD_EVENT,
  ACTION_TYPE_ADD_WXS_EVENT,
  ACTION_TYPE_CREATE,
  ACTION_TYPE_INSERT,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  ACTION_TYPE_PAGE_SCROLL,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_REMOVE_EVENT,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  type PageAction,
  type PageCreateAction,
  formatLog,
} from '@dcloudio/uni-shared'
import type { UniNodeJSONMinify } from 'packages/uni-shared/src/vdom/Node'
import {
  ACTION_TYPE_DICT,
  type DictAction,
  type Dictionary,
} from '@dcloudio/uni-app-plus/constants'
import {
  createGetDict,
  decodeNodeJson,
} from '@dcloudio/uni-app-plus/view/framework/dom/decodeActions'
import {
  $,
  createElement,
  initPageScroll,
  onPageCreate,
  onPageCreated,
  onPageReady,
} from './page'
import { flushPostActionJobs } from '@dcloudio/uni-app-plus/view/framework/dom/scheduler'

export function onVdSync(actions: (PageAction | DictAction)[]) {
  if (__DEV__) {
    console.log(formatLog('onVdSync', actions))
  }
  const firstAction = actions[0]
  // page create
  if (firstAction[0] === ACTION_TYPE_PAGE_CREATE) {
    onPageCreateSync(firstAction)
  } else {
    onPageReady(() => onPageUpdateSync(actions))
  }
}

function onPageCreateSync(action: PageCreateAction) {
  return onPageCreate(action[1])
}

function onPageUpdateSync(actions: (PageAction | DictAction)[]) {
  const dictAction = actions[0]
  const getDict = createGetDict(
    dictAction[0] === ACTION_TYPE_DICT ? (dictAction[1] as Dictionary) : []
  )
  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_PAGE_CREATE:
        return onPageCreate(action[1])
      case ACTION_TYPE_PAGE_CREATED:
        return onPageCreated()
      case ACTION_TYPE_CREATE:
        const parentNodeId = action[3]
        return createElement(
          action[1],
          getDict(action[2] as number),
          // 部分性能低的手机，createAction 与 insertAction 是分开的，导致根节点 parentNodeId 为 -1
          parentNodeId === -1 ? 0 : parentNodeId,
          action[4],
          decodeNodeJson(getDict, action[5] as UniNodeJSONMinify)
        )
      case ACTION_TYPE_INSERT:
        return $(action[1]).insert(
          action[2],
          action[3],
          decodeNodeJson(getDict, action[4] as UniNodeJSONMinify)
        )
      case ACTION_TYPE_REMOVE:
        return $(action[1]).remove()
      case ACTION_TYPE_SET_ATTRIBUTE:
        return $(action[1]).setAttr(
          getDict(action[2] as number),
          getDict(action[3] as number)
        )
      case ACTION_TYPE_REMOVE_ATTRIBUTE:
        return $(action[1]).removeAttr(getDict(action[2] as number))
      case ACTION_TYPE_ADD_EVENT:
        return $(action[1]).addEvent(getDict(action[2] as number), action[3])
      case ACTION_TYPE_ADD_WXS_EVENT:
        return $(action[1]).addWxsEvent(
          getDict(action[2] as number),
          getDict(action[3] as number),
          action[4]
        )
      case ACTION_TYPE_REMOVE_EVENT:
        return $(action[1]).removeEvent(getDict(action[2] as number))
      case ACTION_TYPE_SET_TEXT:
        return $(action[1]).setText(getDict(action[2] as number))
      case ACTION_TYPE_PAGE_SCROLL:
        return initPageScroll(action[1])
    }
  })
  flushPostActionJobs()
}
