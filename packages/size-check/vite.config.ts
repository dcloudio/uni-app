import path from 'path'
import terser from '@rollup/plugin-terser'
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
        entryFileNames: 'size-check.es.js',
      },
    },
  },

  plugins: [uni({ viteLegacyOptions: false })],
} as UserConfig
