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

export function createInstanceContext ({
  weex,
  WeexPlus
}) {
  const plus = new WeexPlus(weex)
  return {
    __uniConfig: uniConfig,
    __uniRoutes: uniRoutes,
    __registerConfig (config) {
      registerConfig(config)
    },
    __registerApp (appVm) {
      registerApp(appVm, uniRoutes, plus)
    },
    __registerPage (pageVm) {
      registerPage(pageVm)
    },
    uni: createUniInstance(
      weex,
      plus,
      __uniConfig,
      __uniRoutes,
      getApp,
      getCurrentPages
    ),
    getApp,
    getCurrentPages
  }
}
