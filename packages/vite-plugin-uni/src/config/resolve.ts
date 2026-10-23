import path from 'path'
import type { Alias, ResolverFunction, UserConfig } from 'vite'
import {
  extensions,
  isNormalCompileTarget,
  isUniAppXStandardScriptSupported,
  isWindows,
  normalizePath,
  requireResolve,
  resolveEncryptUniModule,
  resolveIndependentRoot,
  resolveUTSAppModule,
  resolveUTSModule,
  uni_app_x_extensions,
  withIndependentRootIfNeeded,
  withoutIndependentRoot,
} from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'

function resolveUTSModuleProxyFile(id: string, importer: string) {
  const file = resolveUTSAppModule(process.env.UNI_UTS_PLATFORM, id, importer)
  if (file) {
    // app-js 会返回完整路径，不需要 uts-proxy
    if (file.endsWith('.uts')) {
      return file
    }
    return file + '?uts-proxy'
  }
}

export const customResolver: ResolverFunction = function (
  updatedId,
  importer,
  resolveOptions
) {
  const independentRoot = resolveIndependentRoot(
    updatedId,
    importer,
    process.env.UNI_INPUT_DIR,
    process.env.UNI_PLATFORM
  )
  updatedId = withoutIndependentRoot(updatedId)
  const filename = updatedId.split('?')[0]

  if (isUniAppXStandardScriptSupported() && filename.endsWith('.json')) {
    // alias 先于用户 pre 插件执行，JSON 需要重新进入插件链，才能根据 UTS/TS/JS 导入方分流。
    return this.resolve(updatedId, importer, {
      ...resolveOptions,
      skipSelf: true,
    }).then((resolved) => {
      if (!resolved || resolved.external) {
        return resolved
      }
      return {
        ...resolved,
        id: withIndependentRootIfNeeded(
          isWindows ? normalizePath(resolved.id) : resolved.id,
          independentRoot,
          process.env.UNI_INPUT_DIR
        ),
      }
    })
  }

  updatedId = filename

  const utsImporter = importer
    ? path.dirname(importer)
    : process.env.UNI_INPUT_DIR
  const utsModuleFile =
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-harmony'
      ? resolveUTSModuleProxyFile(updatedId, utsImporter)
      : resolveUTSModule(updatedId, utsImporter)
  if (utsModuleFile) {
    return withIndependentRootIfNeeded(
      isWindows ? normalizePath(utsModuleFile) : utsModuleFile,
      independentRoot,
      process.env.UNI_INPUT_DIR
    )
  }
  const resolveId = resolveEncryptUniModule(
    normalizePath(updatedId),
    process.env.UNI_UTS_PLATFORM,
    process.env.UNI_APP_X === 'true'
  )
  if (resolveId) {
    return withIndependentRootIfNeeded(
      resolveId,
      independentRoot,
      process.env.UNI_INPUT_DIR
    )
  }
  const resolvedId = requireResolve(
    updatedId,
    importer || process.env.UNI_INPUT_DIR
  )
  return withIndependentRootIfNeeded(
    isWindows ? normalizePath(resolvedId) : resolvedId,
    independentRoot,
    process.env.UNI_INPUT_DIR
  )
}

export function createResolve(
  options: VitePluginUniResolvedOptions,
  _config: UserConfig
): UserConfig['resolve'] {
  const alias: Alias[] = []
  if (isNormalCompileTarget()) {
    // 加密组件内部使用的 vue export helper，需要重新映射回来
    alias.push({
      find: 'plugin-vue:export-helper',
      replacement: '\0plugin-vue:export-helper',
    })
  }
  return {
    // 必须使用alias解析，插件定制的resolveId，不会被应用到css等预处理器中
    alias: [
      // because @rollup/plugin-alias' type doesn't allow function
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
    preserveSymlinks: true,
  }
}
