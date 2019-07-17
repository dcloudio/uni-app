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

export function createInstanceContext (instanceContext) {
  const {
    weex,
    WeexPlus
  } = instanceContext
  const plus = new WeexPlus(weex)
  return {
    __uniConfig: uniConfig,
    __uniRoutes: uniRoutes,
    __registerConfig (config) {
      registerConfig(config, instanceContext)
    },
    __registerApp (appVm) {
      registerApp(appVm, instanceContext)
    },
    __registerPage (page) {
      registerPage(page, instanceContext)
    },
    plus,
    uni: createUniInstance(
      weex,
      plus,
      uniConfig,
      uniRoutes,
      getApp,
      getCurrentPages
    ),
    getApp,
    getCurrentPages
  }
}
