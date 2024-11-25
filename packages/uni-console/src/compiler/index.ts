import type { Plugin } from 'vite'

import { defineUniMainJsPlugin } from '@dcloudio/uni-cli-shared'

const uniConsoleRuntimePlugin = (): Plugin => {
  return {
    name: 'uni:console:runtime',
    config() {
      const isProd = process.env.NODE_ENV === 'production'
      return {
        define: {
          UNI_SOCKET_HOSTS: isProd ? '' : process.env.UNI_SOCKET_HOSTS,
          UNI_SOCKET_PORT: isProd ? '' : process.env.UNI_SOCKET_PORT,
          UNI_SOCKET_ID: isProd ? '' : process.env.UNI_SOCKET_ID,
        },
      }
    },
  }
}

export default () => {
  return [
    uniConsoleRuntimePlugin(),
    defineUniMainJsPlugin((opts) => {
      const hasRuntimeSocket =
        process.env.UNI_SOCKET_HOSTS &&
        process.env.UNI_SOCKET_PORT &&
        process.env.UNI_SOCKET_ID
      return {
        name: 'uni:console-main-js',
        enforce: 'post',
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
            map: null,
          }
        },
      }
    }),
  ]
}
