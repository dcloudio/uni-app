import { ON_PAGE_SCROLL, ON_REACH_BOTTOM } from '@dcloudio/uni-shared'
import { invokeHook } from '../../helpers/hook'

const SUBSCRIBE_LIFECYCLE_HOOKS = [ON_PAGE_SCROLL, ON_REACH_BOTTOM]

export function initSubscribe() {
  SUBSCRIBE_LIFECYCLE_HOOKS.forEach((name) =>
    UniServiceJSBridge.subscribe(name, createPageEvent(name))
  )
}

function createPageEvent(name: string) {
  return (args: unknown, pageId: string) => {
    invokeHook(parseInt(pageId), name, args)
  }
}
