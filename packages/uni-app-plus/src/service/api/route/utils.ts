import { getRouteMeta } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import type { ComponentPublicInstance } from 'vue'
import { removePage } from '../../framework/page/getCurrentPages'
import {
  createPreloadWebview,
  onWebviewReady,
  preloadWebview,
} from '../../framework/webview'
import { closeWebview } from './webview'

export interface RouteOptions {
  url: string
  path: string
  query: Record<string, any>
}
interface PendingNavigator {
  path: string
  nvue?: boolean
  callback: Function
}

let pendingNavigator: PendingNavigator | false = false

function setPendingNavigator(path: string, callback: Function, msg: string) {
  pendingNavigator = {
    path,
    nvue: getRouteMeta(path)!.isNVue,
    callback,
  }
  if (__DEV__) {
    console.log(formatLog('setPendingNavigator', path, msg))
  }
}

export function closePage(
  page: ComponentPublicInstance,
  animationType: string,
  animationDuration?: number
) {
  removePage(page)
  closeWebview(page.$getAppWebview!(), animationType, animationDuration)
}

export function navigate(
  path: string,
  callback: Function,
  isAppLaunch: boolean = false
) {
  if (!isAppLaunch && pendingNavigator) {
    return console.error(
      `Waiting to navigate to: ${pendingNavigator.path}, do not operate continuously: ${path}.`
    )
  }
  if (__uniConfig.renderer === 'native') {
    // 纯原生无需wait逻辑
    // 如果是首页还未初始化，需要等一等，其他无需等待
    if (getCurrentPages().length === 0) {
      return setPendingNavigator(path, callback, 'waitForReady')
    }
    return callback()
  }
  // 未创建 preloadWebview 或 preloadWebview 已被使用
  const waitPreloadWebview =
    !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route)
  // 已创建未 loaded
  const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded

  if (waitPreloadWebview || waitPreloadWebviewReady) {
    setPendingNavigator(
      path,
      callback,
      waitPreloadWebview ? 'waitForCreate' : 'waitForReady'
    )
  } else {
    callback()
  }
  if (waitPreloadWebviewReady) {
    onWebviewReady(preloadWebview.id!, pendingNavigate)
  }
}

function pendingNavigate() {
  if (!pendingNavigator) {
    return
  }
  const { callback } = pendingNavigator
  if (__DEV__) {
    console.log(formatLog('pendingNavigate', pendingNavigator.path))
  }
  pendingNavigator = false
  return callback()
}

export function navigateFinish() {
  if (__uniConfig.renderer === 'native') {
    if (!pendingNavigator) {
      return
    }
    if (pendingNavigator.nvue) {
      return pendingNavigate()
    }
    return
  }
  // 创建预加载
  const preloadWebview = createPreloadWebview()
  if (__DEV__) {
    console.log(
      formatLog('navigateFinish', 'preloadWebview', preloadWebview.id)
    )
  }
  if (!pendingNavigator) {
    return
  }
  if (pendingNavigator.nvue) {
    return pendingNavigate()
  }
  preloadWebview.loaded
    ? pendingNavigator.callback()
    : onWebviewReady(preloadWebview.id!, pendingNavigate)
}
