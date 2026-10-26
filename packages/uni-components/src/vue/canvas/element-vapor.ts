import { UniViewElement } from '../web-vapor-elements'

// 只提供逻辑类型与公开成员，根节点仍是原生 div，不构造或注册 Custom Element。
export class UniCanvasElement extends UniViewElement {
  static [Symbol.hasInstance](value: unknown): boolean {
    return (
      (this === UniCanvasElement &&
        value instanceof UniViewElement &&
        (value as Element).hasAttribute('uni-canvas')) ||
      Function.prototype[Symbol.hasInstance].call(this, value)
    )
  }

  declare width: HTMLCanvasElement['width']
  declare height: HTMLCanvasElement['height']
  declare getContext: HTMLCanvasElement['getContext']
  declare toBlob: HTMLCanvasElement['toBlob']
  declare toDataURL: HTMLCanvasElement['toDataURL']
}

export function initCanvasElement(root: object) {
  // 内部 canvas 不会切换，只在初始化时读取一次；绘图和尺寸访问不再查询 DOM。
  const canvas = (root as HTMLElement).firstElementChild as HTMLCanvasElement
  Object.defineProperties(root, {
    uniTagName: { value: 'CANVAS' },
    width: { get: () => canvas.width, set: (value) => (canvas.width = value) },
    height: {
      get: () => canvas.height,
      set: (value) => (canvas.height = value),
    },
    // 方法只绑定一次，保留原生参数、返回值和异常行为。
    getContext: { value: canvas.getContext.bind(canvas) },
    toBlob: { value: canvas.toBlob.bind(canvas) },
    toDataURL: { value: canvas.toDataURL.bind(canvas) },
  })
}
