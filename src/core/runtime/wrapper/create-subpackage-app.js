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
      appOptions.onShow.apply(app, args)
    })
  }
  if (isFn(appOptions.onHide) && __GLOBAL__.onAppHide) {
    __GLOBAL__.onAppHide((...args) => {
      appOptions.onHide.apply(app, args)
    })
  }
  if (isFn(appOptions.onLaunch)) {
    const args = __GLOBAL__.getLaunchOptionsSync && __GLOBAL__.getLaunchOptionsSync()
    appOptions.onLaunch.call(app, args)
  }
  return vm
}
