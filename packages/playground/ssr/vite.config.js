import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import uni, { uniVueTemplateOptions } from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: uniVueTemplateOptions,
    }),
    uni(),
  ],
})
