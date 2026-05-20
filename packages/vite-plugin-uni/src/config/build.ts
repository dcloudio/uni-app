import type { UserConfig } from 'vite'
import {
  cssTarget,
  initEasycomsOnce,
  resolveComponentsLibDirs,
} from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'
import { hasOwn, isArray } from '@vue/shared'

type RollupOutputOptionsWithSourcemapExcludeSources = {
  sourcemapExcludeSources?: boolean
}

export function createBuild(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, {
    dirs: resolveComponentsLibDirs(),
    platform: process.env.UNI_PLATFORM,
    isX: process.env.UNI_APP_X === 'true',
  })
  const sourcemap =
    process.env.UNI_APP_SOURCEMAP === 'true'
      ? 'hidden'
      : config.build?.sourcemap
  const rolldownOutputOption =
    config.build?.rolldownOptions?.output || config.build?.rollupOptions?.output
  const sourcemapExcludeSources =
    !isArray(rolldownOutputOption) &&
    (rolldownOutputOption as RollupOutputOptionsWithSourcemapExcludeSources)
      ?.sourcemapExcludeSources === false
      ? false
      : process.env.UNI_APP_SOURCEMAP === 'true'
  return {
    sourcemap,
    cssTarget,
    chunkSizeWarningLimit: 100000000,
    minify:
      config.build && hasOwn(config.build, 'minify')
        ? config.build.minify
        : process.env.NODE_ENV === 'production'
        ? 'terser'
        : false,
    terserOptions:
      process.env.NODE_ENV !== 'production'
        ? ({ compress: { drop_console: false } } as any)
        : undefined,
    rolldownOptions: {
      // UTS 允许使用 `export { TypeName } from './xxx.uts'` 重新导出类型。
      // Rolldown 会按运行时导出校验，先启用缺失导出 shim 保持兼容。
      shimMissingExports: true,
      moduleTypes: {
        '.uts': 'ts',
      },
      onwarn(warning, warn) {
        if (warning.code === 'EMPTY_BUNDLE') {
          // 忽略空包警告，通常是条件编译之类导致的
          // Generated an empty chunk:
          return
        }
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          const { message } = warning
          // ignore
          if (
            message.includes('"vue"') ||
            message.includes('"resolveComponent"') ||
            message.includes('"@dcloudio/uni-h5"')
          ) {
            return
          }
        }
        warn(warning)
      },
      output: {
        // Vite 8/Rolldown supports sourcemapExcludeSources. Keep the existing
        // source-content policy when generating UNI_APP_SOURCEMAP.
        sourcemapExcludeSources,
      } as any,
    },
  }
}
