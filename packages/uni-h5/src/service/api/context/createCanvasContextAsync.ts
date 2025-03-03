// TODO 临时拷贝 uni-app/api/uni-canvas
import type { UniCanvasElement } from '@dcloudio/uni-app-x/types/native'

import type {
  CanvasContext,
  CanvasContextToBlobCallback,
  CreateCanvasContextAsyncOptions,
  RequestAnimationFrameCallback,
} from '@dcloudio/uni-app-x/types/uni'
import type {
  SelectorQueryNodeInfo,
  SelectorQueryRequest,
} from '@dcloudio/uni-api'
import { getRealPath } from '@dcloudio/uni-platform'
import { getCurrentBasePages } from '../../../framework/setup/page'
import { requestComponentInfo } from '../ui/requestComponentInfo'
import { type ComponentPublicInstance, nextTick } from 'vue'

// 不支持使用Proxy拦截
class CanvasImage extends Image {
  _src = ''

  constructor() {
    super()
  }

  get src() {
    return this._src
  }
  set src(value) {
    this._src = value
    super.src = getRealPath(value)
  }
}

class CanvasContextImpl implements CanvasContext {
  _element: UniCanvasElement

  constructor(element: UniCanvasElement) {
    this._element = element
  }

  getContext(type: string): CanvasRenderingContext2D | null {
    // TODO 待语法库更新后移除
    // @ts-expect-error
    return this._element.getContext(type)
  }

  toBlob(callback: CanvasContextToBlobCallback)
  toBlob(callback: CanvasContextToBlobCallback, type: string)
  toBlob(
    callback: CanvasContextToBlobCallback,
    type?: string,
    quality?: number
  ) {
    // TODO 待语法库更新后移除
    // @ts-expect-error
    this._element.toBlob(callback, type, quality)
  }

  toDataURL(): string
  toDataURL(type?: string, encoderOptions?: string): string {
    return this._element.toDataURL(type, encoderOptions)
  }

  // @ts-expect-error TODO 类型不匹配?
  createImage(): Image {
    return new CanvasImage()
  }

  createPath2D(): Path2D {
    return new Path2D()
  }

  requestAnimationFrame(callback: RequestAnimationFrameCallback): number {
    return window.requestAnimationFrame(callback)
  }

  cancelAnimationFrame(taskId: number): void {
    window.cancelAnimationFrame(taskId)
  }
}

export const createCanvasContextAsync = function (
  options: CreateCanvasContextAsyncOptions
) {
  nextTick(() => {
    const pages = getCurrentBasePages()
    const currentPage: ComponentPublicInstance =
      options.component ?? pages[pages.length - 1]
    requestComponentInfo(
      currentPage,
      [
        {
          component: currentPage,
          selector: '#' + options.id,
          single: true,
          fields: {
            node: true,
          },
        } as SelectorQueryRequest,
      ],
      (result: Array<SelectorQueryNodeInfo | null>) => {
        if (result.length > 0) {
          const canvas = result[0]!.node as UniCanvasElement
          options.success?.(new CanvasContextImpl(canvas))
        } else {
          const uniError = new UniError(
            'uni-createCanvasContextAsync',
            -1,
            'canvas id invalid.'
          )
          options.fail?.(uniError)
        }
        options.complete?.()
      }
    )
  })
}
