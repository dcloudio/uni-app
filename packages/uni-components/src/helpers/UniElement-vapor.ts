import { type UniDOMStringMap, getUniElementPage } from '@dcloudio/uni-shared'

// Vapor 使用原生宿主；dataset 由安装函数适配，基类只提供公共能力与类型。
export class UniElement extends HTMLElement {
  declare readonly dataset: UniDOMStringMap

  getPage() {
    return getUniElementPage<UniPage>(this)
  }
  get uniPage() {
    return this.getPage()
  }

  getBoundingClientRectAsync(callback) {
    if (callback) {
      const domRect = this.getBoundingClientRect()
      try {
        callback.success?.(domRect)
      } catch (error) {
        console.error(error)
      }
      try {
        callback.complete?.(domRect)
      } catch (error) {
        console.error(error)
      }
      return
    }
    return new Promise((resolve, reject) => {
      const domRect = this.getBoundingClientRect()
      resolve(domRect)
    })
  }
}
