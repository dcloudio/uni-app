import {
  hasOwn
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
  VD_SYNC,
  PAGE_CREATE
} from '../../../constants'

import {
  ON_REACH_BOTTOM_DISTANCE
}
  from '../../constants'

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

  return {
    disableScroll,
    onPageScroll,
    onPageReachBottom,
    onReachBottomDistance
  }
}

export function initLifecycle (Vue) {
  lifecycleMixin(Vue)

  Vue.mixin({
    beforeCreate () {
      if (this.mpType === 'page') {
        this.$scope = this.$options.pageInstance
        this.$scope.$vm = this
        delete this.$options.pageInstance

        const route = this.$scope.route
        const pageId = this.$scope.$page.id
        // 通知页面已开始创建
        UniServiceJSBridge.publishHandler(VD_SYNC, {
          data: [
            [PAGE_CREATE, [pageId, route, parsePageCreateOptions(this, route)]]
          ],
          options: {
            timestamp: Date.now()
          }
        }, [pageId])
      }
    },
    created () {
      if (this.mpType === 'page') {
        callPageHook(this.$scope, 'onLoad', this.$options.pageQuery)
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
