module.exports = function (appJson) {
  if (!appJson.plugins) {
    appJson.plugins = {}
  }
  if (!appJson.plugins['uni-ad']) {
    appJson.plugins['uni-ad'] = {
      version: '1.0.3',
      provider: 'wx999bf02c8e05dfc9'
    }
  }
  if (!appJson.plugins['coral-adv']) {
    appJson.plugins['coral-adv'] = {
      version: '1.0.7',
      provider: 'wx0e203209e27b1e66'
    }
  }

  if (!appJson.usingComponents) {
    appJson.usingComponents = {}
  }
  if (!appJson.usingComponents['uniad-plugin']) {
    appJson.usingComponents['uniad-plugin'] = 'plugin://uni-ad/ad'
  }
}
