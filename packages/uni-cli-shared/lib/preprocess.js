const DEFAULT_KEYS = [
  'UNI-APP-X',
  'VUE2',
  'VUE3',
  'MP',
  'APP',
  'APP-PLUS-NVUE',
  'APP-VUE',
  'APP-NVUE',
  'APP-ANDROID',
  'APP-IOS',
  'APP-HARMONY',
  'MP-HARMONY',
  'WEB'
]

function normalize (name) {
  return name.replace(/-/g, '_').toUpperCase()
}

module.exports = function initPreprocess (name, platforms, userDefines = {}) {
  const vueContext = {} // vue 值为true的条件编译
  const nvueContext = {} // nvue 值为true的条件编译

  const defaultContext = {}

  defaultContext.uniVersion = parseFloat(process.env.UNI_COMPILER_VERSION) || 0

  const userDefineKeys = Object.keys(userDefines)

  platforms
    .concat(DEFAULT_KEYS)
    .concat(userDefineKeys)
    .forEach(name => {
      defaultContext[normalize(name)] = false
    })

  if (process.env.UNI_USING_VUE3) {
    defaultContext.VUE3 = true
  } else {
    defaultContext.VUE2 = true
  }
  // nvue 只支持vue2
  nvueContext.VUE2 = true
  nvueContext.VUE3 = false

  vueContext[normalize(name)] = true

  if (name === 'app-plus') {
    vueContext.APP_VUE = true

    nvueContext.APP_PLUS = true
    nvueContext.APP_NVUE = true
    nvueContext.APP_PLUS_NVUE = true

    // if (process.env.UNI_APP_PLATFORM === 'android') {
    // defaultContext.APP_ANDROID = true
    // } else if (process.env.UNI_APP_PLATFORM === 'ios') {
    // defaultContext.APP_IOS = true
    // } else {
    // defaultContext.APP_ANDROID = true
    // defaultContext.APP_IOS = true
    // }
  }
  if (name === 'h5') {
    defaultContext.WEB = true
  }
  if (name.startsWith('mp-')) {
    vueContext.MP = true
  }

  if (name.startsWith('app-')) {
    vueContext.APP = true
    nvueContext.APP = true
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
