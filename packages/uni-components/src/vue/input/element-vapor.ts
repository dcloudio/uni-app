import { UniViewElement } from '../web-vapor-elements'

// 只提供逻辑类型与公开成员，根节点仍由模板创建，不构造或注册 Custom Element。
export class UniInputElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniInputElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-input')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }

  focus(options?: FocusOptions): void {
    this.querySelector('input')?.focus(options)
  }

  get value(): string {
    return this.querySelector('input')!.value
  }

  set value(value: string) {
    this.querySelector('input')!.value = value
  }
}

// 仅安装明确的公开成员，描述符按类型共享；不捕获组件状态，也不复制旧类的属性拦截。
// 每次访问当前 input，兼容 disabled 修复分支、搜索表单等场景替换内部节点。
const descriptors: PropertyDescriptorMap = {
  uniTagName: { value: 'INPUT' },
  focus: Object.getOwnPropertyDescriptor(UniInputElement.prototype, 'focus')!,
  value: Object.getOwnPropertyDescriptor(UniInputElement.prototype, 'value')!,
}

export function initInputElement(root: object) {
  Object.defineProperties(root, descriptors)
}
