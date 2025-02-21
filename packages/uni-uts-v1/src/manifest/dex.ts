import { copySync, existsSync } from 'fs-extra'
import { join, resolve } from 'path'
import { copyPlatformNativeLanguageFiles } from '../utils'

function dexName() {
  return 'classes.dex'
}

export function storeIndexKt(
  kotlinFile: string,
  pluginRelativeDir: string,
  cacheDir: string
) {
  const cacheFile = resolveIndexKtCacheFilename(pluginRelativeDir, cacheDir)
  if (cacheFile) {
    copySync(kotlinFile, cacheFile)
  }
}

export function restoreDebuggerFiles(
  pluginRelativeDir: string,
  cacheDir: string,
  outputDir: string,
  is_uni_modules: boolean,
  inputDir: string,
  rewriteConsoleExpr?: (fileName: string, content: string) => string
) {
  const cacheFile = resolveIndexKtCacheFile(pluginRelativeDir, cacheDir)
  if (cacheFile) {
    let filename = join(
      outputDir,
      pluginRelativeDir,
      is_uni_modules ? 'utssdk' : '',
      'app-android',
      'index.kt'
    )
    copySync(cacheFile, filename)
    if (rewriteConsoleExpr) {
      copyPlatformNativeLanguageFiles(
        resolve(inputDir, pluginRelativeDir, 'utssdk', 'app-android'),
        resolve(outputDir, pluginRelativeDir, 'utssdk', 'app-android'),
        ['.kt', '.java'],
        rewriteConsoleExpr
      )
    }
    return filename
  }
}

export function restoreDex(
  pluginRelativeDir: string,
  cacheDir: string,
  outputDir: string,
  is_uni_modules: boolean
) {
  const cacheFile = resolveDexCacheFile(pluginRelativeDir, cacheDir)
  if (cacheFile) {
    let filename = join(
      outputDir,
      pluginRelativeDir,
      is_uni_modules ? 'utssdk' : '',
      'app-android',
      dexName()
    )
    copySync(cacheFile, filename)
    return filename
  }
}

function resolveCacheFilename(
  pluginRelativeDir: string,
  cacheDir: string,
  filename: string
) {
  return join(cacheDir, 'app-android', 'uts', pluginRelativeDir, filename)
}
function resolveDexCacheFilename(pluginRelativeDir: string, cacheDir: string) {
  return resolveCacheFilename(pluginRelativeDir, cacheDir, dexName())
}

function resolveIndexKtCacheFilename(
  pluginRelativeDir: string,
  cacheDir: string
) {
  return resolveCacheFilename(pluginRelativeDir, cacheDir, 'index.kt')
}

export function resolveDexCacheFile(
  pluginRelativeDir: string,
  cacheDir: string
) {
  if (cacheDir) {
    const file = resolveDexCacheFilename(pluginRelativeDir, cacheDir)
    return (existsSync(file) && file) || ''
  }
  return ''
}

function resolveIndexKtCacheFile(pluginRelativeDir: string, cacheDir: string) {
  if (cacheDir) {
    const file = resolveIndexKtCacheFilename(pluginRelativeDir, cacheDir)
    return (existsSync(file) && file) || ''
  }
  return ''
}
