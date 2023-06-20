import 'uni-platform/runtime/index'

import {
  isFn,
  hasOwn
} from 'uni-shared'

import parseApp from 'uni-platform/runtime/wrapper/app-parser'

export default function createSubpackageApp (vm) {
  const appOptions = parseApp(vm)
  const app = getApp({
    allowDefault: true
  })
  vm.$scope = app
  const globalData = app.globalData
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(name => {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name]
      }
    })
  }
  Object.keys(appOptions).forEach(name => {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name]
    }
  })
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
