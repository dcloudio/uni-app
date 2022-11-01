import path from 'path'

import { defineConfig } from 'vite'
import jscc from 'rollup-plugin-jscc'
import strip from '@rollup/plugin-strip'
import replace from '@rollup/plugin-replace'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { OutputChunk } from 'rollup'

import { stripOptions } from '@dcloudio/uni-cli-shared'
import { isH5CustomElement } from '@dcloudio/uni-shared'
import { genApiJson } from './api'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

const FORMAT = process.env.FORMAT as 'es' | 'cjs'

const rollupPlugins = [
  replace({
    values: {
      defineOnApi: `/*#__PURE__*/ defineOnApi`,
      defineOffApi: `/*#__PURE__*/ defineOffApi`,
      defineTaskApi: `/*#__PURE__*/ defineTaskApi`,
      defineSyncApi: `/*#__PURE__*/ defineSyncApi`,
      defineAsyncApi: `/*#__PURE__*/ defineAsyncApi`,
      __IMPORT_META_ENV_BASE_URL__: '__IMPORT_META_ENV_BASE_URL__', //直接使用import.meta.env.BASE_URL会被vite替换成'/'
    },
    preventAssignment: true,
  }),

  jscc({
    values: {
      // 该插件限制了不能以__开头
      _NODE_JS_: FORMAT === 'cjs' ? 1 : 0,
    },
  }),
]
if (FORMAT === 'cjs') {
  rollupPlugins.push(strip(stripOptions))
}
if (FORMAT === 'es') {
  // 解决import.meta被转换为import_meta的问题
  rollupPlugins.push({
    name: 'import-meta',
    generateBundle(_options, bundle) {
      const esBundle = bundle['uni-h5.es.js'] as unknown as OutputChunk
      if (esBundle) {
        esBundle.code = esBundle.code.replace(
          '__IMPORT_META_ENV_BASE_URL__',
          'import.meta.env.BASE_URL'
        )
        genApiJson(esBundle.code)
      }
    },
  })
}

export default defineConfig({
  root: __dirname,
  define: {
    global: FORMAT === 'cjs' ? 'global' : 'window',
    __DEV__: `(process.env.NODE_ENV !== 'production')`,
    __TEST__: false,
    __PLATFORM__: JSON.stringify('h5'),
    __APP_VIEW__: false,
    __NODE_JS__: FORMAT === 'cjs' ? true : false,
  },
  resolve: {
    alias: [
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
        find: '@dcloudio/uni-components',
        replacement: resolve('../uni-components/src/index.ts'),
      },
      {
        find: '@dcloudio/uni-platform',
        replacement: resolve('./src/platform/index.ts'),
      },
    ],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: isH5CustomElement,
        },
      },
    }),
    vueJsx({ optimize: true, isCustomElement: isH5CustomElement }),
  ],
  esbuild: {
    // 强制为 es2015，否则默认为 esnext，将会生成 __publicField 代码，
    // 部分 API 写的时候，使用了动态定义 prototype 的方式，与 __publicField 冲突，比如 createCanvasContext
    target: 'es2015',
  },
  build: {
    target: 'modules', // keep import.meta...
    emptyOutDir: FORMAT === 'es',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: [FORMAT],
    },
    assetsDir: '.',
    rollupOptions: {
      output: {
        freeze: false, // uni 对象需要可被修改
        entryFileNames: 'uni-h5.' + FORMAT + '.js',
      },
      external(source) {
        if (
          [
            'vue',
            'vue-router',
            '@vue/shared',
            '@dcloudio/uni-i18n',
            '@dcloudio/uni-shared',
          ].includes(source)
        ) {
          return true
        }
        if (source.startsWith('@dcloudio/uni-h5/style')) {
          return true
        }
      },
      preserveEntrySignatures: 'strict',
      plugins: rollupPlugins as any,
      onwarn: (msg, warn) => {
        if (!String(msg).includes('external module "vue" but never used')) {
          warn(msg)
        }
      },
    },
  },
})
