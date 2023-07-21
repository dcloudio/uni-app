/* @flow */

const LIFECYCLE_HOOKS = [
  // App
  'onLaunch',
  'onShow',
  'onHide',
  'onUniNViewMessage',
  'onPageNotFound',
  'onThemeChange',
  'onError',
  'onUnhandledRejection',
  // Page
  'onInit',
  'onLoad',
  // 'onShow',
  'onReady',
  // 'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onTabItemTap',
  'onAddToFavorites',
  'onShareTimeline',
  'onShareAppMessage',
  'onResize',
  'onPageScroll',
  'onNavigationBarButtonTap',
  'onBackPress',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputConfirmed',
  'onNavigationBarSearchInputClicked',
  'onNavigationBarSearchInputFocusChanged',
  // Component
  // 'onReady', // 兼容旧版本，应该移除该事件
  'onPageShow',
  'onPageHide',
  'onPageResize',
  // 小程序的 created,attached 生命周期(需要在 service 层的 Vue 内核 mounted 时触发,因小程序 created 可以使用 selectComponent)
  'onServiceCreated',
  'onServiceAttached'
]

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

export function lifecycleMixin (Vue) {
  // fixed vue-class-component
  const oldExtend = Vue.extend
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}

    const methods = extendOptions.methods
    if (methods) {
      Object.keys(methods).forEach(methodName => {
        if (LIFECYCLE_HOOKS.indexOf(methodName) !== -1) {
          extendOptions[methodName] = methods[methodName]
          delete methods[methodName]
        }
      })
    }

    // script setup onPageScroll、onReachBottom not effective
    const setup = extendOptions.setup
    if (setup) {
      const injectHooks = ['onPageScroll', 'onReachBottom']
      let setupString = ''
      try {
        setupString = setup.toString()
      } catch (error) {}
      injectHooks.forEach(hook => {
        if (setupString.indexOf(`uniApp.${hook}`) && !extendOptions[hook]) {
          extendOptions[hook] = [() => {}]
        }
      })
    }

    return oldExtend.call(this, extendOptions)
  }

  const strategies = Vue.config.optionMergeStrategies
  const mergeHook = strategies.created
  LIFECYCLE_HOOKS.forEach(hook => {
    strategies[hook] = mergeHook
  })

  // mp runtime
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
