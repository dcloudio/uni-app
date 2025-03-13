import { defineAsyncApi } from '@dcloudio/uni-api/src/helpers/api'
export const API_CREATE_CANVAS_CONTEXT_ASYNC = 'createCanvasContextAsync'

class CanvasContext {
  // 跳过vue的响应式
  __v_skip = true

  _element: any
  _width = 0
  _height = 0

  constructor(element, width, height) {
    this._element = element
    this._width = width
    this._height = height
  }

  getContext(type: string): any | null {
    const context = this._element.getContext(type)
    if (!context.canvas.offsetWidth || !context.canvas.offsetHeight) {
      Object.defineProperties(context.canvas, {
        offsetWidth: {
          value: this._width,
          writable: true,
        },
      })
      Object.defineProperties(context.canvas, {
        offsetHeight: {
          value: this._height,
          writable: true,
        },
      })
    }
    return context
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
      const query = options.component
        ? __GLOBAL__.createSelectorQuery().in(options.component)
        : __GLOBAL__.createSelectorQuery()
      query
        .select('#' + options.id)
        .fields({ node: true, size: true }, () => {})
        .exec((res) => {
          if (res.length > 0 && res[0].node) {
            const result = res[0]
            resolve(new CanvasContext(result.node, result.width, result.height))
          } else {
            reject('canvas id invalid.')
          }
        })
    }
  }
)
