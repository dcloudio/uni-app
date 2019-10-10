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

import tabBar from '../../../../app-plus/service/framework/tab-bar'

export function reLaunch ({
  url
}, callbackId) {
  const urls = url.split('?')
  const path = urls[0]

  const query = parseQuery(urls[1] || '')

  const pages = getCurrentPages(true).slice(0)

  const routeOptions = __uniRoutes.find(route => route.path === path)

  if (routeOptions.meta.isTabBar) {
    tabBar.switchTab(url)
  }

  showWebview(
    __registerPage({
      path,
      query,
      openType: 'reLaunch'
    }),
    'none',
    0,
    () => {
      invoke(callbackId, {
        errMsg: 'reLaunch:ok'
      })
    }
  )

  pages.forEach(page => {
    page.$remove()
    page.$getAppWebview().close('none')
  })

  setStatusBarStyle()
}
