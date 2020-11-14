// import navigateTo from 'uni-helpers/navigate-to'
import redirectTo from '../../helpers/redirect-to'
import previewImage from '../../helpers/normalize-preview-image'

function addSafeAreaInsets (result) {
  if (result.safeArea) {
    const safeArea = result.safeArea
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom
    }
  }
}
export const protocols = {
  redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets
  },
  getSystemInfoSync: {
    returnValue: addSafeAreaInsets
  }
}
export const todos = [
  'vibrate',
  'preloadPage',
  'unPreloadPage',
  'loadSubPackage'
]
export const canIUses = []
