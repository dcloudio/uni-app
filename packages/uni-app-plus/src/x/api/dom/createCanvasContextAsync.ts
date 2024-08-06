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

export interface CanvasContext {
  getContext(type: string): CanvasRenderingContext2D
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
      toDataURL: element.toDataURL.bind(element),
      // @ts-expect-error waiting for uni-app-x type update
      createImage: element.createImage.bind(element),
    })
  }
)
