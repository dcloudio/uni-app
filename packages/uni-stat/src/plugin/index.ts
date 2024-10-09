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
    let statVersion: '1' | '2' = '1'
    let isEnable = false
    const stats: Record<string, string> = {
      '@dcloudio/uni-stat': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-stat.es.js'
      ),
      '@dcloudio/uni-cloud-stat': resolveBuiltIn(
        '@dcloudio/uni-stat/dist/uni-cloud-stat.es.js'
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
        // ssr 时不开启
        if (!isSsr(env.command, config)) {
          const statConfig = getUniStatistics(inputDir, platform)
          isEnable = statConfig.enable === true

          if (isEnable) {
            const uniCloudConfig = statConfig.uniCloud || {}
            // 获取manifest.json 统计配置，插入环境变量中
            process.env.UNI_STATISTICS_CONFIG = JSON.stringify(statConfig)
            statVersion = Number(statConfig.version) === 2 ? '2' : '1'
            process.env.UNI_STAT_UNI_CLOUD = JSON.stringify(uniCloudConfig)
            process.env.UNI_STAT_DEBUG = statConfig.debug ? 'true' : 'false'
            if (process.env.NODE_ENV === 'production') {
              const manifestJson = parseManifestJsonOnce(inputDir)
              if (!manifestJson.appid) {
                uniStatLog(M['stat.warn.appid'])
                isEnable = false
              } else {
                if (!statConfig.version) {
                  uniStatLog(M['stat.warn.version'])
                } else {
                  uniStatLog(`已开启 uni统计${statVersion}.0 版本`)
                }
              }
            } else {
              if (!statConfig.version) {
                uniStatLog(M['stat.warn.version'])
              } else {
                uniStatLog(
                  M['stat.warn.tip'].replace('{version}', `${statVersion}.0`)
                )
              }
            }
          }

          debug('uni:stat')('isEnable', isEnable)
        }

        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
        return {
          define: {
            'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
            'process.env.UNI_STAT_UNI_CLOUD': process.env.UNI_STAT_UNI_CLOUD,
            'process.env.UNI_STAT_DEBUG': process.env.UNI_STAT_DEBUG,
            'process.env.UNI_STATISTICS_CONFIG':
              process.env.UNI_STATISTICS_CONFIG,
          },
        }
      },
      resolveId(id: string) {
        return stats[id] || null
      },
      transform(code: string, id: string) {
        if (isEnable && opts.filter(id)) {
          return {
            code:
              code +
              `;import '@dcloudio/uni${
                statVersion === '2' ? '-cloud' : ''
              }-stat';`,
            map: null,
          }
        }
      },
    }
  }),
]
