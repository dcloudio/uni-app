import debug from 'debug'
import {
  M,
  defineUniMainJsPlugin,
  getUniStatistics,
  parseManifestJsonOnce,
  parsePagesJson,
} from '@dcloudio/uni-cli-shared'

export default [
  defineUniMainJsPlugin((opts) => {
    let isEnable = false
    return {
      name: 'uni:stat',
      enforce: 'pre',
      config() {
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

        isEnable = getUniStatistics(inputDir, platform).enable === true
        if (process.env.NODE_ENV === 'production') {
          const manifestJson = parseManifestJsonOnce(inputDir)
          if (!manifestJson.appid) {
            console.log()
            console.warn(M['stat.warn.appid'])
            console.log()
            isEnable = false
          }
        }

        debug('uni:stat')('isEnable', isEnable)
        process.env.UNI_STAT_TITLE_JSON = JSON.stringify(titlesJson)
        return {
          define: {
            'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
          },
        }
      },
      transform(code, id) {
        if (isEnable && opts.filter(id)) {
          return {
            code: code + `;import '@dcloudio/uni-stat';`,
            map: null,
          }
        }
      },
    }
  }),
]
