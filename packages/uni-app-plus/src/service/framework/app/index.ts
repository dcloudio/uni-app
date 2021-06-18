import { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'

import { initEntry } from './initEntry'
import { initTabBar } from './initTabBar'
import { initGlobalEvent } from './initGlobalEvent'

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
}
