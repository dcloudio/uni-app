import {
  ACTION_TYPE_CREATE,
  ACTION_TYPE_INSERT,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  PageAction,
} from '../../../../PageAction'
import { onNodeCreate } from './onNodeCreate'
import { onNodeInsert } from './onNodeInsert'
import { onNodeRemove } from './onNodeRemove'
import { onNodeRemoveAttr } from './onNodeRemoveAttr'
import { onNodeSetAttr } from './onNodeSetAttr'
import { onNodeSetText } from './onNodeSetText'
import { onPageCreate } from './onPageCreate'
import { onPageCreated } from './onPageCreated'

export function onVdSync(actions: PageAction[]) {
  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_PAGE_CREATE:
        return onPageCreate(action[1])
      case ACTION_TYPE_PAGE_CREATED:
        return onPageCreated()
      case ACTION_TYPE_CREATE:
        return onNodeCreate(action[1], action[2])
      case ACTION_TYPE_INSERT:
        return onNodeInsert(action[1], action[2], action[3], action[4])
      case ACTION_TYPE_REMOVE:
        return onNodeRemove(action[1], action[2])
      case ACTION_TYPE_SET_ATTRIBUTE:
        return onNodeSetAttr(action[1], action[2], action[3])
      case ACTION_TYPE_REMOVE_ATTRIBUTE:
        return onNodeRemoveAttr(action[1], action[2])
      case ACTION_TYPE_SET_TEXT:
        return onNodeSetText(action[1], action[2])
    }
  })
}
