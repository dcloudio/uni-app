import {
  parseQuery
} from 'uni-shared'

import {
  invoke
} from '../../bridge'

import {
  preloadWebview,
  closePreloadWebview
} from '../../framework/page'

export function unPreloadPage ({
  url
}) {
  const webview = closePreloadWebview({
    url
  })
  if (webview) {
    return {
      id: webview.id,
      url,
      errMsg: 'unPreloadPage:ok'
    }
  }
  return {
    url,
    errMsg: 'unPreloadPage:fail not found'
  }
}

export function preloadPage ({
  url
}, callbackId) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  const webview = preloadWebview({
    url,
    path,
    query
  })
  invoke(callbackId, {
    id: webview.id,
    url,
    errMsg: 'preloadPage:ok'
  })
}
