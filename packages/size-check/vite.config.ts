import path from 'path'
import uniH5VitePlugins from '@dcloudio/uni-h5-vite'
import uni from '@dcloudio/vite-plugin-uni'

process.env.UNI_CLI_CONTEXT = __dirname
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

  plugins: [...uniH5VitePlugins, uni({ viteLegacyOptions: false })],
}
