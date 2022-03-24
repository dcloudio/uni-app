import path from 'path'
import debug from 'debug'
import {
  defineUniMainJsPlugin,
  isSsr,
  isEnableUniPushV2,
  isUniPushOffline,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

const debugPush = debug('uni:push')
export default () => [
  defineUniMainJsPlugin((opts) => {
    let isEnable = false
    let isOffline = false
    return {
      name: 'uni:push',
      enforce: 'pre',
      config(config, env) {
        if (isSsr(env.command, config)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_PLATFORM!
        isEnable = isEnableUniPushV2(inputDir, platform)
        if (!isEnable) {
          return
        }
        isOffline = platform === 'app' && isUniPushOffline(inputDir)
        if (isOffline) {
          return
        }
        debugPush('deubg', debug)
        return {
          define: {
            'process.env.UNI_PUSH_DEBUG': !!debug,
          },
        }
      },
      resolveId(id) {
        if (id === '@dcloudio/uni-push') {
          return resolveBuiltIn(
            path.join(
              '@dcloudio/uni-push',
              isOffline ? 'dist/uni-push.plus.es.js' : 'dist/uni-push.es.js'
            )
          )
        }
      },
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        if (isEnable) {
          return {
            code: code + `;import '@dcloudio/uni-push';`,
            map: null,
          }
        }
      },
    }
  }),
]
