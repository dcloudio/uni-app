import {
  ANI_SHOW,
  ANI_DURATION
} from '../../constants'

import {
  navigateFinish
} from '../../framework/navigator'

export function showWebview (webview, animationType, animationDuration, showCallback, delay) {
  if (typeof delay === 'undefined') {
    delay = webview.nvue ? 0 : 100
  }

  if (typeof animationDuration === 'undefined') {
    animationDuration = ANI_DURATION
  } else {
    animationDuration = parseInt(animationDuration)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[show][${Date.now()}]`, delay)
  }
  setTimeout(() => {
    webview.show(
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[show.callback][${Date.now()}]`)
        }
        showCallback && showCallback()
        navigateFinish(webview)
      }
    )
  }, delay)
}
