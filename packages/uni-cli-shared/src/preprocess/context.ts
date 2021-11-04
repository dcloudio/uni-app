import { extend } from '@vue/shared'
const DEFAULT_KEYS = [
  'APP',
  'APP_NVUE',
  'APP_PLUS',
  'APP_PLUS_NVUE',
  'APP_VUE',
  'H5',
  'MP',
  'MP_360',
  'MP_ALIPAY',
  'MP_BAIDU',
  'MP_QQ',
  'MP_LARK',
  'MP_TOUTIAO',
  'MP_WEIXIN',
  'MP_KUAISHOU',
  'QUICKAPP_NATIVE',
  'QUICKAPP_WEBVIEW',
  'QUICKAPP_WEBVIEW_HUAWEI',
  'QUICKAPP_WEBVIEW_UNION',
  'VUE2',
  'VUE3',
] as const

const preVueContext = Object.create(null)
const preNVueContext = Object.create(null)

export function getPreVueContext() {
  return preVueContext
}

export function getPreNVueContext() {
  return preNVueContext
}

export function initPreContext(
  platform: UniApp.PLATFORM,
  userPreContext?: Record<string, boolean>
) {
  const vueContext = Object.create(null)
  const nvueContext = Object.create(null)

  const defaultContext = Object.create(null)
  DEFAULT_KEYS.forEach((key) => {
    defaultContext[key] = false
  })

  defaultContext[normalizeKey(platform)] = true

  vueContext.VUE3 = true
  nvueContext.VUE2 = true

  if (platform === 'app' || platform === 'app-plus') {
    defaultContext.APP = true
    defaultContext.APP_PLUS = true

    vueContext.APP_VUE = true

    nvueContext.APP_NVUE = true
    nvueContext.APP_PLUS_NVUE = true
  } else if (platform.startsWith('mp-')) {
    defaultContext.MP = true
  } else if (platform.startsWith('quickapp-webview')) {
    defaultContext.QUICKAPP_WEBVIEW = true
  }

  if (userPreContext) {
    Object.keys(userPreContext).forEach((key) => {
      defaultContext[normalizeKey(key)] = !!userPreContext[key]
    })
  }
  extend(preVueContext, defaultContext, vueContext)
  extend(preNVueContext, defaultContext, nvueContext)
}

function normalizeKey(name: string) {
  return name.replace(/-/g, '_').toUpperCase()
}
