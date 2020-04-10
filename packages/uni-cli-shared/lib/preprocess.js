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
    vueContext['APP_VUE'] = true

    nvueContext['APP_PLUS'] = true
    nvueContext['APP_NVUE'] = true
    nvueContext['APP_PLUS_NVUE'] = true
  }

  if (name.startsWith('mp-')) {
    vueContext['MP'] = true
  }

  if (name.startsWith('app-')) {
    vueContext['APP'] = true
  }

  userDefineKeys.forEach(name => {
    if (userDefines[name]) {
      const key = normalize(name)
      vueContext[key] = nvueContext[key] = true
    }
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
