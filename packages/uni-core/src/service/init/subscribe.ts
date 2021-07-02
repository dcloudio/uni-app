import { getPageVmById } from '../../helpers/page'
import { invokeHook } from '../../helpers/hook'

const SUBSCRIBE_LIFECYCLE_HOOKS = ['onPageScroll', 'onReachBottom']

export function initSubscribe() {
  SUBSCRIBE_LIFECYCLE_HOOKS.forEach((name) =>
    UniServiceJSBridge.subscribe(name, createPageEvent(name))
  )
}

function createPageEvent(name: string) {
  return (args: unknown, pageId: number) => {
    const vm = getPageVmById(pageId)
    if (vm) {
      invokeHook(vm, name, args)
    }
  }
}
