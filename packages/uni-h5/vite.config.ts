import path from 'path'

import { defineConfig } from 'vite'

import jscc from 'rollup-plugin-jscc'
import strip from '@rollup/plugin-strip'
import replace from '@rollup/plugin-replace'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import type { OutputChunk } from 'rollup'

import {
  UNI_EASYCOM_EXCLUDE,
  initAutoImportOptions,
  initPreContext,
  normalizePath,
  stripOptions,
  uniPrePlugin,
  uniUVueTypeScriptPlugin,
} from '@dcloudio/uni-cli-shared'
import { uniEasycomPlugin } from '@dcloudio/uni-h5-vite/dist/plugins/easycom'
import { isH5CustomElement, isH5NativeTag } from '@dcloudio/uni-shared'
import { genApiJson } from './api'
import {
  replacePagePaths,
  syncCustomElementsFile,
  syncPagesFile,
  uts2ts,
} from '../../scripts/ext-api'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

const FORMAT = process.env.FORMAT as 'es' | 'cjs'

const isX = process.env.UNI_APP_X === 'true'
const isX_VAPOR = process.env.UNI_APP_X_VAPOR === 'true'

const moduleBuildTarget = [
  'es2020',
  'edge88',
  'firefox78',
  'chrome87',
  'safari14',
]

initPreContext('web', {}, 'web', isX)

let systemPagePaths: Record<string, string> = {}
if (isX) {
  const apiDirs: string[] = []
  if (process.env.UNI_APP_EXT_API_DIR) {
    apiDirs.push(process.env.UNI_APP_EXT_API_DIR)
    syncCustomElementsFile([process.env.UNI_APP_EXT_API_DIR])
  }
  if (process.env.UNI_APP_EXT_API_DCLOUD_DIR) {
    apiDirs.push(process.env.UNI_APP_EXT_API_DCLOUD_DIR)
  }
  systemPagePaths = syncPagesFile(apiDirs, 'web')
  // if (process.env.UNI_APP_EXT_COMPONENT_DIR) {
  //   syncCustomElementsFile([process.env.UNI_APP_EXT_COMPONENT_DIR])
  // }
}

const rollupPlugins = [
  replace({
    values: {
      defineOnApi: `/*#__PURE__*/ defineOnApi`,
      defineOffApi: `/*#__PURE__*/ defineOffApi`,
      defineTaskApi: `/*#__PURE__*/ defineTaskApi`,
      defineSyncApi: `/*#__PURE__*/ defineSyncApi`,
      defineAsyncApi: `/*#__PURE__*/ defineAsyncApi`,
      __IMPORT_META_ENV_BASE_URL__: '__IMPORT_META_ENV_BASE_URL__', //直接使用import.meta.env.BASE_URL会被vite替换成'/'
      __DEV__: `(process.env.NODE_ENV !== 'production')`,
    },
    preventAssignment: true,
  }),

  jscc({
    values: {
      // 该插件限制了不能以__开头
      _NODE_JS_: FORMAT === 'cjs' ? 1 : 0,
      _X_: isX ? 1 : 0,
      _X_VAPOR_: isX_VAPOR ? 1 : 0,
    },
    exclude: [normalizePath(path.resolve(__dirname, '../../uni-ext-api/**/*'))],
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

function realIsH5CustomElement(tag: string) {
  return isH5CustomElement(tag, isX)
}

// 先剥离条件编译，再交给 vue / jsx 解析，避免带 #if/#endif 的 TSX 直接进入语义解析并触发报错。
// 同时排除 node_modules，避免把第三方包里的注释块也扫进去。
const prePlugin = uniPrePlugin({} as any, {
  include: [
    '**/*.vue',
    '**/*.js',
    '**/*.ts',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.uts',
  ],
  exclude: ['**/node_modules/**'],
})
prePlugin.enforce = 'pre'
const autoImportOptions = initAutoImportOptions('web', {})
autoImportOptions.imports = autoImportOptions.imports!.filter(
  (item: any) => item.from !== '@dcloudio/uni-cloud'
)
autoImportOptions.include = ['**/uni-ext-api/uni_modules/**']

export default defineConfig({
  root: __dirname,
  define: {
    global: FORMAT === 'cjs' ? 'global' : 'window',
    __TEST__: false,
    __PLATFORM__: JSON.stringify('h5'),
    __APP_VIEW__: false,
    __NODE_JS__: FORMAT === 'cjs' ? true : false,
    __X__: isX,
    __X_VAPOR__: isX_VAPOR,
    HTMLElement: FORMAT === 'cjs' ? 'Object' : 'HTMLElement',
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
      {
        find: '@dcloudio/uni-uts-v1',
        replacement: resolve('../uni-uts-v1'),
      },
    ],
  },
  plugins: [
    prePlugin,
    ...(isX
      ? [
          uniUVueTypeScriptPlugin(),
          AutoImport(autoImportOptions),
          uniExtApi(),
          uts2ts({ target: 'uni-h5', platform: 'web' }),
        ]
      : []),
    vue({
      customElement: isX,
      template: {
        compilerOptions: {
          isNativeTag: isH5NativeTag,
          isCustomElement: realIsH5CustomElement,
        },
      },
    }),
    vueJsx({ optimize: true, isCustomElement: realIsH5CustomElement }),
    // 需要支持uni-chooseLocation等内置页面编译
    ...(isX ? [uniEasycomPlugin({ exclude: UNI_EASYCOM_EXCLUDE })] : []),
    ...(isX ? [replacePagePaths(systemPagePaths)] : []),
  ],
  oxc: {
    // 强制为 es2015，否则默认是 esnext，会生成更激进的转译结果，
    // 部分 API 写的时候使用了动态定义 prototype 的方式，和这些结果会冲突，比如 createCanvasContext
    target: 'es2015',
  },
  build: {
    cssCodeSplit: true,
    // Vite 8/Rolldown no longer expands `modules` before passing the target to Oxc.
    target: moduleBuildTarget, // keep import.meta...
    emptyOutDir: FORMAT === 'es',
    outDir: isX_VAPOR ? 'dist-x-vapor' : isX ? 'dist-x' : 'dist',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: [FORMAT],
    },
    assetsDir: '.',
    rolldownOptions: {
      // 允许类型导出在 Rolldown 里以空值占位，避免缺失导出直接中断构建。
      shimMissingExports: true,
      output: {
        dir: isX_VAPOR ? 'dist-x-vapor' : isX ? 'dist-x' : 'dist',
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
        if (
          String(msg).includes(
            'contains an annotation that Rollup cannot interpret'
          )
        ) {
          // ignore TODO 稍后排查为什么会有警告
          return
        }
        if (!String(msg).includes('external module "vue" but never used')) {
          warn(msg)
        }
      },
    },
    sourcemap: (process.env as any).ENABLE_SOURCEMAP === 'true',
  },
})

// if (!process.env.UNI_APP_EXT_API_DIR) {
//   console.error(`UNI_APP_EXT_API_DIR is not defined`)
//   process.exit(0)
// }

function uniExtApi() {
  const uniApi = normalizePath(path.resolve(__dirname, '../uni-api'))
  return AutoImport({
    include: ['**/*.uts.ts'],
    imports: [
      {
        [uniApi]: [
          'defineOnApi',
          'defineOffApi',
          'defineTaskApi',
          'defineSyncApi',
          'defineAsyncApi',
        ],
        // TODO 整理autoImport规则或改为全局变量，目前下面的部分仅服务于match-media
        '@dcloudio/uni-components': ['UniViewElementImpl', 'UniViewElement'],
        '@dcloudio/uni-app': ['onResize'],
      },
    ],
  })
}
