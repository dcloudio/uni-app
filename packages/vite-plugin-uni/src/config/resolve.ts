import path from 'path'
import { UserConfig, ResolverFunction } from 'vite'
import {
  isWindows,
  extensions,
  normalizePath,
  requireResolve,
  resolveUtsModule,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export const customResolver: ResolverFunction = (updatedId, importer) => {
  const utsModuleFile = resolveUtsModule(
    updatedId,
    importer ? path.dirname(importer) : process.env.UNI_INPUT_DIR,
    process.env.UNI_UTS_PLATFORM
  )
  if (utsModuleFile) {
    return isWindows ? normalizePath(utsModuleFile) : utsModuleFile
  }
  if (isWindows) {
    return normalizePath(
      requireResolve(updatedId, importer || process.env.UNI_INPUT_DIR)
    )
  }
  return requireResolve(updatedId, importer || process.env.UNI_INPUT_DIR)
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
