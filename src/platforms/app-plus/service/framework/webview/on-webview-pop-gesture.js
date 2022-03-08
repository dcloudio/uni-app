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
      if (page && isDirectPage(page)) {
        reLaunchEntryPage()
      } else {
        UniServiceJSBridge.emit('onAppRoute', {
          type: 'navigateBack'
        })
      }
    }
  })
}

/**
 * 是否处于直达页面
 * @param page
 * @returns
 */
function isDirectPage (page) {
  return (
    __uniConfig.realEntryPagePath &&
    page.$page.route === __uniConfig.entryPagePath
  )
}
/**
 * 重新启动到首页
 */
function reLaunchEntryPage () {
  __uniConfig.entryPagePath = __uniConfig.realEntryPagePath
  delete __uniConfig.realEntryPagePath
  uni.reLaunch({
    url: addLeadingSlash(__uniConfig.entryPagePath)
  })
}

function hasLeadingSlash (str) {
  return str.indexOf('/') === 0
}

function addLeadingSlash (str) {
  return hasLeadingSlash(str) ? str : '/' + str
}
