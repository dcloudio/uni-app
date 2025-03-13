const BUILT_IN_PLATFORMS = [
  'app',
  'app-plus',
  'app-harmony',
  'app-ios',
  'app-android',
  'h5',
  'web',
  'mp-360',
  'mp-alipay',
  'mp-baidu',
  'mp-jd',
  'mp-kuaishou',
  'mp-lark',
  'mp-qq',
  'mp-toutiao',
  'mp-weixin',
  'mp-xhs',
  'quickapp-webview',
  'quickapp-webview-huawei',
  'quickapp-webview-union',
]

const platforms = [...BUILT_IN_PLATFORMS]
export function registerPlatform(platform: string) {
  if (platform === 'mp') {
    return
  }
  if (!platforms.includes(platform)) {
    platforms.push(platform)
  }
}

export function getPlatforms() {
  return platforms
}

export function getPlatformDir() {
  return process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM
}

export function isMiniProgramPlatform() {
  return !['app', 'app-plus', 'h5', 'web'].includes(process.env.UNI_PLATFORM)
}
