export function initPopGesture(
  webviewStyle: PlusWebviewWebviewStyles,
  routeMeta: UniApp.PageRouteMeta
) {
  // 不支持 hide
  if (webviewStyle.popGesture === 'hide') {
    delete webviewStyle.popGesture
  }

  // 似乎没用了吧？记得是之前流应用时，需要 appback 的逻辑
  if (routeMeta.isQuit) {
    webviewStyle.popGesture = (
      plus.os.name === 'iOS' ? 'appback' : 'none'
    ) as PlusWebviewWebviewStyles['popGesture']
  }
}
