import { Plugin } from 'vite'

import { vueCompilerOptions } from '@dcloudio/uni-cli-shared'

import {
  serverPluginEnv,
  serverPluginMainJs,
  serverPluginPagesJson,
} from './server'

import {
  buildPluginCopy,
  buildPluginInject,
  buildPluginMainJs,
  buildPluginPagesJson,
  buildPluginDynamicImport,
} from './build'

import { initEasycoms, dynamicImportCode, transform } from './utils'

const VUES = ['vue', 'vue.js', './vue.js', 'dist/vue.runtime.esm-bundler.js']

const plugins = [
  buildPluginMainJs,
  buildPluginPagesJson,
  buildPluginInject,
  buildPluginCopy,
]

if (dynamicImportCode) {
  plugins.push(buildPluginDynamicImport)
}

const plugin: Plugin = {
  configureServer: [serverPluginEnv, serverPluginMainJs, serverPluginPagesJson],
  rollupInputOptions: {
    plugins,
  },
  vueCompilerOptions,
  configureBuild({ root }) {
    initEasycoms(root)
  },
}
// TODO 等待 vite 升级支持以下配置
Object.assign(plugin, {
  optimizeDeps: {
    exclude: [
      'vue',
      'vue-router',
      '@dcloudio/uni-h5',
      '@dcloudio/uni-h5-vue',
      '@dcloudio/uni-shared',
    ],
  },
  chokidarWatchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      '**/uniCloud-aliyun/**',
      '**/uniCloud-tcb/**',
    ],
  },
})
interface Options {}
export default function uniPlugin(_rawOptions: Options = {}): Plugin {
  return {
    name: 'vite:uni',
    config(config) {
      config.define = {
        __UNI_WX_API__: true,
        __UNI_WXS_API__: true,
        __UNI_ROUTER_MODE__: JSON.stringify('hash'),
        ...config.define,
      }
    },
    async resolveId(id) {
      if (VUES.includes(id)) {
        return '@dcloudio/uni-h5-vue'
      }
      if (id.startsWith('@/')) {
        return id.replace('@/', '/src/')
      }
    },
    transform,
    configureServer() {},
  }
}
