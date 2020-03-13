import {
  callAppHook
} from 'uni-core/service/plugins/util'

import initOn from 'uni-core/service/bridge/on'

import {
  requireNativePlugin
} from '../bridge'

import {
  NETWORK_TYPES
} from '../api/constants'

import {
  getCurrentPages
} from './page'

import {
  consumePlusMessage
} from './plus-message'

import tabBar from './tab-bar'

import {
  publish
} from '../bridge'

import {
  initSubscribeHandlers
} from './subscribe-handlers'

import {
  perf
} from './perf'

import {
  backbuttonListener
} from './backbutton'

let appCtx

const defaultApp = {
  globalData: {}
}

export function getApp ({
  allowDefault = false
} = {}) {
  if (appCtx) { // 真实的 App 已初始化
    return appCtx
  }
  if (allowDefault) { // 返回默认实现
    return defaultApp
  }
  console.error(
    '[warn]: getApp() 操作失败，v3模式加速了首页 nvue 的启动速度，当在首页 nvue 中使用 getApp() 不一定可以获取真正的 App 对象。详情请参考：https://uniapp.dcloud.io/collocation/frame/window?id=getapp'
  )
}

function initGlobalListeners () {
  const globalEvent = requireNativePlugin('globalEvent')
  const emit = UniServiceJSBridge.emit

  // splashclosed 时开始监听 backbutton
  plus.globalEvent.addEventListener('splashclosed', () => {
    plus.key.addEventListener('backbutton', backbuttonListener)
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

  globalEvent.addEventListener('uistylechange', function (event) {
    publish('onUIStyleChange', {
      style: event.uistyle
    })
  })

  plus.globalEvent.addEventListener('plusMessage', onPlusMessage)

  // nvue webview post message
  plus.globalEvent.addEventListener('WebviewPostMessage', onPlusMessage)
}

function onPlusMessage (e) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[plusMessage]:[' + Date.now() + ']' + JSON.stringify(e.data))
  }
  if (e.data && e.data.type) {
    const type = e.data.type
    consumePlusMessage(type, e.data.args || {})
  }
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

  tabBar.init(__uniConfig.tabBar, (item, index) => {
    uni.switchTab({
      url: '/' + item.pagePath,
      openType: 'switchTab',
      from: 'tabBar',
      success () {
        UniServiceJSBridge.emit('onTabItemTap', {
          index,
          text: item.text,
          pagePath: item.pagePath
        })
      }
    })
  })

  if (selected !== -1) {
    // 取当前 tab 索引值
    __uniConfig.tabBar.selected = selected
    selected !== 0 && tabBar.switchTab(__uniConfig.entryPagePath)
  }
}

function initEntryPage () {
  let entryPagePath
  let entryPageQuery

  const weexPlus = weex.requireModule('plus')

  if (weexPlus.getRedirectInfo) {
    const info = weexPlus.getRedirectInfo() || {}
    entryPagePath = info.path
    entryPageQuery = info.query ? ('?' + info.query) : ''
  } else {
    const argsJsonStr = plus.runtime.arguments
    if (!argsJsonStr) {
      return
    }
    try {
      const args = JSON.parse(argsJsonStr)
      entryPagePath = args.path || args.pathName
      entryPageQuery = args.query ? ('?' + args.query) : ''
    } catch (e) {}
  }

  if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
    return
  }

  const entryRoute = '/' + entryPagePath
  const routeOptions = __uniRoutes.find(route => route.path === entryRoute)
  if (!routeOptions) {
    return
  }

  if (!routeOptions.meta.isTabBar) {
    __uniConfig.realEntryPagePath = __uniConfig.realEntryPagePath || __uniConfig.entryPagePath
  }

  __uniConfig.entryPagePath = entryPagePath
  __uniConfig.entryPageQuery = entryPageQuery

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] entryPagePath(${entryPagePath + entryPageQuery})`)
  }
}

export function registerApp (appVm) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerApp`)
  }

  appCtx = appVm
  appCtx.$vm = appVm

  Object.assign(appCtx, defaultApp) // 拷贝默认实现

  const globalData = appVm.$options.globalData || {}
  // merge globalData
  appCtx.globalData = Object.assign(globalData, appCtx.globalData)

  initOn(UniServiceJSBridge.on, {
    getApp,
    getCurrentPages
  })

  initEntryPage()

  initTabBar()

  initGlobalListeners()

  initSubscribeHandlers()

  initAppLaunch(appVm)

  __uniConfig.ready = true

  process.env.NODE_ENV !== 'production' && perf('registerApp')
}
