import {
  ensureFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra'
import { join } from 'path'
import type { APP_PLATFORM } from './utils'

export function resolveUtssdkJsCacheFile(
  pluginRelativeDir: string,
  cacheDir: string,
  platform: APP_PLATFORM
) {
  if (cacheDir) {
    return join(cacheDir, platform, 'uts', pluginRelativeDir, 'utssdk.js')
  }
  return ''
}

export function readCachedUtssdkJs(
  pluginRelativeDir: string,
  cacheDir: string,
  platform: APP_PLATFORM
) {
  const cacheFile = resolveUtssdkJsCacheFile(
    pluginRelativeDir,
    cacheDir,
    platform
  )
  if (cacheFile && existsSync(cacheFile)) {
    return readFileSync(cacheFile, 'utf-8')
  }
  return ''
}

export function saveCachedUtssdkJs(
  pluginRelativeDir: string,
  cacheDir: string,
  platform: APP_PLATFORM,
  content: string
) {
  const cacheFile = resolveUtssdkJsCacheFile(
    pluginRelativeDir,
    cacheDir,
    platform
  )
  if (cacheFile) {
    ensureFileSync(cacheFile)
    writeFileSync(cacheFile, content, 'utf-8')
  }
}
