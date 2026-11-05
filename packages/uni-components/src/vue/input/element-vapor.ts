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

// 当前公开根是外层 div，需将 focus/value 转发到内部 input；描述符按类型共享。
// 每次访问当前 input，兼容 disabled 修复分支、搜索表单等场景替换内部节点。
// 若将来根节点直接使用原生 input，应移除 focus/value 转发及其描述符安装，使用原生能力；
// uniTagName 和 instanceof 的逻辑身份适配需按新的根结构处理，不能随转发逻辑一起删除。
// 整体标记这段无副作用的初始化，避免类原型读取阻止未使用的组件被裁剪。
const descriptors: PropertyDescriptorMap = /*#__PURE__*/ (() => ({
  uniTagName: { value: 'INPUT' },
  focus: Object.getOwnPropertyDescriptor(UniInputElement.prototype, 'focus')!,
  value: Object.getOwnPropertyDescriptor(UniInputElement.prototype, 'value')!,
}))()

export function initInputElement(root: object) {
  Object.defineProperties(root, descriptors)
}
