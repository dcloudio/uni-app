import {
  redirectTo,
  navigateTo as _navigateTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
} from '@dcloudio/uni-mp-core'

export { redirectTo, previewImage, getSystemInfo, getSystemInfoSync }

export const navigateTo = _navigateTo()
