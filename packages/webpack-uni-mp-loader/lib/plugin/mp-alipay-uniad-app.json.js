const UNI_PLUGINS = [{
  name: 'uni-ad',
  version: '*',
  provider: '2021004169623603'
}
]

module.exports = function (appJson, useAD) {
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

  if (!appJson.window) {
    appJson.window = {}
  }
  // 信息流需要添加此配置
  if (!appJson.window.enableInPageRender) {
    appJson.window.enableInPageRender = 'YES'
  }
}
