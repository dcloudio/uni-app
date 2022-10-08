import { initGetProvider } from '@dcloudio/uni-mp-core'

export const getProvider = initGetProvider({
  oauth: ['qq'],
  share: ['qq'],
  payment: ['qqpay'],
  push: ['qq'],
})

export function createCanvasContext(
  canvasId: string,
  context?:
    | WechatMiniprogram.Component.TrivialInstance
    | WechatMiniprogram.Page.TrivialInstance
) {
  if (context) {
    context[Symbol.toPrimitive as any] = () => '[object Object]'
  }
  return qq.createCanvasContext(canvasId, context)
}

export function canvasToTempFilePath(
  canvasId: string,
  context?:
    | WechatMiniprogram.Component.TrivialInstance
    | WechatMiniprogram.Page.TrivialInstance
) {
  if (context) {
    context[Symbol.toPrimitive as any] = () => '[object Object]'
  }
  return qq.canvasToTempFilePath(canvasId, context)
}
