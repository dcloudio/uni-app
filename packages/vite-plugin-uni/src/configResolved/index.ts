import { Plugin, ResolvedConfig } from 'vite'
import {
  checkUpdate,
  isWindows,
  formatErrMsg,
  formatInfoMsg,
  formatWarnMsg,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

import { initEnv } from './env'
import { initOptions } from './options'
import { initPlugins } from './plugins'
import { customResolver } from '../config/resolve'

export function createConfigResolved(options: VitePluginUniResolvedOptions) {
  return ((config) => {
    initEnv(config)
    initLogger(config)
    initOptions(options, config)
    initPlugins(config, options)
    initCheckUpdate()
    if (isWindows) {
      // TODO 等 https://github.com/vitejs/vite/issues/3331 修复后，可以移除下列代码
      const item = config.resolve.alias.find((item) =>
        typeof item.find !== 'string' ? item.find.test('@/') : false
      )
      if (item) {
        item.customResolver = customResolver
      }
    }
  }) as Plugin['configResolved']
}

function initCheckUpdate() {
  checkUpdate({
    inputDir: process.env.UNI_INPUT_DIR,
    compilerVersion: process.env.UNI_COMPILER_VERSION,
    versionType: process.env.UNI_COMPILER_VERSION_TYPE,
  })
}

function initLogger({ logger }: ResolvedConfig) {
  const { info, warn, error } = logger
  logger.info = (msg, opts) => {
    msg = formatInfoMsg(msg)
    if (msg) {
      return info(msg, opts)
    }
  }
  logger.warn = (msg, opts) => {
    msg = formatWarnMsg(msg)
    if (msg) {
      return warn(msg, opts)
    }
  }
  logger.error = (msg, opts) => {
    msg = formatErrMsg(msg)
    if (msg) {
      return error(msg, opts)
    }
  }
}
