import debug from 'debug'
import {
  M,
  defineUniMainJsPlugin,
  getUniStatistics,
  parseManifestJsonOnce,
  parsePagesJson,
  isSsr,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'

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
          statVersion = statConfig.version === '2' ? '2' : '1'
          isEnable = statConfig.enable === true
          if (process.env.NODE_ENV === 'production') {
            const manifestJson = parseManifestJsonOnce(inputDir)
            if (!manifestJson.appid) {
              console.log()
              console.warn(M['stat.warn.appid'])
              console.log()
              isEnable = false
            } else {
				if (!statConfig.version){
					console.log()
					console.warn(M['stat.warn.version'])
					console.log()
				}
			}
          }

          debug('uni:stat')('isEnable', isEnable)
        }

        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
        return {
          define: {
            'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
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
