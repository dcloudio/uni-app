import { extend } from '@vue/shared'
import {
  getAppBaseInfo as _getAppBaseInfo,
  getDeviceInfo as _getDeviceInfo,
  getWindowInfo as _getWindowInfo,
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
export const getAppBaseInfo = extend({}, _getAppBaseInfo, {
  name: jd.canIUse('getAppBaseInfo') ? 'getAppBaseInfo' : 'getSystemInfoSync',
})
export const getWindowInfo = extend({}, _getWindowInfo, {
  name: jd.canIUse('getWindowInfo') ? 'getWindowInfo' : 'getSystemInfoSync',
})
export const getDeviceInfo = extend({}, _getDeviceInfo, {
  name: jd.canIUse('getDeviceInfo') ? 'getDeviceInfo' : 'getSystemInfoSync',
})
