export const ANI_DURATION = 300
const ANI_SHOW = 'pop-in'
export const ANI_CLOSE = 'pop-out'

export function showWebview (webview, animationType, animationDuration, callback, delay = 50) {
  function show () {
    webview.show(
      animationType || ANI_SHOW,
      parseInt(animationDuration) || ANI_DURATION,
      () => {
        callback && callback()
      }
    )
  }
  if (delay) {
    setTimeout(show, delay)
  } else {
    show()
  }
}
