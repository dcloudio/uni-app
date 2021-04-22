import { getPageVmById, invokeHook } from './page'

export function initSubscribe() {
  UniServiceJSBridge.subscribe('onPageScroll', createPageEvent('onPageScroll'))
}

function createPageEvent(name: string) {
  return (args: unknown, pageId: number) => {
    const vm = getPageVmById(pageId)
    if (vm) {
      invokeHook(vm, name, args)
    }
  }
}
