module.exports = function (appJson) {
  if (!appJson.plugins) {
    appJson.plugins = {}
  }
  if (!appJson.plugins['uni-ad']) {
    appJson.plugins['uni-ad'] = {
      version: '1.0.0',
      provider: 'wxf72d316417b6767f'
    }
  }
  if (!appJson.plugins['coral-adv']) {
    appJson.plugins['coral-adv'] = {
      version: '1.0.9',
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
