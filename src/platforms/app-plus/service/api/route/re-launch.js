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
  registerPage
} from '../../framework/page'

import tabBar from '../../../../app-plus/service/framework/tab-bar'

import {
  navigate
} from '../../framework/navigator'

function _reLaunch ({
  url,
  path,
  query
}, callbackId) {
  const pages = getCurrentPages(true).slice(0)

  const routeOptions = __uniRoutes.find(route => route.path === path)

  if (routeOptions.meta.isTabBar) {
    tabBar.switchTab(path.slice(1))
  }

  showWebview(
    registerPage({
      url,
      path,
      query,
      openType: 'reLaunch'
    }),
    'none',
    0,
    () => {
      pages.forEach(page => {
        page.$remove()
        page.$getAppWebview().close('none')
      })
      invoke(callbackId, {
        errMsg: 'reLaunch:ok'
      })
    }
  )

  setStatusBarStyle()
}

export function reLaunch ({
  url
}, callbackId) {
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  navigate(path, function () {
    _reLaunch({
      url,
      path,
      query
    }, callbackId)
  })
}
