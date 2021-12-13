import {
  initAppLocale
} from 'uni-helpers/i18n'

import {
  callAppHook
} from 'uni-core/service/plugins/util'

import initOn from 'uni-core/service/bridge/on'

import {
  NETWORK_TYPES,
  TEMP_PATH,
  TEMP_PATH_BASE
} from '../api/constants'

import {
  initEntryPage
} from './config'

import {
  getCurrentPages
} from './page'

import {
  consumePlusMessage
} from './plus-message'

import tabBar from './tab-bar'

import {
  publish,
  requireNativePlugin
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

import {
  getEnterOptions,
  initEnterOptions,
  initLaunchOptions,
  parseRedirectInfo
} from './utils'

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
    '[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.'
  )
}

function initGlobalListeners () {
  const globalEvent = requireNativePlugin('globalEvent')
  const emit = UniServiceJSBridge.emit

  if (weex.config.preload) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[uni-app] preload.addEventListener.backbutton')
    }
    plus.key.addEventListener('backbutton', backbuttonListener)
  } else {
    // splashclosed 时开始监听 backbutton
    plus.globalEvent.addEventListener('splashclosed', () => {
      plus.key.addEventListener('backbutton', backbuttonListener)
    })
  }

  plus.globalEvent.addEventListener('pause', () => {
    emit('onAppEnterBackground')
  })

  plus.globalEvent.addEventListener('resume', () => {
    const info = parseRedirectInfo()
    if (info && info.userAction) {
      initEnterOptions(info)
    }
    emit('onAppEnterForeground', getEnterOptions())
  })

  plus.globalEvent.addEventListener('netchange', () => {
    const networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()] || 'unknown'
    publish('onNetworkStatusChange', {
      isConnected: networkType !== 'none',
      networkType
    })
  })

  let keyboardHeightChange = 0
  plus.globalEvent.addEventListener('KeyboardHeightChange', function (event) {
    // 安卓设备首次获取高度为 0
    if (keyboardHeightChange !== event.height) {
      keyboardHeightChange = event.height
      publish('onKeyboardHeightChange', {
        height: keyboardHeightChange
      })
    }
  })

  globalEvent.addEventListener('uistylechange', function (event) {
    const args = {
      theme: event.uistyle
    }

    callAppHook(appCtx, 'onThemeChange', args)
    publish('onThemeChange', args)

    // 兼容旧版本 API
    publish('onUIStyleChange', {
      style: event.uistyle
    })
  })

  globalEvent.addEventListener('uniMPNativeEvent', function (event) {
    publish('uniMPNativeEvent', event)
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
  const args = initLaunchOptions({
    path: __uniConfig.entryPagePath,
    query: __uniConfig.entryPageQuery,
    referrerInfo: __uniConfig.referrerInfo
  })

  callAppHook(appVm, 'onLaunch', args)
  callAppHook(appVm, 'onShow', args)
  // https://tower.im/teams/226535/todos/16905/
  const getAppState = weex.requireModule('plus').getAppState
  const appState = getAppState && Number(getAppState())
  if (appState === 2) {
    callAppHook(appVm, 'onHide', args)
  }
}

function initTabBar () {
  if (!__uniConfig.tabBar || !__uniConfig.tabBar.list || !__uniConfig.tabBar.list.length) {
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

export function clearTempFile () {
  // 统一处理路径
  function getPath (path) {
    path = path.replace(/\/$/, '')
    return path.indexOf('_') === 0 ? plus.io.convertLocalFileSystemURL(path) : path
  }
  var basePath = getPath(TEMP_PATH_BASE)
  var tempPath = getPath(TEMP_PATH)
  // 获取父目录
  var dirPath = tempPath.split('/')
  dirPath.pop()
  dirPath = dirPath.join('/')
  plus.io.resolveLocalFileSystemURL(plus.io.convertAbsoluteFileSystem(dirPath), entry => {
    var reader = entry.createReader()
    reader.readEntries(function (entries) {
      if (entries && entries.length) {
        entries.forEach(function (entry) {
          if (entry.isDirectory && entry.fullPath.indexOf(basePath) === 0 && entry.fullPath
            .indexOf(tempPath) !== 0) {
            entry.removeRecursively()
          }
        })
      }
    })
  })
}

export function registerApp (appVm, Vue) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[uni-app] registerApp')
  }
  appCtx = appVm
  appCtx.$vm = appVm
  initAppLocale(Vue, appVm)

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

  // 10s后清理临时文件
  setTimeout(clearTempFile, 10000)

  __uniConfig.ready = true

  process.env.NODE_ENV !== 'production' && perf('registerApp')
}
