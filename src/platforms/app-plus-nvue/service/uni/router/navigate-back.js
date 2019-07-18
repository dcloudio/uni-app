import {
  ANI_DURATION
} from './webview'

let firstBackTime = 0

export default function initNavigateBack ({
  plus,
  getCurrentPages
}) {
  return function navigateBack (delta, {
    animationType,
    animationDuration
  }) {
    const pages = getCurrentPages()
    const len = pages.length - 1
    const page = pages[len]
    if (page.$meta.isQuit) {
      if (!firstBackTime) {
        firstBackTime = Date.now()
        plus.nativeUI.toast('再按一次退出应用')
        setTimeout(() => {
          firstBackTime = null
        }, 2000)
      } else if (Date.now() - firstBackTime < 2000) {
        plus.runtime.quit()
      }
    } else {
      pages.splice(len, 1)
      if (animationType) {
        page.$getAppWebview().close(animationType, animationDuration || ANI_DURATION)
      } else {
        page.$getAppWebview().close('auto')
      }
    }
  }
}
