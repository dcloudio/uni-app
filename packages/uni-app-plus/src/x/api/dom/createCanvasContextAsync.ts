import { defineAsyncApi } from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'
import { getCurrentPage } from '@dcloudio/uni-core'
import { isVueComponent } from './createSelectorQuery'
export type {
  CreateCanvasContextAsyncSuccessCallback,
  CreateCanvasContextAsyncFailCallback,
  CreateCanvasContextAsyncCompleteCallback,
  CreateCanvasContextAsyncOptions,
} from '@dcloudio/uni-app-x/types/uni'
import type {
  UniImageElement as IImage,
  Path2D as IPath2D,
} from '@dcloudio/uni-app-x/types/native'

import type {
  CanvasContext,
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

    function createImage(): IImage {
      return new Image() as unknown as IImage
    }

    function createPath2D(): IPath2D {
      return new Path2D()
    }

    function requestAnimationFrameFun(
      callback: RequestAnimationFrameCallback
    ): number {
      return requestAnimationFrame(callback)
    }
    function cancelAnimationFrameFun(taskId: number) {
      cancelAnimationFrame(taskId)
    }

    resolve({
      getContext: element.getContext.bind(element),
      toDataURL: element.toDataURL.bind(element),
      createImage: createImage,
      createPath2D: createPath2D,
      requestAnimationFrame: requestAnimationFrameFun,
      cancelAnimationFrame: cancelAnimationFrameFun,
    } as CanvasContext)
  }
)
