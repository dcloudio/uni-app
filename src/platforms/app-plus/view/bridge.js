import {
  APP_SERVICE_ID
} from '../constants'

function plusReady (callback) {
  if (!callback) {
    return
  }
  if (window.plus) {
    return callback()
  }
  document.addEventListener('plusready', callback)
}

export function publishHandler (event, args = {}) {
  plusReady(function () {
    plus.webview.postMessageToUniNView({
      type: 'subscribeHandler',
      args: {
        type: event,
        data: args,
        pageId: plus.webview.currentWebview().id
      }
    }, APP_SERVICE_ID)
  })
}
