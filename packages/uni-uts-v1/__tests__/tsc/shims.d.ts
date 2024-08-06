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

export {}
