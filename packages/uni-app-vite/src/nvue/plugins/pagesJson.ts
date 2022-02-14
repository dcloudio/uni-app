import path from 'path'
import { Plugin } from 'vite'

import {
  defineUniPagesJsonPlugin,
  normalizeAppConfigService,
  normalizePagesJson,
  parseManifestJsonOnce,
  getLocaleFiles,
  normalizeAppNVuePagesJson,
  MANIFEST_JSON_JS,
} from '@dcloudio/uni-cli-shared'

export function uniPagesJsonPlugin({
  renderer,
}: {
  renderer?: 'native'
}): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'uni:app-nvue-pages-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'))
        getLocaleFiles(
          path.resolve(process.env.UNI_INPUT_DIR, 'locale')
        ).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const pagesJson = normalizePagesJson(code, process.env.UNI_PLATFORM)
        pagesJson.pages.forEach((page) => {
          if (page.style.isNVue) {
            this.addWatchFile(
              path.resolve(process.env.UNI_INPUT_DIR, page.path + '.nvue')
            )
          }
        })
        if (renderer === 'native') {
          this.emitFile({
            fileName: `app-config-service.js`,
            type: 'asset',
            source: normalizeAppConfigService(
              pagesJson,
              parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
            ),
          })
          return {
            code:
              `import './${MANIFEST_JSON_JS}'\n` +
              normalizeAppNVuePagesJson(pagesJson),
            map: { mappings: '' },
          }
        }
        return {
          code: normalizeAppNVuePagesJson(pagesJson),
          map: { mappings: '' },
        }
      },
    }
  })
}
