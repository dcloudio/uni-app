import { UniElement } from '../../helpers/UniElement'

// 逻辑类型；运行时宿主保持 HTMLInputElement 的原型、value、focus 和 blur。
export class UniInputElement extends UniElement {
  declare value: string

  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniInputElement &&
        (value as Element | null)?.nodeType === 1 &&
        (value as Element).localName === 'input' &&
        (value as Element).hasAttribute('uni-input')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}
