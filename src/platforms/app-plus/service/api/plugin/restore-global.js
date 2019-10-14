export function restoreGlobal (
  newPlus,
  newSetTimeout,
  newClearTimeout,
  newSetInterval,
  newClearInterval
) {
  // 确保部分全局变量 是 app-service 中的
  // 若首页 nvue 初始化比 app-service 快，导致框架处于该 nvue 环境下
  // plus 如果不用 app-service，资源路径会出问题
  // 若首页 nvue 被销毁，如 redirectTo 或 reLaunch，则这些全局功能会损坏
  if (plus !== newPlus) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[restoreGlobal][${Date.now()}]`)
    }
    plus = newPlus
    /* eslint-disable no-global-assign */
    setTimeout = newSetTimeout
    clearTimeout = newClearTimeout
    setInterval = newSetInterval
    clearInterval = newClearInterval
  }
}
