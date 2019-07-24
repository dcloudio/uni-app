import {
  getLastWebview
} from '../util'

let webview

export function setPullDownRefreshPageId (pullDownRefreshWebview) {
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
  if (!webview) {
    webview = getLastWebview()
  }
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
