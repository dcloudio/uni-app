import {
  newSetStatusBarStyle,
  restoreOldSetStatusBarStyle,
} from '../../statusBar'

export function restoreGlobal(
  newVue: unknown,
  newWeex: unknown,
  newPlus: unknown,
  newSetTimeout: unknown,
  newClearTimeout: unknown,
  newSetInterval: unknown,
  newClearInterval: unknown
) {
  // 确保部分全局变量 是 app-service 中的
  // 若首页 nvue 初始化比 app-service 快，导致框架处于该 nvue 环境下
  // plus 如果不用 app-service，资源路径会出问题
  // 若首页 nvue 被销毁，如 redirectTo 或 reLaunch，则这些全局功能会损坏

  // 设置 vue3
  // @ts-ignore 最终__VUE__会被替换为vue
  __VUE__ = newVue
  if (plus !== newPlus) {
    if (__DEV__) {
      console.log(`[restoreGlobal][${Date.now()}]`)
    }
    weex = newWeex
    // @ts-ignore
    plus = newPlus
    restoreOldSetStatusBarStyle(plus.navigator.setStatusBarStyle)
    plus.navigator.setStatusBarStyle = newSetStatusBarStyle
    /* eslint-disable no-global-assign */
    // @ts-ignore
    setTimeout = newSetTimeout
    // @ts-ignore
    clearTimeout = newClearTimeout
    // @ts-ignore
    setInterval = newSetInterval
    // @ts-ignore
    clearInterval = newClearInterval
  }
  __uniConfig.serviceReady = true
}
