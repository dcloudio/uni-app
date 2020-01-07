import {
  lastStatusBarStyle,
  setStatusBarStyle
} from '../../bridge'
export function onWebviewPopGesture (webview) {
  let popStartStatusBarStyle
  webview.addEventListener('popGesture', e => {
    if (e.type === 'start') {
      // 设置下一个页面的 statusBarStyle
      const pages = getCurrentPages()
      const page = pages[pages.length - 2]
      popStartStatusBarStyle = lastStatusBarStyle
      const statusBarStyle = page && page.$page.meta.statusBarStyle
      statusBarStyle && setStatusBarStyle(statusBarStyle)
    } else if (e.type === 'end' && !e.result) {
      // 拖拽未完成,设置为当前状态栏前景色
      setStatusBarStyle(popStartStatusBarStyle)
    } else if (e.type === 'end' && e.result) {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      page && page.$remove()

      setStatusBarStyle()

      UniServiceJSBridge.emit('onAppRoute', {
        type: 'navigateBack'
      })
    }
  })
}
