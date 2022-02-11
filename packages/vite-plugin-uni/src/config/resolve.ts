import path from 'path'
import { UserConfig } from 'vite'
import {
  isWindows,
  extensions,
  normalizePath,
  requireResolve,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function customResolver(updatedId: string) {
  if (isWindows) {
    return normalizePath(requireResolve(updatedId, process.env.UNI_INPUT_DIR))
  }
  return requireResolve(updatedId, process.env.UNI_INPUT_DIR)
}

export function createResolve(
  options: VitePluginUniResolvedOptions,
  _config: UserConfig
): UserConfig['resolve'] {
  return {
    // 必须使用alias解析，插件定制的resolveId，不会被应用到css等预处理器中
    alias: [
      // @ts-ignore because @rollup/plugin-alias' type doesn't allow function
      // replacement, but its implementation does work with function values.
      {
        find: /^(~@|@)\/(.*)/,
        replacement(_str: string, _$1: string, $2: string) {
          return normalizePath(path.resolve(options.inputDir, $2))
        },
        customResolver,
      },
    ],
    extensions,
  }
}
