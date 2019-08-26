import initUni from './api/legacy/index'
import initUpx2px from './api/upx2px'
import initEventBus from './api/event-bus'

let getGlobalUni
let getGlobalApp
let getGlobalUniEmitter
let getGlobalCurrentPages

export function createInstanceContext () {
  return {
    initUniApp ({
      nvue,
      getUni,
      getApp,
      getUniEmitter,
      getCurrentPages
    }) {
      getGlobalUni = getUni
      getGlobalApp = getApp
      getGlobalUniEmitter = getUniEmitter
      getGlobalCurrentPages = getCurrentPages

      initUpx2px(nvue)
      initEventBus(getUniEmitter)
    },
    getUni (nvue, plus, BroadcastChannel) {
      return initUni(getGlobalUni(), nvue, plus, BroadcastChannel)
    },
    getApp () {
      return getGlobalApp()
    },
    getUniEmitter () {
      return getGlobalUniEmitter()
    },
    getCurrentPages () {
      return getGlobalCurrentPages()
    }
  }
}
