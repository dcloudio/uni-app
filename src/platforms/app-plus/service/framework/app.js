import {
  callAppHook
} from 'uni-core/service/plugins/util'

import initOn from 'uni-core/service/bridge/on'

import {
  getCurrentPages
} from './page'

import {
  registerPlusMessage
} from './plus-message'

import {
  isTabBarPage
} from '../api/util'

import tabBar from './tab-bar'

import {
  publish
} from '../bridge'

let appCtx

const NETWORK_TYPES = [
  'unknown',
  'none',
  'ethernet',
  'wifi',
  '2g',
  '3g',
  '4g'
]

export function getApp () {
  return appCtx
}

function initGlobalListeners () {
  const emit = UniServiceJSBridge.emit

  plus.key.addEventListener('backbutton', () => {
    // TODO uni?
    uni.navigateBack({
      from: 'backbutton'
    })
  })

  plus.globalEvent.addEventListener('pause', () => {
    emit('onAppEnterBackground')
  })

  plus.globalEvent.addEventListener('resume', () => {
    emit('onAppEnterForeground')
  })

  plus.globalEvent.addEventListener('netchange', () => {
    const networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()]
    publish('onNetworkStatusChange', {
      isConnected: networkType !== 'none',
      networkType
    })
  })
}

function initAppLaunch (appVm) {
  const args = {
    path: __uniConfig.entryPagePath,
    query: {},
    scene: 1001
  }

  callAppHook(appVm, 'onLaunch', args)
  callAppHook(appVm, 'onShow', args)
}

function initTabBar () {
  if (!__uniConfig.tabBar || !__uniConfig.tabBar.list.length) {
    return
  }

  const currentTab = isTabBarPage(__uniConfig.entryPagePath)
  if (currentTab) {
    // 取当前 tab 索引值
    __uniConfig.tabBar.selected = __uniConfig.tabBar.list.indexOf(currentTab)
    // 如果真实的首页与 condition 都是 tabbar，无需启用 realEntryPagePath 机制
    if (__uniConfig.realEntryPagePath && isTabBarPage(__uniConfig.realEntryPagePath)) {
      delete __uniConfig.realEntryPagePath
    }
  }

  __uniConfig.__ready__ = true

  const onLaunchWebviewReady = function onLaunchWebviewReady () {
    const tabBarView = tabBar.init(__uniConfig.tabBar, (item) => {
      uni.switchTab({
        url: '/' + item.pagePath,
        openType: 'switchTab',
        from: 'tabbar'
      })
    })
    tabBarView && plus.webview.getLaunchWebview().append(tabBarView)
  }
  if (plus.webview.getLaunchWebview()) {
    onLaunchWebviewReady()
  } else {
    registerPlusMessage('UniWebviewReady-' + plus.runtime.appid, onLaunchWebviewReady, false)
  }
}

export function registerApp (appVm) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerApp`)
  }

  appCtx = appVm

  appCtx.globalData = appVm.$options.globalData || {}

  initOn(UniServiceJSBridge.on, {
    getApp,
    getCurrentPages
  })

  initAppLaunch(appVm)

  initGlobalListeners()

  initTabBar()
}
