import { UniViewElement } from '../web-vapor-elements'

// 只提供逻辑类型，根节点仍是原生 div，不构造或注册 Custom Element。
export class UniScrollViewElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniScrollViewElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-scroll-view')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }
}

export function initScrollViewElement(root: object) {
  // ListView/Waterflow 复用此宿主时可覆盖逻辑名称。
  Object.defineProperty(root, 'uniTagName', {
    value: 'SCROLL-VIEW',
    configurable: true,
  })
}
