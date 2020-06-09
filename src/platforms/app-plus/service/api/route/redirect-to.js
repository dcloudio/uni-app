import {
  parseQuery
} from 'uni-shared'

import {
  showWebview
} from './util'

import {
  setStatusBarStyle,
  invoke
} from '../../bridge'

import {
  registerPage,
  removePreloadWebview
} from '../../framework/page'

import {
  navigate
} from '../../framework/navigator'

function _redirectTo ({
  url,
  path,
  query
}, callbackId) {
  const pages = getCurrentPages()
  const lastPage = pages[pages.length - 1]

  lastPage && lastPage.$remove()

  showWebview(
    registerPage({
      url,
      path,
      query,
      openType: 'redirect'
    }),
    'none',
    0,
    () => {
      if (lastPage) {
        const webview = lastPage.$getAppWebview()
        if (webview.__preload__) {
          removePreloadWebview(webview)
        }
        webview.close('none')
      }
      invoke(callbackId, {
        errMsg: 'redirectTo:ok'
      })
    }
  )

  setStatusBarStyle()
}
export function redirectTo ({
  url
}, callbackId) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  navigate(path, function () {
    _redirectTo({
      url,
      path,
      query
    }, callbackId)
  })
}
