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
        // 小程序 X 模式下，需要将标题信息注入到环境中
        if (process.env.UNI_APP_X === 'true') {
          if (process.env.UNI_PLATFORM?.startsWith('mp-')) {
            process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
            return {
              define: {
                'process.env.UNI_STAT_TITLE_JSON':
                  process.env.UNI_STAT_TITLE_JSON,
              },
            }
          }
        }
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
            'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
            'process.env.UNI_STAT_UNI_CLOUD': process.env.UNI_STAT_UNI_CLOUD,
            'process.env.UNI_STAT_DEBUG': process.env.UNI_STAT_DEBUG,
            'process.env.UNI_STATISTICS_CONFIG':
              process.env.UNI_STATISTICS_CONFIG,
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
