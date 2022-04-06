import path from 'path'
import { terser } from 'rollup-plugin-terser'
import uniH5VitePlugins from '@dcloudio/uni-h5-vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UserConfig } from 'vite'

export default {
  root: __dirname,
  logLevel: 'info',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      // external: ['vue', '@vue/shared'],
      plugins: [terser()],
      output: {
        inlineDynamicImports: true,
      },
    },
  },

  plugins: [...uniH5VitePlugins, uni({ viteLegacyOptions: false })],
} as UserConfig
