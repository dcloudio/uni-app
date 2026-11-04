import { type UniDOMStringMap, createUniDOMStringMap } from '../dom2/dataset'

const installed = /*#__PURE__*/ new WeakSet<object>()

// 与 Web Vapor 编译器的 initUniDataset 共用节点字段：初始数据只读，首次访问后替换为独立 Map。
type DatasetElement = HTMLElement & {
  $uniDataset?: Readonly<Record<string, string>> | UniDOMStringMap
}

// 仅安装 dataset getter，原生属性 API 不参与业务数据维护。
export function initVaporDataset(window: Window) {
  const realm = window as unknown as {
    HTMLElement: { prototype: HTMLElement }
    HTMLDivElement: { prototype: HTMLElement }
    HTMLSpanElement: { prototype: HTMLElement }
    HTMLImageElement: { prototype: HTMLElement }
    HTMLCanvasElement: { prototype: HTMLElement }
  }
  const prototype = realm.HTMLElement.prototype
  if (installed.has(prototype)) return
  installed.add(prototype)

  const nativeDataset = Object.getOwnPropertyDescriptor(prototype, 'dataset')!
  for (const [Host, marker] of [
    [realm.HTMLDivElement, 'uni-view'],
    [realm.HTMLSpanElement, 'uni-text'],
    [realm.HTMLImageElement, 'uni-image'],
    [realm.HTMLCanvasElement, 'uni-canvas'],
  ] as const) {
    if (Object.getOwnPropertyDescriptor(Host.prototype, 'dataset')) continue
    Object.defineProperty(Host.prototype, 'dataset', {
      configurable: true,
      enumerable: nativeDataset.enumerable,
      get(this: DatasetElement) {
        if (!this.hasAttribute(marker)) return nativeDataset.get!.call(this)
        const data = this.$uniDataset
        return data instanceof Map
          ? data
          : (this.$uniDataset = createUniDOMStringMap(data))
      },
    })
  }
}
