import { copySync, existsSync } from 'fs-extra'
import { join } from 'path'
import type { APP_PLATFORM } from './utils'

export function resolveConfigJsonCacheFile(
  pluginRelativeDir: string,
  cacheDir: string,
  platform: APP_PLATFORM
) {
  if (cacheDir) {
    return join(cacheDir, platform, 'uts', pluginRelativeDir, 'config.json')
  }
  return ''
}

export function restoreConfigJson(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  outputDir: string,
  cacheDir: string
) {
  const cacheFile = resolveConfigJsonCacheFile(
    pluginRelativeDir,
    cacheDir,
    platform
  )
  if (cacheFile && existsSync(cacheFile)) {
    copySync(
      cacheFile,
      join(outputDir, pluginRelativeDir, 'utssdk', platform, 'config.json')
    )
  }
}
