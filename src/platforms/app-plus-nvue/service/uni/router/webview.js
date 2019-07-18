export const ANI_DURATION = 300
const ANI_SHOW = 'pop-in'

export function showWebview (webview, animationType, animationDuration) {
  setTimeout(() => {
    webview.show(
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        console.log('show.callback')
      }
    )
  }, 50)
}
