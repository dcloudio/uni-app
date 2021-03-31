import path from 'path'
import vue from '@vitejs/plugin-vue'
import uni, { uniVueTemplateOptions } from '@dcloudio/vite-plugin-uni'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  root: __dirname,
  build: {
    // minify: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },

  plugins: [
    vue({
      template: uniVueTemplateOptions,
    }),
    uni({ inputDir: path.resolve(__dirname, 'src') }),
  ],
}
