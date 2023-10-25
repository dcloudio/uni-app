import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'
import {
  parseVueRequest,
  resolveAppVue,
  withSourcemap,
} from '@dcloudio/uni-cli-shared'

const debugSetup = debug('uni:setup')

export function uniSetupPlugin(): Plugin {
  let appVuePath: string
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:setup',
    configResolved(config) {
      resolvedConfig = config
      appVuePath = resolveAppVue(process.env.UNI_INPUT_DIR)
    },
    transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (filename === appVuePath && !query.vue) {
        debugSetup(filename)
        return {
          code:
            code +
            `;import { setupApp } from '@dcloudio/uni-h5';setupApp(_sfc_main);`,
          map: withSourcemap(resolvedConfig)
            ? this.getCombinedSourcemap()
            : null,
        }
      }
    },
  }
}
