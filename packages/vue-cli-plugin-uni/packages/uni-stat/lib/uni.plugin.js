const debug = require('debug')
const {
  M,
  defineUniMainJsPlugin,
  getUniStatistics,
  parseManifestJsonOnce,
  parsePagesJsonOnce,
} = require('@dcloudio/uni-cli-shared')

module.exports = [
  defineUniMainJsPlugin((opts) => {
    let isEnable = false
    return {
      name: 'vite:uni-stat',
      enforce: 'pre',
      config(config, env) {
        if (isSsr(env.command, config)) {
          return
        }
        const inputDir = process.env.UNI_INPUT_DIR
        const platform = process.env.UNI_PLATFORM
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
        const titlesJson = Object.create(null)
        if (isEnable) {
          parsePagesJsonOnce(inputDir, platform).pages.forEach((page) => {
            const titleText = page.style.navigationBar.titleText || ''
            if (titleText) {
              titlesJson[page.path] = titleText
            }
          })
        }
        debug('vite:uni:stat')('isEnable', isEnable)
        return {
          define: {
            'process.env.UNI_STAT_TITLE_JSON': JSON.stringify(titlesJson),
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

function isSsr(command, config) {
  if (command === 'serve') {
    return !!(config.server && config.server.middlewareMode)
  }
  if (command === 'build') {
    return !!(config.build && config.build.ssr)
  }
  return false
}
