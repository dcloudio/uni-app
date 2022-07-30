import {
  callAppHook
} from '../util'

import createApp from './create-app'

export {
  getApp,
  getCurrentPages
}
  from './create-app'

const extend = Object.assign

function createLaunchOptions () {
  return {
    path: '',
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: '',
      extraData: {}
    }
  }
}

const enterOptions = createLaunchOptions()
const launchOptions = createLaunchOptions()

export function getLaunchOptions () {
  return launchOptions
}

export function getEnterOptions () {
  return enterOptions
}

export function initLaunchOptions ({
  path,
  query,
  referrerInfo
}) {
  extend(launchOptions, {
    path,
    query: query || {},
    referrerInfo: referrerInfo || {}
  })
  extend(enterOptions, launchOptions)
  return launchOptions
}

export function createAppMixin (Vue, routes, entryRoute) {
  return {
    created: function AppCreated () {
      createApp(Vue, this, routes)
      // TODO
      if (!entryRoute.meta.name) { // PageNotFound
        UniServiceJSBridge.emit('onPageNotFound', {
          path: entryRoute.path,
          query: entryRoute.query,
          isEntryPage: true
        })
        // TODO 跳转至缺省404页面
      }
    },

    beforeMount: function appBeforeMount () {
      // TODO 平台代码
      this.$el = document.getElementById('app')
    },
    mounted: function appMounted () {
      // 稍微靠后点，让 App 有机会在 mounted 事件前注册一些全局事件监听，如 UI 显示(showModal)
      initLaunchOptions({
        path: this.$route.meta && this.$route.meta.pagePath,
        query: this.$route.query
      })
      callAppHook(this, 'onLaunch', launchOptions)
      callAppHook(this, 'onShow', enterOptions)
    }
  }
}
