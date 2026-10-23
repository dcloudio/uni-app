import type { UserConfig } from 'vite'
import {
  cssTarget,
  initEasycomsOnce,
  resolveComponentsLibDirs,
} from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'
import { hasOwn, isArray } from '@vue/shared'

export function createBuild(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, {
    dirs: resolveComponentsLibDirs(),
    platform: process.env.UNI_PLATFORM,
    isX: process.env.UNI_APP_X === 'true',
  })
  const rollupOutputOption = config.build?.rollupOptions?.output
  const sourcemap =
    process.env.UNI_APP_SOURCEMAP === 'true'
      ? 'hidden'
      : config.build?.sourcemap
  /**
   * arkts编译器处理字符串模板内使用逗号操作符时有问题，禁用 reduce_vars 减少产出此类代码
   * 如下代码在 arkts 内编译报错，Error Message: Unexpected token, expected '}'.
   * function test () {
   *   return 0
   * }
   * let n: number = 0
   * console.log(`${n = test(), n === 0 ? 0 : 1}px`)
   */
  const isHarmonyArkTs =
    process.env.UNI_UTS_PLATFORM === 'app-harmony' &&
    process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE !== 'jsvm'
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
        ? { compress: { drop_console: false, reduce_vars: !isHarmonyArkTs } }
        : isHarmonyArkTs
        ? { compress: { reduce_vars: false } }
        : undefined,
    rollupOptions: {
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
        sourcemapExcludeSources:
          !isArray(rollupOutputOption) &&
          rollupOutputOption?.sourcemapExcludeSources === false
            ? false
            : process.env.UNI_APP_SOURCEMAP === 'true',
      },
    },
  }
}
