import { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'

import { initEntry } from './initEntry'
import { initTabBar } from './initTabBar'
import { initGlobalEvent } from './initGlobalEvent'
import { initAppLaunch } from './initAppLaunch'
import { clearTempFile } from './clearTempFile'
import { initSubscribeHandlers } from './initSubscribeHandlers'

let appCtx: ComponentPublicInstance
const defaultApp = {
  globalData: {},
}

export function registerApp(appVm: ComponentPublicInstance) {
  appCtx = appVm
  appCtx.$vm = appVm

  extend(appCtx, defaultApp) // 拷贝默认实现

  const { $options } = appVm
  if ($options) {
    appCtx.globalData = extend($options.globalData || {}, appCtx.globalData)
  }

  initEntry()
  initTabBar()
  initGlobalEvent()
  initSubscribeHandlers()

  initAppLaunch(appVm)

  // 10s后清理临时文件
  setTimeout(clearTempFile, 10000)

  __uniConfig.ready = true
}
