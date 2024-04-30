import type { App } from 'vue'
import { initAppConfig } from './appConfig'

export function initViewPlugin(app: App) {
  if (__NODE_JS__) {
    return
  }
  initAppConfig(app._context.config)
  // TODO wxs,behaviors
}
