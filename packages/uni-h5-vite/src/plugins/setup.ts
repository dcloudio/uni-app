import path from 'path'
import debug from 'debug'
import { Plugin } from 'vite'
import {
  EXTNAME_JS_RE,
  normalizePath,
  parseVueRequest,
} from '@dcloudio/uni-cli-shared'

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
      if (query.mpType === 'page') {
        debugSetup(filename)
        // js,ts,jsx,tsx
        const isJs = EXTNAME_JS_RE.test(filename)
        if (isJs) {
          code = code.replace(/export\s+default/, 'const _sfc_main =')
        }
        code += `;import { setupPage } from '@dcloudio/uni-h5';setupPage(_sfc_main);`
        if (isJs) {
          code += ';export default _sfc_main;'
        }
        return code
      }
    },
  }
}
