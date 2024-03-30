import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import {
  defineUniMainJsPlugin,
  isMiniProgramPlatform,
  normalizePath,
} from '@dcloudio/uni-cli-shared'

let copied = false
let initializedServer = false

const uniVueDevtoolsPlugin = (): Plugin => {
  return {
    name: 'uni:vue-devtools',
    config() {
      return new Promise(async (resolve) => {
        let __VUE_DEVTOOLS_HOSTS__ = ''
        let __VUE_DEVTOOLS_PORT__ = 8098
        let __VUE_DEVTOOLS_TEST_PORT__

        if (process.env.__VUE_PROD_DEVTOOLS__ && !initializedServer) {
          initializedServer = true
          const { socketHosts, socketPort, testConnectionPort } =
            // eslint-disable-next-line no-restricted-globals
            await require('../lib/front/server.js').initDevtoolsServer()
          __VUE_DEVTOOLS_HOSTS__ = socketHosts
          __VUE_DEVTOOLS_PORT__ = socketPort
          __VUE_DEVTOOLS_TEST_PORT__ = testConnectionPort
        }

        resolve({
          define: {
            __VUE_PROD_DEVTOOLS__: process.env.__VUE_PROD_DEVTOOLS__ === 'true',
            __VUE_DEVTOOLS_HOST__: JSON.stringify(
              process.env.__VUE_DEVTOOLS_HOST__ || 'localhost'
            ),
            __VUE_DEVTOOLS_HOSTS__: JSON.stringify(__VUE_DEVTOOLS_HOSTS__),
            __VUE_DEVTOOLS_PORT__: JSON.stringify(__VUE_DEVTOOLS_PORT__),
            __VUE_DEVTOOLS_TEST_PORT__: JSON.stringify(
              __VUE_DEVTOOLS_TEST_PORT__
            ),
          },
        })
      })
    },
    generateBundle() {
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

export default () => {
  return [
    uniVueDevtoolsPlugin(),
    defineUniMainJsPlugin((opts) => {
      const devtoolsPath = normalizePath(path.resolve(__dirname, '..'))
      let devtoolsCode = `;import '${devtoolsPath}';`
      if (isMiniProgramPlatform()) {
        devtoolsCode += `require('./vue-devtools/hook.js');require('./vue-devtools/backend.js');`
      } else {
        const dir = process.env.UNI_PLATFORM === 'app' ? 'app' : 'web'
        devtoolsCode += `import '${devtoolsPath}/lib/${dir}/hook.js';import '${devtoolsPath}/lib/${dir}/backend.js';`
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
}
