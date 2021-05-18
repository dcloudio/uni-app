import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  root: __dirname,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
    // minify: false,
    rollupOptions: {
      // external: ['vue', '@vue/shared'],
      // output: {
      //   entryFileNames: `assets/[name].js`,
      //   chunkFileNames: `assets/[name].js`,
      //   assetFileNames: `assets/[name].[ext]`,
      // },
    },
  },

  plugins: [uni({ viteLegacyOptions: false })],
}
