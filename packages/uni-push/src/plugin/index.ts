import path from 'path'
import {
  defineUniMainJsPlugin,
  hasPushModule,
  isEnableUniPushV1,
  isEnableUniPushV2,
  isSsr,
  isUniPushOffline,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
import type { ConfigEnv, UserConfig } from 'vite'

export default () => [
  defineUniMainJsPlugin((opts) => {
    let isEnableV1 = false
    let isEnableV2 = false
    let isOffline = false
    let configModulePush = false
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
        configModulePush = hasPushModule(inputDir)
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
          let file = 'dist/uni-push.es.js'
          if (isEnableV1) {
            file = 'dist/uni-push-v1.plus.es.js'
          } else if (isOffline) {
            file = 'dist/uni-push.plus.es.js'
          }
          return resolveBuiltIn(path.join('@dcloudio/uni-push', file))
        }
      },
      transform(code: string, id: string) {
        if (!opts.filter(id)) {
          return
        }
        // 如果启用了v1，但是没有配置module.push，不需要注入
        if (isEnableV1 && !configModulePush) {
          return
        }
        // 如果启用了v2+offline，但是没有配置module.push，不需要注入
        if (isEnableV2 && isOffline && !configModulePush) {
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
