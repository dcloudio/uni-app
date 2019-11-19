import api from '../../app-plus/runtime/web-view-api'

export function initWebviewApi (readyCallback) {
  setTimeout(() => {
    document.addEventListener('DOMContentLoaded', readyCallback)
  }, 0)
  return api
}
