const DEFAULT_KEYS = [
  'MP',
  'APP',
  'APP-PLUS-NVUE',
  'APP-VUE',
  'APP-NVUE'
]

function normalize (name) {
  return name.replace(/-/g, '_').toUpperCase()
}

module.exports = function initPreprocess (name, platforms, userDefines = {}) {
  const vueContext = {} // vue 值为true的条件编译
  const nvueContext = {} // nvue 值为true的条件编译

  const defaultContext = {}

  const userDefineKeys = Object.keys(userDefines)

  platforms
    .concat(DEFAULT_KEYS)
    .concat(userDefineKeys)
    .forEach(name => {
      defaultContext[normalize(name)] = false
    })

  vueContext[normalize(name)] = true

  if (name === 'app-plus') {
    vueContext.APP_VUE = true

    nvueContext.APP_PLUS = true
    nvueContext.APP_NVUE = true
    nvueContext.APP_PLUS_NVUE = true
  }

  if (name.startsWith('mp-')) {
    vueContext.MP = true
  }

  if (name.startsWith('app-')) {
    vueContext.APP = true
  }

  if (name === 'quickapp-webview') {
    vueContext.QUICKAPP_WEBVIEW_HUAWEI = true
    vueContext.QUICKAPP_WEBVIEW_UNION = true
    if (process.env.UNI_SUB_PLATFORM === 'quickapp-webview-huawei') {
      vueContext.QUICKAPP_WEBVIEW_UNION = false
    } else if (process.env.UNI_SUB_PLATFORM === 'quickapp-webview-union') {
      vueContext.QUICKAPP_WEBVIEW_HUAWEI = false
    }
  }

  userDefineKeys.forEach(name => {
    const key = normalize(name)
    vueContext[key] = nvueContext[key] = !!userDefines[name]
  })

  return {
    vueContext: {
      ...defaultContext,
      ...vueContext
    },
    nvueContext: {
      ...defaultContext,
      ...nvueContext
    }
  }
}
