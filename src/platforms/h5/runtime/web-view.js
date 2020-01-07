import api from '../../app-plus/runtime/web-view-api'

export function initWebviewApi (readyCallback) {
  document.addEventListener('DOMContentLoaded', readyCallback)
  return api
}
