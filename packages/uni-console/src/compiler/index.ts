import type { Plugin } from 'vite'
import path from 'path'
import {
  defineUniMainJsPlugin,
  isEnableConsole,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

const uniConsoleRuntimePlugin = (): Plugin => {
  return {
    name: 'uni:console:runtime',
    config() {
      const isProd = process.env.NODE_ENV === 'production'
      let keepOriginal = true
      if (
        process.env.UNI_PLATFORM == 'mp-harmony' ||
        process.env.UNI_PLATFORM === 'app-harmony'
      ) {
        keepOriginal = false
      }
      return {
        define: {
          __UNI_CONSOLE_KEEP_ORIGINAL__: process.env.UNI_CONSOLE_KEEP_ORIGINAL
            ? process.env.UNI_CONSOLE_KEEP_ORIGINAL === 'true'
            : keepOriginal,
          __UNI_SOCKET_HOSTS__: JSON.stringify(
            isProd ? '' : process.env.UNI_SOCKET_HOSTS
          ),
          __UNI_SOCKET_PORT__: JSON.stringify(
            isProd ? '' : process.env.UNI_SOCKET_PORT
          ),
          __UNI_SOCKET_ID__: JSON.stringify(
            isProd ? '' : process.env.UNI_SOCKET_ID
          ),
        },
      }
    },
  }
}

export default () => {
  return [
    uniConsoleRuntimePlugin(),
    defineUniMainJsPlugin((opts) => {
      const hasRuntimeSocket = isEnableConsole()
      return {
        name: 'uni:console-main-js',
        enforce: 'post',
        resolveId(id: string) {
          if (id === '@dcloudio/uni-console') {
            return resolveBuiltIn(
              path.join('@dcloudio/uni-console', 'dist/index.esm.js')
            )
          }
        },
        transform(code: string, id: string) {
          if (!hasRuntimeSocket) {
            return
          }
          if (!opts.filter(id)) {
            return
          }
          return {
            code: `import '@dcloudio/uni-console'
            ${code}
            `,
            map: {
              mappings: '',
            },
          }
        },
      }
    }),
  ]
}
