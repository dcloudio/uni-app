import {
  getRouterOptions,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'
import type { Plugin } from 'vite'
import { uniTimestampMiddleware } from './middlewares/timestamp'
import { initSSR } from './ssr'
import { initStatic } from './static'

export function createConfigureServer(): Plugin['configureServer'] {
  return function (server) {
    initSSR(server)

    const routerOptions = getRouterOptions(
      parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    )
    if (routerOptions.mode === 'history') {
      server.middlewares.use(uniTimestampMiddleware(server))
    }
    return () => {
      initStatic(server)
    }
  }
}
