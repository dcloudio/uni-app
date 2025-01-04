import {
  navigateTo as _navigateTo,
  getSystemInfo,
  getSystemInfoSync,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
} from '@dcloudio/uni-mp-core'

export {
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  onError,
  offError,
  onSocketOpen,
  onSocketMessage,
}

export const navigateTo = _navigateTo()
