import {
  callAppHook
} from 'uni-core/service/plugins/util'

import Router from './router/index'

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

function initGlobalListeners ({
  plus,
  UniServiceJSBridge
}) {
  const emit = UniServiceJSBridge.emit

  plus.key.addEventListener('backbutton', () => {
    appCtx.$router.go(-1)
  })

  plus.globalEvent.addEventListener('pause', () => {
    emit('onAppEnterBackground')
  })

  plus.globalEvent.addEventListener('resume', () => {
    emit('onAppEnterForeground')
  })

  plus.globalEvent.addEventListener('netchange', () => {
    const networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()]
    emit('onNetworkStatusChange', {
      isConnected: networkType !== 'none',
      networkType
    })
  })
}

function initAppLaunch (appVm, {
  __uniConfig
}) {
  const args = {
    path: __uniConfig.entryPagePath,
    query: {},
    scene: 1001
  }

  callAppHook(appVm, 'onLaunch', args)
  callAppHook(appVm, 'onShow', args)
}

export function registerApp (appVm, instanceContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerApp`)
  }

  appCtx = appVm

  appCtx.$router = new Router(instanceContext)

  initAppLaunch(appVm, instanceContext)

  initGlobalListeners(instanceContext)
}
