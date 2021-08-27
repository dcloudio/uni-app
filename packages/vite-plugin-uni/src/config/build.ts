import path from 'path'
import { UserConfig } from 'vite'
import { initEasycomsOnce, normalizePath } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function createBuild(
  options: VitePluginUniResolvedOptions
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, options.platform)
  return {
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
        chunkFileNames(chunkInfo) {
          if (chunkInfo.facadeModuleId) {
            const dirname = path.relative(
              options.inputDir,
              path.dirname(chunkInfo.facadeModuleId)
            )
            if (dirname) {
              return `${options.assetsDir}/${normalizePath(dirname).replace(
                /\//g,
                '-'
              )}-[name].[hash].js`
            }
          }
          return '[name].[hash].js'
        },
      },
    },
  }
}
