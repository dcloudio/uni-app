import {
  ANI_DURATION
} from './util'

import {
  setStatusBarStyle
} from '../../bridge'

let firstBackTime = 0

function quit() {
  if (!firstBackTime) {
    firstBackTime = Date.now()
    plus.nativeUI.toast('再按一次退出应用')
    setTimeout(() => {
      firstBackTime = null
    }, 2000)
  } else if (Date.now() - firstBackTime < 2000) {
    plus.runtime.quit()
  }
}

function backWebview(webview, callback) {
  if (!webview.__uniapp_webview) {
    return callback()
  }
  const children = webview.children()
  if (!children || !children.length) { // 有子 webview
    return callback()
  }
  const childWebview = children[0]
  childWebview.canBack(({
    canBack
  }) => {
    if (canBack) {
      childWebview.back() // webview 返回
    } else {
      callback()
    }
  })
}

function back(delta, animationType, animationDuration) {
  const pages = getCurrentPages()
  const len = pages.length
  const currentPage = pages[len - 1]

  if (delta > 1) {
    // 中间页隐藏
    pages.slice(len - delta, len - 1).reverse().forEach(deltaPage => {
      deltaPage.$getAppWebview().close('none')
    })
  }

  backWebview(currentPage, () => {
    if (animationType) {
      currentPage.$getAppWebview().close(animationType, animationDuration || ANI_DURATION)
    } else {
      currentPage.$getAppWebview().close('auto')
    }
    // 移除所有 page
    pages.splice(len - delta, len)

    setStatusBarStyle()

    UniServiceJSBridge.emit('onAppRoute', {
      type: 'navigateBack'
    })
  })
}

export function navigateBack({
  delta,
  animationType,
  animationDuration
}) {
  const pages = getCurrentPages()
  const len = pages.length

  uni.hideToast() // 后退时，关闭 toast,loading

  pages[len - 1].$page.meta.isQuit ?
    quit() :
    back(delta, animationType, animationDuration)
}
