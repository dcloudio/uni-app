import { Plugin } from 'vite'

import { vueCompilerOptions } from '@dcloudio/uni-cli-shared'

import {
  serverPluginEnv,
  serverPluginMainJs,
  serverPluginPagesJson
} from './server'

import {
  buildPluginCopy,
  buildPluginInject,
  buildPluginMainJs,
  buildPluginPagesJson,
  buildPluginDynamicImport
} from './build'

import { dynamicImportCode } from './utils/dynamicImportUtils'
import { initEasycoms } from './utils/easycomUtils'

const VUES = ['vue', 'vue.js', './vue.js']

const plugins = [
  buildPluginMainJs,
  buildPluginPagesJson,
  buildPluginInject,
  buildPluginCopy
]

if (dynamicImportCode) {
  plugins.push(buildPluginDynamicImport)
}

const plugin: Plugin = {
  define: {
    __UNI_WX_API__: true,
    __UNI_WXS_API__: true,
    __UNI_ROUTER_MODE__: JSON.stringify('hash')
  },
  resolvers: [
    {
      alias(id: string) {
        if (VUES.includes(id)) {
          return '@dcloudio/uni-h5-vue'
        }
        if (id.startsWith('@/')) {
          return id.replace('@/', '/src/')
        }
      }
    }
  ],
  configureServer: [serverPluginEnv, serverPluginMainJs, serverPluginPagesJson],
  rollupInputOptions: {
    plugins
  },
  vueCompilerOptions,
  configureBuild({ root }) {
    initEasycoms(root)
  }
}
// TODO 等待 vite 升级支持以下配置
Object.assign(plugin, {
  optimizeDeps: {
    exclude: [
      'vue-router',
      '@dcloudio/uni-h5',
      '@dcloudio/uni-h5-vue',
      '@dcloudio/uni-shared'
    ]
  },
  chokidarWatchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      '**/uniCloud-aliyun/**',
      '**/uniCloud-tcb/**'
    ]
  }
})
export default plugin
