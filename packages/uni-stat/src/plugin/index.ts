import debug from 'debug'
import { once } from '@dcloudio/uni-shared'

import {
  M,
  defineUniMainJsPlugin,
  getUniStatistics,
  parseManifestJsonOnce,
  parsePagesJson,
  isSsr,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
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
      config(config, env) {
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
          const uniCloudConfig = statConfig.uniCloud || {}
          statVersion = statConfig.version === '2' ? '2' : '1'
          isEnable = statConfig.enable === true

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
              }
              if (isEnable) {
                uniStatLog(`已开启 uni统计${statVersion}.0 版本`)
              }
            }
          } else {
            if (isEnable) {
              if (!statConfig.version) {
                uniStatLog(M['stat.warn.version'])
              }
              uniStatLog(
                M['stat.warn.tip'].replace('{version}', `${statVersion}.0`)
              )
            }
          }

          debug('uni:stat')('isEnable', isEnable)
        }

        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
        return {
          define: {
            'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
            'process.env.UNI_STAT_UNI_CLOUD':
              process.env.UNI_STAT_UNI_CLOUD || JSON.stringify({}),
            'process.env.UNI_STAT_DEBUG': process.env.UNI_STAT_DEBUG || 'false',
          },
        }
      },
      resolveId(id) {
        return stats[id] || null
      },
      transform(code, id) {
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
