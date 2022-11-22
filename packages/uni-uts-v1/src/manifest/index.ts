import { existsSync } from 'fs'
import { join } from 'path'
import {
  checkManifest,
  hasCustomResources,
  isCustomResources,
  resolveManifestJson,
  resolvePluginAndroidFiles,
} from './manifest'
import {
  APP_PLATFORM,
  CheckOptions,
  CheckResult,
  customResourceChangedTips,
  customResourceTips,
} from './utils'

interface PlatformOptions {
  customRes: string[]
  cacheFile: false | string
}

const ANDROID_CUSTOM_RES = [
  'app-android/assets/',
  'app-android/libs/',
  'app-android/res/',
  'app-android/AndroidManifest.xml',
  'app-android/config.json',
]

const IOS_CUSTOM_RES = [
  'app-ios/Frameworks/',
  'app-ios/Resources/',
  'app-ios/Info.plist',
  'app-ios/config.json',
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

function checkCompile(
  platform: APP_PLATFORM,
  playground: typeof process.env.HX_USE_BASE_TYPE,
  options: CheckOptions
) {
  const platformOptions: PlatformOptions = {
    customRes: platform === 'app-android' ? ANDROID_CUSTOM_RES : IOS_CUSTOM_RES,
    cacheFile:
      platform === 'app-android'
        ? resolveDexCacheFile(options.pluginRelativeDir, options.outputDir)
        : false,
  }
  if (playground === 'standard') {
    return checkWithPlayground('standard', options, platformOptions)
  }
  return checkWithPlayground('custom', options, platformOptions)
}

async function checkWithPlayground(
  type: typeof process.env.HX_USE_BASE_TYPE,
  {
    id,
    env,
    cacheDir,
    pluginDir,
    pluginRelativeDir,
    is_uni_modules,
  }: CheckOptions,
  { customRes, cacheFile }: PlatformOptions
): Promise<CheckResult> {
  // 第一步：获取所有文件列表
  const files = await resolvePluginAndroidFiles(pluginDir, is_uni_modules)
  let tips = ''
  // 标准基座检查是否包含原生资源/配置
  if (type === 'standard' && hasCustomResources(files, customRes)) {
    tips = customResourceTips(id)
  }
  // 第二步：检查 dex 文件是否存在
  if (cacheFile !== false && !cacheFile) {
    return { expired: true, tips, cacheFile: '' }
  }
  // 第三步：获取当前插件缓存文件信息
  const manifest = resolveManifestJson(
    'app-android',
    pluginRelativeDir,
    cacheDir
  )
  if (!manifest) {
    return { expired: true, tips, cacheFile: '' }
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
    cacheFile,
  }
}

function resolveDexCacheFile(pluginRelativeDir: string, outputDir: string) {
  const file = join(outputDir, '../.uts/dex', pluginRelativeDir, 'classes.dex')
  return (existsSync(file) && file) || ''
}
