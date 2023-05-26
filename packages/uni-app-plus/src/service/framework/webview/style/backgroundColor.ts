import { isColor } from './utils'

export function initBackgroundColor(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  let { backgroundColor } = routeMeta
  if (!backgroundColor) {
    return
  }
  if (!isColor(backgroundColor)) {
    return
  }
  if (!webviewStyle.background) {
    webviewStyle.background = backgroundColor
  } else {
    backgroundColor = webviewStyle.background
  }
  if (!webviewStyle.backgroundColorTop) {
    webviewStyle.backgroundColorTop = backgroundColor
  }
  if (!webviewStyle.backgroundColorBottom) {
    webviewStyle.backgroundColorBottom = backgroundColor
  }
  if (!webviewStyle.animationAlphaBGColor) {
    webviewStyle.animationAlphaBGColor = backgroundColor
  }
  if (typeof webviewStyle.webviewBGTransparent === 'undefined') {
    webviewStyle.webviewBGTransparent = true
  }
}
