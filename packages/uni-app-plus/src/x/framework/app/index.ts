import { ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'
import { formatLog } from '@dcloudio/uni-shared'
import {
  // initAppVm,
  // initService,
  defineGlobalData,
} from '@dcloudio/uni-core'

// import { initEntry } from './initEntry'
// import { initTabBar } from './initTabBar'
import { initGlobalEvent } from './initGlobalEvent'
import { initAppLaunch } from './initAppLaunch'
// import { clearTempFile } from './clearTempFile'
import { initSubscribeHandlers } from './subscriber'
import { initVueApp } from '../../../service/framework/app/vueApp'
import { IApp } from '@dcloudio/uni-app-x/types/native'
// import { initKeyboardEvent } from '../dom/keyboard'

let appCtx: ComponentPublicInstance
const defaultApp = {
  globalData: {},
}

function initAppVm(appVm: ComponentPublicInstance) {
  appVm.$vm = appVm
  appVm.$mpType = 'app'
  // TODO uni-app x useI18n
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

let nativeApp: IApp

export function getNativeApp() {
  return nativeApp
}

export function registerApp(appVm: ComponentPublicInstance, app: IApp) {
  if (__DEV__) {
    console.log(formatLog('registerApp'))
  }

  nativeApp = app

  // // 定制 useStore （主要是为了 nvue 共享）
  // if ((uni as any).Vuex && (appVm as any).$store) {
  //   const { useStore } = (uni as any).Vuex
  //     ; (uni as any).Vuex.useStore = (key: string) => {
  //       if (!key) {
  //         return (appVm as any).$store
  //       }
  //       return useStore(key)
  //     }
  // }

  initVueApp(appVm)

  appCtx = appVm
  initAppVm(appCtx)

  extend(appCtx, defaultApp) // 拷贝默认实现

  defineGlobalData(appCtx, defaultApp.globalData)

  // initService()

  // initEntry()
  // initTabBar()
  initGlobalEvent(app)
  // initKeyboardEvent()
  initSubscribeHandlers()

  initAppLaunch(appVm)

  // // 10s后清理临时文件
  // setTimeout(clearTempFile, 10000)

  __uniConfig.ready = true

  // nav
}
