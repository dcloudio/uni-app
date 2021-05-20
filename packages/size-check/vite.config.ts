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
      output: {
        inlineDynamicImports: true,
      },
    },
  },

  plugins: [uni({ viteLegacyOptions: false })],
}
