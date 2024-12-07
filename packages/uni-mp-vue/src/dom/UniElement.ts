import type { ComponentPublicInstance } from 'vue'
import { UniCSSStyleDeclaration } from './UniCSSStyleDeclaration'

export interface UniElementConstructor {
  new (id: string, tagName: string): UniElement
  $vm: ComponentPublicInstance
}

/**
 * event.target、event.currentTarget也是UniElement实例，可能不含id
 */

export class UniElement {
  // 跳过vue的响应式
  __v_skip = true
  id: string
  nodeName: string
  tagName: string
  style: UniCSSStyleDeclaration = new UniCSSStyleDeclaration()
  dataset: WechatMiniprogram.IAnyObject = {}
  offsetTop = NaN
  offsetLeft = NaN
  $vm!: ComponentPublicInstance
  $node?: {
    then: (fn: (node: any) => void) => void
  }

  constructor(id: string = '', name: string = '') {
    this.id = id
    this.tagName = name.toUpperCase()
    this.nodeName = this.tagName
  }

  scrollTo(options: unknown) {
    if (!this.id) {
      console.warn(`scrollTo is only supported on elements with id`)
      return
    }
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
      if (!this.id) {
        console.warn(
          `getBoundingClientRectAsync is not supported on elements without id`
        )
        try {
          callback.fail?.()
        } catch (error) {
          console.error(error)
        }
        try {
          callback.complete?.()
        } catch (error) {
          console.error(error)
        }
        return
      }
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
    if (!this.id) {
      console.warn(
        `getBoundingClientRectAsync is not supported on elements without id`
      )
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      this._getBoundingClientRectAsync(resolve)
    })
  }

  _getBoundingClientRectAsync(callback) {
    const query = uni.createSelectorQuery().in(this.$vm)
    query.select('#' + this.id).boundingClientRect()
    query.exec((res) => {
      this._fixDomRectXY(res[0])
      callback(res[0])
    })
  }

  _fixDomRectXY(node: any) {
    if (node.x == undefined) {
      if (node.width >= 0) {
        node.x = node.left
      } else {
        node.x = node.left - node.width
      }
    }
    if (node.y == undefined) {
      if (node.height >= 0) {
        node.y = node.top
      } else {
        node.y = node.top - node.height
      }
    }
  }

  $onStyleChange(callback: (styles: Record<string, string | null>) => void) {
    this.style.$onChange(callback)
  }

  getAttribute(name: string) {
    if (!this.id) {
      console.warn(
        `getAttribute(${name}) is not supported on UniElement without id`
      )
      return null
    }
    switch (name) {
      case 'id':
        return this.id
      case 'style':
        return this.style.cssText
      default:
        console.warn(
          `getAttribute(${name}) is not supported on UniElement in miniprogram`
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
    if (this.style) {
      // 内置组件的Element可能会被执行两次销毁，因为../helpers/uniElement.ts的SetUniElementIdTagType.BuiltInRootElement会被同时设置到父组件内
      // 子组件和父组件的销毁时，均会调用$destroy
      this.style.$destroy()
      // @ts-expect-error
      this.style = null
    }
  }
}
