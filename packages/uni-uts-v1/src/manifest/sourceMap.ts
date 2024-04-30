import { copySync, existsSync } from 'fs-extra'
import { join } from 'path'
import { resolveSourceMapPath } from '../shared'
import type { APP_PLATFORM } from './utils'

function getSourceMapFilename(platform: APP_PLATFORM) {
  return `index${platform === 'app-android' ? '.kt' : '.swift'}.map`
}

/**
 * 缓存 sourcemap
 * @param pluginRelativeDir
 * @param outputDir
 * @param cacheDir
 */
export function storeSourceMap(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  outputDir: string,
  cacheDir: string,
  is_uni_modules: boolean
) {
  const sourceMapFilename = resolveSourceMapFilename(
    platform,
    pluginRelativeDir,
    outputDir,
    is_uni_modules
  )
  if (existsSync(sourceMapFilename)) {
    copySync(
      sourceMapFilename,
      resolveSourceMapCacheFilename(platform, cacheDir, pluginRelativeDir)
    )
    return true
  }
  return false
}
/**
 * 拷贝 sourcemap
 * @param pluginRelativeDir
 * @param outputDir
 * @param cacheDir
 */
export function restoreSourceMap(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  outputDir: string,
  cacheDir: string,
  is_uni_modules: boolean
) {
  const sourceMapCacheFile = resolveSourceMapCacheFile(
    platform,
    cacheDir,
    pluginRelativeDir
  )
  if (sourceMapCacheFile) {
    copySync(
      sourceMapCacheFile,
      resolveSourceMapFilename(
        platform,
        pluginRelativeDir,
        outputDir,
        is_uni_modules
      )
    )
  }
}

export function resolveSourceMapFilename(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  outputDir: string,
  is_uni_modules: boolean
) {
  return join(
    resolveSourceMapPath(outputDir, 'app'),
    pluginRelativeDir,
    is_uni_modules ? 'utssdk' : '',
    platform,
    getSourceMapFilename(platform)
  )
}

export function resolveSourceMapCacheFilename(
  platform: APP_PLATFORM,
  cacheDir: string,
  pluginRelativeDir: string
) {
  return join(
    cacheDir,
    platform,
    'uts',
    pluginRelativeDir,
    getSourceMapFilename(platform)
  )
}

function resolveSourceMapCacheFile(
  platform: APP_PLATFORM,
  cacheDir: string,
  pluginRelativeDir: string
) {
  const file = resolveSourceMapCacheFilename(
    platform,
    cacheDir,
    pluginRelativeDir
  )
  return (existsSync(file) && file) || ''
}
