import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  root: __dirname,
  build: {
    minify: false,
    lib: {
      name: 'components',
      entry: path.resolve(__dirname, 'src/nvue/index.ts'),
      formats: ['iife'],
    },
    rollupOptions: {
      external: ['uni', 'vue', 'weex'],
      output: {
        banner: 'export function initComponents(uni, Vue, weex) {',
        footer: 'return components\n}',
        entryFileNames: 'components.js',
        globals: {
          uni: 'uni',
          vue: 'Vue',
          weex: 'weex',
        },
      },
    },
  },
  plugins: [vue(), vueJsx({})],
})
