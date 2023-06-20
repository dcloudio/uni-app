import {
  parseQuery
} from 'uni-shared'

import {
  findExistsPageIndex
} from 'uni-helpers/index'

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

import {
  navigateBack
} from './navigate-back'

function _redirectTo ({
  url,
  path,
  query,
  exists
}, callbackId) {
  const pages = getCurrentPages()
  const len = pages.length - 1
  if (exists === 'back') {
    const existsPageIndex = findExistsPageIndex(url)
    if (existsPageIndex !== -1) {
      const delta = len - existsPageIndex
      if (delta > 0) {
        navigateBack({
          delta
        })
        invoke(callbackId, {
          errMsg: 'redirectTo:ok'
        })
        return
      }
    }
  }

  const lastPage = pages[len]

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
  url,
  exists
}, callbackId) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  navigate(path, function () {
    _redirectTo({
      url,
      path,
      query,
      exists
    }, callbackId)
  })
}
