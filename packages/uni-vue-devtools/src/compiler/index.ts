import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import {
  defineUniMainJsPlugin,
  isMiniProgramPlatform,
} from '@dcloudio/uni-cli-shared'

const uniVueDevtoolsPlugin = (): Plugin => {
  let copied = false
  return {
    name: 'uni:vue-devtools',
    config() {
      return {
        define: {
          __VUE_PROD_DEVTOOLS__: process.env.__VUE_PROD_DEVTOOLS__ === 'true',
          __VUE_DEVTOOLS_HOST__: JSON.stringify(
            process.env.__VUE_DEVTOOLS_HOST__ || 'localhost'
          ),
          __VUE_DEVTOOLS_PORT__: JSON.stringify(
            process.env.__VUE_DEVTOOLS_PORT__ || '8098'
          ),
        },
      }
    },
    generateBundle() {
      // 仅处理小程序
      if (!isMiniProgramPlatform()) {
        return
      }
      if (copied || process.env.__VUE_PROD_DEVTOOLS__ !== 'true') {
        return
      }
      copied = true
      const vueDevtoolsDir = path.resolve(
        process.env.UNI_OUTPUT_DIR!,
        'vue-devtools'
      )
      if (!fs.existsSync(vueDevtoolsDir)) {
        fs.mkdirSync(vueDevtoolsDir, { recursive: true })
      }
      fs.copyFileSync(
        path.resolve(__dirname, '../lib/mp/backend.js'),
        path.resolve(vueDevtoolsDir, 'backend.js')
      )
      fs.copyFileSync(
        path.resolve(__dirname, '../lib/mp/hook.js'),
        path.resolve(vueDevtoolsDir, 'hook.js')
      )
    },
  }
}

export default () => [
  uniVueDevtoolsPlugin(),
  defineUniMainJsPlugin((opts) => {
    let devtoolsCode = `;import '@dcloudio/uni-vue-devtools';`
    if (isMiniProgramPlatform()) {
      devtoolsCode += `require('./vue-devtools/hook.js');require('./vue-devtools/backend.js');`
    } else {
      const dir = process.env.UNI_PLATFORM === 'app' ? 'app' : 'web'
      devtoolsCode += `import '@dcloudio/uni-vue-devtools/lib/${dir}/hook.js';import '@dcloudio/uni-vue-devtools/lib/${dir}/backend.js';`
    }

    return {
      name: 'uni:vue-devtools-main-js',
      enforce: 'post',
      transform(code: string, id: string) {
        if (process.env.__VUE_PROD_DEVTOOLS__ !== 'true') {
          return
        }
        if (!opts.filter(id)) {
          return
        }
        return {
          code: devtoolsCode + code,
          map: null,
        }
      },
    }
  }),
]
