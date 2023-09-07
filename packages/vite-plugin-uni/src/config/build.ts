import { UserConfig } from 'vite'
import {
  cssTarget,
  initEasycomsOnce,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'
import { hasOwn, isArray } from '@vue/shared'

export function createBuild(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, {
    dirs: [resolveComponentsLibPath()],
    platform: process.env.UNI_PLATFORM,
    isX: process.env.UNI_APP_X === 'true',
  })
  const rollupOutputOption = config.build?.rollupOptions?.output
  const sourcemap =
    process.env.SOURCEMAP === 'true' ? 'hidden' : config.build?.sourcemap
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
    rollupOptions: {
      onwarn(warning, warn) {
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
            : process.env.SOURCEMAP === 'true',
      },
    },
  }
}
