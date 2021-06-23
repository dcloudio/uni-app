import { Plugin } from 'vite'

import {
  defineUniPagesJsonPlugin,
  normalizeAppPagesJson,
  normalizeAppConfigService,
  normalizePagesJson,
} from '@dcloudio/uni-cli-shared'

export function uniPagesJsonPlugin(): Plugin {
  let pagesJson: UniApp.PagesJson
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'vite:uni-app-pages-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        pagesJson = normalizePagesJson(code, process.env.UNI_PLATFORM)
        return (
          `import './manifest.json.js'\n` + normalizeAppPagesJson(pagesJson)
        )
      },
      generateBundle() {
        this.emitFile({
          fileName: `app-config-service.js`,
          type: 'asset',
          source: normalizeAppConfigService(pagesJson),
        })
      },
    }
  })
}
