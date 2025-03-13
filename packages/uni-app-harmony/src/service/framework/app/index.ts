import type { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'
import { formatLog } from '@dcloudio/uni-shared'
import { defineGlobalData, initAppVm, initService } from '@dcloudio/uni-core'
import { initVueApp } from '@dcloudio/uni-app-plus/service/framework/app/vueApp'
import { initSubscribeHandlers } from './subscriber'
import { initGlobalEvent } from './initGlobalEvent'
import { initAppLaunch } from './initAppLaunch'
import { initTabBar } from './initTabBar'
import { initEntry } from '@dcloudio/uni-app-plus/service/framework/app/initEntry'

let appCtx: ComponentPublicInstance
const defaultApp = {
  globalData: {},
}

export function getApp({ allowDefault = false } = {}) {
  if (appCtx) {
    // 真实的 App 已初始化
    return appCtx
  }
  if (allowDefault) {
    // 返回默认实现
    return defaultApp
  }
  console.error(
    '[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.'
  )
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

  initEntry()

  initTabBar()

  initGlobalEvent()

  initSubscribeHandlers()

  initAppLaunch(appVm)

  // TODO clearTempFile

  __uniConfig.ready = true
}
