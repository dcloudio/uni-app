import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import {
  Manifest,
  resolvePluginAndroidFiles,
  resolvePluginCommonFiles,
} from './manifest'

interface CheckOptions {
  pluginDir: string
  pluginRelativeDir: string
  cacheDir: string
  inputDir: string
  outputDir: string
  is_uni_modules: boolean
}

export function shouldCompile(
  playground: typeof process.env.HX_USE_BASE_TYPE,
  options: CheckOptions
) {
  if (playground === 'standard') {
    return checkWithStandardPlayground(options)
  }
  return checkWithCustomPlayground(options)
}

/**
 * 检查标准基座缓存
 * @param param0
 * @returns
 */
async function checkWithStandardPlayground({
  pluginDir,
  cacheDir,
  outputDir,
  pluginRelativeDir,
  is_uni_modules,
}: CheckOptions) {
  // 第一步：检查 dex 文件是否存在
  const dexFile = resolveDexCacheFile(pluginRelativeDir, outputDir)
  if (!dexFile) {
    return false
  }
  // 第二步：获取当前插件缓存文件信息
  const manifest = resolveManifestJson(pluginRelativeDir, cacheDir)
  if (!manifest) {
    return false
  }
  // 第二步：获取当前平台所以的资源文件列表
  await resolveManifestFiles(pluginDir, is_uni_modules)
}

function resolveManifestFiles(pluginDir: string, is_uni_modules: boolean) {
  return Promise.all([
    resolvePluginCommonFiles(pluginDir, is_uni_modules),
    resolvePluginAndroidFiles(pluginDir, is_uni_modules),
  ]).then((files) => files.flat())
}

/**
 * 检查自定义基座缓存
 * @param param0
 */
async function checkWithCustomPlayground({
  pluginDir,
  inputDir,
  outputDir,
}: CheckOptions) {}

function resolveDexCacheFile(pluginRelativeDir: string, outputDir: string) {
  const file = join(outputDir, '../.uts/dex', pluginRelativeDir, 'classes.dex')
  return (existsSync(file) && file) || ''
}

function resolveManifestJson(pluginRelativeDir: string, cacheDir: string) {
  const file = join(
    cacheDir,
    'app-android/uts',
    pluginRelativeDir,
    'manifest.json'
  )
  if (existsSync(file)) {
    try {
      return JSON.parse(readFileSync(file, 'utf8')) as Manifest
    } catch (e) {}
  }
}
