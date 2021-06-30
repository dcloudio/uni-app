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
    console.log(`[show][${Date.now()}]`, delay)
  }
  const execShowCallback = function () {
    if (execShowCallback._called) {
      if (__DEV__) {
        console.log('execShowCallback.prevent')
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
        console.log(`[show.callback.timer][${Date.now()}]`)
      }
      execShowCallback()
    }, animationDuration + 150)

    webview.show(animationType as any, animationDuration, () => {
      if (__DEV__) {
        console.log(`[show.callback][${Date.now()}]`)
      }
      if (!execShowCallback._called) {
        clearTimeout(timer)
      }
      execShowCallback()
    })
  }, delay)
}
