// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { initUniElement } from 'vue'
import { UniElement } from '../../helpers/UniElement'

// 逻辑类型；运行时宿主保持 HTMLInputElement 的原型、value、focus 和 blur。
export class UniInputElement extends UniElement {
  declare value: string

  static [Symbol.hasInstance](value: unknown): boolean {
    const el = value as Element | null | undefined
    return (
      (this === UniInputElement &&
        el?.nodeType === 1 &&
        el.localName === 'input' &&
        el.hasAttribute('uni-input')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

const uniTagName = { value: 'INPUT' }

export function initInputElement(root: Element) {
  initUniElement(root, uniTagName)
}
