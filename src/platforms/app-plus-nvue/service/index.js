import {
  getApp,
  registerApp
} from './app'

import {
  getCurrentPages
} from './page'

import {
  createUniInstance
} from './uni'

const __uniConfig = Object.create(null)
const __uniRoutes = []

export function createInstanceContext ({
  weex,
  WeexPlus
}) {
  const plus = new WeexPlus(weex)
  return {
    __uniConfig,
    __uniRoutes,
    __registerApp (appVm, {
      uniConfig,
      uniRoutes
    }) {
      Object.assign(__uniConfig, uniConfig)
      uniRoutes.forEach(route => __uniRoutes.push(route))
      registerApp(appVm, __uniRoutes, plus)
    },
    uni: createUniInstance(plus),
    getApp,
    getCurrentPages
  }
}
