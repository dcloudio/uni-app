import fs from 'fs'
import path from 'path'
import { parseJson } from './json'
import { normalizeStyles, once } from '@dcloudio/uni-shared'

export function hasThemeJson(themeLocation: string) {
  if (!fs.existsSync(themeLocation)) {
    return false
  }
  return true
}

export const parseThemeJson = (themeLocation: string = 'theme.json') => {
  if (!themeLocation || !process.env.UNI_INPUT_DIR) {
    return {}
  }
  themeLocation = path.join(process.env.UNI_INPUT_DIR, themeLocation)
  if (!hasThemeJson(themeLocation)) {
    return {}
  }
  const jsonStr = fs.readFileSync(themeLocation, 'utf8')
  return parseJson(jsonStr, true) as UniApp.ThemeJson
}

export const normalizeThemeConfigOnce = once(
  (manifestJsonPlatform: Record<string, any> = {}) =>
    parseThemeJson(manifestJsonPlatform.themeLocation)
)

export function initTheme<T extends object>(
  manifestJson: Record<string, any>,
  pagesJson: T
) {
  const platform =
    process.env.UNI_PLATFORM === 'app' ? 'app-plus' : process.env.UNI_PLATFORM
  const manifestPlatform = manifestJson['plus'] || manifestJson[platform] || {}
  const themeConfig = normalizeThemeConfigOnce(manifestPlatform)
  return normalizeStyles(pagesJson, themeConfig)
}
