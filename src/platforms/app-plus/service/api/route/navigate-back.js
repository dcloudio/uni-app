import {
  ANI_CLOSE,
  ANI_DURATION
} from '../../constants'

import {
  setStatusBarStyle
} from '../../bridge'

let firstBackTime = 0

function quit () {
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

function backWebview (webview, callback) {
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

function back (delta, animationType, animationDuration) {
  const pages = getCurrentPages()
  const len = pages.length
  const currentPage = pages[len - 1]

  if (delta > 1) {
    // 中间页隐藏
    pages.slice(len - delta, len - 1).reverse().forEach(deltaPage => {
      deltaPage.$getAppWebview().close('none')
    })
  }

  const backPage = function (webview) {
    if (animationType) {
      webview.close(animationType, animationDuration || ANI_DURATION)
    } else {
      if (currentPage.$page.openType === 'redirect') { // 如果是 redirectTo 跳转的，需要制定 back 动画
        webview.close(ANI_CLOSE, ANI_DURATION)
      }
      webview.close('auto')
    }

    pages.slice(len - delta, len).forEach(page => page.$remove())

    setStatusBarStyle()

    UniServiceJSBridge.emit('onAppRoute', {
      type: 'navigateBack'
    })
  }

  const webview = currentPage.$getAppWebview()
  if (!currentPage.__uniapp_webview) {
    return backPage(webview)
  }
  backWebview(webview, () => {
    backPage(webview)
  })
}

export function navigateBack ({
  from = 'navigateBack',
  delta,
  animationType,
  animationDuration
}) {
  const pages = getCurrentPages()

  const currentPage = pages[pages.length - 1]
  if (
    currentPage.$vm &&
    currentPage.$vm.$options.onBackPress &&
    currentPage.$vm.__call_hook &&
    currentPage.$vm.__call_hook('onBackPress', {
      from
    })
  ) {
    return
  }

  uni.hideToast() // 后退时，关闭 toast,loading

  // 当前页面是 condition 进入
  if (currentPage.$page.id === 1 && __uniConfig.realEntryPagePath) {
    uni.reLaunch({
      url: '/' + __uniConfig.realEntryPagePath
    })
  } else {
    currentPage.$page.meta.isQuit
      ? quit()
      : back(delta, animationType, animationDuration)
  }
  return {
    errMsg: 'navigateBack:ok'
  }
}
