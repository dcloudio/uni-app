import type { Plugin } from 'vite'
import fs from 'fs-extra'
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
          'process.env.UNI_CONSOLE_WEBVIEW_EVAL_JS_CODE': JSON.stringify(''),
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
      const uniConsolePath =
        isX &&
        (process.env.UNI_UTS_PLATFORM === 'app-android' ||
          process.env.UNI_UTS_PLATFORM === 'app-ios')
          ? resolveBuiltIn(
              path.join('@dcloudio/uni-console', 'src/runtime/app.ts')
            )
          : resolveBuiltIn(
              path.join('@dcloudio/uni-console', 'dist/index.esm.js')
            )
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
            code: `import '${uniConsolePath}'
            ${code}
            `,
            map: {
              mappings: '',
            },
          }
        },
        writeBundle() {
          if (!hasRuntimeSocket) {
            return
          }
          if (process.env.UNI_UTS_PLATFORM === 'app-android') {
            // 仅app-android需要复制__uniwebview.js（运行时读取），其他平台使用app.esm.js（该文件存储了__uniwebview.js的字符串）
            const uniWebViewPath = path.join(
              process.env.UNI_OUTPUT_DIR!,
              '__uniwebview.js'
            )
            if (!fs.existsSync(uniWebViewPath)) {
              fs.copySync(
                path.join(__dirname, '../dist/__uniwebview.js'),
                uniWebViewPath
              )
            }
          }
        },
      }
    }),
  ]
}
