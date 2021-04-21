import { App } from 'vue'
import { initAppConfig } from './appConfig'
import { initSubscribe } from './subscribe'
export * from './page'
export function initService(app: App) {
  initAppConfig(app._context.config)
  initSubscribe()
}
