import 'uni-platform/runtime/index'

import {
  isFn
} from 'uni-shared'

import parseApp from 'uni-platform/runtime/wrapper/app-parser'

export default function createPlugin (vm) {
  const appOptions = parseApp(vm)
  if (isFn(appOptions.onShow) && __GLOBAL__.onAppShow) {
    __GLOBAL__.onAppShow((...args) => {
      vm.__call_hook('onShow', args)
    })
  }
  if (isFn(appOptions.onHide) && __GLOBAL__.onAppHide) {
    __GLOBAL__.onAppHide((...args) => {
      vm.__call_hook('onHide', args)
    })
  }
  if (isFn(appOptions.onLaunch)) {
    const args = __GLOBAL__.getLaunchOptionsSync && __GLOBAL__.getLaunchOptionsSync()
    vm.__call_hook('onLaunch', args)
  }
  return vm
}
