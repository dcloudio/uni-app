import path from 'path'
import slash from 'slash'
import { UserConfig } from 'vite'
import { initEasycomsOnce } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function createBuild(
  options: VitePluginUniResolvedOptions
): UserConfig['build'] {
  initEasycomsOnce(options.inputDir, options.platform)
  return {
    rollupOptions: {
      output: {
        chunkFileNames(chunkInfo) {
          if (chunkInfo.facadeModuleId) {
            const dirname = path.relative(
              options.inputDir,
              path.dirname(chunkInfo.facadeModuleId)
            )
            if (dirname) {
              return `${options.assetsDir}/${slash(dirname).replace(
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
