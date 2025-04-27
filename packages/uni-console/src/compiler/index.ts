import type { Plugin } from 'vite'
import fs from 'fs-extra'
import path from 'path'
import {
  defineUniMainJsPlugin,
  isEnableConsole,
  normalizePath,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

const uniConsoleRuntimePlugin = (): Plugin => {
  return {
    name: 'uni:console:runtime',
    config() {
      const isX = process.env.UNI_APP_X === 'true'
      const isProd = process.env.NODE_ENV === 'production'
      let keepOriginal = true
      if (
        process.env.UNI_PLATFORM == 'mp-harmony' ||
        process.env.UNI_PLATFORM === 'app-harmony'
      ) {
        keepOriginal = false
      }
      const webviewEvalJsCode =
        isX && process.env.UNI_UTS_PLATFORM === 'app-android'
          ? fs.readFileSync(
              path.join(__dirname, '../dist/__uniwebview.js'),
              'utf-8'
            )
          : ''
      return {
        define: {
          'process.env.UNI_CONSOLE_KEEP_ORIGINAL': process.env
            .UNI_CONSOLE_KEEP_ORIGINAL
            ? process.env.UNI_CONSOLE_KEEP_ORIGINAL === 'true'
            : keepOriginal,
          'process.env.UNI_SOCKET_HOSTS': JSON.stringify(
            isProd ? '' : process.env.UNI_SOCKET_HOSTS
          ),
          'process.env.UNI_SOCKET_PORT': JSON.stringify(
            isProd ? '' : process.env.UNI_SOCKET_PORT
          ),
          'process.env.UNI_SOCKET_ID': JSON.stringify(
            isProd ? '' : process.env.UNI_SOCKET_ID
          ),
          'process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE':
            JSON.stringify(webviewEvalJsCode),
        },
      }
    },
  }
}

export default () => {
  return [
    uniConsoleRuntimePlugin(),
    defineUniMainJsPlugin((opts) => {
      let hasRuntimeSocket = isEnableConsole()
      const isX = process.env.UNI_APP_X === 'true'
      // 基座类型为custom时，不启用运行时socket
      // 需要判断自定义基座是否包含socket模块，有的话才可以启用
      if (isX && process.env.UNI_PLATFORM === 'app') {
        if (process.env.HX_USE_BASE_TYPE === 'custom') {
          hasRuntimeSocket = false
        }
      }
      let uniConsolePath = resolveBuiltIn(
        path.join(
          '@dcloudio/uni-console',
          `dist/${
            (process.env.UNI_PLATFORM || '').startsWith('mp-') ? 'mp' : 'index'
          }.esm.js`
        )
      )
      if (isX) {
        if (process.env.UNI_UTS_PLATFORM === 'app-android') {
          uniConsolePath = resolveBuiltIn(
            path.join('@dcloudio/uni-console', 'src/runtime/app/index.ts')
          )
        } else if (process.env.UNI_UTS_PLATFORM === 'app-ios') {
          uniConsolePath = resolveBuiltIn(
            path.join('@dcloudio/uni-console', 'dist/app.esm.js')
          )
        }
      } else {
        if (process.env.UNI_PLATFORM === 'app-harmony') {
          uniConsolePath = resolveBuiltIn(
            path.join('@dcloudio/uni-console', 'dist/harmony.jsvm.esm.js')
          )
        }
      }
      return {
        name: 'uni:console-main-js',
        enforce:
          // android需要提前，不然拿到的code是解析后的仅保留import语句的
          process.env.UNI_UTS_PLATFORM === 'app-android' ? 'pre' : 'post',
        transform(code: string, id: string) {
          if (!hasRuntimeSocket) {
            return
          }
          if (!opts.filter(id)) {
            return
          }
          return {
            // 采用绝对路径引入，此时，tsc失效，代码里需要自己处理好各种类型问题
            code: `import '${normalizePath(uniConsolePath)}';${code}`,
            map: null,
          }
        },
      }
    }),
  ]
}
