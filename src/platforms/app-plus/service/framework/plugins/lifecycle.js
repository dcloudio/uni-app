import {
  hasOwn,
  decodedQuery
} from 'uni-shared'

import {
  hasLifecycleHook
} from 'uni-helpers/index'

import {
  callPageHook
} from 'uni-core/service/plugins/util'

import {
  lifecycleMixin
}
  from 'uni-core/service/plugins/lifecycle'

import {
  ON_REACH_BOTTOM_DISTANCE,
  TITLEBAR_HEIGHT
}
  from '../../constants'

import tabBar from '../tab-bar'

import {
  getStatusbarHeight
} from '../../api/util'

function parsePageCreateOptions (vm, route) {
  const pagePath = '/' + route
  const routeOptions = __uniRoutes.find(route => route.path === pagePath)

  const windowOptions = Object.assign({}, __uniConfig.window, routeOptions.window)
  const disableScroll = windowOptions.disableScroll === true ? 1 : 0
  const onReachBottomDistance = hasOwn(windowOptions, 'onReachBottomDistance')
    ? parseInt(windowOptions.onReachBottomDistance)
    : ON_REACH_BOTTOM_DISTANCE

  const onPageScroll = hasLifecycleHook(vm.$options, 'onPageScroll') ? 1 : 0
  const onPageReachBottom = hasLifecycleHook(vm.$options, 'onReachBottom') ? 1 : 0
  const statusbarHeight = getStatusbarHeight()

  return {
    disableScroll,
    onPageScroll,
    onPageReachBottom,
    onReachBottomDistance,
    statusbarHeight,
    windowTop: windowOptions.titleNView && windowOptions.titleNView.type === 'float' ? (statusbarHeight +
      TITLEBAR_HEIGHT) : 0,
    windowBottom: (tabBar.indexOf(route) >= 0 && tabBar.cover) ? tabBar.height : 0
  }
}

export function initLifecycle (Vue) {
  lifecycleMixin(Vue)

  Vue.mixin({
    beforeCreate () {
      // TODO 临时解决方案,service 层也注入 wxs (适用于工具类)
      const options = this.$options

      // 自动挂载 $store
      if (options.store && !Vue.prototype.$store) {
        Vue.prototype.$store = options.store
      }

      const wxs = options.wxs
      if (wxs) {
        Object.keys(wxs).forEach(module => {
          this[module] = wxs[module]
        })
      }

      if (this.mpType === 'page') {
        this.$scope = this.$options.pageInstance
        this.$scope.$vm = this
        delete this.$options.pageInstance

        const route = this.$scope.route
        const pageId = this.$scope.$page.id
        // 通知页面已开始创建
        this._$vd.sendPageCreate([pageId, route, parsePageCreateOptions(this, route)])
      }
    },
    created () {
      if (this.mpType === 'page') {
        // 理论上应该从最开始的 parseQuery 的地方直接 decode 两次，为了减少影响范围，先仅处理 onLoad 参数
        callPageHook(this.$scope, 'onLoad', decodedQuery(this.$options.pageQuery))
        callPageHook(this.$scope, 'onShow')
      }
    },
    beforeDestroy () {
      if (this.mpType === 'page') {
        callPageHook(this.$scope, 'onUnload')
      }
    },
    mounted () {
      if (this.mpType === 'page') {
        callPageHook(this.$scope, 'onReady')
      }
    }
  })
}
