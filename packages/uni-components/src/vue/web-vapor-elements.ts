import { UniElement } from '../helpers/UniElement'
import { type UniDOMStringMap, initVaporDataset } from '@dcloudio/uni-shared'

const nativeHasInstance = Function.prototype[Symbol.hasInstance]

// 框架标识按约定只用于 HTML 宿主，不额外检查命名空间。
function isUniNativeElement(
  value: unknown,
  tag: string,
  marker: string
): boolean {
  const el = value as Element | null | undefined
  return el?.nodeType === 1 && el.localName === tag && el.hasAttribute(marker)
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
      (this === UniViewElement &&
        isUniNativeElement(value, 'div', 'uni-view')) ||
      nativeHasInstance.call(this, value)
    )
  }
}
export class UniTextElement extends NativeUniElement {
  // Web 直接读取 DOM 文字，不缓存、不触发布局；不提供会删除 Vue 子节点的 setter。
  // 类上保留 getter，供 Button 等复合 Element 的 super.value 复用。
  get value(): string {
    return this.textContent ?? ''
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniTextElement &&
        isUniNativeElement(value, 'span', 'uni-text')) ||
      nativeHasInstance.call(this, value)
    )
  }
}
export class UniImageElement extends NativeUniElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniImageElement &&
        isUniNativeElement(value, 'img', 'uni-image')) ||
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
        const el = value as
          | (Element & { readonly uniTagName?: string })
          | null
          | undefined
        if (this === UniElement && el?.nodeType === 1) {
          // 已安装的宿主直接复用公开身份，复合组件无需再次分类基础标识。
          if ('uniTagName' in el)
            return !!el.uniTagName || nativeHasInstance.call(this, value)
          // 保留尚未安装扩展的跨 Window 节点识别，不在类型判断中安装原型。
          let marker: string | undefined
          switch (el.localName) {
            case 'div':
              marker = 'uni-view'
              break
            case 'span':
              marker = 'uni-text'
              break
            case 'img':
              marker = 'uni-image'
              break
            case 'canvas':
              marker = 'uni-canvas'
              break
          }
          if (marker && el.hasAttribute(marker)) return true
        }
        return nativeHasInstance.call(this, value)
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
  // text 使用原生 span，不继承逻辑 Element 类；只在安装时复用同一个 getter。
  if (!('value' in hosts.HTMLSpanElement.prototype)) {
    Object.defineProperty(
      hosts.HTMLSpanElement.prototype,
      'value',
      Object.getOwnPropertyDescriptor(UniTextElement.prototype, 'value')!
    )
  }
  for (const [Host, marker, tagName] of [
    [hosts.HTMLDivElement, 'uni-view', 'VIEW'],
    [hosts.HTMLSpanElement, 'uni-text', 'TEXT'],
    [hosts.HTMLImageElement, 'uni-image', 'IMAGE'],
    [hosts.HTMLCanvasElement, 'uni-canvas', 'CANVAS'],
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
