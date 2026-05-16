import path from 'path'
import type { Alias, Plugin, UserConfig } from 'vite'
import {
  extensions,
  isNormalCompileTarget,
  isWindows,
  normalizePath,
  resolveEncryptUniModule,
  resolveUTSAppModule,
  resolveUTSModule,
  uni_app_x_extensions,
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

function resolveUniAlias(id: string, inputDir: string) {
  const matched = id.match(/^(~@|@)\/(.*)/)
  if (matched) {
    return normalizePath(path.resolve(inputDir, matched[2]))
  }
  const resolvedId = id.split('?')[0]
  if (path.isAbsolute(resolvedId)) {
    const normalizedId = normalizePath(resolvedId)
    if (
      normalizedId.includes('/uni_modules/') ||
      normalizedId.includes('/utssdk/')
    ) {
      return normalizedId
    }
  }
}

export function resolveUniModuleId(id: string, importer?: string) {
  const updatedId = id.split('?')[0]

  const utsImporter = importer
    ? path.dirname(importer.split('?')[0])
    : process.env.UNI_INPUT_DIR
  const utsModuleFile =
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-harmony'
      ? resolveUTSModuleProxyFile(updatedId, utsImporter)
      : resolveUTSModule(updatedId, utsImporter)
  if (utsModuleFile) {
    return isWindows ? normalizePath(utsModuleFile) : utsModuleFile
  }
  const resolveId = resolveEncryptUniModule(
    normalizePath(updatedId),
    process.env.UNI_UTS_PLATFORM,
    process.env.UNI_APP_X === 'true'
  )
  if (resolveId) {
    return resolveId
  }
}

export function createUniResolveIdPlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  return {
    name: 'uni:resolve-id',
    enforce: 'pre',
    resolveId(id, importer) {
      const resolvedId = resolveUniAlias(id, options.inputDir)
      if (!resolvedId) {
        return null
      }
      // Vite 8 deprecates alias.customResolver. Keep the plain string alias for
      // CSS preprocessors, and resolve uni_modules/utssdk entries in this hook.
      return resolveUniModuleId(resolvedId, importer) || null
    },
  }
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
      {
        find: /^(~@|@)\/(.*)/,
        replacement: normalizePath(path.resolve(options.inputDir)) + '/$2',
      },
      ...alias,
    ] as Alias[],
    extensions:
      process.env.UNI_APP_X === 'true' ? uni_app_x_extensions : extensions,
    preserveSymlinks: true,
  }
}
