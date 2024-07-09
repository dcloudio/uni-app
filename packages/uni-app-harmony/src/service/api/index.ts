// export * from './media/chooseImage'
// export * from './media/chooseVideo'
// export * from './media/getImageInfo'
// export * from './media/getVideoInfo'
// export * from './network/request'
// export * from './network/uploadFile'
// export * from './network/downloadFile'
export * from './ui/index'
export * from './ui/index'
export * from './keyboard/keyboard'
export { canIUse } from './base/canIUse'
// export * from './device/index'
export { navigateTo } from './route/navigateTo'
export { navigateBack } from './route/navigateBack'
export { redirectTo } from './route/redirectTo'
export { reLaunch } from './route/reLaunch'
export { switchTab } from './route/switchTab'
export {
  addInterceptor,
  removeInterceptor,
  interceptors,
  setLocale,
  getLocale,
  onLocaleChange,
  createCanvasContext,
  canvasGetImageData,
  canvasPutImageData,
  canvasToTempFilePath,
  createVideoContext,
  getSelectedTextRange,
  onWindowResize,
  createAnimation,
  createSelectorQuery,
  createIntersectionObserver,
  createMediaQueryObserver,
  getLaunchOptionsSync,
  getEnterOptionsSync,
} from '@dcloudio/uni-api'
export { requireUTSPlugin, registerUTSPlugin } from './plugin/uts'
