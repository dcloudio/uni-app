declare global {
  // 必须补充 new 构造器，后续支持了 new String()，就应该不需要了，不然 vue 的 PropType 会报错 { type: String, default: '' }
  interface StringConstructor {
    new (value?: any): String
    (value?: any): string
    readonly prototype: String
  }
  interface ArrayConstructor {
    new (arrayLength?: number): any[]
    new <T>(arrayLength: number): T[]
    new <T>(...items: T[]): T[]
    (arrayLength?: number): any[]
    <T>(arrayLength: number): T[]
    <T>(...items: T[]): T[]
    readonly prototype: any[]
  }

  // @vue/runtime-core 中用到的
  const NodeMarker: unique symbol
  interface Node {
    [NodeMarker]: true
  }
  var Node: {
    prototype: Node
    new (): Node
  }
  interface Element extends Node {}
  var Element: {
    prototype: Element
    new (): Element
  }
  interface ShadowRoot {}
  var ShadowRoot: {
    prototype: ShadowRoot
    new (): ShadowRoot
  }
  interface HTMLElementEventMap {}
  interface HTMLElementTagNameMap {}

  const EventMarker: unique symbol
  interface Event {
    [EventMarker]: true
  }
  var Event: {
    prototype: Event
    new (type: string): Event
  }
  interface KeyboardEvent extends Event {}
  var KeyboardEvent: {
    prototype: KeyboardEvent
    new (type: string): KeyboardEvent
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $callMethod(method: string, ...args: Array<any | null>): any | null
  }
}

export {}
