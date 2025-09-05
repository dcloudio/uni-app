const {
  getManifestJson
} = require('@dcloudio/uni-cli-shared/lib/manifest.js')

module.exports = function (appJson, useAD) {
  const manifestJson = getManifestJson()
  const manifestJsonWxNode = manifestJson['mp-weixin']
  if (manifestJsonWxNode) {
    const plugins = manifestJsonWxNode.plugins || {}
    for (const key in plugins) {
      const provider = plugins[key].provider
      if (provider && provider === 'wx0e203209e27b1e66') {
        console.error('应用的uni-ad配置不正确，请直接在页面中引入uni-ad广告组件，无需单独引入插件。')
        process.exit(-1)
      }
    }
  }
}
