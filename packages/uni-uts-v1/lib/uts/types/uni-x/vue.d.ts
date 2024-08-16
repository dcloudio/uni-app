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
    $exposed: Record<string, any | null>
    $callMethod(method: string, ...args: Array<any | null>): any | null
  }
  interface ComponentCustomOptions {
    onShow?(options: OnShowOptions): void
  }
  interface App<HostElement = any> {
    mixin(mixin: unknown): void
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
