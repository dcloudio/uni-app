import {
  parseUniXAppAndroidPackage,
  parseUniXFlexDirection,
  parseUniXSplashScreen,
  validateThemeValue,
} from '@dcloudio/uni-cli-shared'
import { isPlainObject } from '@vue/shared'
import path from 'path'

export function genUniAppXJsEngineIndexKotlinCode(
  manifestJson: Record<string, any>
) {
  const pkg = parseUniXAppAndroidPackage(manifestJson.appid)
  const configCode = genUniAppConfigKotlinCode(manifestJson)
  return `package ${pkg}

import io.dcloud.uniappxv.runtime.AppConfig
import io.dcloud.uts.*
import io.dcloud.uts.Map

${configCode}
`
}

export function resolveUniAppXJsEngineIndexKotlinPath() {
  const kotlinDir = process.env.UNI_APP_X_DOM2_KT_DIR
  if (!kotlinDir) {
    throw new Error('UNI_APP_X_DOM2_KT_DIR is not set')
  }
  return path.resolve(kotlinDir, 'index.kt')
}

function genUniAppConfigKotlinCode(manifestJson: Record<string, any>) {
  const flexDir = parseUniXFlexDirection(manifestJson)
  const flexDirCode =
    flexDir !== 'column'
      ? `override var flexDirection: String = ${stringifyKotlinString(
          flexDir
        )};`
      : ''
  const splashScreen = parseUniXSplashScreen('app-android', manifestJson)
  const splashScreenCode =
    splashScreen && Object.keys(splashScreen).length > 0
      ? `override var splashScreen: Map<String, Any>? = ${stringifyKotlinValue(
          splashScreen
        )};`
      : ''

  const hasAppDefaultAppTheme = validateThemeValue(
    manifestJson.app?.defaultAppTheme
  )
  const hasDefaultAppTheme = validateThemeValue(manifestJson.defaultAppTheme)
  const defaultAppThemeCode = hasAppDefaultAppTheme
    ? `override var defaultAppTheme: String = ${stringifyKotlinString(
        manifestJson.app.defaultAppTheme
      )};`
    : hasDefaultAppTheme
    ? `override var defaultAppTheme: String = ${stringifyKotlinString(
        manifestJson.defaultAppTheme
      )};`
    : ''

  const codes = [flexDirCode, splashScreenCode, defaultAppThemeCode]
    .filter(Boolean)
    .join('\n    ')
  return `class UniAppConfig : AppConfig() {
    override var name: String = ${stringifyKotlinString(
      manifestJson.name || ''
    )};
    override var appid: String = ${stringifyKotlinString(
      manifestJson.appid || ''
    )};
    override var versionName: String = ${stringifyKotlinString(
      manifestJson.versionName || ''
    )};
    override var versionCode: String = ${stringifyKotlinString(
      manifestJson.versionCode || ''
    )};
    override var uniCompilerVersion: String = ${stringifyKotlinString(
      process.env.UNI_COMPILER_VERSION || ''
    )};
    ${codes}
}`
}

function stringifyKotlinString(value: string) {
  return JSON.stringify(value).replace(/\$/g, '\\$')
}

function stringifyKotlinValue(value: unknown): string {
  if (value == null) {
    return 'null'
  }
  if (typeof value === 'string') {
    return stringifyKotlinString(value)
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (Array.isArray(value)) {
    return value.length
      ? `utsArrayOf(${value
          .map((item) => stringifyKotlinValue(item))
          .join(', ')})`
      : 'utsArrayOf<Any?>()'
  }
  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    return entries.length
      ? `utsMapOf(${entries
          .map(
            ([key, item]) =>
              `${stringifyKotlinString(key)} to ${stringifyKotlinValue(item)}`
          )
          .join(', ')})`
      : 'utsMapOf<String, Any?>()'
  }
  return stringifyKotlinString(String(value))
}
