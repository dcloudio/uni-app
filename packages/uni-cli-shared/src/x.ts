type AppXPlatform = typeof process.env.UNI_UTS_PLATFORM

export function isUniAppX() {
  return process.env.UNI_APP_X === 'true'
}

export function isUniAppXAndroid(
  platform: AppXPlatform = process.env.UNI_UTS_PLATFORM
) {
  return isUniAppX() && platform === 'app-android'
}

export function isUniAppXIOS(
  platform: AppXPlatform = process.env.UNI_UTS_PLATFORM
) {
  return isUniAppX() && platform === 'app-ios'
}

export function isUniAppXVapor() {
  return isUniAppX() && process.env.UNI_APP_X_DOM2 === 'true'
}

export function isUniAppXAndroidVapor(
  platform: AppXPlatform = process.env.UNI_UTS_PLATFORM
) {
  return isUniAppXAndroid(platform) && process.env.UNI_APP_X_DOM2 === 'true'
}

export function isUniAppXJsEngine() {
  return isUniAppX() && process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js'
}

export function isUniAppXAndroidJsEngine(
  platform: AppXPlatform = process.env.UNI_UTS_PLATFORM
) {
  return (
    isUniAppXAndroid(platform) &&
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js'
  )
}

export function isUniAppXAndroidNative(
  platform: AppXPlatform = process.env.UNI_UTS_PLATFORM
) {
  return (
    isUniAppXAndroid(platform) &&
    // 非 Vapor 或者 Vapor 但使用 native 引擎
    (process.env.UNI_APP_X_DOM2 !== 'true' ||
      process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'native')
  )
}
