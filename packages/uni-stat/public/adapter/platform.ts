/**
 * 平台标识适配。
 *
 * 私有版 `pageInfo.js#get_platform_name` 的能力等价物，但做了三点改进：
 *   1. 类型化：返回受控 `Platform` 联合，禁止把陌生平台直接透传出去。
 *   2. 拆出 `getRawPlatform()`：返回 `process.env.UNI_PLATFORM` 原值，便于 adapter 内部
 *      做"小程序基础库分支"判断，而无需重复读 env。
 *   3. `isApp / isMp / isH5 / isNvue` 一次实现，调用方不再四处 `if (platform === 'n')`。
 *
 * 上行字段约定：
 *   - `p` = `getPlatform()`（与私有版兼容；新平台扩充直接加 case 即可）。
 *   - 客户端 OS（用于风控）= `getClientOs()`：'a' / 'i' / 'h' / 'unknown'。
 *
 * 注意：本模块严禁缓存平台判定结果到模块级常量。`process.env.UNI_PLATFORM` 在 SSR 与
 * 单测中可能被运行时切换；缓存会让多端测试串味。
 */

/**
 * 公有版收敛后的平台 ID。新增平台需同步更新 `04-字段字典与平台获取矩阵.md`。
 */
export type Platform =
  | 'wx'
  | 'ali'
  | 'dt'
  | 'bd'
  | 'tt'
  | 'qq'
  | 'ks'
  | 'lark'
  | 'xhs'
  | 'jd'
  | 'mhm'
  | 'qn'
  | 'qw'
  | 'h5'
  | 'n'
  | 'unknown'

export type ClientOs = 'a' | 'i' | 'h' | 'unknown'

/** 私有版兼容映射：UNI_PLATFORM → 短码。 */
const PLATFORM_MAP: Record<string, Platform> = {
  app: 'n',
  'app-plus': 'n',
  'app-harmony': 'n',
  'mp-harmony': 'mhm',
  h5: 'h5',
  'mp-weixin': 'wx',
  'mp-alipay': 'ali',
  'mp-baidu': 'bd',
  'mp-toutiao': 'tt',
  'mp-qq': 'qq',
  'mp-kuaishou': 'ks',
  'mp-lark': 'lark',
  'mp-xhs': 'xhs',
  'mp-jd': 'jd',
  'quickapp-native': 'qn',
  'quickapp-webview': 'qw',
}

/**
 * 取 `process.env.UNI_PLATFORM` 原值，未设置返回空字符串。
 *
 * 单独抽出是为了：
 *   - 单测可以专门校验"未注入 UNI_PLATFORM"路径，不被 PLATFORM_MAP 遮蔽。
 *   - 调用方做小程序差异判断（如阿里系再细分 ali/dt）时无需再 `process.env.*`。
 */
export function getRawPlatform(): string {
  return process.env.UNI_PLATFORM ?? ''
}

/**
 * 取标准化后的平台短码。
 *
 * 阿里系细分逻辑：
 *   - 命中 `mp-alipay` 时若 `globalThis.my.env.clientName === 'dingtalk'` → `dt`。
 *   - 其他阿里系（小程序、H5 中嵌入支付宝端等）继续返回 `'ali'`。
 *
 * 未识别平台返回 `'unknown'`，禁止把陌生 raw 值直接当作 Platform 透传，
 * 避免上行字段污染（私有版的 `return … || process.env.VUE_APP_PLATFORM` 是潜在风险点）。
 */
export function getPlatform(): Platform {
  const raw = getRawPlatform()
  const mapped = PLATFORM_MAP[raw]
  if (!mapped) return 'unknown'
  if (mapped === 'ali') {
    const my = (globalThis as unknown as { my?: { env?: { clientName?: string } } }).my
    if (my?.env?.clientName === 'dingtalk') return 'dt'
    return 'ali'
  }
  return mapped
}

/**
 * 取客户端操作系统粗分类。仅在 App 与 HarmonyOS App 上有意义：
 *   - 'a' = Android
 *   - 'i' = iOS
 *   - 'h' = HarmonyOS（plus 不可用、UNI_PLATFORM=app-harmony）
 *   - 'unknown' = 其他端
 *
 * 优先读 `globalThis.plus.os.name`；无 plus 时按 UNI_PLATFORM 退化判断。
 */
export function getClientOs(): ClientOs {
  const raw = getRawPlatform()
  const plus = (globalThis as unknown as {
    plus?: { os?: { name?: string } }
  }).plus
  const name = plus?.os?.name?.toLowerCase()
  if (name) {
    if (name.includes('android')) return 'a'
    if (name === 'ios' || name === 'iphone os') return 'i'
    if (name.includes('harmony')) return 'h'
  }
  if (raw === 'app-harmony' || raw === 'mp-harmony') return 'h'
  return 'unknown'
}

/** 当前是否运行在 App / nvue / HarmonyOS App 端。 */
export function isApp(): boolean {
  const raw = getRawPlatform()
  return raw === 'app' || raw === 'app-plus' || raw === 'app-harmony'
}

/** 当前是否运行在小程序端（含各平台）。 */
export function isMp(): boolean {
  return getRawPlatform().startsWith('mp-')
}

/** 当前是否运行在 H5 端。 */
export function isH5(): boolean {
  return getRawPlatform() === 'h5'
}

/**
 * 当前页面/上下文是否为 nvue。
 *
 * uni-app nvue 页面的 `__UNI_FEATURE_NVUE__` 编译期常量为 true；
 * 运行时无可靠 API，统一通过编译期 define 注入的 `globalThis.__NVUE__` 判断。
 * 没有注入则保守返回 false。
 */
export function isNvue(): boolean {
  return Boolean((globalThis as unknown as { __NVUE__?: boolean }).__NVUE__)
}
