import {
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  PageAction,
} from '../../../../PageAction'
import { onPageCreate } from './onPageCreate'
import { onPageCreated } from './onPageCreated'

export function onVdSync(actions: PageAction[]) {
  actions.forEach((action) => {
    switch (action[0]) {
      case ACTION_TYPE_PAGE_CREATE:
        return onPageCreate(action[1])
      case ACTION_TYPE_PAGE_CREATED:
        return onPageCreated()
    }
  })
}
