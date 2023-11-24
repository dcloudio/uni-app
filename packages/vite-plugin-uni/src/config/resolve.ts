import path from 'path'
import { UserConfig, ResolverFunction, Alias } from 'vite'
import {
  isWindows,
  extensions,
  uni_app_x_extensions,
  normalizePath,
  requireResolve,
  resolveUTSModule,
  resolveUTSAppModule,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

function resolveUTSModuleProxyFile(id: string, importer: string) {
  const file = resolveUTSAppModule(id, importer)
  if (file) {
    return file + '?uts-proxy'
  }
}

export const customResolver: ResolverFunction = (updatedId, importer) => {
  const utsImporter = importer
    ? path.dirname(importer)
    : process.env.UNI_INPUT_DIR
  const utsModuleFile =
    process.env.UNI_PLATFORM === 'app'
      ? resolveUTSModuleProxyFile(updatedId, utsImporter)
      : resolveUTSModule(updatedId, utsImporter)
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
  const alias: Alias[] =
    process.env.UNI_APP_X === 'true'
      ? [
          {
            find: 'tslib',
            replacement: '\0tslib.js',
          },
        ]
      : []
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
      ...alias,
    ] as Alias[],
    extensions:
      process.env.UNI_APP_X === 'true' ? uni_app_x_extensions : extensions,
  }
}
