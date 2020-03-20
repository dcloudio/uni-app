import {
  getLastWebview
} from '../util'

export function setNavigationBarTitle ({
  title = ''
} = {}) {
  const webview = getLastWebview()
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

export function setNavigationBarColor ({
  frontColor,
  backgroundColor
} = {}) {
  const webview = getLastWebview()
  if (webview) {
    const styles = {}
    if (frontColor) {
      styles.titleColor = frontColor
    }
    if (backgroundColor) {
      styles.backgroundColor = backgroundColor
    }
    plus.navigator.setStatusBarStyle(frontColor === '#000000' ? 'dark' : 'light')
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
