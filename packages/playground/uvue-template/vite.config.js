import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { normalizePath } from '@dcloudio/uni-cli-shared'
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  build: { minify: false },
  plugins: [uni({ viteLegacyOptions: false }), {
    name: 'stop',
    config() {
      const output = {}
      if (process.env.UNI_PLATFORM === 'web' || process.env.UNI_PLATFORM === 'h5') {
        output.chunkFileNames = (chunkInfo) => {
          const assetsDir = 'assets'
          if (chunkInfo.facadeModuleId) {
            const dirname = path.relative(
              process.env.UNI_INPUT_DIR,
              path.dirname(chunkInfo.facadeModuleId)
            )
            if (dirname) {
              return path.posix.join(
                assetsDir,
                normalizePath(dirname).replace(/\//g, '-') +
                '-[name].js'
              )
            }
          }
          return path.posix.join(assetsDir, '[name].js')
        }
      }
      return {
        build: {
          rollupOptions: {
            external: [
              'vue',
              '@vue/shared',
              '@dcloudio/uni-h5',
              '@dcloudio/uni-h5-vue',
              '@dcloudio/uni-mp-vue',
              '@dcloudio/uni-shared',
              '@dcloudio/uni-component',
              'uni-mp-runtime'
            ],
            output,
          },
        }
      }
    },
    buildEnd() {
      if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
          process.exit(0)
        }, 2000)
      }
    }
  }],
})
