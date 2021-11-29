import path from 'path'
import debug from 'debug'
import type { Plugin } from 'vite'
import { normalizePath, parseVueRequest } from '@dcloudio/uni-cli-shared'

const debugSetup = debug('vite:uni:setup')

export function uniSetupPlugin(): Plugin {
  let appVuePath: string
  return {
    name: 'vite:uni-setup',
    configResolved() {
      appVuePath = normalizePath(
        path.resolve(process.env.UNI_INPUT_DIR, 'App.vue')
      )
    },
    transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (filename === appVuePath && !query.vue) {
        debugSetup(filename)
        return (
          code +
          `;import { setupApp } from '@dcloudio/uni-h5';setupApp(_sfc_main);`
        )
      }
    },
  }
}
