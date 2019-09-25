import {
  callAppHook
} from 'uni-core/service/plugins/util'

import initOn from 'uni-core/service/bridge/on'

import {
  getCurrentPages
} from './page'

import {
  consumePlusMessage
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

  plus.globalEvent.addEventListener('KeyboardHeightChange', function (event) {
    publish('onKeyboardHeightChange', {
      height: event.height
    })
  })

  plus.globalEvent.addEventListener('plusMessage', function (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[plusMessage]:[' + Date.now() + ']' + JSON.stringify(e.data))
    }
    if (e.data && e.data.type) {
      const type = e.data.type
      consumePlusMessage(type, e.data.args || {})
    }
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

  __uniConfig.tabBar.selected = 0

  const selected = __uniConfig.tabBar.list.findIndex(page => page.pagePath === __uniConfig.entryPagePath)
  if (selected !== -1) {
    // 取当前 tab 索引值
    __uniConfig.tabBar.selected = selected
    // 如果真实的首页与 condition 都是 tabbar，无需启用 realEntryPagePath 机制
    if (__uniConfig.realEntryPagePath && isTabBarPage(__uniConfig.realEntryPagePath)) {
      delete __uniConfig.realEntryPagePath
    }
  }

  __uniConfig.__ready__ = true

  const onLaunchWebviewReady = function onLaunchWebviewReady () {
    tabBar.init(__uniConfig.tabBar, (item, index) => {
      UniServiceJSBridge.emit('onTabItemTap', {
        index,
        text: item.text,
        pagePath: item.pagePath
      })
      uni.switchTab({
        url: '/' + item.pagePath,
        openType: 'switchTab',
        from: 'tabBar'
      })
    })
  }
  onLaunchWebviewReady()
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
