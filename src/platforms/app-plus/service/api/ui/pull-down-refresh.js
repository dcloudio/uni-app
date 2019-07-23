import {
  getLastWebview
} from '../util'

let webview

export function setPullDownRefreshWebview (pullDownRefreshWebview) {
  webview = pullDownRefreshWebview
}

export function startPullDownRefresh () {
  if (webview) {
    webview.endPullToRefresh()
  }
  webview = getLastWebview()
  if (webview) {
    webview.beginPullToRefresh()
    return {
      errMsg: 'startPullDownRefresh:ok'
    }
  }
  return {
    errMsg: 'startPullDownRefresh:fail'
  }
}

export function stopPullDownRefresh () {
  if (webview) {
    webview.endPullToRefresh()
    webview = null
    return {
      errMsg: 'stopPullDownRefresh:ok'
    }
  }
  return {
    errMsg: 'stopPullDownRefresh:fail'
  }
}
