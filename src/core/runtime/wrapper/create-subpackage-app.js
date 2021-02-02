import 'uni-platform/runtime/index'

import {
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
  return vm
}
