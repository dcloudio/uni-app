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
          const automatorPath = normalizePath(
            resolveBuiltIn(
              `@dcloudio/uni-${
                platform === 'app' ? 'app-plus' : platform
              }/lib/automator.js`
            )
          )
          return {
            code: code + `;import '${automatorPath}';`,
            map: null,
          }
        }
      },
    }
  }),
]
