import fs from 'fs-extra'
import path from 'path'
import {
  defineUniMainJsPlugin,
  getPlatformDir,
  normalizePath,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

export default [
  defineUniMainJsPlugin((opts) => {
    return {
      name: 'uni:automator',
      enforce: 'pre',
      configResolved() {
        if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
          return
        }
        const pkg = JSON.parse(
          fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
        )
        const automatorJson = JSON.stringify({
          version: pkg.version,
          wsEndpoint: process.env.UNI_AUTOMATOR_WS_ENDPOINT,
        })
        fs.outputFileSync(
          path.resolve(
            process.env.UNI_OUTPUT_DIR,
            '../.automator/' + getPlatformDir() + '/.automator.json'
          ),
          automatorJson
        )
      },
      transform(code, id) {
        if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
          return null
        }
        if (opts.filter(id)) {
          const platform = process.env.UNI_PLATFORM
          // 仅 app-android
          if (
            (platform === 'app' || platform === 'app-harmony') &&
            process.env.UNI_APP_X === 'true'
          ) {
            // app-webview，不增加 initAutomator
            if (process.env.UNI_AUTOMATOR_APP_WEBVIEW === 'true') {
              return null
            }
            if (process.env.UNI_UTS_PLATFORM === 'app-android') {
              const automatorPath = normalizePath(
                resolveBuiltIn(
                  `@dcloudio/uni-app-uts/lib/automator/android/index.uts`
                )
              )
              return {
                code:
                  // 增加个换行，避免最后是注释且无换行
                  code + `;\nimport { initAutomator } from '${automatorPath}';`,
                map: null,
              }
            } else if (
              process.env.UNI_UTS_PLATFORM === 'app-ios' ||
              process.env.UNI_UTS_PLATFORM === 'app-harmony'
            ) {
              const automatorPath = normalizePath(
                resolveBuiltIn(
                  `@dcloudio/uni-app-uts/lib/automator/ios/automator.js`
                )
              )
              return {
                code: code + `;\nimport '${automatorPath}';`,
                map: null,
              }
            }
          }
          const automatorPath = normalizePath(
            resolveBuiltIn(
              `@dcloudio/uni-${
                platform === 'app' ? 'app-plus' : platform
              }/lib/automator.js`
            )
          )
          return {
            code: code + `;\nimport '${automatorPath}';`,
            map: null,
          }
        }
      },
    }
  }),
]
