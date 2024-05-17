import type { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'
import { formatLog } from '@dcloudio/uni-shared'
import { defineGlobalData, initService } from '@dcloudio/uni-core'
import { initVueApp } from '@dcloudio/uni-app-plus/service/framework/app/vueApp'
import { initSubscribeHandlers } from './subscriber'
import { initGlobalEvent } from './initGlobalEvent'
import { initAppLaunch } from './initAppLaunch'

let appCtx: ComponentPublicInstance
const defaultApp = {
  globalData: {},
}

function initAppVm(appVm: ComponentPublicInstance) {
  appVm.$vm = appVm
  appVm.$mpType = 'app'
  // TODO useI18n
}

export function registerApp(appVm: ComponentPublicInstance) {
  if (__DEV__) {
    console.log(formatLog('registerApp'))
  }

  // TODO 定制 useStore

  initVueApp(appVm)

  appCtx = appVm
  initAppVm(appCtx)

  extend(appCtx, defaultApp) // 拷贝默认实现

  defineGlobalData(appCtx, defaultApp.globalData)

  initService()

  initGlobalEvent()

  initSubscribeHandlers()

  initAppLaunch(appVm)

  // TODO clearTempFile

  __uniConfig.ready = true
}
