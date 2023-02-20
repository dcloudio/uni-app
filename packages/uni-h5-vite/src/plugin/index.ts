import type { ResolvedConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { preCss, UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createConfigureServer } from './configureServer'
import { createUni } from './uni'

import { createConfig } from './config'
import { isString } from '@vue/shared'

export function uniH5Plugin(): UniVitePlugin {
  const configOptions: {
    resolvedConfig: ResolvedConfig | null
  } = {
    resolvedConfig: null,
  }
  rewriteReadFileSync()
  return {
    name: 'uni:h5',
    uni: createUni(),
    config: createConfig(configOptions),
    configResolved(config) {
      configOptions.resolvedConfig = config
    },
    configureServer: createConfigureServer(),
    handleHotUpdate: createHandleHotUpdate(),
    transformIndexHtml: createTransformIndexHtml(),
  }
}
/**
 * 重写 readFileSync
 * 目前主要解决 scss 文件被 @import 的条件编译
 */
function rewriteReadFileSync() {
  const { readFileSync } = fs
  fs.readFileSync = ((filepath, options) => {
    const content = readFileSync(filepath, options)
    if (
      isString(filepath) &&
      isString(content) &&
      path.extname(filepath) === '.scss' &&
      content.includes('#endif')
    ) {
      return preCss(content)
    }
    return content
  }) as (typeof fs)['readFileSync']
}
