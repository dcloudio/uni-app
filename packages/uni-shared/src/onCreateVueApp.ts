import type { App } from 'vue'
import { once } from './utils'
type CreateVueAppHook = (app: App) => void

let vueApp: App
const createVueAppHooks: CreateVueAppHook[] = []
/**
 * 提供 createApp 的回调事件，方便三方插件接收 App 对象，处理挂靠全局 mixin 之类的逻辑
 */
export function onCreateVueApp(hook: CreateVueAppHook) {
  // TODO 每个 nvue 页面都会触发
  if (vueApp) {
    return hook(vueApp)
  }
  createVueAppHooks.push(hook)
}

export function invokeCreateVueAppHook(app: App) {
  vueApp = app
  createVueAppHooks.forEach((hook) => hook(app))
}

export const invokeCreateErrorHandler = once(
  (
    app: App,
    createErrorHandler: (app: App) => App['config']['errorHandler']
  ) => {
    // 不再判断开发者是否监听了onError，直接返回 createErrorHandler，内部 errorHandler 会调用开发者自定义的 errorHandler，以及判断开发者是否监听了onError
    return createErrorHandler(app)
  }
)
