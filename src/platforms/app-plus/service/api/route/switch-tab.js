import {
  parseQuery
} from 'uni-shared'

import {
  ANI_CLOSE,
  ANI_DURATION
} from '../../constants'

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

import {
  navigate
} from '../../framework/navigator'

import tabBar from '../../framework/tab-bar'

function _switchTab ({
  url,
  path,
  query,
  from
}, callbackId) {
  tabBar.switchTab(path.slice(1))

  const pages = getCurrentPages()
  const len = pages.length

  let callOnHide = false
  let callOnShow = false

  let currentPage
  if (len >= 1) { // 前一个页面是非 tabBar 页面
    currentPage = pages[len - 1]
    if (!currentPage.$page.meta.isTabBar) {
      // 前一个页面为非 tabBar 页面时，目标tabBar需要强制触发onShow
      // 该情况下目标页tabBarPage的visible是不对的
      // 除非每次路由跳转都处理一遍tabBarPage的visible，目前仅switchTab会处理
      // 简单起见，暂时直接判断该情况，执行onShow
      callOnShow = true
      pages.reverse().forEach(page => {
        if (!page.$page.meta.isTabBar && page !== currentPage) {
          page.$remove()
          page.$getAppWebview().close('none')
        }
      })
      currentPage.$remove()
      // 延迟执行避免iOS应用退出
      setTimeout(() => {
        if (currentPage.$page.openType === 'redirect') {
          currentPage.$getAppWebview().close(ANI_CLOSE, ANI_DURATION)
        } else {
          currentPage.$getAppWebview().close('auto')
        }
      }, 100)
    } else {
      callOnHide = true
    }
  }

  let tabBarPage
  // 查找当前 tabBarPage，且设置 visible
  getCurrentPages(true).forEach(page => {
    if (('/' + page.route) === path) {
      if (!page.$page.meta.visible) { // 之前未显示
        callOnShow = true
      }
      page.$page.meta.visible = true
      tabBarPage = page
    } else {
      if (page.$page.meta.isTabBar) {
        page.$page.meta.visible = false
      }
    }
  })
  // 相同tabBar页面
  if (currentPage === tabBarPage) {
    callOnHide = false
  }
  if (currentPage && callOnHide) {
    currentPage.$vm.__call_hook('onHide')
  }
  if (tabBarPage) {
    tabBarPage.$getAppWebview().show('none')
    // 等visible状态都切换完之后，再触发onShow，否则开发者在onShow里边 getCurrentPages 会不准确
    callOnShow && tabBarPage.$vm.__call_hook('onShow')
  } else {
    return showWebview(registerPage({
      url,
      path,
      query,
      openType: 'switchTab'
    }), 'none', 0, () => {
      setStatusBarStyle()
      invoke(callbackId, {
        errMsg: 'switchTab:ok'
      })
    }, 70)
  }

  setStatusBarStyle()
  invoke(callbackId, {
    errMsg: 'switchTab:ok'
  })
}

export function switchTab ({
  url,
  from,
  openType
}, callbackId) {
  // 直达时，允许 tabBar 带参数
  const urls = url.split('?')
  const path = urls[0]
  const query = parseQuery(urls[1] || '')
  navigate(path, function () {
    _switchTab({
      url,
      path,
      query,
      from
    }, callbackId)
  }, openType === 'appLaunch')
}
