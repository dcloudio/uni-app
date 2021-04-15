import path from 'path'
import slash from 'slash'
import { UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { FEATURE_DEFINES } from '../utils'

export function createBuild(
  options: VitePluginUniResolvedOptions,
  features: FEATURE_DEFINES
): UserConfig['build'] {
  return {
    polyfillDynamicImport: features.__UNI_FEATURE_PAGES__,
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
