import type { MPProtocol } from '@dcloudio/uni-mp-core'

export {
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  showActionSheet,
  getDeviceInfo,
  getAppBaseInfo,
  getWindowInfo,
  getAppAuthorizeSetting,
  onError,
  offError,
  onSocketOpen,
  onSocketMessage,
} from '@dcloudio/uni-mp-core'

// #if _X_
import { parseXReturnValue } from '@dcloudio/uni-mp-core'

export function returnValue(method: string, res: unknown) {
  return parseXReturnValue(method, res)
}
// #endif

export const compressImage: MPProtocol = {
  args(
    fromArgs: UniApp.CompressImageOptions,
    toArgs: WechatMiniprogram.CompressImageOption
  ) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    // @ts-expect-error
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      // @ts-expect-error
      toArgs.compressHeight = fromArgs.compressedHeight
    }
    // @ts-expect-error
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      // @ts-expect-error
      toArgs.compressWidth = fromArgs.compressedWidth
    }
  },
}
