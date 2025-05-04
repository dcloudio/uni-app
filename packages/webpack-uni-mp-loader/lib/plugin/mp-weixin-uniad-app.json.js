const UNI_PLUGINS = [{
  name: 'uni-ad',
  version: '1.3.0',
  provider: 'wxf72d316417b6767f'
},
{
  name: 'coral-adv',
  version: '1.0.25',
  provider: 'wx0e203209e27b1e66'
}
]

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

  if (!useAD) {
    return
  }

  if (!appJson.plugins) {
    appJson.plugins = {}
  }

  for (let i = 0; i < UNI_PLUGINS.length; i++) {
    const { name, version, provider } = UNI_PLUGINS[i]
    appJson.plugins[name] = {
      version,
      provider
    }
  }

  if (!appJson.usingComponents) {
    appJson.usingComponents = {}
  }
  if (!appJson.usingComponents['uniad-plugin']) {
    appJson.usingComponents['uniad-plugin'] = 'plugin://uni-ad/ad'
  }
}
