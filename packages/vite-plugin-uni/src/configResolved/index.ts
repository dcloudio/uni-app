import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

import { initEnv } from './env'
import { initOptions } from './options'
import { initPlugins } from './plugins'

export function createConfigResolved(options: VitePluginUniResolvedOptions) {
  return ((config) => {
    initEnv(config)
    initOptions(options, config)
    initPlugins(config, options)
    initCheckUpdate()
  }) as Plugin['configResolved']
}

function initCheckUpdate() {
  // const pkg = require('@dcloudio/vite-plugin-uni/package.json')
  // checkUpdate({
  //   inputDir: process.env.UNI_INPUT_DIR,
  //   compilerVersion:
  //     (pkg['uni-app'] && pkg['uni-app']['compilerVersion']) || '',
  //   versionType: pkg.version.includes('alpha') ? 'a' : 'r',
  // })
}
