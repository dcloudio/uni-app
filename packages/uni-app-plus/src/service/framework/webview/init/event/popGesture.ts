import { getCurrentPage, invokeHook } from '@dcloudio/uni-core'
import { ON_SHOW } from '@dcloudio/uni-shared'
import { isDirectPage, reLaunchEntryPage } from '../../../../api/route/direct'
import {
  type StatusBarStyle,
  lastStatusBarStyle,
  setStatusBarStyle,
} from '../../../../statusBar'
import {
  getCurrentBasePages,
  getPage$BasePage,
  removeCurrentPage,
} from '../../../page/getCurrentPages'

export function onWebviewPopGesture(webview: PlusWebviewWebviewObject) {
  let popStartStatusBarStyle: StatusBarStyle
  webview.addEventListener('popGesture', (e) => {
    if (e.type === 'start') {
      // 设置下一个页面的 statusBarStyle
      const pages = getCurrentBasePages()
      const page = pages[pages.length - 2]
      popStartStatusBarStyle = lastStatusBarStyle
      let statusBarStyle
      if (page) {
        statusBarStyle = getPage$BasePage(page).statusBarStyle as StatusBarStyle
      }
      statusBarStyle && setStatusBarStyle(statusBarStyle)
    } else if (e.type === 'end' && !e.result) {
      // 拖拽未完成,设置为当前状态栏前景色
      setStatusBarStyle(popStartStatusBarStyle)
    } else if (e.type === 'end' && e.result) {
      const len = getCurrentPages().length
      const page = __X__
        ? (getCurrentPage() as unknown as UniPage).vm
        : getCurrentPage()
      removeCurrentPage()
      setStatusBarStyle()
      if (page && len === 1 && isDirectPage(page)) {
        reLaunchEntryPage()
      } else {
        // 触发前一个页面 onShow
        invokeHook(ON_SHOW)
      }
    }
  })
}
