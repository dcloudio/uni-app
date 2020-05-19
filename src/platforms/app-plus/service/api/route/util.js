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
  const duration = animationDuration || ANI_DURATION
  setTimeout(() => {
    const execShowCallback = function () {
      if (execShowCallback._called) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('execShowCallback.prevent')
        }
        return
      }
      execShowCallback._called = true
      showCallback && showCallback()
      navigateFinish(webview)
    }
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[show.callback.timer][${Date.now()}]`)
      }
      execShowCallback()
    }, duration + 150)
    webview.show(
      animationType || ANI_SHOW,
      duration,
      () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[show.callback][${Date.now()}]`)
        }
        if (!execShowCallback._called) {
          clearTimeout(timer)
        }
        execShowCallback()
      }
    )
  }, delay)
}
