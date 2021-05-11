import { plusReady } from '@dcloudio/uni-shared'

let webview
let pullToRefreshStyle

export function initScrollBounce() {
  if (__PLATFORM__ === 'app') {
    plusReady(() => {
      if (!webview) {
        webview = plus.webview.currentWebview()
      }
      if (!pullToRefreshStyle) {
        pullToRefreshStyle = (webview.getStyle() || {}).pullToRefresh || {}
      }
    })
  }
}

export function disableScrollBounce({ disable }) {
  if (__PLATFORM__ === 'app') {
    if (pullToRefreshStyle && pullToRefreshStyle.support) {
      webview.setPullToRefresh(
        Object.assign({}, pullToRefreshStyle, {
          support: !disable,
        })
      )
    }
  }
}
