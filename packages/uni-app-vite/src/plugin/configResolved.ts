import fs from 'fs'
import path from 'path'
import { Plugin } from 'vite'

import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
  resolveMainPathOnce,
  normalizePath,
  removeExt,
} from '@dcloudio/uni-cli-shared'

let appCss = ''

function normalizeCssChunkFilename(id: string) {
  return (
    removeExt(normalizePath(path.relative(process.env.UNI_INPUT_DIR, id))) +
    '.css'
  )
}
export const configResolved: Plugin['configResolved'] = (config) => {
  const mainPath = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  removePlugins('vite:import-analysis', config)
  injectCssPlugin(config)
  injectCssPostPlugin(config, {
    chunkCssFilename(id: string) {
      if (id === mainPath) {
        return 'app.css'
      } else if (id.includes('mpType=page')) {
        return normalizeCssChunkFilename(id)
      }
    },
    chunkCssCode(filename, cssCode) {
      if (filename === 'app.css') {
        if (!appCss) {
          appCss = fs.readFileSync(
            require.resolve('@dcloudio/uni-app-plus/dist/style.css'),
            'utf8'
          )
        }
        return appCss + '\n' + cssCode
      }
      return cssCode
    },
  })
  injectAssetPlugin(config)
}
