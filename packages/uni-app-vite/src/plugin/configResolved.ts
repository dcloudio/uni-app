import fs from 'fs'
import { Plugin } from 'vite'

import {
  removePlugins,
  injectAssetPlugin,
  injectCssPlugin,
  injectCssPostPlugin,
} from '@dcloudio/uni-cli-shared'

export const configResolved: Plugin['configResolved'] = (config) => {
  removePlugins('vite:import-analysis', config)
  injectCssPlugin(config)
  injectCssPostPlugin(config, {
    appCss: fs.readFileSync(
      require.resolve('@dcloudio/uni-app-plus/dist/style.css'),
      'utf8'
    ),
  })
  injectAssetPlugin(config)
}
