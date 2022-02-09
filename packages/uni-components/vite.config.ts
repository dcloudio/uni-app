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
      formats: ['es'],
    },
    rollupOptions: {
      external: ['uni', 'vue', 'weex', '@vue/shared', '@dcloudio/uni-shared'],
      output: {
        entryFileNames: 'components.js',
      },
    },
  },
  plugins: [vue(), vueJsx({})],
})
