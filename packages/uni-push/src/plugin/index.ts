import path from 'path'
import {
  defineUniMainJsPlugin,
  isSsr,
  isEnableUniPushV1,
  isEnableUniPushV2,
  isUniPushOffline,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
import { ConfigEnv, UserConfig } from 'vite'

export default () => [
  defineUniMainJsPlugin((opts) => {
    let isEnableV1 = false
    let isEnableV2 = false
    let isOffline = false
    return {
      name: 'uni:push',
      enforce: 'pre',
      config(config: UserConfig, env: ConfigEnv) {
        if (isSsr(env.command, config)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_PLATFORM!
        isEnableV1 = isEnableUniPushV1(inputDir, platform)
        isEnableV2 = isEnableUniPushV2(inputDir, platform)
        // v1
        if (isEnableV1) {
          return
        }
        if (!isEnableV2) {
          return
        }
        // v2
        isOffline = platform === 'app' && isUniPushOffline(inputDir)
        if (isOffline) {
          return
        }
        return {
          define: {
            'process.env.UNI_PUSH_DEBUG': false,
          },
        }
      },
      resolveId(id: string) {
        if (id === '@dcloudio/uni-push') {
          return resolveBuiltIn(
            path.join(
              '@dcloudio/uni-push',
              isOffline || isEnableV1
                ? 'dist/uni-push.plus.es.js'
                : 'dist/uni-push.es.js'
            )
          )
        }
      },
      transform(code: string, id: string) {
        if (!opts.filter(id)) {
          return
        }
        if (isEnableV1 || isEnableV2) {
          return {
            code: `import '@dcloudio/uni-push';` + code,
            map: null,
          }
        }
      },
    }
  }),
]
