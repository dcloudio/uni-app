import {
  ANI_CLOSE,
  ANI_DURATION
} from '../../constants'

import {
  WEBVIEW_ID_PREFIX
} from '../../../constants'

import {
  setStatusBarStyle
} from '../../bridge'

import {
  closeWebview
} from './util'

import {
  t
} from 'uni-core/helpers/i18n'

let firstBackTime = 0

function quit () {
  if (!firstBackTime) {
    firstBackTime = Date.now()
    plus.nativeUI.toast(t('uni.app.quit'))
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

  // 如果页面有subNvues，切使用了webview组件，则返回时子webview会取错，因此需要做id匹配
  const childWebview = children.find(webview => webview.id.indexOf(WEBVIEW_ID_PREFIX) === 0) || children[0]

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
      closeWebview(deltaPage.$getAppWebview(), 'none')
    })
  }

  const backPage = function (webview) {
    if (animationType) {
      closeWebview(webview, animationType, animationDuration || ANI_DURATION)
    } else {
      if (currentPage.$page.openType === 'redirect') { // 如果是 redirectTo 跳转的，需要制定 back 动画
        closeWebview(webview, ANI_CLOSE, ANI_DURATION)
      } else {
        closeWebview(webview, 'auto')
      }
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

  // 后退时，关闭 toast,loading
  uni.hideToast()
  uni.hideLoading()

  if (currentPage.$page.meta.isQuit) {
    quit()
  } else if (currentPage.$page.id === 1 && __uniConfig.realEntryPagePath) {
    // condition
    __uniConfig.entryPagePath = __uniConfig.realEntryPagePath
    delete __uniConfig.realEntryPagePath
    uni.reLaunch({
      url: '/' + __uniConfig.entryPagePath
    })
  } else {
    back(delta, animationType, animationDuration)
  }
  return {
    errMsg: 'navigateBack:ok'
  }
}
