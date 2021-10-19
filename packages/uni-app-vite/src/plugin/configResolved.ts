import fs from 'fs'
import { Plugin } from 'vite'

import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'

let appCss = ''

export const configResolved: Plugin['configResolved'] = (config) => {
  removePlugins('vite:import-analysis', config)
  injectCssPlugin(config)
  injectCssPostPlugin(config, {
    extname: '.css',
    chunkCss(filename, cssCode) {
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
