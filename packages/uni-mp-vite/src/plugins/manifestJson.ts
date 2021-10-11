import path from 'path'
import { Plugin } from 'vite'

import {
  defineUniManifestJsonPlugin,
  getLocaleFiles,
} from '@dcloudio/uni-cli-shared'
import { UniMiniProgramPluginOptions } from '../plugin'

export function uniManifestJsonPlugin(
  options: UniMiniProgramPluginOptions
): Plugin {
  return defineUniManifestJsonPlugin((opts) => {
    return {
      name: 'vite:uni-mp-manifest-json',
      enforce: 'pre',
      transform(_code, id) {
        if (!opts.filter(id)) {
          return
        }
        this.addWatchFile(
          path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
        )
        getLocaleFiles(
          path.resolve(process.env.UNI_INPUT_DIR, 'locale')
        ).forEach((filepath) => {
          this.addWatchFile(filepath)
        })
        // manifestJson = normalizeAppManifestJson(
        //   parseJson(code),
        //   parsePagesJsonOnce(
        //     process.env.UNI_INPUT_DIR,
        //     process.env.UNI_PLATFORM
        //   )
        // )
        return {
          code: '',
          map: this.getCombinedSourcemap(),
        }
      },
      generateBundle() {
        // 生成一个空的app-config.js，兼容基座已有规范
        // this.emitFile({
        //   fileName: `app-config.js`,
        //   type: 'asset',
        //   source: '(function(){})();',
        // })
        // this.emitFile({
        //   fileName: `manifest.json`,
        //   type: 'asset',
        //   source: JSON.stringify(manifestJson, null, 2),
        // })
      },
    }
  })
}
