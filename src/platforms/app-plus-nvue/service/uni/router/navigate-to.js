import {
  getId,
  ANI_SHOW,
  ANI_DURATION,
  parseWebviewStyle
} from './util'

export default function initNavigateTo ({
  plus,
  __registerPage
}) {
  return function navigateTo (path, {
    animationType,
    animationDuration
  }) {
    const webview = plus.webview.open(
      '',
      String(getId()),
      parseWebviewStyle(path),
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        console.log('show.callback')
      })

    __registerPage({
      path,
      webview
    })
  }
}
