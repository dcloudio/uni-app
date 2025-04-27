import path from 'path'
import type { Plugin } from 'vite'

import {
  APP_CONFIG,
  defineUniManifestJsonPlugin,
  getLocaleFiles,
  normalizeAppManifestJson,
  parseJson,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'

export function uniManifestJsonPlugin(): Plugin {
  return defineUniManifestJsonPlugin((opts) => {
    const inputDir = process.env.UNI_INPUT_DIR
    return {
      name: 'uni:app-manifest-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(path.resolve(inputDir, 'manifest.json'))
        getLocaleFiles(path.resolve(inputDir, 'locale')).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        const manifestJson = normalizeAppManifestJson(
          parseJson(code, false, id),
          parsePagesJsonOnce(inputDir, process.env.UNI_PLATFORM)
        )

        // 生成一个空的 app-config.js，兼容基座已有规范
        this.emitFile({
          fileName: APP_CONFIG,
          type: 'asset',
          source: '(function(){})();',
        })
        this.emitFile({
          fileName: `manifest.json`,
          type: 'asset',
          source: JSON.stringify(manifestJson, null, 2),
        })
        return {
          code: '',
          map: null,
        }
      },
    }
  })
}
