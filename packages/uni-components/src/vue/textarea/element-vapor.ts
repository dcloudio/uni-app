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

// 当前公开根是外层 div，需将 focus 转发到内部 textarea；描述符按类型共享。
// 若将来根节点直接使用原生 textarea，应移除 focus 转发及其描述符安装，使用原生能力；
// uniTagName 和 instanceof 的逻辑身份适配需按新的根结构处理，不能随转发逻辑一起删除。
// 整体标记这段无副作用的初始化，避免类原型读取阻止未使用的组件被裁剪。
const descriptors: PropertyDescriptorMap = /*#__PURE__*/ (() => ({
  uniTagName: { value: 'TEXTAREA' },
  focus: Object.getOwnPropertyDescriptor(
    UniTextareaElement.prototype,
    'focus'
  )!,
}))()

function setValue(this: HTMLElement, value: string) {
  this.querySelector('textarea')!.value = value
}

export function initTextareaElement(root: object, state: { value: string }) {
  Object.defineProperties(root, descriptors)
  // 保留旧 Textarea 的非对称语义：读取组件状态，赋值仅修改 DOM，不触发输入事件。
  // getter 每个实例创建一次；focus 和 setter 共享，并始终访问当前 textarea。
  // 若改为原生 textarea 根，需先确认是否保留上述读写语义，不能直接删除 value 适配。
  Object.defineProperty(root, 'value', {
    get: () => state.value,
    set: setValue,
  })
}
