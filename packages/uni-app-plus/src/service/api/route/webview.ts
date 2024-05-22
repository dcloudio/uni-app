import { formatLog } from '@dcloudio/uni-shared'
import { WEBVIEW_ID_PREFIX } from '../../constants'
import { navigateFinish } from './utils'

export function closeWebview(
  webview: PlusWebviewWebviewObject,
  animationType: string,
  animationDuration?: number
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

export function backWebview(
  webview: PlusWebviewWebviewObject,
  callback: () => void
) {
  const children = webview.children()
  if (!children || !children.length) {
    // 无子 webview
    return callback()
  }

  // 如果页面有subNvues，切使用了webview组件，则返回时子webview会取错，因此需要做id匹配
  const childWebview =
    children.find((webview) => webview.id!.indexOf(WEBVIEW_ID_PREFIX) === 0) ||
    children[0]

  childWebview.canBack(({ canBack }) => {
    if (canBack) {
      childWebview.back() // webview 返回
    } else {
      callback()
    }
  })
}
