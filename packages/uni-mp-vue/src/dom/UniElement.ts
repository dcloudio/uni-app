import type { ComponentPublicInstance } from 'vue'
import { UniCSSStyleDeclaration } from './UniCSSStyleDeclaration'

export interface UniElementConstructor {
  new (id: string, tagName: string): UniElement
  $vm: ComponentPublicInstance
}

export class UniElement {
  // 跳过vue的响应式
  __v_skip = true
  id: string
  nodeName: string
  tagName: string
  style: UniCSSStyleDeclaration = new UniCSSStyleDeclaration()
  $vm!: ComponentPublicInstance
  $node?: {
    then: (fn: (node: any) => void) => void
  }

  constructor(id: string, name: string) {
    this.id = id
    this.tagName = name.toUpperCase()
    this.nodeName = this.tagName
  }

  scrollTo(options: unknown) {
    if (this.$node) {
      this.$node.then((node) => {
        node.scrollTo(options)
      })
    } else {
      console.warn(`scrollTo is only supported on scroll-view`)
    }
  }

  getBoundingClientRectAsync(callback) {
    // TODO defineAsyncApi?
    if (callback) {
      this._getBoundingClientRectAsync((domRect) => {
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
      })
      return
    }
    return new Promise((resolve, reject) => {
      this._getBoundingClientRectAsync(resolve)
    })
  }

  _getBoundingClientRectAsync(callback) {
    const query = uni.createSelectorQuery().in(this.$vm)
    query.select('#' + this.id).boundingClientRect()
    query.exec(function (res) {
      callback(res[0])
    })
  }

  $onStyleChange(callback: (styles: Record<string, string | null>) => void) {
    this.style.$onChange(callback)
  }

  getAttribute(name: string) {
    switch (name) {
      case 'id':
        return this.id
      case 'style':
        return this.style.cssText
      default:
        console.warn(
          `Miniprogram does not support UniElement.getAttribute(${name})`
        )
        return null
    }
  }

  setAttribute(name: string, value: string) {
    console.warn(
      `Miniprogram does not support UniElement.setAttribute(${name}, value)`
    )
  }

  $destroy() {
    this.style.$destroy()
    // @ts-expect-error
    this.style = null
  }
}
