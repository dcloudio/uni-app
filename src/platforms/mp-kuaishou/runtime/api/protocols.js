import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../../mp-weixin/helpers/redirect-to'
import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'
import getUserProfile from '../../../mp-weixin/helpers/get-user-profile'

export const protocols = {
  navigateTo,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile
}
export const todos = [
  'vibrate'
]
export const canIUses = []
