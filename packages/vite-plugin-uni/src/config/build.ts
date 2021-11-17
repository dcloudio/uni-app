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
  }
}
