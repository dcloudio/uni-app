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
} from '../../../PageAction'
import { $, createElement, onPageCreate, onPageCreated } from './page'
import { flushPostActionJobs } from './scheduler'

export function onVdSync(actions: PageAction[]) {
  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_PAGE_CREATE:
        return onPageCreate(action[1])
      case ACTION_TYPE_PAGE_CREATED:
        return onPageCreated()
      case ACTION_TYPE_CREATE:
        return createElement(action[1], action[2], action[3], action[4])
      case ACTION_TYPE_INSERT:
        return $(action[1]).insert(action[2], action[3])
      case ACTION_TYPE_REMOVE:
        return $(action[1]).remove()
      case ACTION_TYPE_SET_ATTRIBUTE:
        return $(action[1]).setAttr(action[2], action[3])
      case ACTION_TYPE_REMOVE_ATTRIBUTE:
        return $(action[1]).removeAttr(action[2])
      case ACTION_TYPE_SET_TEXT:
        return $(action[1]).setText(action[2])
    }
  })
  flushPostActionJobs()
}
