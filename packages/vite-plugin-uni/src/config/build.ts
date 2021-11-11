import { UserConfig } from 'vite'
import {
  initEasycomsOnce,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function createBuild(
  options: VitePluginUniResolvedOptions
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, {
    dirs: [resolveComponentsLibPath()],
    platform: process.env.UNI_PLATFORM,
  })
  return {
    chunkSizeWarningLimit: 100000000,
  }
}
