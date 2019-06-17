/* @flow */

const LIFECYCLE_HOOKS = [
  // App
  'onLaunch',
  'onShow',
  'onHide',
  'onUniNViewMessage',
  'onError',
  // Page
  'onLoad',
  // 'onShow',
  'onReady',
  // 'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onTabItemTap',
  'onShareAppMessage',
  'onResize',
  'onPageScroll',
  'onNavigationBarButtonTap',
  'onBackPress',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputConfirmed',
  'onNavigationBarSearchInputClicked',
  // Component
  // 'onReady', // 兼容旧版本，应该移除该事件
  'onPageShow',
  'onPageHide',
  'onPageResize'
]
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

    return oldExtend.call(this, extendOptions)
  }

  const strategies = Vue.config.optionMergeStrategies
  const mergeHook = strategies.created
  LIFECYCLE_HOOKS.forEach(hook => {
    strategies[hook] = mergeHook
  })
}
