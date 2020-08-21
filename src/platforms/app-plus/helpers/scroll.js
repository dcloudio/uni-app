import {
  plusReady
} from 'uni-shared'

let webview
let pullToRefreshStyle

export function initScrollBounce () {
  plusReady(() => {
    if (!webview) {
      webview = plus.webview.currentWebview()
    }
    if (!pullToRefreshStyle) {
      pullToRefreshStyle = (webview.getStyle() || {}).pullToRefresh || {}
    }
  })
}

export function disableScrollBounce ({
  disable
}) {
  if (pullToRefreshStyle && pullToRefreshStyle.support) {
    webview.setPullToRefresh(Object.assign({}, pullToRefreshStyle, {
      support: !disable
    }))
  }
}
