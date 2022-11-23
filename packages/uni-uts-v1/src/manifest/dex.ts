import { copySync, existsSync } from 'fs-extra'
import { join } from 'path'

function dexName() {
  return 'classes.dex'
}

export function storeDex(
  dexFile: string,
  pluginRelativeDir: string,
  outputDir: string
) {
  copySync(dexFile, resolveDexCacheFilename(pluginRelativeDir, outputDir))
}

export function restoreDex(
  pluginRelativeDir: string,
  outputDir: string,
  is_uni_modules: boolean
) {
  const cacheFile = resolveDexCacheFile(pluginRelativeDir, outputDir)
  if (cacheFile) {
    copySync(
      cacheFile,
      join(
        outputDir,
        pluginRelativeDir,
        is_uni_modules ? 'utssdk' : '',
        'app-android',
        dexName()
      )
    )
  }
}

function resolveDexCacheFilename(pluginRelativeDir: string, outputDir: string) {
  return join(outputDir, '../.uts/dex', pluginRelativeDir, dexName())
}

function resolveDexCacheFile(pluginRelativeDir: string, outputDir: string) {
  const file = resolveDexCacheFilename(pluginRelativeDir, outputDir)
  return (existsSync(file) && file) || ''
}
