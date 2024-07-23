import { defineAsyncApi } from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'
import { getCurrentPage } from '@dcloudio/uni-core'

// type API_TYPE_CREATE_CANVAS_CONTEXT_ASYNC = typeof uni.createCanvasContext

type CreateCanvasContextAsyncSuccessCallback = any
type CreateCanvasContextAsyncFailCallback = any
type CreateCanvasContextAsyncCompleteCallback = any

export type CreateCanvasContextAsyncOptions = {
  /**
   * canvas 元素的 id 属性
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *        "osVer": "5.0",
   *        "uniVer": "x",
   *        "unixVer": "4.25"
   *      },
   *      "ios": {
   *          "osVer": "10.0",
   *          "uniVer": "x",
   *          "unixVer": "4.25"
   *      }
   *  },
   *  "web": {
   *      "uniVer": "x",
   *      "unixVer": "4.25"
   *  }
   * }
   */
  id: string.IDString
  /**
   * 组件或页面实例
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *        "osVer": "5.0",
   *        "uniVer": "x",
   *        "unixVer": "4.25"
   *      },
   *      "ios": {
   *          "osVer": "10.0",
   *          "uniVer": "x",
   *          "unixVer": "4.25"
   *      }
   *  },
   *  "web": {
   *      "uniVer": "x",
   *      "unixVer": "4.25"
   *  }
   * }
   */
  component?: ComponentPublicInstance
  /**
   * 接口调用成功的回调函数
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *        "osVer": "5.0",
   *        "uniVer": "x",
   *        "unixVer": "4.25"
   *      },
   *      "ios": {
   *          "osVer": "10.0",
   *          "uniVer": "x",
   *          "unixVer": "4.25"
   *      }
   *  },
   *  "web": {
   *      "uniVer": "x",
   *      "unixVer": "4.25"
   *  }
   * }
   */
  success?: CreateCanvasContextAsyncSuccessCallback
  /**
   * 接口调用失败的回调函数
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *        "osVer": "5.0",
   *        "uniVer": "x",
   *        "unixVer": "4.25"
   *      },
   *      "ios": {
   *          "osVer": "10.0",
   *          "uniVer": "x",
   *          "unixVer": "4.25"
   *      }
   *  },
   *  "web": {
   *      "uniVer": "x",
   *      "unixVer": "4.25"
   *  }
   * }
   */
  fail?: CreateCanvasContextAsyncFailCallback
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *        "osVer": "5.0",
   *        "uniVer": "x",
   *        "unixVer": "4.25"
   *      },
   *      "ios": {
   *          "osVer": "10.0",
   *          "uniVer": "x",
   *          "unixVer": "4.25"
   *      }
   *  },
   *  "web": {
   *      "uniVer": "√",
   *      "unixVer": "4.25"
   *  }
   * }
   */
  complete?: CreateCanvasContextAsyncCompleteCallback
}

export interface CanvasContext {
  getContext(type: string): CanvasRenderingContext2D
  // toBlob(callback: any): void
}
function isVueComponent(comp: any) {
  const has$instance = typeof comp.$ === 'object'
  const has$el = typeof comp.$el === 'object'

  return has$instance && has$el
}

export const createCanvasContextAsync = defineAsyncApi(
  'createCanvasContextAsync',
  (options: any, { resolve, reject }) => {
    const page = getCurrentPage() as ComponentPublicInstance
    if (page == null) {
      return null
    }
    let bodyNode = page.$el?.parentNode as UniElement
    if (bodyNode == null) {
      reject('bodyNode is null')
      return null
    }
    if (!options.id) {
      reject('id is null')
      return null
    }

    let component: ComponentPublicInstance | null = null

    if (options.component && isVueComponent(options.component)) {
      component = options.component

      const el = component!.$el as UniElement
      if (el != null) {
        bodyNode = el.parentNode as UniElement
      }
    }

    const element = bodyNode.querySelector(`#${options.id}`) as UniCanvasElement
    if (!element) {
      reject('element is null')
      return null
    }

    resolve({
      getContext: element.getContext.bind(element),
    })
  }
)
