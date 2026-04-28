import debug from 'debug'
import { once } from '@dcloudio/uni-shared'

import {
  M,
  defineUniMainJsPlugin,
  getUniStatistics,
  isNormalCompileTarget,
  isSsr,
  parseManifestJsonOnce,
  parsePagesJson,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
import type { ConfigEnv, UserConfig } from 'vite'
const uniStatLog = once((text: string) => {
  console.log()
  console.warn(text)
  console.log()
})

export default () => [
  defineUniMainJsPlugin((opts) => {
    // 公有版（version === '3'）走 uni-stat-public，与 1/2 私有版并存。
    let statVersion: '1' | '2' | '3' = '1'
    let isEnable = false
    const stats: Record<string, string> = {
      '@dcloudio/uni-stat': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-stat.es.js'
      ),
      '@dcloudio/uni-cloud-stat': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-cloud-stat.es.js'
      ),
      '@dcloudio/uni-stat-public': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-stat-public.es.js'
      ),
    }

    return {
      name: 'uni:stat',
      enforce: 'pre',
      config(config: UserConfig, env: ConfigEnv) {
        if (!isNormalCompileTarget()) {
          // 不需要统计
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR!
        const platform = process.env.UNI_PLATFORM!
        const titlesJson = Object.create(null)
        parsePagesJson(inputDir, platform).pages.forEach((page: any) => {
          const style = page.style || {}
          const titleText =
            // MP
            style.navigationBarTitleText ||
            // H5 || App
            style.navigationBar?.titleText ||
            ''
          if (titleText) {
            titlesJson[page.path] = titleText
          }
        })
        // 注意：勿在此对 mp- + UNI_APP_X 提前 return。
        // 提前 return 会导致后续未执行 getUniStatistics / UNI_STATISTICS_CONFIG，
        // 小程序公有版运行时 manifest（backgroundTimeout / reportInterval 等）全部丢失，仍走默认值；
        // H5 不走 mp- 分支故无此问题。标题 JSON 与统计配置在同一套 define 末尾统一注入。
        // ssr 时不开启
        if (!isSsr(env.command, config)) {
          const statConfig = getUniStatistics(inputDir, platform)
          isEnable = statConfig.enable === true

          if (isEnable) {
            const uniCloudConfig = statConfig.uniCloud || {}
            // 获取manifest.json 统计配置，插入环境变量中
            process.env.UNI_STATISTICS_CONFIG = JSON.stringify(statConfig)
            // version=3 走公有版；2 走 uniCloud 私有版；其它统一回退到 1.0。
            const versionNum = Number(statConfig.version)
            statVersion = versionNum === 3 ? '3' : versionNum === 2 ? '2' : '1'
            process.env.UNI_STAT_UNI_CLOUD = JSON.stringify(uniCloudConfig)
            process.env.UNI_STAT_DEBUG = statConfig.debug ? 'true' : 'false'
            // 公有版字段 `an` 兜底：注入 manifest.json#name 到 process.env.UNI_APP_NAME，
            // 由 `public/adapter/package.ts#getEnvAppName` 读取。任意阶段读 manifest 失败
            // 都走 try/catch，不阻断构建。
            try {
              const manifestForName = parseManifestJsonOnce(inputDir)
              if (manifestForName && typeof manifestForName.name === 'string') {
                process.env.UNI_APP_NAME = manifestForName.name
              }
            } catch (e) {
              debug('uni:stat')('parse manifest for UNI_APP_NAME failed', e)
            }
            if (process.env.NODE_ENV === 'production') {
              const manifestJson = parseManifestJsonOnce(inputDir)
              if (!manifestJson.appid) {
                uniStatLog(M['stat.warn.appid'])
                isEnable = false
              } else {
                if (!statConfig.version) {
                  uniStatLog(M['stat.warn.version'])
                } else {
                  uniStatLog(
                    `已开启 uni统计${
                      statVersion === '3' ? '公有版(3)' : `${statVersion}.0`
                    } 版本`
                  )
                }
              }
            } else {
              if (!statConfig.version) {
                uniStatLog(M['stat.warn.version'])
              } else {
                uniStatLog(
                  M['stat.warn.tip'].replace(
                    '{version}',
                    statVersion === '3' ? '公有版(3)' : `${statVersion}.0`
                  )
                )
              }
            }
          }

          debug('uni:stat')('isEnable', isEnable, 'version', statVersion)
        }

        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
        return {
          define: {
            // 与 UNI_APP_NAME 同理：外层 JSON.stringify 才能得到合法的内联字符串字面量
            'process.env.UNI_STAT_TITLE_JSON': JSON.stringify(
              process.env.UNI_STAT_TITLE_JSON ?? '{}'
            ),
            'process.env.UNI_STAT_UNI_CLOUD': JSON.stringify(
              process.env.UNI_STAT_UNI_CLOUD ?? '{}'
            ),
            // 注意：define 的 value 是「替换后的源码字面量」，必须 JSON.stringify 一次，
            // 否则 'true' / 'false' 字符串会被当成布尔字面量替换进源码，导致
            // dist 中 `process.env.UNI_STAT_DEBUG === 'true'` 永远等于 false（公有版调试日志失效根因）。
            'process.env.UNI_STAT_DEBUG': JSON.stringify(
              process.env.UNI_STAT_DEBUG ?? 'false'
            ),
            // 与 UNI_STAT_TITLE_JSON 同理：`statConfig` 已是 JSON 字符串，若不经
            // JSON.stringify 再包一层，esbuild/vite define 会把串内 `"` 当成源码边界，
            // 运行时替换结果残缺 → JSON.parse 失败 → readManifestStatConfig 静默回退，
            // manifest 里的 backgroundTimeout / pageInactiveTimeout 等全部丢失（表现为默认 300/1800）。
            'process.env.UNI_STATISTICS_CONFIG': JSON.stringify(
              process.env.UNI_STATISTICS_CONFIG ?? '{}'
            ),
            'process.env.UNI_APP_NAME': JSON.stringify(
              process.env.UNI_APP_NAME ?? ''
            ),
          },
        }
      },
      resolveId(id: string) {
        return stats[id] || null
      },
      transform(code: string, id: string) {
        if (isEnable && opts.filter(id)) {
          // 三种版本对应不同的运行时入口：
          //   '1' → @dcloudio/uni-stat（HTTP 1.0）
          //   '2' → @dcloudio/uni-cloud-stat（uniCloud 2.0，私有版默认）
          //   '3' → @dcloudio/uni-stat-public（公有版，本次 Phase 11 新增）
          const importPath =
            statVersion === '3'
              ? '@dcloudio/uni-stat-public'
              : statVersion === '2'
              ? '@dcloudio/uni-cloud-stat'
              : '@dcloudio/uni-stat'
          return {
            code: code + `;import '${importPath}';`,
            map: null,
          }
        }
      },
    }
  }),
]
