import api from './web-view-api'

const isAppPlus = /uni-app/i.test(navigator.userAgent)

const readyRE = /complete|loaded|interactive/

export function initWebviewApi (readyCallback) {
  if (!isAppPlus) {
    return
  }
  setTimeout(() => {
    if (window.plus && readyRE.test(document.readyState)) {
      readyCallback()
    } else {
      document.addEventListener('plusready', readyCallback)
    }
  }, 0)
  return api
}
