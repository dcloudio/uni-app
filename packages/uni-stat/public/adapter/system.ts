/**
 * 系统信息适配。
 *
 * 私有版的痛点（参考缺陷清单 #14、#18）：
 *   - `utils/util.js` 顶层 `export const sys = uni.getSystemInfoSync()`：模块加载即执行
 *     `uni.getSystemInfoSync`，SSR / 单测 / nvue 早期阶段会直接抛错。
 *   - `lang / ww / wh` 等"可变"字段被一同缓存，用户切换系统语言或旋转屏幕后字段失真。
 *
 * 公有版职责：
 *   1. `getSystemInfo()` 懒加载 + 缓存（不可变字段：brand/md/sv/v/ut/sw/sh/pr/svv …）。
 *   2. `getLocaleAndScreen()` 实时取（lang + ww/wh + sw/sh + pr）—— 修复缺陷 #18。
 *   3. SSR/单测：当 `uni.getSystemInfoSync` 不存在或抛错时，返回安全空对象，绝不抛。
 *   4. `__resetCache()`：仅供测试，重置缓存。
 *
 * 设计取舍：
 *   - 虽然 uni-app 4.x 已拆出 `getDeviceInfo / getAppBaseInfo / getWindowInfo` 等细粒度
 *     API，但公有版要兼容老基础库（私有版同款覆盖范围），统一基于 `getSystemInfoSync`
 *     做 superset 解析。后续如需细分，再扩展独立函数。
 */

import { tryRun } from '../infra/safe'

/** 静态系统信息（不会因系统切换语言/旋转屏幕而变）。 */
export interface SystemInfoStatic {
  brand: string
  md: string
  sv: string
  v: string
  ut: 'phone' | 'pad' | 'pc' | 'tv' | 'wearable' | 'unknown' | string
  /** 应用版本（plus.runtime.version）。 */
  appVersion: string
  /** 应用 wgt 资源版本。 */
  appWgtVersion: string
  /** SDK / 基础库版本（小程序 sdkVersion；H5/App 留空）。 */
  sdkVersion: string
  /** 状态栏高度。 */
  statusBarHeight: number
}

/** 实时变化的字段。 */
export interface LocaleAndScreen {
  lang: string
  ww: number
  wh: number
  sw: number
  sh: number
  pr: number
}

interface UniSystemInfoLike {
  brand?: string
  model?: string
  system?: string
  version?: string
  deviceType?: string
  deviceModel?: string
  osName?: string
  osVersion?: string
  appVersion?: string
  appWgtVersion?: string
  SDKVersion?: string
  language?: string
  windowWidth?: number
  windowHeight?: number
  screenWidth?: number
  screenHeight?: number
  pixelRatio?: number
  statusBarHeight?: number
}

let cachedStatic: SystemInfoStatic | null = null

/**
 * 通过 `tryRun` 安全调用 `uni.getSystemInfoSync`；失败/缺失返回 `null`。
 *
 * 不直接 `try/catch`：保持与 `infra/safe` 风格一致，错误一律走 `tryRun` 内的
 * 静默 logger，避免污染上层链路。
 */
function safeGetSystemInfo(): UniSystemInfoLike | null {
  const u = (globalThis as unknown as {
    uni?: { getSystemInfoSync?: () => UniSystemInfoLike }
  }).uni
  if (!u || typeof u.getSystemInfoSync !== 'function') return null
  return tryRun(() => u.getSystemInfoSync!(), null) ?? null
}

/**
 * 取静态系统信息（懒加载 + 缓存）。
 *
 * 字段映射策略：
 *   - `brand / md / sv / v / ut`：优先取 uni-app 4.x 拆分字段（osName/deviceModel 等），
 *     退化到 system/model 兼容老基础库。
 *   - 任何字段缺失统一空字符串/0，而非 undefined，避免上行 JSON 序列化时丢字段。
 */
export function getSystemInfo(): SystemInfoStatic {
  if (cachedStatic) return cachedStatic
  const sys = safeGetSystemInfo() ?? {}
  const plus = (globalThis as unknown as {
    plus?: { runtime?: { version?: string; appWgtVersion?: string; appWgtRevision?: string } }
  }).plus
  cachedStatic = {
    brand: sys.brand ?? '',
    md: sys.deviceModel ?? sys.model ?? '',
    sv: sys.osVersion ?? sys.system ?? '',
    v: sys.version ?? '',
    ut: (sys.deviceType ?? 'unknown') as SystemInfoStatic['ut'],
    appVersion: plus?.runtime?.version ?? sys.appVersion ?? '',
    appWgtVersion: plus?.runtime?.appWgtVersion ?? plus?.runtime?.appWgtRevision ?? sys.appWgtVersion ?? '',
    sdkVersion: sys.SDKVersion ?? '',
    statusBarHeight: typeof sys.statusBarHeight === 'number' ? sys.statusBarHeight : 0,
  }
  return cachedStatic
}

/**
 * 取实时字段（lang / 窗口尺寸 / 屏幕尺寸 / dpr）。
 *
 * 修复缺陷 #18：每次调用都重新读取 `uni.getSystemInfoSync()`，不复用任何缓存。
 * 如调用方需要"启动时一次"的语义，应在调用层显式缓存，而非依赖本模块。
 */
export function getLocaleAndScreen(): LocaleAndScreen {
  const sys = safeGetSystemInfo() ?? {}
  return {
    lang: sys.language ?? '',
    ww: typeof sys.windowWidth === 'number' ? sys.windowWidth : 0,
    wh: typeof sys.windowHeight === 'number' ? sys.windowHeight : 0,
    sw: typeof sys.screenWidth === 'number' ? sys.screenWidth : 0,
    sh: typeof sys.screenHeight === 'number' ? sys.screenHeight : 0,
    pr: typeof sys.pixelRatio === 'number' ? sys.pixelRatio : 1,
  }
}

/** 仅供单测：重置 `getSystemInfo` 的内部缓存。 */
export function __resetCache(): void {
  cachedStatic = null
}
