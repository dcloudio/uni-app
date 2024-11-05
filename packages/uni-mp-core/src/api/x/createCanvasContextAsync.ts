import { defineAsyncApi } from '@dcloudio/uni-api/src/helpers/api'
export const API_CREATE_CANVAS_CONTEXT_ASYNC = 'createCanvasContextAsync'

class CanvasContext {
  _element: any

  constructor(element) {
    this._element = element
  }

  getContext(type: string): any | null {
    return this._element.getContext(type)
  }

  toDataURL(type: string, encoderOptions: any): string {
    return this._element.toDataURL(type, encoderOptions)
  }

  createImage() {
    return this._element.createImage()
  }

  createImageData() {
    return this._element.createImageData()
  }

  createPath2D() {
    return this._element.createPath2D()
  }

  requestAnimationFrame(callback): number {
    return this._element.requestAnimationFrame(callback)
  }

  cancelAnimationFrame(taskId: number) {
    this._element.cancelAnimationFrame(taskId)
  }
}

export const createCanvasContextAsync = defineAsyncApi(
  API_CREATE_CANVAS_CONTEXT_ASYNC,
  (options: any, { resolve, reject }) => {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (!page || !page.$vm) {
      reject('current page invalid.')
    } else {
      // TODO wx.?
      const query = options.component
        ? wx.createSelectorQuery().in(options.component)
        : wx.createSelectorQuery()
      query
        .select('#' + options.id)
        .fields({ node: true }, () => {})
        .exec((res) => {
          if (res.length > 0) {
            const canvas = res[0].node
            resolve(new CanvasContext(canvas))
          } else {
            reject('canvas id invalid.')
          }
        })
    }
  }
)
