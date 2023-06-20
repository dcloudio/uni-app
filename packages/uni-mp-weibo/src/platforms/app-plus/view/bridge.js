import {
  APP_SERVICE_ID
} from '../constants'
import {
  plusReady
} from 'uni-shared'

export function publishHandler (event, args = {}) {
  plusReady(function () {
    const pageId = plus.webview.currentWebview().id
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[VIEW][${Date.now()}]:`, event, args, pageId)
    }
    plus.webview.postMessageToUniNView({
      type: 'subscribeHandler',
      args: {
        type: event,
        data: args,
        pageId
      }
    }, APP_SERVICE_ID)
  })
}
