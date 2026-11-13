// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { initUniElement } from 'vue'
import { UniElement } from '../../helpers/UniElement'

// 只提供逻辑类型与公开成员，根节点是原生 canvas，不构造或注册 Custom Element。
export class UniCanvasElement extends UniElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    const el = value as Element | null | undefined
    return (
      (this === UniCanvasElement &&
        el?.nodeType === 1 &&
        el.localName === 'canvas' &&
        el.hasAttribute('uni-canvas')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }

  declare width: HTMLCanvasElement['width']
  declare height: HTMLCanvasElement['height']
  declare getContext: HTMLCanvasElement['getContext']
  declare toBlob: HTMLCanvasElement['toBlob']
  declare toDataURL: HTMLCanvasElement['toDataURL']
}

const uniTagName = { value: 'CANVAS' }

export function initCanvasElement(root: Element) {
  // 根节点直接提供原生绘图和尺寸能力，不再读取内部子节点或代理宽高属性。
  initUniElement(root, uniTagName)
  const canvas = root as HTMLCanvasElement
  Object.defineProperties(root, {
    // 方法只绑定一次，保留原生参数、返回值和异常行为。
    getContext: { value: canvas.getContext.bind(canvas) },
    toBlob: { value: canvas.toBlob.bind(canvas) },
    toDataURL: { value: canvas.toDataURL.bind(canvas) },
  })
}
