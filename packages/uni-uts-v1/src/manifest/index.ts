import { emptyDirSync, existsSync, readFileSync } from 'fs-extra'
import { join } from 'path'
import { parseJson } from '../shared'
import {
  checkManifest,
  hasCustomResources,
  isCustomResources,
  resolveManifestJson,
  resolvePluginFiles,
} from './manifest'
import {
  type APP_PLATFORM,
  type CheckOptions,
  type CheckResult,
  customResourceChangedTips,
  customResourceTips,
} from './utils'

export { genManifestFile } from './manifest'

export { restoreDex } from './dex'
export { restoreSourceMap, storeSourceMap } from './sourceMap'

interface PlatformOptions {
  customRes: string[]
}

const ANDROID_CUSTOM_RES = [
  'app-android/assets/',
  'app-android/libs/',
  'app-android/res/',
  'app-android/AndroidManifest.xml',
]

const IOS_CUSTOM_RES = [
  // 'app-ios/Frameworks/',
  // 'app-ios/Resources/',
  'app-ios/Info.plist',
]

export function checkKotlinCompile(
  playground: typeof process.env.HX_USE_BASE_TYPE,
  options: CheckOptions
) {
  return checkCompile('app-android', playground, options)
}

export function checkSwiftCompile(
  playground: typeof process.env.HX_USE_BASE_TYPE,
  options: CheckOptions
) {
  return checkCompile('app-ios', playground, options)
}

export function checkCompile(
  platform: APP_PLATFORM,
  playground: typeof process.env.HX_USE_BASE_TYPE,
  options: CheckOptions
) {
  const platformOptions: PlatformOptions = {
    customRes: platform === 'app-android' ? ANDROID_CUSTOM_RES : IOS_CUSTOM_RES,
  }
  if (playground === 'standard') {
    return checkWithPlayground(platform, 'standard', options, platformOptions)
  }
  return checkWithPlayground(platform, 'custom', options, platformOptions)
}

async function checkWithPlayground(
  platform: APP_PLATFORM,
  type: typeof process.env.HX_USE_BASE_TYPE,
  {
    id,
    env,
    cacheDir,
    pluginDir,
    pluginRelativeDir,
    is_uni_modules,
  }: CheckOptions,
  { customRes }: PlatformOptions
): Promise<CheckResult> {
  // 第一步：获取所有文件列表
  const files = await resolvePluginFiles(platform, pluginDir, is_uni_modules)
  let tips = ''
  // 标准基座检查是否包含原生资源/配置
  if (type === 'standard') {
    if (hasCustomResources(files, customRes)) {
      tips = customResourceTips(id)
    } else {
      // 检查 config.json
      if (platform === 'app-android') {
        if (androidHasCustomConfigJson(pluginDir, is_uni_modules)) {
          tips = customResourceTips(id)
        }
      } else if (platform === 'app-ios') {
        if (iOSHasCustomConfigJson(pluginDir, is_uni_modules)) {
          tips = customResourceTips(id)
        }
      }
    }
  }
  // 第二步：获取当前插件缓存文件信息
  const manifest = resolveManifestJson(platform, pluginRelativeDir, cacheDir)
  if (!manifest) {
    return { expired: true, tips, files }
  }
  // 第四步：检查文件变更
  const res = await checkManifest(manifest, { env, files, pluginDir })
  // 自定义基座检查原生资源/配置是否发生变化
  if (type === 'custom' && typeof res === 'string') {
    if (isCustomResources(res, customRes)) {
      tips = customResourceChangedTips(id)
    }
  }
  return {
    expired: res !== true,
    tips,
    files,
  }
}

export function initCheckOptionsEnv(): CheckOptions['env'] {
  return {
    compilerVersion: process.env.HX_Version || process.env.UNI_COMPILER_VERSION,
  }
}

function androidHasCustomConfigJson(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return hasCustomConfigJson(
    'app-android',
    'minSdkVersion',
    pluginDir,
    is_uni_modules
  )
}

function iOSHasCustomConfigJson(pluginDir: string, is_uni_modules: boolean) {
  return hasCustomConfigJson(
    'app-ios',
    'deploymentTarget',
    pluginDir,
    is_uni_modules
  )
}

function hasCustomConfigJson(
  platform: APP_PLATFORM,
  key: 'minSdkVersion' | 'deploymentTarget',
  pluginDir: string,
  is_uni_modules: boolean
) {
  const configJsonFile = join(
    pluginDir,
    is_uni_modules ? 'utssdk' : '',
    platform,
    'config.json'
  )
  if (configJsonFile && existsSync(configJsonFile)) {
    try {
      const configJson = parseJson(readFileSync(configJsonFile, 'utf8'))
      const len = Object.keys(configJson).length
      if (len > 1) {
        return true
      }
      if (len === 1) {
        if (!configJson.hasOwnProperty(key)) {
          return true
        }
      }
    } catch (e) {}
  }
  return false
}

export function clearManifestFiles(
  platform: APP_PLATFORM,
  pluginRelativeDir: string,
  cacheDir: string
) {
  const pluginDir = join(cacheDir, platform, 'uts', pluginRelativeDir)
  if (existsSync(pluginDir)) {
    emptyDirSync(pluginDir)
  }
}
