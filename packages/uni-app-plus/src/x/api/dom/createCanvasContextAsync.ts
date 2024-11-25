import { defineAsyncApi } from '@dcloudio/uni-api'
import { getCurrentPage } from '@dcloudio/uni-core'
import { createSelectorQuery } from './createSelectorQuery'
export type {
  CreateCanvasContextAsyncSuccessCallback,
  CreateCanvasContextAsyncFailCallback,
  CreateCanvasContextAsyncCompleteCallback,
  CreateCanvasContextAsyncOptions,
} from '@dcloudio/uni-app-x/types/uni'
import type {
  // CanvasRenderingContext2D as ICanvasRenderingContext2D,
  UniImageElement as IImage,
  // Path2D as IPath2D,
} from '@dcloudio/uni-app-x/types/native'

import type {
  CanvasContext,
  CanvasContextToBlobCallback,
  NodeInfo,
  RequestAnimationFrameCallback,
} from '@dcloudio/uni-app-x/types/uni'

declare global {
  // requestAnimationFrame
  function requestAnimationFrame(
    callback: RequestAnimationFrameCallback
  ): number
  function cancelAnimationFrame(taskId: number): void
  const __uniappx__: any
}

class CanvasContextImpl implements CanvasContext {
  _element: UniCanvasElement

  constructor(element: UniCanvasElement) {
    this._element = element
  }

  // @ts-expect-error 类型不匹配
  getContext(contextType: string) {
    return this._element.getContext(contextType) //as unknown as CanvasRenderingContext2D
  }

  toBlob(
    callback: CanvasContextToBlobCallback,
    type?: string,
    quality?: number
  ): void {
    throw new Error('Method not implemented.')
  }

  toDataURL(type?: string, quality?: number): string {
    return this._element.toDataURL(type, quality)
  }

  createImage(): IImage {
    return new Image() as unknown as IImage
  }

  createPath2D() {
    return new Path2D() //as unknown as Path2D
  }

  requestAnimationFrame(callback: RequestAnimationFrameCallback): number {
    return requestAnimationFrame(callback)
  }
  cancelAnimationFrame(taskId: number) {
    cancelAnimationFrame(taskId)
  }
}

export const createCanvasContextAsync = defineAsyncApi(
  'createCanvasContextAsync',
  (options: any, { resolve, reject }) => {
    const page = (getCurrentPage() as unknown as UniPage).vm
    if (page == null) {
      return null
    }

    // onMounted fix issues13212
    createSelectorQuery()
      .select('#' + options.id)
      .fields(
        {
          node: true,
        },
        (ret: NodeInfo) => {
          const node = ret.node
          if (node != null) {
            resolve(new CanvasContextImpl(node as UniCanvasElement))
          } else {
            const uniError = new UniError(
              'uni-createCanvasContextAsync',
              -1,
              'canvas id invalid.'
            )
            reject(uniError.errMsg)
          }
        }
      )
      .exec()
  }
)
