import { UniViewElement } from '../web-vapor-elements'

// 只提供逻辑类型与公开成员，根节点仍由模板创建，不构造或注册 Custom Element。
export class UniTextareaElement extends UniViewElement {
  declare value: string

  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniTextareaElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-textarea')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }

  focus(options?: FocusOptions): void {
    this.querySelector('textarea')?.focus(options)
  }
}

const descriptors: PropertyDescriptorMap = {
  uniTagName: { value: 'TEXTAREA' },
  focus: Object.getOwnPropertyDescriptor(
    UniTextareaElement.prototype,
    'focus'
  )!,
}

function setValue(this: HTMLElement, value: string) {
  this.querySelector('textarea')!.value = value
}

export function initTextareaElement(root: object, state: { value: string }) {
  Object.defineProperties(root, descriptors)
  // 保留旧 Textarea 的非对称语义：读取组件状态，赋值仅修改 DOM，不触发输入事件。
  // getter 每个实例创建一次；focus 和 setter 共享，并始终访问当前 textarea。
  Object.defineProperty(root, 'value', {
    get: () => state.value,
    set: setValue,
  })
}
