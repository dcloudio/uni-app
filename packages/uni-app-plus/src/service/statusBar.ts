import { getCurrentPage } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import { getPage$BasePage } from './framework/page/getCurrentPages'

type SetStatusBarStyle = typeof plus.navigator.setStatusBarStyle
export type StatusBarStyle = Parameters<SetStatusBarStyle>[0]

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
    const page = __X__
      ? (getCurrentPage() as unknown as UniPage).vm
      : getCurrentPage()
    if (!page) {
      return
    }
    statusBarStyle = getPage$BasePage(page).statusBarStyle as StatusBarStyle
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
