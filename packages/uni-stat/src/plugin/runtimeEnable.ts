import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

/**
 * 根据 manifest 根节点 `uniStatistics` 判定统计是否开启。
 * 逻辑内聚在 uni-stat 插件内，避免依赖 HBuilderX 内置旧版 uni-cli-shared 的新导出。
 */
function isUniStatisticsEnabled(inputDir: string): boolean {
  const manifest = parseManifestJsonOnce(inputDir)
  const root = manifest?.uniStatistics
  if (!root) {
    return true
  }
  return root.enable !== false
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
 */
export function shouldAutoImportStatRuntime(inputDir: string): boolean {
  if (isUniAppXCompile()) {
    return false
  }
  return isUniStatisticsEnabled(inputDir)
}
