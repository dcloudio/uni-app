const assetsDir = 'static'

function getCopyWebpackPluginOptions (manifestPlatformOptions, vueOptions) {
  const {
    getPlatformCopy
  } = require('@dcloudio/uni-cli-shared/lib/platform')

  return getPlatformCopy()({
    assetsDir,
    manifestPlatformOptions,
    vueOptions
  })
}

module.exports = {
  assetsDir,
  getCopyWebpackPluginOptions
}
