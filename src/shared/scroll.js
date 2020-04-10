import {
  plusReady
} from './platform'
let view
let pullToRefreshStyle
let disabled
const lastAction = {}

export function disableScrollBounce ({
  disable
}) {
  function exec () {
    if (!view) {
      view = plus.webview.currentWebview()
    }
    if (!disabled) {
      pullToRefreshStyle = (view.getStyle() || {}).pullToRefresh || {}
    }
    disabled = disable
    if (pullToRefreshStyle.support) {
      view.setPullToRefresh(Object.assign({}, pullToRefreshStyle, {
        support: !disable
      }))
    }
  }
  const time = Date.now()
  if (disable === lastAction.disable && time - lastAction.time < 20) {
    return
  }
  lastAction.disable = disable
  lastAction.time = time
  plusReady(() => {
    if (plus.os.name === 'iOS') {
      // 延迟执行避免iOS13触摸卡死
      setTimeout(exec, 20)
    } else {
      exec()
    }
  })
}
