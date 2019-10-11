import {
  navigateStack
} from '../../framework/navigator'

export const ANI_DURATION = 300
const ANI_SHOW = 'pop-in'
export const ANI_CLOSE = 'pop-out'

export function showWebview (webview, animationType, animationDuration, showCallback) {
  animationDuration = typeof animationDuration === 'undefined' ? ANI_DURATION : parseInt(animationDuration)
  setTimeout(() => {
    webview.show(
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        showCallback && showCallback()
        navigateStack(webview)
      }
    )
  }, 50)
}
