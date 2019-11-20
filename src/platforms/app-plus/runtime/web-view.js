import api from './web-view-api'

const isAppPlus = /uni-app/i.test(navigator.userAgent)

const readyRE = /complete|loaded|interactive/

export function initWebviewApi (readyCallback) {
  if (!isAppPlus) {
    return
  }
  if (window.plus && readyRE.test(document.readyState)) {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('plusready', readyCallback)
  }
  return api
}
