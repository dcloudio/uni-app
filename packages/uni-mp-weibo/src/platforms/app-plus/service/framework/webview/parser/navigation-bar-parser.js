export function parseNavigationBar (webviewStyle) {
  let titleText = ''
  let textColor = ''
  let backgroundColor = ''
  const titleNView = webviewStyle.titleNView
  if (titleNView) {
    titleText = titleNView.titleText || ''
    textColor = titleNView.textColor || ''
    backgroundColor = titleNView.backgroundColor || ''
  }
  return {
    titleText,
    textColor,
    backgroundColor
  }
}
