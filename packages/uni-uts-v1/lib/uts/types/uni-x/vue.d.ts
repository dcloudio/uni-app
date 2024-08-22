/// <reference path="./@vue/global.d.ts" />

declare global {
  const NodeMarker: unique symbol
  interface Node {
    [NodeMarker]: true
  }
  var Node: {
    prototype: Node
    new (): Node
  }

  interface ShadowRoot {}
  var ShadowRoot: {
    prototype: ShadowRoot
    new (): ShadowRoot
  }
  interface HTMLElementEventMap {}
  interface HTMLElementTagNameMap {}

  interface KeyboardEvent extends Event {}
  var KeyboardEvent: {
    prototype: KeyboardEvent
    new (type: string): KeyboardEvent
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    [key: string]: any
    $exposed: Record<string, any | null>
    $callMethod(method: string, ...args: Array<any | null>): any | null
  }
  interface ComponentCustomOptions {
    onShow?(options: OnShowOptions): void
  }

  type AnyThisFunction = (this: any, ...args: any[]) => any
  // 递归类型定义，将对象中的所有方法的 `this` 类型设置为 `any`
  type DeepObjectWithAnyThis<T> = {
    [K in keyof T]: K extends 'components'
      ? T[K] // 保持 `components` 属性的原始类型
      : T[K] extends Function
      ? AnyThisFunction
      : T[K] extends object
      ? DeepObjectWithAnyThis<T[K]> // 递归处理嵌套对象
      : T[K]
  }
  function deepObjectWithAnyThis<T>(object: T): DeepObjectWithAnyThis<T>
  interface App<HostElement = any> {
    mixin<T>(mixin: DeepObjectWithAnyThis<T>): this
  }
}

declare module '@vue/reactivity' {
  interface RefUnwrapBailTypes {
    utsBailTypes: UTSJSONObject
  }
}

declare global {
  // 辅助类型，用于提取插槽的 props 类型
  type SlotPropsType<T = any> = T extends (...args: any) => any
    ? Parameters<T>[0]
    : any
}
export {}
