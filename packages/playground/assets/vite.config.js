import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  build: { minify: false },
  plugins: [uni({ viteLegacyOptions: false }), {
    name: 'stop',
    buildEnd() {
      if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
          process.exit(0)
        }, 1000)
      }

    }
  }],
})
