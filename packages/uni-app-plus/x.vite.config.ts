import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { cssTarget } from '@dcloudio/uni-cli-shared'
import { isBuiltInComponent } from '@dcloudio/uni-shared'
import autoprefixer from 'autoprefixer'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

export default defineConfig({
  root: __dirname,
  define: {
    __DEV__: false,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('app'),
    __NODE_JS__: false,
    __APP_VIEW__: false,
    __UNI_FEATURE_I18N_EN__: true,
    __UNI_FEATURE_I18N_ES__: true,
    __UNI_FEATURE_I18N_FR__: true,
    __UNI_FEATURE_I18N_ZH_HANS__: true,
    __UNI_FEATURE_I18N_ZH_HANT__: true,
    __X__: true,
  },
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: resolve('../uni-app-vue/src/uvue/index.ts'),
      },
      {
        find: '@dcloudio/uni-api',
        replacement: resolve('../uni-api/src/index.ts'),
      },
      {
        find: '@dcloudio/uni-vue',
        replacement: resolve('../uni-vue/src/index.ts'),
      },
      {
        find: '@dcloudio/uni-core',
        replacement: resolve('../uni-core/src'),
      },
      {
        find: '@dcloudio/uni-components/style',
        replacement: resolve('../uni-components/style'),
      },
      {
        find: '@dcloudio/uni-components',
        replacement: resolve('../uni-components/src/index.ts'),
      },
      {
        find: '@dcloudio/uni-platform',
        replacement: resolve('./src/platform/index.ts'),
      },
    ],
    extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json', '.vue'],
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android > 4.4', 'iOS >= 10'],
        }),
      ],
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: isBuiltInComponent,
        },
      },
    }),
    vueJsx({ optimize: true, isCustomElement: isBuiltInComponent }),
  ],
  build: {
    emptyOutDir: false,
    target: 'modules',
    cssTarget,
    minify: 'terser',
    cssCodeSplit: false,
    lib: {
      fileName: 'uni.x.runtime',
      entry: path.resolve(__dirname, 'src/x/index.ts'),
      formats: ['es'],
    },
    polyfillModulePreload: false,
    modulePreload: false,
    assetsDir: '.',
    rollupOptions: {
      treeshake: 'smallest',
      output: {
        dir: 'dist',
        freeze: false,
        entryFileNames: 'uni.x.runtime.esm.js',
      },
      preserveEntrySignatures: 'strict',
      onwarn: (msg, warn) => {
        if (!String(msg).includes('external module "vue" but never used')) {
          warn(msg)
        }
      },
      external: ['vue', '@vue/shared', '@dcloudio/uni-shared'],
    },
  },
})
