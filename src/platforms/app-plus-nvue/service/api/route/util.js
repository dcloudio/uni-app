export const ANI_DURATION = 300
const ANI_SHOW = 'pop-in'
export const ANI_CLOSE = 'pop-out'

export function showWebview (webview, animationType, animationDuration, callback) {
  setTimeout(() => {
    webview.show(
      animationType || ANI_SHOW,
      parseInt(animationDuration) || ANI_DURATION,
      () => {
        callback && callback()
      }
    )
  }, 50)
}
