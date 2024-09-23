import type { App, ComponentPublicInstance } from 'vue'
import { extend } from '@vue/shared'
import { formatLog } from '@dcloudio/uni-shared'
import { defineGlobalData } from '@dcloudio/uni-core'

// import { initEntry } from './initEntry'
// import { initTabBar } from './initTabBar'
import { initGlobalEvent } from './initGlobalEvent'
import { initAppLaunch } from './initAppLaunch'
// import { clearTempFile } from './clearTempFile'
import { initSubscribeHandlers } from './subscriber'
import { initVueApp } from '../../../service/framework/app/vueApp'
import type { IApp } from '@dcloudio/uni-app-x/types/native'
import { initService } from './initService'
// import { initKeyboardEvent } from '../dom/keyboard'
import { setNativeApp } from './app'
import { initComponentInstance } from './initComponentInstance'
import type {
  NavigateToOptions,
  SwitchTabOptions,
} from '@dcloudio/uni-app-x/types/uni'
import type { UniApp } from '@dcloudio/uni-app-x/types/app'

let appCtx: ComponentPublicInstance
const defaultApp = {
  globalData: {},
}

class UniAppImpl implements UniApp {
  get vm() {
    return appCtx
  }
  get $vm() {
    return appCtx
  }
  get globalData() {
    return appCtx?.globalData || {}
  }
  getAndroidApplication() {
    return null
  }
}

let $uniApp = new UniAppImpl()

export const entryPageState = {
  isReady: false,
  handledBeforeEntryPageRoutes: false,
}
type NavigateToPage = {
  args: NavigateToOptions
  handler: {
    resolve: (res: void | AsyncApiRes<UniNamespace.NavigateToOptions>) => void
    reject: (errMsg?: string, errRes?: any) => void
  }
}
type SwitchTabPage = {
  args: SwitchTabOptions
  handler: {
    resolve: (res: void | AsyncApiRes<UniNamespace.SwitchTabOptions>) => void
    reject: (errMsg?: string, errRes?: any) => void
  }
}
type RedirectToPage = {
  args: { url: string; path: string; query: Record<string, any> }
  handler: {
    resolve: (res: void | AsyncApiRes<UniNamespace.RedirectToOptions>) => void
    reject: (errMsg?: string, errRes?: any) => void
  }
}
type ReLaunchPage = {
  args: { url: string }
  handler: {
    resolve: (res: void | AsyncApiRes<UniNamespace.ReLaunchOptions>) => void
    reject: (errMsg?: string, errRes?: any) => void
  }
}
export const navigateToPagesBeforeEntryPages: NavigateToPage[] = []
export const switchTabPagesBeforeEntryPages: SwitchTabPage[] = []
export const redirectToPagesBeforeEntryPages: RedirectToPage[] = []
export const reLaunchPagesBeforeEntryPages: ReLaunchPage[] = []

function initAppVm(appVm: ComponentPublicInstance) {
  appVm.$vm = appVm
  appVm.$mpType = 'app'
  // TODO uni-app x useI18n
}

export function getApp() {
  return $uniApp
}

/**
 * registerApp
 * @param appVm
 * @param nativeApp
 */
export function registerApp(appVm: ComponentPublicInstance, nativeApp: IApp) {
  if (__DEV__) {
    console.log(formatLog('registerApp'))
  }
  initEntryPagePath(nativeApp)

  setNativeApp(nativeApp)

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

  initService(nativeApp)

  // initEntry()
  // initTabBar()
  initGlobalEvent(nativeApp)
  // initKeyboardEvent()

  // onLaunch 触发时机 在 WebviewReady 之前
  initAppLaunch(appVm)
  initSubscribeHandlers()

  // // 10s后清理临时文件
  // setTimeout(clearTempFile, 10000)

  __uniConfig.ready = true

  // nav
}

export function initApp(app: App) {
  initComponentInstance(app)
}

function initEntryPagePath(app: IApp) {
  const redirectInfo = app.getRedirectInfo()
  const debugInfo = redirectInfo.get('debug')
  if (debugInfo) {
    const url = debugInfo.get('url')
    if (url && url != __uniConfig.entryPagePath) {
      __uniConfig.realEntryPagePath = __uniConfig.entryPagePath
      const [path, query] = url.split('?')
      __uniConfig.entryPagePath = path
      if (query) {
        __uniConfig.entryPageQuery = `?${query}`
      }
      return
    }
  }
  if (__uniConfig.conditionUrl) {
    __uniConfig.realEntryPagePath = __uniConfig.entryPagePath
    const conditionUrl = __uniConfig.conditionUrl
    const [path, query] = conditionUrl.split('?')
    __uniConfig.entryPagePath = path
    if (query) {
      __uniConfig.entryPageQuery = `?${query}`
    }
  }
}
