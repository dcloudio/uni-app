import type { Logger, Plugin } from 'vite'
import { extend, isString } from '@vue/shared'
import {
  checkUpdate,
  formatErrMsg,
  formatInfoMsg,
  formatWarnMsg,
  isInHybridNVue,
  isWindows,
} from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'

import { initEnv } from './env'
import { initOptions } from './options'
import { initPlugins } from './plugins'
import { customResolver } from '../config/resolve'

export function createConfigResolved(
  options: VitePluginUniResolvedOptions
): Plugin['configResolved'] {
  return (config) => {
    // 如果是混合编译且是 nvue 时，部分逻辑无需执行
    if (!isInHybridNVue(config)) {
      initEnv(config)
    }
    initLogger(config)
    initOptions(options, config)
    initPlugins(config, options)
    if (!isInHybridNVue(config)) {
      initCheckUpdate()
    }
    if (isWindows) {
      // TODO 等 https://github.com/vitejs/vite/issues/3331 修复后，可以移除下列代码
      // 2.8.0 已修复，但为了兼容旧版本，先不移除
      const item = config.resolve.alias.find((item) =>
        !isString(item.find) ? item.find.test('@/') : false
      )
      if (item) {
        item.customResolver = customResolver
      }
    }
  }
}

function initCheckUpdate() {
  checkUpdate({
    inputDir: process.env.UNI_INPUT_DIR,
    compilerVersion: process.env.UNI_COMPILER_VERSION,
    versionType: process.env.UNI_COMPILER_VERSION_TYPE,
  })
}

export function initLogger({
  logger,
  nvue,
}: {
  logger: Logger
  nvue?: boolean
}) {
  const { info, warn, error } = logger
  logger.info = (msg, opts) => {
    msg = formatInfoMsg(msg, extend(opts || {}, { nvue }))
    if (msg) {
      return info(msg, opts)
    }
  }
  logger.warn = (msg, opts) => {
    msg = formatWarnMsg(msg, opts)
    if (msg) {
      return warn(msg, opts)
    }
  }
  logger.error = (msg, opts) => {
    msg = formatErrMsg(msg, opts)
    if (msg) {
      return error(msg, opts)
    }
  }
  return logger
}
