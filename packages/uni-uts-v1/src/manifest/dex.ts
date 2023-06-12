import { copySync, existsSync } from 'fs-extra'
import { join } from 'path'

function dexName() {
  return 'classes.dex'
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

function resolveDexCacheFilename(pluginRelativeDir: string, cacheDir: string) {
  return join(cacheDir, 'app-android', 'uts', pluginRelativeDir, dexName())
}

function resolveDexCacheFile(pluginRelativeDir: string, cacheDir: string) {
  if (cacheDir) {
    const file = resolveDexCacheFilename(pluginRelativeDir, cacheDir)
    return (existsSync(file) && file) || ''
  }
  return ''
}
