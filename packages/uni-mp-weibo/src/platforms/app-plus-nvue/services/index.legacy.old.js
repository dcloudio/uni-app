import initUni from './api/legacy/index'
import initUpx2px from './api/upx2px'
import initEventBus from './api/event-bus'

let getGlobalUni
let getGlobalApp
let getGlobalUniEmitter
let getGlobalCurrentPages

export default {
  create (id, env, config) {
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
      instance: {
        getUni (nvue, plus, BroadcastChannel) {
          return initUni(getGlobalUni(), nvue, plus, BroadcastChannel)
        },
        getApp () {
          return getGlobalApp()
        },
        getUniEmitter () {
          return getGlobalUniEmitter()
        },
        getCurrentPages (returnAll) {
          return getGlobalCurrentPages(returnAll)
        }
      }
    }
  },

  refresh: function (id, env, config) {

  },

  destroy: function (id, env) {

  }
}
