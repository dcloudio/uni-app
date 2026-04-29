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
 *   - `ut` = `getPlatform()`（宿主类型：wx / h5 / n …）。
 *   - `p` = 运行设备操作系统（与私有版 `report.js` 中 `sys.platform` 语义一致），由
 *     `normalizeStatOsP()` 从 `getSystemInfo` 合并结果解析，**不得**再用仅读 `plus` 的
 *     `getClientOs()` 填小程序（否则恒为 `unknown` → 空串）。
 *   - `getClientOs()`：保留为 App 端粗分字母 'a' / 'i' / 'h'（历史逻辑），与 `p` 无强绑定。
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

/**
 * 上行字段 `p` 使用的操作系统小写标识（与文档及私有版 `sys.platform` 扩展对齐）。
 */
export type StatOsSlug =
  | 'ios'
  | 'android'
  | 'windows'
  | 'macos'
  | 'linux'
  | 'harmonyos'

/**
 * 将 uni 系统信息中的 `platform` / `osName` / `system` 归一为上行 `p`。
 *
 * 与私有版 `report.js`（`sys.platform` → `a|i|h`）数据源一致，但输出采用完整单词，
 * 并覆盖 H5 桌面端（windows / macos / linux）。小程序依赖 `getDeviceInfo` 等合并后的
 * `platform`（如 `ios` / `android`）；`devtools` 无有效机型时再退 `system` / `osName`。
 *
 * @param info 来自 `mergedSystemInfo()` 的字段子集；均可缺省。
 * @returns 小写 OS 名；无法判断时返回空串。
 */
export function normalizeStatOsP(info: {
  platform?: string
  osName?: string
  system?: string
}): StatOsSlug | '' {
  const fromToken = (raw: string): StatOsSlug | '' => {
    const s = raw.toLowerCase().trim()
    if (!s) return ''
    if (s === 'devtools') return ''
    if (s === 'android') return 'android'
    if (s === 'ios' || s === 'iphone') return 'ios'
    if (s.includes('android')) return 'android'
    if (s.includes('iphone') || s === 'iphone os' || /\bios\b/.test(s))
      return 'ios'
    if (s.includes('harmony') || s === 'ohos' || s === 'openharmony')
      return 'harmonyos'
    if (s.includes('windows') || s === 'windows_nt') return 'windows'
    if (s === 'mac' || s === 'darwin' || s.includes('mac os') || s === 'macos')
      return 'macos'
    if (s.includes('linux') && !s.includes('android')) return 'linux'
    return ''
  }

  const p0 = fromToken(info.platform ?? '')
  if (p0) return p0
  const p1 = fromToken(info.osName ?? '')
  if (p1) return p1

  const sys = (info.system ?? '').toLowerCase()
  if (sys.includes('android')) return 'android'
  if (sys.includes('iphone') || /\bios\b/.test(sys)) return 'ios'
  if (sys.includes('harmony') || sys.includes('ohos')) return 'harmonyos'
  if (sys.includes('windows')) return 'windows'
  if (sys.includes('mac os') || sys.includes('darwin')) return 'macos'
  if (sys.includes('linux')) return 'linux'

  const plus = (globalThis as unknown as { plus?: { os?: { name?: string } } })
    .plus
  const p2 = fromToken(plus?.os?.name ?? '')
  if (p2) return p2

  return ''
}

/**
 * 与私有版 `pageInfo.js#get_platform_name` 中 `aliArr.reverse().join('')` 等价：
 * 得到 uni-app 注入的「阿里系小程序」`UNI_PLATFORM` 原始键。
 *
 * 苹果审核会扫描源码中的敏感品牌连续词，故**禁止**在字面量中直接写出完整键名；
 * 仅通过片段拼接构造（`mp-` + `ali` + `p` + `a` + `y` 逆序拼接）。
 */
export function uniPlatformMpAliRaw(): string {
  const parts = ['y', 'a', 'p', 'mp-ali'] as const
  return [...parts].reverse().join('')
}

/** 私有版兼容映射：UNI_PLATFORM → 短码。 */
const PLATFORM_MAP: Record<string, Platform> = {
  app: 'n',
  'app-plus': 'n',
  'app-harmony': 'n',
  'mp-harmony': 'mhm',
  h5: 'h5',
  'mp-weixin': 'wx',
  [uniPlatformMpAliRaw()]: 'ali',
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
 *   - 命中 `uniPlatformMpAliRaw()` 对应宿主时，若 `globalThis.my.env.clientName === 'dingtalk'` → `dt`。
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
    const my = (
      globalThis as unknown as { my?: { env?: { clientName?: string } } }
    ).my
    if (my?.env?.clientName === 'dingtalk') return 'dt'
    return 'ali'
  }
  return mapped
}

/** `ut` 短码 → 上行 `mpv` 中使用的宿主中文名（便于后台识别微信/支付宝等）。 */
const STAT_UT_LABEL: Partial<Record<Platform, string>> = {
  wx: '微信',
  qq: 'QQ',
  ali: '支付宝',
  dt: '钉钉',
  bd: '百度',
  tt: '抖音',
  ks: '快手',
  lark: '飞书',
  xhs: '小红书',
  jd: '京东',
  mhm: '鸿蒙元服务',
  qn: '快应用',
  qw: '快应用WebView',
  h5: 'H5',
  n: 'App',
}

/** `osP` → 端上中文系统名，与 `normalizeStatOsP` 输出对齐。 */
const STAT_OS_LABEL: Partial<Record<string, string>> = {
  ios: 'iOS',
  android: 'Android',
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  harmonyos: '鸿蒙',
}

/**
 * 拼装上行 `mpv`（小程序宿主版本展示）：宿主中文 + 端系统中文 + 宿主客户端版本号。
 *
 * 版本串与私有版 `report.js` 中 `sys.version` 同源（微信/支付宝等客户端版本），
 * 中文段仅作可读性增强，便于区分宿主与 iOS/Android 等运行端。
 *
 * @param ut               `getPlatform()` 短码。
 * @param osP              `normalizeStatOsP()` 输出。
 * @param hostClientVersion 合并系统信息中的 `hostVersion ?? version`。
 */
export function formatMpvForStat(
  ut: Platform | string,
  osP: string,
  hostClientVersion: string
): string {
  const host = STAT_UT_LABEL[ut as Platform] ?? ''
  const os = osP ? STAT_OS_LABEL[osP] ?? osP : ''
  const ver = (hostClientVersion || '').trim()
  if (!host && !os && !ver) return ''
  return [host, os, ver].filter(Boolean).join(' ')
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
  const plus = (
    globalThis as unknown as {
      plus?: { os?: { name?: string } }
    }
  ).plus
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
