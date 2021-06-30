import { isArray } from '@vue/shared'
import { VIEW_WEBVIEW_PATH } from '../constants'
import { genWebviewId } from './utils'

export let preloadWebview: PlusWebviewWebviewObject

export function setPreloadWebview(webview: PlusWebviewWebviewObject) {
  preloadWebview = webview
}

export function createPreloadWebview() {
  if (!preloadWebview || (preloadWebview as any).__uniapp_route) {
    // 不存在，或已被使用
    preloadWebview = plus.webview.create(
      VIEW_WEBVIEW_PATH,
      String(genWebviewId())
    )
    if (__DEV__) {
      console.log(`[uni-app] preloadWebview[${preloadWebview.id}]`)
    }
  }
  return preloadWebview
}

const webviewReadyCallbacks: Record<string, Function[]> = {}

export function registerWebviewReady(pageId: string, callback: Function) {
  ;(webviewReadyCallbacks[pageId] || (webviewReadyCallbacks[pageId] = [])).push(
    callback
  )
}

export function consumeWebviewReady(pageId: string) {
  const callbacks = webviewReadyCallbacks[pageId]
  isArray(callbacks) && callbacks.forEach((callback) => callback())
  delete webviewReadyCallbacks[pageId]
}
