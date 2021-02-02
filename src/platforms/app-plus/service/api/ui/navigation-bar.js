import {
  getWebview
} from '../util'

export function setNavigationBarTitle ({
  __page__,
  title = ''
} = {}) {
  const webview = getWebview(__page__)
  if (webview) {
    const style = webview.getStyle()
    if (style && style.titleNView) {
      webview.setStyle({
        titleNView: {
          titleText: title
        }
      })
    }
    return {
      errMsg: 'setNavigationBarTitle:ok'
    }
  }
  return {
    errMsg: 'setNavigationBarTitle:fail'
  }
}

export function showNavigationBarLoading () {
  plus.nativeUI.showWaiting('', {
    modal: false
  })
  return {
    errMsg: 'showNavigationBarLoading:ok'
  }
}

export function hideNavigationBarLoading () {
  plus.nativeUI.closeWaiting()
  return {
    errMsg: 'hideNavigationBarLoading:ok'
  }
}

function setPageMeta (statusBarStyle) {
  const pages = getCurrentPages()
  if (!pages.length) {
    return
  }
  // 框架内部页面跳转会从这里获取style配置
  pages[pages.length - 1].$page.meta.statusBarStyle = statusBarStyle
}

export function setNavigationBarColor ({
  __page__,
  frontColor,
  backgroundColor
} = {}) {
  const webview = getWebview(__page__)
  if (webview) {
    const styles = {}
    if (frontColor) {
      styles.titleColor = frontColor
    }
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor
    }
    const statusBarStyle = frontColor === '#000000' ? 'dark' : 'light'
    plus.navigator.setStatusBarStyle(statusBarStyle)

    // 用户调用api时同时改变当前页配置，这样在系统调用设置时，可以避免覆盖用户设置
    setPageMeta(statusBarStyle)

    const style = webview.getStyle()
    if (style && style.titleNView) {
      if (style.titleNView.autoBackButton) {
        styles.backButton = styles.backButton || {}
        styles.backButton.color = frontColor
      }
      webview.setStyle({
        titleNView: styles
      })
    }
    return {
      errMsg: 'setNavigationBarColor:ok'
    }
  }
  return {
    errMsg: 'setNavigationBarColor:fail'
  }
}
