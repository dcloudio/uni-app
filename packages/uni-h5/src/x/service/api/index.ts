//#if !_NODE_JS_
declare global {
  interface Window {
    UniResizeObserver: typeof ResizeObserver
  }
}
window.UniResizeObserver = window.ResizeObserver
//#endif

//#if _NODE_JS_
// 目前这几个接口主要是 uniCloud 使用了
// 目前采用 polyfill 解决 xhr 和 storage
/* eslint-disable no-restricted-globals */
require('localstorage-polyfill')
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
export * from '../../../service/api/network/request'
export * from '../../../service/api/storage/storage'
export * from '../../../service/api/device/getSystemInfoSync'
export { setNavigationBarTitle } from '../../../service/api/ui/navigationBar'
//#else
export * from '../../../service/api/base/canIUse'

export * from '../../../service/api/context/createInnerAudioContext'

export * from '../../../service/api/device/makePhoneCall'
export * from '../../../service/api/device/getSystemInfo'
export * from '../../../service/api/device/getSystemInfoSync'
export * from '../../../service/api/device/network'
export * from '../../../service/api/device/accelerometer'
export * from '../../../service/api/device/compass'
export * from '../../../service/api/device/vibrate'
export * from '../../../service/api/device/clipboard'
export * from '../../../service/api/device/getWindowInfo'
export * from '../../../service/api/device/theme'

export * from '../../../service/api/storage/storage'

export * from '../../../service/api/file/getFileInfo'
export * from '../../../service/api/file/openDocument'

export * from '../../../service/api/keyboard/keyboard'

export * from '../../../service/api/media/getImageInfo'
export * from '../../../service/api/media/getVideoInfo'
export * from '../../../service/api/media/chooseFile'
export * from '../../../service/api/media/chooseImage'
export * from '../../../service/api/media/previewImage'
export * from '../../../service/api/media/chooseVideo'

export * from '../../../service/api/network/request'
export * from '../../../service/api/network/downloadFile'
export * from '../../../service/api/network/uploadFile'
export * from '../../../service/api/network/socket'

export * from '../../../service/api/location/getLocation'
export * from '../../../service/api/location/openLocation'
export * from '../../../service/api/location/locationChange'

export * from '../../../service/api/route/navigateBack'
export * from '../../../service/api/route/navigateTo'
export * from '../../../service/api/route/redirectTo'
export * from '../../../service/api/route/reLaunch'
export * from '../../../service/api/route/switchTab'
export * from '../../../service/api/route/preloadPage'

export * from '../../../service/api/ui/popup/showActionSheet'
export * from '../../../service/api/ui/popup/showModal'
export * from '../../../service/api/ui/popup/showToast'
export * from '../../../service/api/ui/loadFontFace'
export * from '../../../service/api/ui/navigationBar'
export * from '../../../service/api/ui/pageScrollTo'
export * from '../../../service/api/ui/startPullDownRefresh'
export * from '../../../service/api/ui/stopPullDownRefresh'
export * from '../../../service/api/ui/tabBar'
export * from '../../../service/api/ui/window'
export * from '../../../service/api/ui/getElementById'

export * from '../../../service/api/todo/index'

export {
  upx2px,
  upx2px as rpx2px,
  addInterceptor,
  removeInterceptor,
  interceptors,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  createIntersectionObserver,
  createMediaQueryObserver,
  createSelectorQuery,
  createVideoContext,
  createMapContext,
  createAnimation,
  onWindowResize,
  offWindowResize,
  onTabBarMidButtonTap,
  createCanvasContext,
  canvasGetImageData,
  canvasPutImageData,
  canvasToTempFilePath,
  getSelectedTextRange,
  getLocale,
  setLocale,
  $on,
  $off,
  $once,
  $emit,
  onCreateVueApp,
  onLocaleChange,
  setPageMeta,
  getEnterOptionsSync,
  getLaunchOptionsSync,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  onAppHide,
  onAppShow,
  onError,
  onPageNotFound,
  onUnhandledRejection,
  offAppHide,
  offAppShow,
  offError,
  offPageNotFound,
  offUnhandledRejection,
  // 内部使用
  invokePushCallback,
} from '@dcloudio/uni-api'
//#endif

//#if !_NODE_JS_
export * from '../../../service/api/context/createCanvasContextAsync'
export * from './route/openDialogPage'
export * from './route/closeDialogPage'
// @ts-expect-error
export * from '@dcloudio/uni-ext-api/uni-actionSheet'
// @ts-expect-error
export * from '@dcloudio/uni-ext-api/uni-chooseLocation'
//#endif

// export * from '@dcloudio/uni-ext-api/uni-getLaunchOptionsSync'
