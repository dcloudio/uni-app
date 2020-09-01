import { App } from 'vue'

import { initAppConfig } from './appConfig'

export function initService(app: App) {
  initAppConfig(app._context.config)
}
