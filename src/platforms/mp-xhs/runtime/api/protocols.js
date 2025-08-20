// import navigateTo from 'uni-helpers/navigate-to'
// import redirectTo from '../../../mp-weixin/helpers/redirect-to'
// import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
// import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

// 需要做转换的 API 列表
export const protocols = {
  // navigateTo,
  // redirectTo,
  // previewImage,
  // getUserProfile
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  requestPayment: {
    name: 'requestOrderPayment'
  },
  showActionSheet: {
    args (fromArgs, toArgs) {
      if (!fromArgs.itemColor) {
        toArgs.itemColor = '#000000'
      }
    }
  }
}

// 不支持的 API 列表
// TODO: 补充
export const todos = [
  'getSelectedTextRange'
]

// 存在兼容性的 API 列表
export const canIUses = []
