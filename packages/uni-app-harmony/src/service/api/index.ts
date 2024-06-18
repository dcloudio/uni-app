// export * from './media/chooseImage'
// export * from './media/chooseVideo'
// export * from './media/getImageInfo'
// export * from './media/getVideoInfo'
// export * from './network/request'
// export * from './network/uploadFile'
// export * from './network/downloadFile'
export * from './ui/index'
export { canIUse } from './base/canIUse'
// export * from './device/index'
export { navigateTo } from './route/navigateTo'
export { navigateBack } from './route/navigateBack'
export { redirectTo } from './route/redirectTo'
export { reLaunch } from './route/reLaunch'
export { switchTab } from './route/switchTab'
export {
  setLocale,
  getLocale,
  onLocaleChange,
  createCanvasContext,
  createSelectorQuery,
  canvasGetImageData,
  canvasPutImageData,
  canvasToTempFilePath,
} from '@dcloudio/uni-api'
export {
  pageScrollTo,
  setNavigationBarColor,
  setNavigationBarTitle,
} from '@dcloudio/uni-app-plus/service/api'
export { requireUTSPlugin, registerUTSPlugin } from './plugin/uts'
