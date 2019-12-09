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
  'onPageResize',
  // 小程序的 created,attached 生命周期(需要在 service 层的 Vue 内核 mounted 时触发,因小程序 created 可以使用 selectComponent)
  'onServiceCreated',
  'onServiceAttached'
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
