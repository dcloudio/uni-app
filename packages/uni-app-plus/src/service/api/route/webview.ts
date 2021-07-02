import { formatLog } from '@dcloudio/uni-shared'
import { navigateFinish } from './utils'

export function closeWebview(
  webview: PlusWebviewWebviewObject,
  animationType: string,
  animationDuration: number
) {
  webview[(webview as any).__preload__ ? 'hide' : 'close'](
    animationType as any,
    animationDuration
  )
}

export function showWebview(
  webview: PlusWebviewWebviewObject,
  animationType: string,
  animationDuration: number,
  showCallback: Function,
  delay?: number
) {
  if (typeof delay === 'undefined') {
    delay = (webview as any).nvue ? 0 : 100
  }

  if (__DEV__) {
    console.log(formatLog('showWebview', 'delay', delay))
  }
  const execShowCallback = function () {
    if (execShowCallback._called) {
      if (__DEV__) {
        console.log(formatLog('execShowCallback', 'prevent'))
      }
      return
    }
    execShowCallback._called = true
    showCallback && showCallback()
    navigateFinish()
  }
  execShowCallback._called = false
  setTimeout(() => {
    const timer = setTimeout(() => {
      if (__DEV__) {
        console.log(formatLog('showWebview', 'callback', 'timer'))
      }
      execShowCallback()
    }, animationDuration + 150)

    webview.show(animationType as any, animationDuration, () => {
      if (__DEV__) {
        console.log(formatLog('showWebview', 'callback'))
      }
      if (!execShowCallback._called) {
        clearTimeout(timer)
      }
      execShowCallback()
    })
  }, delay)
}
