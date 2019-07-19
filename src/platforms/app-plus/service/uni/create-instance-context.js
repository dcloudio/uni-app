import {
  getApp,
  registerApp
} from './app'

import {
  registerPage,
  getCurrentPages
} from './page'

import {
  uniConfig,
  uniRoutes,
  registerConfig
} from './config'

import {
  createUniInstance
} from './uni'

import {
  initServiceJSBridge
} from './bridge'

export function createInstanceContext (instanceContext) {
  const {
    weex,
    Vue,
    WeexPlus
  } = instanceContext
  const plus = new WeexPlus(weex)
  const UniServiceJSBridge = initServiceJSBridge(Vue, {
    getApp,
    getCurrentPages
  })
  return {
    __uniConfig: uniConfig,
    __uniRoutes: uniRoutes,
    __registerConfig (config) {
      return registerConfig(config, instanceContext)
    },
    __registerApp (appVm) {
      return registerApp(appVm, instanceContext)
    },
    __registerPage (page) {
      return registerPage(page, instanceContext)
    },
    plus,
    uni: createUniInstance(
      weex,
      plus,
      uniConfig,
      uniRoutes,
      UniServiceJSBridge,
      getApp,
      getCurrentPages
    ),
    getApp,
    getCurrentPages,
    UniServiceJSBridge
  }
}
