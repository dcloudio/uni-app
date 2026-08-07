import path from 'path'
import {
  defineUniMainJsPlugin,
  hasPushModule,
  isEnableUniPushV1,
  isEnableUniPushV2,
  isSsr,
  isUniPushOffline,
  normalizePath,
  parseIndependentMainRoot,
  resolveBuiltIn,
  withIndependentRoot,
} from '@dcloudio/uni-cli-shared'
import type { ConfigEnv, UserConfig } from 'vite'

function resolveUniPushPath(
  platform: string,
  isEnableV1: boolean,
  isOffline: boolean
): string {
  const currentPlatform = platform || process.env.UNI_PLATFORM || ''
  let file = 'dist/uni-push.es.js'
  if (currentPlatform.startsWith('mp-')) {
    file = 'dist/uni-push.mp.es.js'
  } else if (isEnableV1) {
    file = 'dist/uni-push-v1.plus.es.js'
  } else if (isOffline) {
    file = 'dist/uni-push.plus.es.js'
  }
  return normalizePath(resolveBuiltIn(path.join('@dcloudio/uni-push', file)))
}

export default () => [
  defineUniMainJsPlugin((opts) => {
    let isEnableV1 = false
    let isEnableV2 = false
    let isOffline = false
    let configModulePush = false
    let platform = ''
    return {
      name: 'uni:push',
      enforce: 'pre',
      config(config: UserConfig, env: ConfigEnv) {
        if (isSsr(env.command, config)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR!
        const currentPlatform = process.env.UNI_PLATFORM!
        platform = currentPlatform
        isEnableV1 = isEnableUniPushV1(inputDir, currentPlatform)
        isEnableV2 = isEnableUniPushV2(inputDir, currentPlatform)
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
          return resolveUniPushPath(platform, isEnableV1, isOffline)
        }
      },
      transform(code: string, id: string) {
        const independentRoot = parseIndependentMainRoot(id)
        if (!opts.filter(id) && !independentRoot) {
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
          const importCode = independentRoot
            ? `import ${JSON.stringify(
                withIndependentRoot(
                  resolveUniPushPath(platform, isEnableV1, isOffline),
                  independentRoot
                )
              )};`
            : `import '@dcloudio/uni-push';`
          return {
            code: importCode + code,
            map: null,
          }
        }
      },
    }
  }),
]
