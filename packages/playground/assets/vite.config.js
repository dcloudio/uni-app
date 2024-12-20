import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  build: { minify: false },
  plugins: [uni({ viteLegacyOptions: false }), {
    name: 'stop',
    config() {
      return {
        build: {
          rollupOptions: {
            external: [
              'vue',
              '@vue/shared',
              '@dcloudio/uni-app',
              '@dcloudio/uni-h5',
              '@dcloudio/uni-h5-vue',
              '@dcloudio/uni-mp-vue',
              '@dcloudio/uni-shared',
              '@dcloudio/uni-component',
              'uni-mp-runtime'
            ]
          },

        }
      }
    },
    buildEnd() {
      if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
          process.exit(0)
        }, 1000)
      }
    }
  }],
})
