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

export function initScrollViewElement(
  root: object,
  scrollLeftChanged: (value: number) => void,
  scrollTopChanged: (value: number) => void
) {
  // 模板 ref 稍后才赋值；固定结构为 root → wrap → main，只在初始化时读取一次。
  const main = (root as HTMLElement).firstElementChild!
    .firstElementChild as HTMLElement
  Object.defineProperties(root, {
    // ListView/Waterflow 复用此宿主时覆盖逻辑名称，滚动属性和方法仍保持本组件的绑定。
    uniTagName: { value: 'SCROLL-VIEW', configurable: true },
    scrollHeight: { get: () => main.scrollHeight },
    scrollWidth: { get: () => main.scrollWidth },
    // 属性赋值保留方向限制和 scrollWithAnimation；原生方法仍直接操作内部容器。
    scrollLeft: { get: () => main.scrollLeft, set: scrollLeftChanged },
    scrollTop: { get: () => main.scrollTop, set: scrollTopChanged },
    // 容器固定，方法只绑定一次，并保留取出方法后独立调用的能力。
    scrollTo: { value: main.scrollTo.bind(main) },
    scrollBy: { value: main.scrollBy.bind(main) },
  })
}
