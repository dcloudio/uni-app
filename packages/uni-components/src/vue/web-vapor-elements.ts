import { UniElement } from '../helpers/UniElement'
import { type UniDOMStringMap, initVaporDataset } from '@dcloudio/uni-shared'

const nativeHasInstance = Function.prototype[Symbol.hasInstance]

function getUniTagName(value: unknown) {
  const el = value as Element | null | undefined
  if (
    !el ||
    el.nodeType !== 1 ||
    el.namespaceURI !== 'http://www.w3.org/1999/xhtml'
  ) {
    return
  }
  switch (el.localName) {
    case 'div':
    case 'canvas':
      return el.hasAttribute('uni-view') ? 'VIEW' : undefined
    case 'span':
      return el.hasAttribute('uni-text') ? 'TEXT' : undefined
    case 'img':
      return el.hasAttribute('uni-image') ? 'IMAGE' : undefined
  }
}

// 仅 dataset 遵循 uni 的 Map 契约，其余原生 DOM 属性不随逻辑 Element 类型重写。
interface NativeUniElement extends HTMLElement {
  readonly dataset: UniDOMStringMap
  readonly uniTagName: string | undefined
  getPage: UniElement['getPage']
  readonly uniPage: UniElement['uniPage']
  getBoundingClientRectAsync: UniElement['getBoundingClientRectAsync']
}
const NativeUniElement = UniElement as unknown as { new (): NativeUniElement }

export class UniViewElement extends NativeUniElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniViewElement && getUniTagName(value) === 'VIEW') ||
      nativeHasInstance.call(this, value)
    )
  }
}
export class UniTextElement extends NativeUniElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniTextElement && getUniTagName(value) === 'TEXT') ||
      nativeHasInstance.call(this, value)
    )
  }
}
export class UniImageElement extends NativeUniElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniImageElement && getUniTagName(value) === 'IMAGE') ||
      nativeHasInstance.call(this, value)
    )
  }
}

interface ElementConstructors {
  HTMLDivElement: { prototype: HTMLElement }
  HTMLSpanElement: { prototype: HTMLElement }
  HTMLImageElement: { prototype: HTMLElement }
  HTMLCanvasElement: { prototype: HTMLElement }
}

// 只从 Vapor 浏览器入口调用；不触碰逐节点创建路径，dataset 单独按 uni 契约适配。
export function installWebVaporElements(realm?: Window) {
  if (!realm) return

  if (!Object.getOwnPropertyDescriptor(UniElement, Symbol.hasInstance)) {
    Object.defineProperty(UniElement, Symbol.hasInstance, {
      configurable: true,
      value(this: typeof UniElement, value: unknown) {
        // 子类必须保持真实继承判断，不能把带标记的 view 误认成 progress 等复合元素。
        return (
          (this === UniElement && !!getUniTagName(value)) ||
          nativeHasInstance.call(this, value)
        )
      },
    })
  }

  const descriptors: PropertyDescriptorMap = {
    getPage: {
      value(this: NativeUniElement) {
        return this.uniTagName ? UniElement.prototype.getPage.call(this) : null
      },
      writable: true,
    },
    uniPage: {
      get(this: NativeUniElement) {
        return this.getPage()
      },
    },
    // 仅复用无实例状态的公共方法，不复制 dataset、style、属性或标签名重写。
    getBoundingClientRectAsync: {
      value: UniElement.prototype.getBoundingClientRectAsync,
      writable: true,
    },
  }
  const hosts = realm as unknown as ElementConstructors
  for (const [Host, marker, tagName] of [
    [hosts.HTMLDivElement, 'uni-view', 'VIEW'],
    [hosts.HTMLSpanElement, 'uni-text', 'TEXT'],
    [hosts.HTMLImageElement, 'uni-image', 'IMAGE'],
    [hosts.HTMLCanvasElement, 'uni-view', 'VIEW'],
  ] as const) {
    const prototype = Host.prototype
    if (!('uniTagName' in prototype)) {
      // 宿主原型已经限定节点类型；只检查标记，不重复读取 namespace 和标签名。
      Object.defineProperty(prototype, 'uniTagName', {
        configurable: true,
        get(this: HTMLElement) {
          return this.hasAttribute(marker) ? tagName : undefined
        },
      })
    }
    for (const key in descriptors) {
      if (!(key in prototype)) {
        Object.defineProperty(
          prototype,
          key,
          Object.assign({ configurable: true }, descriptors[key])
        )
      }
    }
  }
  initVaporDataset(realm)
}
