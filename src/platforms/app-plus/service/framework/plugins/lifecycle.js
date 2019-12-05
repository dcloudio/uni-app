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
  ON_REACH_BOTTOM_DISTANCE
}
  from '../../constants'

import tabBar from '../tab-bar'

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
    onReachBottomDistance,
    windowTop: 0, // TODO
    windowBottom: (tabBar.indexOf(route) >= 0 && tabBar.cover) ? tabBar.height : 0
  }
}
const KEYS = ['data', 'properties', 'options', 'relations']

function mergeObject (ret, fromVal, key) {
  if (fromVal[key]) {
    Object.assign((ret[key] || (ret[key] = {})), fromVal[key])
  }
}

function mergeArray (toArray, fromArray) {
  toArray.push(...fromArray)
}

function mergeOptions (ret, toVal) {
  KEYS.forEach(key => {
    mergeObject(ret, toVal, key)
  })
  if (toVal.externalClasses) {
    mergeArray((ret.externalClasses || (ret.externalClasses = [])), toVal.externalClasses)
  }
  if (toVal.path) {
    ret.path = toVal.path
  }
}

export function initLifecycle (Vue) {
  lifecycleMixin(Vue)

  Vue.mixin({
    beforeCreate () {
      // TODO 临时解决方案,service 层也注入 wxs (适用于工具类)
      const options = this.$options

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

  const strategies = Vue.config.optionMergeStrategies

  strategies.mpOptions = function (toVal, fromVal) {
    // data,properties,options,externalClasses,relations,path
    if (!toVal) {
      return fromVal
    }
    const ret = Object.create(null)
    mergeOptions(ret, toVal)
    if (fromVal) {
      mergeOptions(ret, fromVal)
    }
    return ret
  }
}
