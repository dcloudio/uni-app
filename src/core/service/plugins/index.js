import VueRouter from 'vue-router'

import {
  isPage
} from 'uni-helpers/index'

import {
  createAppMixin
} from './app'

import {
  createPageMixin
} from './page'

import {
  lifecycleMixin
} from './lifecycle'

import {
  initPolyfill
} from './polyfill'

import {
  getTabBarScrollPosition
} from './app/router-guard'

import {
  uniIdMixin
} from 'uni-shared'

function getMinId (routes) {
  let minId = 0
  routes.forEach(route => {
    if (route.meta.id) {
      minId++
    }
  })
  return minId
}

function getHash () {
  const href = window.location.href
  const index = href.indexOf('#')
  return index === -1 ? '' : decodeURI(href.slice(index + 1))
}

function getLocation (base = '/') {
  let path = decodeURI(window.location.pathname)
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}

/**
 * Service 层 Vue 插件
 * 1.init keepAliveInclude?
 * 2.init router
 * 3.init entryRoute
 * 4.hack vue _init (app)
 * 5.use router
 */
export default {
  install (Vue, {
    routes
  } = {}) {
    if (
      __PLATFORM__ === 'h5' &&
      Vue.config.devtools &&
      typeof window !== 'undefined' &&
      window.navigator.userAgent.toLowerCase().indexOf('hbuilderx') !== -1
    ) {
      // HBuilderX 内置浏览器禁用 devtools 提示
      Vue.config.devtools = false
    }

    initPolyfill(Vue)

    lifecycleMixin(Vue)

    uniIdMixin(Vue)

    /* eslint-disable no-undef */
    if (typeof __UNI_ROUTER_BASE__ !== 'undefined') {
      __uniConfig.router.base = __UNI_ROUTER_BASE__
    }
    const minId = getMinId(routes)
    const router = new VueRouter({
      id: minId,
      mode: __uniConfig.router.mode,
      base: __uniConfig.router.base,
      routes,
      scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          if (
            to &&
            from &&
            to.meta.isTabBar &&
            from.meta.isTabBar
          ) { // tabbar 跳 tabbar
            const position = getTabBarScrollPosition(to.params.__id__)
            if (position) {
              return position
            }
          }
          return {
            x: 0,
            y: 0
          }
        }
      }
    })
    const keepAliveInclude = []

    // 需跨平台，根据用户配置 hash 或 history 来调用
    const entryRoute = router.match(__uniConfig.router.mode === 'history' ? getLocation(__uniConfig.router.base)
      : getHash())

    if (entryRoute.meta.name) {
      if (entryRoute.meta.id) {
        keepAliveInclude.push(entryRoute.meta.name + '-' + entryRoute.meta.id)
      } else {
        keepAliveInclude.push(entryRoute.meta.name + '-' + (minId + 1))
      }
    }

    /* eslint-disable no-undef */
    if (__PLATFORM__ === 'h5') {
      if (entryRoute.meta && entryRoute.meta.name) {
        document.body.className = 'uni-body ' + entryRoute.meta.name
        if (entryRoute.meta.isNVue) {
          const nvueDirKey = 'nvue-dir-' + __uniConfig.nvue['flex-direction']
          document.body.setAttribute('nvue', '')
          document.body.setAttribute(nvueDirKey, '')
        }
      }
    }

    Vue.mixin({
      beforeCreate () {
        const options = this.$options
        if (options.mpType === 'app') {
          options.data = function () {
            return {
              keepAliveInclude
            }
          }
          const appMixin = createAppMixin(Vue, routes, entryRoute)
          // mixin app hooks
          Object.keys(appMixin).forEach(hook => {
            options[hook] = options[hook] ? [].concat(appMixin[hook], options[hook]) : [
              appMixin[hook]
            ]
          })

          // router
          options.router = router

          // onError
          if (!Array.isArray(options.onError) || options.onError.length === 0) {
            options.onError = [function (err) {
              console.error(err)
            }]
          }
        } else if (isPage(this)) {
          const pageMixin = createPageMixin()
          // mixin page hooks
          Object.keys(pageMixin).forEach(hook => {
            if (options.mpOptions) { // 小程序适配出来的 vue 组件（保证先调用小程序适配里的 created，再触发 onLoad）
              options[hook] = options[hook] ? [].concat(options[hook], pageMixin[hook]) : [
                pageMixin[hook]
              ]
            } else {
              options[hook] = options[hook] ? [].concat(pageMixin[hook], options[hook]) : [
                pageMixin[hook]
              ]
            }
          })
        } else {
          if (this.$parent && this.$parent.__page__) {
            this.__page__ = this.$parent.__page__
          }
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$page', {
      get () {
        return this.__page__
      }
    })

    Vue.prototype.createSelectorQuery = function createSelectorQuery () {
      return uni.createSelectorQuery().in(this)
    }

    Vue.prototype.createIntersectionObserver = function createIntersectionObserver (args) {
      return uni.createIntersectionObserver(this, args)
    }

    Vue.prototype.createMediaQueryObserver = function createMediaQueryObserver (args) {
      return uni.createMediaQueryObserver(this, args)
    }

    Vue.use(VueRouter)
  }

}
