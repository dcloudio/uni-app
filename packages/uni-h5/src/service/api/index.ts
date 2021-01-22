export * from './base/canIUse'

export * from './device/makePhoneCall'
export * from './device/getSystemInfo'
export * from './device/getSystemInfoSync'

export * from './file/openDocument'

export * from './media/getImageInfo'

export * from './route/navigateBack'
export * from './route/navigateTo'
export * from './route/redirectTo'
export * from './route/reLaunch'
export * from './route/switchTab'

export * from './util/getRealPath'

export {
  upx2px,
  addInterceptor,
  removeInterceptor,
  promiseInterceptor,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  createIntersectionObserver,
  createSelectorQuery,
} from '@dcloudio/uni-api'
