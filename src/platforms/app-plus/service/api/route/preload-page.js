import {
  parseQuery
} from 'uni-shared'

import {
  invoke
} from '../../bridge'

import {
  preloadWebview
} from '../../framework/page'

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
