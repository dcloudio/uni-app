import path from 'path'
import { Plugin } from 'vite'

import {
  defineUniPagesJsonPlugin,
  normalizeAppPagesJson,
  normalizeAppConfigService,
  normalizePagesJson,
  parseManifestJsonOnce,
  getLocaleFiles,
} from '@dcloudio/uni-cli-shared'

export function uniPagesJsonPlugin(): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'vite:uni-app-pages-json',
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
        // TODO subpackages
        pagesJson.pages.forEach((page) => {
          this.addWatchFile(
            path.resolve(process.env.UNI_INPUT_DIR, page.path + '.vue')
          )
        })
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
            `import './manifest.json.js'\n` + normalizeAppPagesJson(pagesJson),
          map: this.getCombinedSourcemap(),
        }
      },
    }
  })
}
