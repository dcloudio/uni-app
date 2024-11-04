import { UniCSSStyleDeclaration } from './UniCSSStyleDeclaration'

export class UniElement {
  id: string
  nodeName: string
  tagName: string
  style: UniCSSStyleDeclaration = new UniCSSStyleDeclaration()

  constructor(id: string, name: string) {
    this.id = id
    this.tagName = name.toUpperCase()
    this.nodeName = this.tagName
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
