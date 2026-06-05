import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

/**
 * 解析当前平台对应的 manifest 平台节点。
 *
 * 与 `uni-cli-shared#getPlatformManifestJson` 行为保持一致：app → app-plus/plus，
 * h5 → web/h5，uni-app x 的 app-android/app-ios/app 走各自分支，其余平台取同名节点。
 *
 * 逻辑内聚在 uni-stat 插件内（仅依赖 `parseManifestJsonOnce`），避免依赖
 * HBuilderX 内置旧版 uni-cli-shared 可能缺失的新导出（如 `getUniStatistics`）。
 *
 * @param manifest 已解析的 manifest.json 对象
 * @param platform 目标平台；缺省读 `process.env.UNI_PLATFORM`
 */
function getPlatformManifest(
  manifest: any,
  platform?: string
): Record<string, any> {
  const isX = process.env.UNI_APP_X === 'true'
  if (!platform) {
    platform = process.env.UNI_PLATFORM
  }
  if (isX) {
    if (platform === 'app-android' || platform === 'app-ios') {
      return manifest?.[platform] || manifest?.['app'] || {}
    } else if (platform === 'app') {
      return (
        manifest?.[process.env.UNI_UTS_PLATFORM!] || manifest?.['app'] || {}
      )
    }
  }
  if (platform === 'app') {
    return manifest?.['app-plus'] || manifest?.['plus'] || {}
  }
  if (platform === 'h5') {
    return manifest?.web || manifest?.h5 || {}
  }
  return (platform && manifest?.[platform]) || {}
}

/**
 * 根据 manifest 判定统计是否开启，遵循「分平台节点优先覆盖全局根节点」的文档语义。
 *
 * 判定优先级（与 `getUniStatistics` 的 `extend(root, platform)` 合并口径一致）：
 *   1. 平台节点 `uniStatistics.enable` 显式存在 → 以平台为准；
 *   2. 否则回退根节点 `uniStatistics.enable`；
 *   3. 两者均未配置 → 默认开启。
 *
 * 这样既支持「根 enable=false、某平台 enable=true」开启注入，也支持
 * 「根 enable=true、某平台 enable=false」关闭该平台，避免破坏用户的关闭配置。
 *
 * @param inputDir 工程输入目录
 * @param platform 目标平台；缺省读 `process.env.UNI_PLATFORM`
 */
function isUniStatisticsEnabled(inputDir: string, platform?: string): boolean {
  const manifest = parseManifestJsonOnce(inputDir)
  const root = manifest?.uniStatistics
  const platformStat = getPlatformManifest(manifest, platform)?.uniStatistics
  if (platformStat && platformStat.enable !== undefined) {
    return platformStat.enable !== false
  }
  if (root && root.enable !== undefined) {
    return root.enable !== false
  }
  return true
}

/**
 * 当前是否为 uni-app x 编译目标。
 * x 运行时暂无 `onCreateVueApp` / `vue.mixin` 等页面统计注入能力。
 */
export function isUniAppXCompile(): boolean {
  return process.env.UNI_APP_X === 'true'
}

/**
 * 是否应向 main 入口自动 import 统计运行时。
 * uni-app x 一律跳过自动 import；define 配置注入仍保留，供后续适配或业务手动 import。
 *
 * @param inputDir 工程输入目录
 * @param platform 目标平台；缺省读 `process.env.UNI_PLATFORM`。传入以支持分平台 enable 覆盖。
 */
export function shouldAutoImportStatRuntime(
  inputDir: string,
  platform?: string
): boolean {
  if (isUniAppXCompile()) {
    return false
  }
  return isUniStatisticsEnabled(inputDir, platform)
}
