import type { OutputAsset, OutputChunk } from 'rollup'
import type { Plugin } from 'vite'
import { isMiniProgramPageFile, relativeFile } from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '../plugin'

export function uniSubpackagePlugin({
  style: { extname },
}: UniMiniProgramPluginOptions): Plugin {
  return {
    name: 'uni:mp-subpackage',
    enforce: 'post',
    generateBundle: createNonAppGenerateBundle(extname),
  }
}

export function createNonAppGenerateBundle(
  extname: string
): Plugin['generateBundle'] {
  return function generateBundle(_, bundle) {
    ;['project.config.json', 'app.json'].forEach((name) => {
      delete bundle[name]
    })
    const appJsFile = 'app.js'
    const appCssFile = 'app' + extname
    Object.keys(bundle).forEach((name) => {
      if (!isMiniProgramPageFile(name)) {
        return
      }
      // 仅页面级 wxss 需要补充 app.wxss
      if (name.endsWith(extname)) {
        const cssFile = bundle[name] as OutputAsset
        cssFile.source =
          `@import "${relativeFile(name, appCssFile)}";\n` +
          cssFile.source.toString()
      } else if (name.endsWith('.js')) {
        const jsFile = bundle[name] as OutputChunk
        jsFile.code =
          `require('${relativeFile(name, appJsFile)}');\n` + jsFile.code
      }
    })
  }
}
