import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import replace from '@rollup/plugin-replace'

import { isAppNVueNativeTag } from '@dcloudio/uni-shared'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export default defineConfig({
  root: __dirname,
  define: {
    global: 'window',
    __PLATFORM__: "'app'",
    __NODE_JS__: false,
    __APP_VIEW__: false,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __UNI_FEATURE_WX__: true,
    __UNI_FEATURE_PROMISE__: false,
    __UNI_FEATURE_I18N_EN__: true,
    __UNI_FEATURE_I18N_ES__: true,
    __UNI_FEATURE_I18N_FR__: true,
    __UNI_FEATURE_I18N_ZH_HANS__: true,
    __UNI_FEATURE_I18N_ZH_HANT__: true,
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
  plugins: [
    vue(),
    vueJsx({
      isCustomElement: (tag) => {
        if (tag === 'slider') {
          return true
        }
        return isAppNVueNativeTag(tag)
      },
    }),
    replace({
      preventAssignment: true,
      values: {
        __DEV__: `(process.env.NODE_ENV !== 'production')`,
      },
    }),
  ],
})
