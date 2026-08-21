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
 * 根据 manifest 判定是否自动开启统计（是否向 main 注入统计运行时）。
 *
 * ## 范围
 *
 * 仅控制完整运行时或 Vapor 生命周期桥接的注入；**不**影响 `plugin/index.ts` 对
 * `UNI_STATISTICS_CONFIG` 等 define 的注入（配置合并仍走 `getUniStatistics`）。
 *
 * ## enable 判定规则（仅以 `enable` 是否显式存在作为覆盖条件）
 *
 * 子平台存在 `uniStatistics` 但只配置了 `debug` / `reportInterval` 等、未写 `enable` 时，
 * **不视为**子节点覆盖，仍继承根节点 `enable`。
 *
 * 判定顺序：
 *   1. 子平台 `uniStatistics.enable` 已显式配置（`true` / `false`）→ 以子为准；
 *   2. 否则，根 `uniStatistics.enable` 已显式配置 → 继承根；
 *   3. 否则（根/子均无 `enable`，或均无 `uniStatistics` 节点）→ **默认开启**。
 *
 * ## 用例矩阵
 *
 * | 根 enable | 子 uniStatistics | 子 enable | 结果   |
 * |-----------|------------------|-----------|--------|
 * | false     | 有               | true      | 开启   |
 * | true      | 有               | false     | 关闭   |
 * | true      | 无               | —         | 开启   |
 * | false     | 无               | —         | 关闭   |
 * | false     | 有（仅 debug 等）| 未配置    | 关闭   |
 * | 无节点    | 有               | true      | 开启   |
 * | 无节点    | 有               | false     | 关闭   |
 * | 无节点    | 无               | —         | 开启   |
 * | 无节点    | 有（仅非 enable）| 未配置    | 开启   |
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

/** 当前是否为 uni-app x 编译目标。 */
export function isUniAppXCompile(): boolean {
  return process.env.UNI_APP_X === 'true'
}

/**
 * 本地运行仅在 manifest 显式开启 debug 时加载统计；发行构建保持原行为。
 */
export function shouldRunStatRuntime(
  debug: unknown,
  nodeEnv: string | undefined = process.env.NODE_ENV
): boolean {
  return nodeEnv !== 'development' || debug === true
}

function getCurrentPlatform(platform?: string): string | undefined {
  return platform ?? process.env.UNI_UTS_PLATFORM ?? process.env.UNI_PLATFORM
}

function isAppPlatform(platform?: string): boolean {
  const currentPlatform = getCurrentPlatform(platform)
  return (
    currentPlatform === 'app' ||
    currentPlatform === 'app-plus' ||
    currentPlatform === 'app-android' ||
    currentPlatform === 'app-ios' ||
    currentPlatform === 'app-harmony'
  )
}

function isWebOrWeixinPlatform(platform?: string): boolean {
  const currentPlatform = getCurrentPlatform(platform)
  return (
    currentPlatform === 'h5' ||
    currentPlatform === 'web' ||
    currentPlatform === 'mp-weixin'
  )
}

/** 当前是否使用 uni-app x route bridge 统计方案。 */
export function isUniAppXVaporCompile(platform?: string): boolean {
  if (!isUniAppXCompile()) return false
  if (isAppPlatform(platform)) {
    return process.env.UNI_APP_X_DOM2 === 'true'
  }
  return isWebOrWeixinPlatform(platform)
}

/**
 * 是否开启 uni-app x 蒸汽模式的统计入口桥接。
 */
export function shouldBootstrapVaporRuntime(
  inputDir: string,
  platform?: string
): boolean {
  return (
    isUniAppXVaporCompile(platform) &&
    isUniStatisticsEnabled(inputDir, platform)
  )
}

/**
 * 是否应向 main 入口自动 import 统计运行时。
 * uni-app x 不走普通 Vue mixin 运行时：Web / 微信小程序和 Vapor App 使用 route
 * bridge，VDOM App 与其他小程序保持关闭。define 配置注入始终保留。
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
