import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export default defineConfig({
  root: __dirname,
  define: {
    global: 'window',
  },
  resolve: {
    alias: [
      {
        find: '@dcloudio/uni-core',
        replacement: resolve('../uni-core/src'),
      },
    ],
  },
  build: {
    minify: false,
    lib: {
      name: 'components',
      entry: path.resolve(__dirname, 'src/nvue/components.ts'),
      formats: ['iife'],
    },
    rollupOptions: {
      external: ['uni', 'vue', 'weex', '@vue/shared', '@dcloudio/uni-shared'],
      output: {
        banner:
          'export function initComponents({uni,Vue,weex,plus,BroadcastChannel,UniViewJSBridge,VueShared,UniShared}) {',
        footer: 'return components\n}',
        entryFileNames: 'components.js',
        globals: {
          uni: 'uni',
          vue: 'Vue',
          weex: 'weex',
          '@vue/shared': 'VueShared',
          '@dcloudio/uni-shared': 'UniShared',
        },
      },
    },
  },
  plugins: [vue(), vueJsx({})],
})
