export * from './service/base/base64'
export * from './service/base/upx2px'
export * from './service/base/interceptor'
export * from './service/base/eventBus'
export * from './service/base/__f__'

export * from './service/context/createVideoContext'
export * from './service/context/createMapContext'
export * from './service/context/canvas'
export * from './service/context/innerAudio'

export * from './service/ui/createIntersectionObserver'
export * from './service/ui/createMediaQueryObserver'
export * from './service/ui/createSelectorQuery'
export * from './service/ui/createAnimation'
export * from './service/ui/tabBar'
export * from './service/ui/window'
export * from './service/ui/locale'
export * from './service/ui/setPageMeta'
export * from './service/ui/background'

export * from './service/keyboard/getSelectedTextRange'

export * from './service/lifecycle/app'

export * from './service/plugin/push'

// protocols
export * from './protocols/base/canIUse'

export * from './protocols/context/context'
export * from './protocols/context/canvas'
export * from './protocols/context/getBackgroundAudioManager'

export * from './protocols/device/makePhoneCall'
export * from './protocols/device/addPhoneContact'
export * from './protocols/device/clipboard'
export * from './protocols/device/accelerometer'
export * from './protocols/device/compass'
export * from './protocols/device/vibrate'
export * from './protocols/device/bluetooth'
export * from './protocols/device/ibeacon'
export * from './protocols/device/brightness'
export * from './protocols/device/soterAuthentication'
export * from './protocols/device/scanCode'
export * from './protocols/device/getSystemSetting'
export * from './protocols/device/getAppAuthorizeSetting'
export * from './protocols/device/openAppAuthorizeSetting'

export * from './protocols/storage/storage'

export * from './protocols/file/saveFile'
export * from './protocols/file/getSavedFileList'
export * from './protocols/file/removeSavedFile'
export * from './protocols/file/getFileInfo'
export * from './protocols/file/getSavedFileInfo'
export * from './protocols/file/openDocument'

export * from './protocols/keyboard/keyboard'
export * from './protocols/keyboard/getSelectedTextRange'

export * from './protocols/location/chooseLocation'
export * from './protocols/location/getLocation'
export * from './protocols/location/openLocation'

export * from './protocols/media/chooseImage'
export * from './protocols/media/chooseVideo'
export * from './protocols/media/chooseFile'
export * from './protocols/media/getImageInfo'
export * from './protocols/media/previewImage'
export * from './protocols/media/getVideoInfo'
export * from './protocols/media/saveImageToPhotosAlbum'
export * from './protocols/media/saveVideoToPhotosAlbum'
export * from './protocols/media/getRecorderManager'
export * from './protocols/media/compressImage'
export * from './protocols/media/compressVideo'

export * from './protocols/network/request'
export * from './protocols/network/downloadFile'
export * from './protocols/network/uploadFile'
export * from './protocols/network/socket'

export * from './protocols/location/getLocation'
export * from './protocols/location/locationChange'

export * from './protocols/route/route'

export * from './protocols/ui/hideLoading'
export * from './protocols/ui/hideToast'
export * from './protocols/ui/loadFontFace'
export * from './protocols/ui/navigationBar'
export * from './protocols/ui/pageScrollTo'
export * from './protocols/ui/showActionSheet'
export * from './protocols/ui/showLoading'
export * from './protocols/ui/showModal'
export * from './protocols/ui/showToast'
export * from './protocols/ui/startPullDownRefresh'
export * from './protocols/ui/stopPullDownRefresh'
export * from './protocols/ui/tabBar'

export * from './protocols/plugin/getProvider'
export * from './protocols/plugin/oauth'
export * from './protocols/plugin/share'
export * from './protocols/plugin/requestPayment'
export * from './protocols/plugin/push'

// ad
export * from './protocols/ad/rewardedVideoAd'
export * from './protocols/ad/fullScreenVideoAd'
export * from './protocols/ad/interstitialAd'
export * from './protocols/ad/interactiveAd'

export { onCreateVueApp } from '@dcloudio/uni-shared'

// helpers
export {
  defineOnApi,
  defineOffApi,
  defineTaskApi,
  defineSyncApi,
  defineAsyncApi,
  createUnsupportedOnApi,
  createUnsupportedOffApi,
  createUnsupportedTaskApi,
  createUnsupportedSyncApi,
  createUnsupportedAsyncApi,
} from './helpers/api'

export { handlePromise } from './helpers/api/promise'
export { invokeApi, wrapperReturnValue } from './helpers/interceptor'
export { requestComponentObserver } from './helpers/requestComponentObserver'
// types

export { DefineAsyncApiFn } from './helpers/api'
