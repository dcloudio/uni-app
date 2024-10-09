import { getCurrentPage } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'

export function getStatusbarHeight() {
  // 使用安全区高度，以适配小窗模式
  return plus.navigator.getSafeAreaInsets().top!
}

type SetStatusBarStyle = typeof plus.navigator.setStatusBarStyle
export type StatusBarStyle = Parameters<SetStatusBarStyle>[0]

export let lastStatusBarStyle: StatusBarStyle

export function setStatusBarStyle(statusBarStyle?: StatusBarStyle) {
  if (!statusBarStyle) {
    const page = getCurrentPage()
    if (!page) {
      return
    }
    statusBarStyle = page.$page.statusBarStyle as StatusBarStyle
    if (!statusBarStyle || statusBarStyle === lastStatusBarStyle) {
      return
    }
  }
  if (statusBarStyle === lastStatusBarStyle) {
    return
  }
  if (__DEV__) {
    console.log(formatLog('setStatusBarStyle', statusBarStyle))
  }
  lastStatusBarStyle = statusBarStyle
  plus.navigator.setStatusBarStyle(statusBarStyle)
}
