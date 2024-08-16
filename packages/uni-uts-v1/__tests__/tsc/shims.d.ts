declare global {
  interface SymbolConstructor {
    /**
     * A method that returns the default async iterator for an object. Called by the semantics of
     * the for-await-of statement.
     */
    readonly asyncIterator: unique symbol
  }
  interface SymbolConstructor {
    /**
     * A regular expression method that matches the regular expression against a string. Called
     * by the String.prototype.matchAll method.
     */
    readonly matchAll: unique symbol
  }
  interface File {}
  var File: {
    prototype: File
    new (): File
  }

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

  interface KeyboardEvent extends Event {}
  var KeyboardEvent: {
    prototype: KeyboardEvent
    new (type: string): KeyboardEvent
  }

  interface HTMLElement extends Element {
    // 因为 uni-api 用到了 document.createElement('a').href
    href: string
    origin: string
    // 因为 uni-api 用到了 document.createElement('canvas').getContext()
    getContext(args: any): any
  }
  var HTMLElement: {
    prototype: HTMLElement
    new (): HTMLElement
  }
  interface MouseEvent {}
  interface FocusEvent {}

  interface Document {
    createElement(tagName: string): HTMLElement
  }
  var Document: {
    prototype: Document
    new (): Document
    parseHTMLUnsafe(html: string): Document
  }
  var document: Document
}

declare module '@vue/reactivity' {
  interface RefUnwrapBailTypes {
    runtimeDOMBailTypes: Node
  }
}

// 仅为测试服务
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // globalStr: string
  }
}

export {}
