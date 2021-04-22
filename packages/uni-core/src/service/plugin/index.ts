import { App } from 'vue'
import { initAppConfig } from './appConfig'
import { initOn } from './on'
import { initSubscribe } from './subscribe'
export * from './page'
export function initService(app: App) {
  initOn()
  initSubscribe()

  initAppConfig(app._context.config)
}
