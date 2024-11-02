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

export function createCanvasContextAsync(options) {
  const query = wx.createSelectorQuery() // TODO .in(options.component)
  query
    .select('#' + options.id)
    .fields({ node: true })
    .exec((res) => {
      if (res.length > 0) {
        const canvas = res[0].node
        options.success?.(new CanvasContext(canvas))
      } else {
        const uniError = new UniError(
          'uni-createCanvasContextAsync',
          -1,
          'canvas id invalid.'
        )
        options.fail?.(uniError)
      }
      options.complete?.()
    })
}
