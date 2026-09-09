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
  type BuildSourcemap = boolean | 'inline' | 'hidden'
  initEasycomsOnce(options.inputDir, {
    dirs: resolveComponentsLibDirs(),
    platform: process.env.UNI_PLATFORM,
    isX: process.env.UNI_APP_X === 'true',
  })
  const sourcemapSetting = process.env.UNI_APP_SOURCEMAP
  // false 时彻底关闭 sourcemap，减少 rollup 解码、编码和 map 合并成本；
  // 代价是 dev 下的源码定位、报错回溯能力会下降。
  let sourcemap: BuildSourcemap = config.build?.sourcemap as BuildSourcemap
  if (sourcemapSetting === 'true') {
    sourcemap = 'hidden'
  } else if (sourcemapSetting === 'false') {
    sourcemap = false
  }
  const rolldownOutputOption =
    config.build?.rolldownOptions?.output || config.build?.rollupOptions?.output
  let sourcemapExcludeSources = sourcemapSetting === 'true'
  if (sourcemapSetting === 'false') {
    sourcemapExcludeSources = false
  } else if (
    !isArray(rolldownOutputOption) &&
    (rolldownOutputOption as RollupOutputOptionsWithSourcemapExcludeSources)
      ?.sourcemapExcludeSources === false
  ) {
    sourcemapExcludeSources = false
  }
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
          // 生成了一个空 chunk：
          return
        }
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          const { message } = warning
          // 忽略
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
        // Vite 8/Rolldown 支持 sourcemapExcludeSources，这里保持 UNI_APP_SOURCEMAP 的
        // 现有源码内容输出策略。
        sourcemapExcludeSources,
      } as any,
    },
  }
}
