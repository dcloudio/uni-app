// import navigateTo from 'uni-helpers/navigate-to'
// import redirectTo from '../../../mp-weixin/helpers/redirect-to'
// import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
// import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'
import getAppBaseInfo from '../../../mp-weixin/helpers/get-app-base-info'
import getWindowInfo from '../../../mp-weixin/helpers/get-window-info'
import getDeviceInfo from '../../../mp-weixin/helpers/get-device-info'

// 需要做转换的 API 列表
export const protocols = {
  // navigateTo,
  // redirectTo,
  // previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  // getUserProfile,
  getAppBaseInfo: Object.assign({}, getAppBaseInfo, {
    name: __GLOBAL__.canIUse('getAppBaseInfo') ? 'getAppBaseInfo' : 'getSystemInfoSync'
  }),
  getWindowInfo: Object.assign({}, getWindowInfo, {
    name: __GLOBAL__.canIUse('getWindowInfo') ? 'getWindowInfo' : 'getSystemInfoSync'
  }),
  getDeviceInfo: Object.assign({}, getDeviceInfo, {
    name: __GLOBAL__.canIUse('getDeviceInfo') ? 'getDeviceInfo' : 'getSystemInfoSync'
  })
}

// 不支持的 API 列表
export const todos = [
  'getSelectedTextRange'
]

// 存在兼容性的 API 列表
export const canIUses = []
