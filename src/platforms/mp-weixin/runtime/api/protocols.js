import navigateTo from 'uni-helpers/navigate-to'
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
  navigateTo,
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
