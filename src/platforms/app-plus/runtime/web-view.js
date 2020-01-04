import api from './web-view-api'

const isAppPlus = /uni-app/i.test(navigator.userAgent)

const readyRE = /complete|loaded|interactive/

export function initWebviewApi (readyCallback) {
  if (!isAppPlus) {
    return
  }
  if (window.__dcloud_weex_postMessage || window.__dcloud_weex_) { // nvue web-view
    document.addEventListener('DOMContentLoaded', readyCallback)
  } else if (window.plus && readyRE.test(document.readyState)) {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('plusready', readyCallback)
  }
  return api
}
