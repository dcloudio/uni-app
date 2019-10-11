import {
  ANI_CLOSE,
  ANI_DURATION,
  showWebview
} from './util'

import {
  setStatusBarStyle
} from '../../bridge'

import {
  registerPage
} from '../../framework/page'

import {
  navigate
} from '../../framework/navigator'

import tabBar from '../../../../app-plus/service/framework/tab-bar'

function _switchTab ({
  path,
  from
}) {
  tabBar.switchTab(path.slice(1))

  const pages = getCurrentPages()
  const len = pages.length

  if (len >= 1) { // 前一个页面是非 tabBar 页面
    const currentPage = pages[len - 1]
    if (!currentPage.$page.meta.isTabBar) {
      pages.reverse().forEach(page => {
        if (!page.$page.meta.isTabBar && page !== currentPage) {
          page.$remove()
          page.$getAppWebview().close('none')
        }
      })
      currentPage.$remove()
      if (currentPage.$page.openType === 'redirect') {
        currentPage.$getAppWebview().close(ANI_CLOSE, ANI_DURATION)
      } else {
        currentPage.$getAppWebview().close('auto')
      }
    } else {
      // 前一个 tabBar 触发 onHide
      currentPage.$vm.__call_hook('onHide')
    }
  }

  let tabBarPage
  // 查找当前 tabBarPage，且设置 visible
  getCurrentPages(true).forEach(page => {
    if (('/' + page.route) === path) {
      page.$page.meta.visible = true
      tabBarPage = page
    } else {
      if (page.$page.meta.isTabBar) {
        page.$page.meta.visible = false
      }
    }
  })

  if (tabBarPage) {
    tabBarPage.$vm.__call_hook('onShow')
    tabBarPage.$getAppWebview().show('none')
  } else {
    showWebview(
      registerPage({
        path,
        query: {},
        openType: 'switchTab'
      })
    )
  }

  setStatusBarStyle()
}
export function switchTab ({
  url,
  from
}) {
  const path = url.split('?')[0]
  navigate(path, function () {
    _switchTab({
      path,
      from
    })
  })
}
