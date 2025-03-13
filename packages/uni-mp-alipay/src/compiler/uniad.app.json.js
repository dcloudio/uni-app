module.exports = function (appJson) {
  if (!appJson.plugins) {
    appJson.plugins = {}
  }
  if (!appJson.plugins['uni-ad']) {
    appJson.plugins['uni-ad'] = {
      version: '*',
      provider: '2021004169623603',
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
  if (!appJson.window['enableInPageRender']) {
    appJson.window['enableInPageRender'] = 'YES'
  }
}
