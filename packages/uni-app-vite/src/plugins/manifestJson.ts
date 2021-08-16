import path from 'path'
import { Plugin } from 'vite'

import {
  defineUniManifestJsonPlugin,
  normalizeAppManifestJson,
  parseJson,
  parsePagesJsonOnce,
} from '@dcloudio/uni-cli-shared'

export function uniManifestJsonPlugin(): Plugin {
  let manifestJson: Record<string, any>
  return defineUniManifestJsonPlugin((opts) => {
    return {
      name: 'vite:uni-app-manifest-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(
          path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
        )
        manifestJson = normalizeAppManifestJson(
          parseJson(code),
          parsePagesJsonOnce(
            process.env.UNI_INPUT_DIR,
            process.env.UNI_PLATFORM
          )
        )
        return {
          code: '',
          map: this.getCombinedSourcemap(),
        }
      },
      generateBundle() {
        // 生成一个空的app-config.js，兼容基座已有规范
        this.emitFile({
          fileName: `app-config.js`,
          type: 'asset',
          source: '(function(){})();',
        })
        this.emitFile({
          fileName: `manifest.json`,
          type: 'asset',
          source: JSON.stringify(manifestJson, null, 2),
        })
      },
    }
  })
}
