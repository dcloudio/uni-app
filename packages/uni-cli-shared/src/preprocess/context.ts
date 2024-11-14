const extend = Object.assign

const isString = (val: unknown): val is string => typeof val === 'string'

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)

const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

const DEFAULT_KEYS = [
  'UNI_APP_X',
  'APP',
  'APP_UVUE',
  'APP_NVUE',
  'APP_PLUS',
  'APP_PLUS_NVUE',
  'APP_VUE',
  'APP_ANDROID',
  'APP_IOS',
  'APP_HARMONY',
  'H5',
  'MP',
  'MP_360',
  'MP_ALIPAY',
  'MP_BAIDU',
  'MP_HARMONY',
  'MP_QQ',
  'MP_LARK',
  'MP_TOUTIAO',
  'MP_WEIXIN',
  'MP_KUAISHOU',
  'MP_JD',
  'QUICKAPP_NATIVE',
  'QUICKAPP_WEBVIEW',
  'QUICKAPP_WEBVIEW_HUAWEI',
  'QUICKAPP_WEBVIEW_UNION',
  'VUE2',
  'VUE3',
  'WEB',
] as const

const preVueContext = Object.create(null)
const preNVueContext = Object.create(null)
const preUVueContext = Object.create(null)

export function getPreVueContext() {
  return preVueContext
}

export function getPreNVueContext() {
  return preNVueContext
}

export function getPreUVueContext() {
  return preUVueContext
}

export function initScopedPreContext(
  platform: UniApp.PLATFORM,
  userPreContext?: Record<string, boolean> | string,
  utsPlatform?: typeof process.env.UNI_UTS_PLATFORM,
  isX?: boolean
) {
  const vueContext = Object.create(null)
  const nvueContext = Object.create(null)
  const uvueContext = Object.create(null)

  const defaultContext = Object.create(null)
  DEFAULT_KEYS.forEach((key) => {
    defaultContext[key] = false
  })

  defaultContext.uniVersion = parseFloat(process.env.UNI_COMPILER_VERSION) || 0

  defaultContext[normalizeKey(platform)] = true

  vueContext.VUE3 = true
  nvueContext.VUE3 = true
  uvueContext.VUE3 = true

  if (isX) {
    vueContext.UNI_APP_X = true
    nvueContext.UNI_APP_X = true
    uvueContext.UNI_APP_X = true
  }

  if (
    platform === 'app' ||
    platform === 'app-plus' ||
    platform === 'app-harmony'
  ) {
    defaultContext.APP = true
    if (platform === 'app-harmony') {
      defaultContext.APP_HARMONY = true
    } else {
      defaultContext.APP_PLUS = isX ? false : true
    }

    vueContext.APP_VUE = true

    nvueContext.APP_NVUE = true
    nvueContext.APP_PLUS_NVUE = true

    uvueContext.APP_UVUE = true

    if (utsPlatform === 'app-android') {
      uvueContext.APP_ANDROID = true
    } else if (utsPlatform === 'app-ios') {
      uvueContext.APP_IOS = true
    }
  } else if (platform.startsWith('mp-')) {
    defaultContext.MP = true
  } else if (platform.startsWith('quickapp-webview')) {
    defaultContext.QUICKAPP_WEBVIEW = true
  } else if (platform === 'h5') {
    defaultContext.WEB = true
  }

  if (userPreContext) {
    if (isString(userPreContext)) {
      try {
        userPreContext = JSON.parse(userPreContext)
      } catch (e) {}
    }
    if (isPlainObject(userPreContext)) {
      Object.keys(userPreContext).forEach((key) => {
        defaultContext[normalizeKey(key)] = !!(
          userPreContext as Record<string, boolean>
        )[key]
      })
    }
  }
  return {
    preVueContext: extend({}, defaultContext, vueContext),
    preNVueContext: extend({}, defaultContext, nvueContext),
    preUVueContext: extend({}, defaultContext, uvueContext),
  }
}

export function initPreContext(
  platform: UniApp.PLATFORM,
  userPreContext?: Record<string, boolean> | string,
  utsPlatform?: typeof process.env.UNI_UTS_PLATFORM,
  isX?: boolean
) {
  const {
    preVueContext: scopedPreVueContext,
    preNVueContext: scopedPreNVueContext,
    preUVueContext: scopedPreUVueContext,
  } = initScopedPreContext(platform, userPreContext, utsPlatform, isX)
  extend(preVueContext, scopedPreVueContext)
  extend(preNVueContext, scopedPreNVueContext)
  extend(preUVueContext, scopedPreUVueContext)
}

function normalizeKey(name: string) {
  return name.replace(/-/g, '_').toUpperCase()
}
