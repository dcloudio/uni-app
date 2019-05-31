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
        getUni (nvue) {
          return initUni(getGlobalUni(), nvue)
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
  },

  refresh: function (id, env, config) {

  },

  destroy: function (id, env) {

  }
}
