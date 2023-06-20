// import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../helpers/redirect-to'
import previewImage from '../../helpers/normalize-preview-image'
import getSystemInfo from '../../helpers/system-info'
import showActionSheet from '../../helpers/show-action-sheet'
import getAppBaseInfo from '../../helpers/get-app-base-info'
import getDeviceInfo from '../../helpers/get-device-info'
import getWindowInfo from '../../helpers/get-window-info'
import getAppAuthorizeSetting from '../../helpers/get-app-authorize-setting'

const compressImage = {
  args (fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth
    }
  }
}

export const protocols = {
  redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet,
  getAppBaseInfo,
  getDeviceInfo,
  getWindowInfo,
  getAppAuthorizeSetting,
  compressImage
}
export const todos = [
  'vibrate',
  'preloadPage',
  'unPreloadPage',
  'loadSubPackage'
]
export const canIUses = []
