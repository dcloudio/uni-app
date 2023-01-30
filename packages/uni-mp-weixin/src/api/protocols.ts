import { MPProtocol } from '@dcloudio/uni-mp-core'

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
} from '@dcloudio/uni-mp-core'

export const compressImage: MPProtocol = {
  args(
    fromArgs: UniApp.CompressImageOptions,
    toArgs: WechatMiniprogram.CompressImageOption
  ) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight
    }
    // @ts-expect-error
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      // @ts-expect-error
      toArgs.compressWidth = fromArgs.compressedWidth
    }
  },
}
