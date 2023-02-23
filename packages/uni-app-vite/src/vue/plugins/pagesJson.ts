import path from 'path'
import { Plugin } from 'vite'

import {
  defineUniPagesJsonPlugin,
  normalizeAppPagesJson,
  normalizeAppConfigService,
  normalizePagesJson,
  parseManifestJsonOnce,
  getLocaleFiles,
  MANIFEST_JSON_JS,
  APP_CONFIG_SERVICE,
} from '@dcloudio/uni-cli-shared'
import type { OutputAsset } from 'rollup'
import { wrapperNVueAppStyles } from '../../nvue/plugins/esbuild'

export function uniPagesJsonPlugin(): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'uni:app-vue-pages-json',
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
          if (!page.style.isNVue) {
            this.addWatchFile(
              path.resolve(process.env.UNI_INPUT_DIR, page.path + '.vue')
            )
          }
        })
        this.emitFile({
          fileName: APP_CONFIG_SERVICE,
          type: 'asset',
          source: normalizeAppConfigService(
            pagesJson,
            parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
          ),
        })
        return {
          code:
            `import './${MANIFEST_JSON_JS}'\n` +
            normalizeAppPagesJson(pagesJson),
          map: { mappings: '' },
        }
      },
      generateBundle(_, bundle) {
        const outputFile = bundle[APP_CONFIG_SERVICE]
        if (outputFile && outputFile.type === 'asset') {
          // 补充 nvue styles
          ;(outputFile as OutputAsset).source = wrapperNVueAppStyles(
            (outputFile as OutputAsset).source as string
          )
        }
      },
    }
  })
}
