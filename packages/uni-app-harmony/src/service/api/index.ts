export * from './ui/index'
export * from './ui/index'
export * from './keyboard/keyboard'
export { canIUse } from './base/canIUse'
export { navigateTo } from './route/navigateTo'
export { navigateBack } from './route/navigateBack'
export { redirectTo } from './route/redirectTo'
export { reLaunch } from './route/reLaunch'
export { switchTab } from './route/switchTab'
export { chooseLocation } from './location/chooseLocation/index'
export { openLocation } from './location/openLocation/index'
export { getLocation } from './location/getLocation'
export {
  startLocationUpdate,
  startLocationUpdateBackground,
  stopLocationUpdate,
  onLocationChange,
  offLocationChange,
  onLocationChangeError,
  offLocationChangeError,
} from './location/locationChange'
export { createWebviewContext } from './context/operateWebView'
export {
  addInterceptor,
  removeInterceptor,
  interceptors,
  setLocale,
  getLocale,
  onLocaleChange,
  createMapContext,
  createCanvasContext,
  canvasGetImageData,
  canvasPutImageData,
  canvasToTempFilePath,
  createVideoContext,
  getSelectedTextRange,
  onWindowResize,
  offWindowResize,
  createAnimation,
  createSelectorQuery,
  createIntersectionObserver,
  createMediaQueryObserver,
  getLaunchOptionsSync,
  getEnterOptionsSync,
  base64ToArrayBuffer,
  arrayBufferToBase64,
  onTabBarMidButtonTap,
} from '@dcloudio/uni-api'
export { pageScrollTo } from '@dcloudio/uni-app-plus/service/api'
