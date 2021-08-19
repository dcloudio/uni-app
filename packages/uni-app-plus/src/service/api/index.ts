export * from './storage/storage'
export * from './file/getFileInfo'
export * from './file/openDocument'
export * from './file/saveFile'

export * from './device/systemInfo'
export * from './device/compass'
export * from './device/vibrate'
export * from './device/accelerometer'
export * from './device/bluetooth'
export * from './device/ibeacon'
export * from './device/makePhoneCall'
export * from './device/addPhoneContact'
export * from './device/clipboard'
export * from './device/network'
export * from './device/soterAuthentication'
export * from './device/scanCode'
export * from './device/theme'
export * from './device/brightness'

export * from './media/getImageInfo'
export * from './media/getVideoInfo'
export * from './media/previewImage'
export * from './media/getRecorderManager'
export * from './media/saveVideoToPhotosAlbum'
export * from './media/saveImageToPhotosAlbum'
export * from './media/compressImage'
export * from './media/compressVideo'
export * from './media/chooseImage'
export * from './media/chooseVideo'

export * from './keyboard/keyboard'

export * from './network/downloadFile'
export * from './network/request'
export * from './network/socket'
export * from './network/uploadFile'

export * from './context/createInnerAudioContext'
export * from './context/getBackgroundAudioManager'

export * from './location/getLocation'
export * from './location/chooseLocation'
export * from './location/openLocation'

export * from './ui/popup/showModal'
export * from './ui/popup/showActionSheet'
export * from './ui/popup/showToast'
export * from './ui/startPullDownRefresh'
export * from './ui/stopPullDownRefresh'
export * from './ui/loadFontFace'
export * from './ui/pageScrollTo'
export * from './ui/navigationBar'
export * from './ui/tabBar'
export * from './ui/subNVue'

export * from './plugin/getProvider'
export * from './plugin/oauth'
export * from './plugin/registerRuntime'
export * from './plugin/share'
export * from './plugin/requestPayment'
export * from './plugin/requireNativePlugin'
export * from './plugin/vuePlugin'
export * from './plugin/restoreGlobal'

export * from './ad/rewardedVideoAd'
export * from './ad/fullScreenVideoAd'
export * from './ad/interstitialAd'
export * from './ad/interactiveAd'

export * from './route/navigateBack'
export { navigateTo } from './route/navigateTo'
export * from './route/redirectTo'
export * from './route/reLaunch'
export { switchTab } from './route/switchTab'
export * from './route/preloadPage'

export {
  upx2px,
  addInterceptor,
  removeInterceptor,
  promiseInterceptor,
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
  getLanguage,
  setLanguage,
  $on,
  $off,
  $once,
  $emit,
} from '@dcloudio/uni-api'
