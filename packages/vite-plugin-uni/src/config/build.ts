import { UserConfig } from 'vite'
import {
  initEasycomsOnce,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'
import { hasOwn } from '@vue/shared'

export function createBuild(
  options: VitePluginUniResolvedOptions,
  config: UserConfig
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, {
    dirs: [resolveComponentsLibPath()],
    platform: process.env.UNI_PLATFORM,
  })
  return {
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
    },
  }
}
