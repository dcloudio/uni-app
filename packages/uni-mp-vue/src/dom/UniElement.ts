import type { ComponentPublicInstance } from 'vue'
import { UniCSSStyleDeclaration } from './UniCSSStyleDeclaration'

export class UniElement {
  id: string
  nodeName: string
  tagName: string
  style: UniCSSStyleDeclaration = new UniCSSStyleDeclaration()
  $vm: ComponentPublicInstance

  constructor(id: string, name: string, vm: ComponentPublicInstance) {
    this.id = id
    this.tagName = name.toUpperCase()
    this.nodeName = this.tagName
    this.$vm = vm
  }

  getBoundingClientRectAsync() {
    return new Promise((resolve, reject) => {
      const query = uni.createSelectorQuery().in(this.$vm)
      query.select('#' + this.id).boundingClientRect()
      query.exec(function (res) {
        resolve(res[0])
      })
    })
  }

  $onStyleChange(callback: (styles: Record<string, string | null>) => void) {
    this.style.$onChange(callback)
  }

  $destroy() {
    this.style.$destroy()
    // @ts-expect-error
    this.style = null
  }
}
