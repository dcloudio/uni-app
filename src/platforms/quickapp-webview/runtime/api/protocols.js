import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../../mp-weixin/helpers/redirect-to'
import previewImage from '../../../mp-weixin/helpers/normalize-preview-image'
import getSystemInfo from '../../../mp-weixin/helpers/system-info'

export const protocols = {
  navigateTo: navigateTo(),
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync: getSystemInfo
}
export const todos = [
  'preloadPage',
  'unPreloadPage',
  'loadSubPackage'
]
export const canIUses = []
