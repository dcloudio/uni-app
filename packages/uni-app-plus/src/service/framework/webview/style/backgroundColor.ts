import { isColor } from './utils'

export function initBackgroundColor(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  const { backgroundColor } = routeMeta
  if (!backgroundColor) {
    return
  }
  if (!isColor(backgroundColor)) {
    return
  }
  if (!webviewStyle.background) {
    webviewStyle.background = backgroundColor
  }
  if (!webviewStyle.backgroundColorTop) {
    webviewStyle.backgroundColorTop = backgroundColor
  }
}
