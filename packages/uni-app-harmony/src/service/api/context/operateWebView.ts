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
      evalJs(jsCode: any) {
        operateWebView(id, pageId, 'evalJs', {
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
    }
  } else {
    UniServiceJSBridge.emit(ON_ERROR, 'createWebviewContext:fail')
  }
}
