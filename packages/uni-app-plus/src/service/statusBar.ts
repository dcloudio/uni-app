import { formatLog } from '@dcloudio/uni-shared'

type SetStatusBarStyle = typeof plus.navigator.setStatusBarStyle
type StatusBarStyle = Parameters<SetStatusBarStyle>[0]

export let lastStatusBarStyle: StatusBarStyle

let oldSetStatusBarStyle = plus.navigator.setStatusBarStyle

export function restoreOldSetStatusBarStyle(
  setStatusBarStyle: SetStatusBarStyle
) {
  oldSetStatusBarStyle = setStatusBarStyle
}

export function newSetStatusBarStyle(style: StatusBarStyle) {
  lastStatusBarStyle = style
  oldSetStatusBarStyle(style)
}

plus.navigator.setStatusBarStyle = newSetStatusBarStyle

export function setStatusBarStyle(statusBarStyle?: StatusBarStyle) {
  if (!statusBarStyle) {
    const pages = getCurrentPages()
    if (!pages.length) {
      return
    }
    statusBarStyle = pages[pages.length - 1].$page
      .statusBarStyle as StatusBarStyle
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
