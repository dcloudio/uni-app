import {
  callAppHook
} from '../util'

import createApp from './create-app'

export {
  getApp,
  getCurrentPages
}
  from './create-app'

export function createAppMixin (routes, entryRoute) {
  return {
    created: function AppCreated () {
      createApp(this, routes)
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
      callAppHook(this, 'onLaunch', {
        scene: 1001
      })
      callAppHook(this, 'onShow', {})
    }
  }
}
