import type { ComponentPublicInstance } from 'vue'
import { getPageIdByVm } from '@dcloudio/uni-core'
import { ON_ERROR } from '@dcloudio/uni-shared'

export function operateWebView(
  id: string,
  pageId: number,
  type: string,
  data?: unknown,
  operateMapCallback?: (res: any) => void
) {
  UniServiceJSBridge.invokeViewMethod(
    'webview.' + id,
    {
      type,
      data,
    },
    pageId,
    operateMapCallback
  )
}

// TODO 完善类型定义，规范化。目前非uni-app-x仅鸿蒙支持
export function createWebviewContext(
  id: string,
  componentInstance: ComponentPublicInstance
) {
  const pageId = getPageIdByVm(componentInstance)
  if (pageId) {
    return {
      evalJS(jsCode: any) {
        operateWebView(id, pageId, 'evalJS', {
          jsCode,
        })
      },
      evalJs(jsCode: any) {
        console.warn(
          'The method evalJs is deprecated, please use evalJS instead'
        )
        operateWebView(id, pageId, 'evalJS', {
          jsCode,
        })
      },
      back() {
        operateWebView(id, pageId, 'back')
      },
      forward() {
        operateWebView(id, pageId, 'forward')
      },
      reload() {
        operateWebView(id, pageId, 'reload')
      },
      stop() {
        operateWebView(id, pageId, 'stop')
      },
      canBack(callback: (res: any) => void) {
        operateWebView(id, pageId, 'canBack', {}, (canBack) =>
          callback?.({ canBack })
        )
      },
      canForward(callback: (res: any) => void) {
        operateWebView(id, pageId, 'canForward', {}, (canForward) =>
          callback?.({ canForward })
        )
      },
      loadUrl(options: any) {
        operateWebView(id, pageId, 'loadUrl', {
          url: options.url,
          headers: options.headers ?? [],
        })
      },
      loadData(options: any) {
        operateWebView(id, pageId, 'loadData', {
          data: options.data,
          mimeType: options.mimeType ?? 'text/html',
          encoding: options.encoding ?? 'UTF-8',
          baseUrl: options.baseUrl ?? '',
        })
      },
      getContentHeight(callback: (res: any) => void) {
        operateWebView(id, pageId, 'getContentHeight', {}, (height) =>
          callback?.({ height })
        )
      },
      clear() {
        operateWebView(id, pageId, 'clear', { clearRom: true })
      },
    }
  } else {
    UniServiceJSBridge.emit(ON_ERROR, 'createWebviewContext:fail')
  }
}
