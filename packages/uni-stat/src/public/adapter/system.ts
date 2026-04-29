/**
 * 系统信息适配。
 *
 * 私有版的痛点（参考缺陷清单 #14、#18）：
 *   - `utils/util.js` 顶层 `export const sys = uni.getSystemInfoSync()`：模块加载即执行
 *     `uni.getSystemInfoSync`，SSR / 单测 / nvue 早期阶段会直接抛错。
 *   - `lang / ww / wh` 等"可变"字段被一同缓存，用户切换系统语言或旋转屏幕后字段失真。
 *
 * 公有版职责：
 *   1. `getSystemInfo()` 懒加载 + 缓存（不可变字段：brand/md/sv/v/ut/on …）。
 *   2. `getLocaleAndScreen()` 实时取（lang + ww/wh + sw/sh + pr）—— 修复缺陷 #18。
 *   3. SSR/单测：任一 API 不存在或抛错时，返回安全空对象，绝不抛。
 *   4. `__resetCache()`：仅供测试，重置缓存。
 *
 * 小程序新基础库对 `getSystemInfoSync` 做了能力拆分，部分字段为空或恒为 0。
 * 因此优先通过 `uni.getDeviceInfo / getAppBaseInfo / getWindowInfo` 取对应信息，
 * 再以 `uni.getSystemInfoSync` 合并兜底（与 uni-app 运行时、uni-api 侧实践一致）。
 *
 * **小程序注意**：`uni` 常由构建注入在模块作用域，仅读 `globalThis.uni` 会取不到
 * 任何 API；必须通过 `resolveUniRuntime()` 与 `package.ts` 等 adapter 对齐。
 * 微信系再叠一层 `wx.getDeviceInfo / getAppBaseInfo / getWindowInfo`（与 `uni-api`
 * `upx2px` 一致），避免 `uni` 代理未就绪时宽高全 0。
 */

import { tryRun } from '../infra/safe'
import { resolveUniRuntime } from '../infra/uniRuntime'

import { getRawPlatform, normalizeStatOsP } from './platform'

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
  /**
   * 小程序宿主客户端版本原始串（私有版 `sys.version`，即 `hostVersion ?? version`）。
   * 仅作静态快照；上行 `v`/展示类字段按需取用，与 `mpv`（纯宿主类型名）解耦。
   */
  mpvHostVersion: string
  /**
   * 上行 **`on`**：优先厂商 ROM 展示名（`romName` [+ `romVersion`]，如 HyperOS）；
   * 无 ROM 信息时退 `osName`（小程序多为 Android/iOS）。
   */
  on: string
  /** SDK / 基础库版本（小程序 sdkVersion；H5/App 留空）。 */
  sdkVersion: string
  /** 状态栏高度。 */
  statusBarHeight: number
  /**
   * 运行设备操作系统（上行 `p`），如 `ios` / `android`；由 `normalizeStatOsP` 解析。
   */
  osP: string
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

/** 与 uni-app `GetSystemInfoResult` 及拆分 API 返回值对齐的宽松结构。 */
interface UniSystemInfoLike {
  /** 客户端系统：`ios` / `android` / `ohos` …（各端与私有版 `sys.platform` 同源）。 */
  platform?: string
  brand?: string
  deviceBrand?: string
  model?: string
  system?: string
  version?: string
  deviceType?: string
  deviceModel?: string
  osName?: string
  osVersion?: string
  /** App 等原生侧：厂商 ROM / 定制系统名（如 HyperOS），与 uni-app-plus `getDeviceInfo` 一致。 */
  romName?: string
  romVersion?: string
  appVersion?: string
  appWgtVersion?: string
  SDKVersion?: string
  /** 小程序宿主侧 SDK（与 `hostSDKVersion` 同源场景多）。 */
  hostSDKVersion?: string
  language?: string
  hostLanguage?: string
  /** 微信等宿主版本，常与 `version` 并存。 */
  hostVersion?: string
  windowWidth?: number
  windowHeight?: number
  screenWidth?: number
  screenHeight?: number
  pixelRatio?: number
  devicePixelRatio?: number
  statusBarHeight?: number
}

let cachedStatic: SystemInfoStatic | null = null

/** 与系统信息相关的 `uni` 同步 API 子集。 */
interface UniSysApis {
  getSystemInfoSync?: () => UniSystemInfoLike
  getDeviceInfo?: () => UniSystemInfoLike
  getAppBaseInfo?: () => UniSystemInfoLike
  getWindowInfo?: () => UniSystemInfoLike
}

/**
 * 解析 `uni` 根对象：优先 `globalThis.uni`，再回退宿主注入的模块级 `uni`。
 *
 * @see `infra/uniRuntime.ts` 说明（小程序上仅读 globalThis 会静默失败）。
 */
function getUni(): UniSysApis | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniSysApis) : undefined
}

/** 微信 / QQ 小程序宿主 API 子集（仅做 duck typing，避免依赖各端 .d.ts）。 */
interface WxHostSysApis {
  getSystemInfoSync?: () => UniSystemInfoLike
  getDeviceInfo?: () => UniSystemInfoLike
  getAppBaseInfo?: () => UniSystemInfoLike
  getWindowInfo?: () => UniSystemInfoLike
}

/**
 * 微信系宿主上再取一层原生拆分 API，与 `uni` 合并结果再叠加以补全字段。
 *
 * @returns 已按 sync→device→app→window 合并过的一条快照；非微信系返回 `null`。
 */
function mergeWxHostSnapshots(): UniSystemInfoLike | null {
  const raw = getRawPlatform()
  if (raw !== 'mp-weixin' && raw !== 'mp-qq') return null
  const wxHost = (globalThis as unknown as { wx?: WxHostSysApis }).wx
  if (!wxHost) return null
  const sync =
    typeof wxHost.getSystemInfoSync === 'function'
      ? tryRun(() => wxHost.getSystemInfoSync!(), null)
      : null
  const device =
    typeof wxHost.getDeviceInfo === 'function'
      ? tryRun(() => wxHost.getDeviceInfo!(), null)
      : null
  const appBase =
    typeof wxHost.getAppBaseInfo === 'function'
      ? tryRun(() => wxHost.getAppBaseInfo!(), null)
      : null
  const windowInfo =
    typeof wxHost.getWindowInfo === 'function'
      ? tryRun(() => wxHost.getWindowInfo!(), null)
      : null
  return mergeSystemSnapshots(sync, device, appBase, windowInfo)
}

/**
 * 从左到右浅合并多个快照：后者非 `undefined` / `null` 的键覆盖前者。
 *
 * 合并顺序为「sync → device → appBase → window」，使拆分 API 覆盖宿主裁剪后的
 * `getSystemInfoSync` 残缺字段。
 */
function mergeSystemSnapshots(
  ...parts: (UniSystemInfoLike | null | undefined)[]
): UniSystemInfoLike {
  const out: Record<string, unknown> = {}
  for (const p of parts) {
    if (!p) continue
    for (const k of Object.keys(p) as (keyof UniSystemInfoLike)[]) {
      const v = p[k]
      if (v !== undefined && v !== null) out[k as string] = v
    }
  }
  return out as UniSystemInfoLike
}

/**
 * 聚合当前运行时的系统信息：先 `getSystemInfoSync` 打底，再叠拆分 API。
 *
 * 各 API 均经 `tryRun` 包裹，任一失败不影响其余来源。
 */
function mergedSystemInfo(): UniSystemInfoLike {
  const u = getUni()
  const sync =
    u && typeof u.getSystemInfoSync === 'function'
      ? tryRun(() => u.getSystemInfoSync!(), null)
      : null
  const device =
    u && typeof u.getDeviceInfo === 'function'
      ? tryRun(() => u.getDeviceInfo!(), null)
      : null
  const appBase =
    u && typeof u.getAppBaseInfo === 'function'
      ? tryRun(() => u.getAppBaseInfo!(), null)
      : null
  const windowInfo =
    u && typeof u.getWindowInfo === 'function'
      ? tryRun(() => u.getWindowInfo!(), null)
      : null
  const fromUni = mergeSystemSnapshots(sync, device, appBase, windowInfo)
  const fromWx = mergeWxHostSnapshots()
  const merged = fromWx ? mergeSystemSnapshots(fromUni, fromWx) : fromUni

  return merged
}

/**
 * 组装上行 `on`：优先厂商定制系统名（ROM），否则退回操作系统名 `osName`。
 *
 * App 端 `uni.getDeviceInfo` 会带出 `romName`/`romVersion`（见 uni-app-plus 原生 systemInfo）；
 * 微信等小程序沙箱通常无 ROM 字段，此时与仅 `osName` 一致。
 *
 * @param sys `mergedSystemInfo()` 合并结果
 * @returns 去首尾空白后的展示串；均无则空串
 */
function buildOnForStat(sys: UniSystemInfoLike): string {
  const rom = typeof sys.romName === 'string' ? sys.romName.trim() : ''
  if (rom) {
    const romVer =
      typeof sys.romVersion === 'string' ? sys.romVersion.trim() : ''
    return romVer ? `${rom} ${romVer}`.trim() : rom
  }
  return typeof sys.osName === 'string' ? sys.osName.trim() : ''
}

/**
 * 取静态系统信息（懒加载 + 缓存）。
 *
 * 字段映射策略：
 *   - `brand / md`：优先 `deviceBrand`/`deviceModel`（拆分 API），再退化 `brand`/`model`。
 *   - `sv / v / sdkVersion`：优先 `osVersion`、`hostVersion`、`hostSDKVersion`，兼容旧字段。
 *   - `osP`：由 `platform` / `osName` / `system` 经 `normalizeStatOsP` 得到，供上行 `p`。
 *   - `mpvHostVersion`：`hostVersion ?? version`，与私有版 `sys.version` 同源。
 *   - `on`：`buildOnForStat`（优先 `romName`/`romVersion`，否则 `osName`），供上行 `on`。
 *   - 缺失统一空字符串或 0，避免上行 JSON 丢字段语义。
 */
export function getSystemInfo(): SystemInfoStatic {
  if (cachedStatic) return cachedStatic
  const sys = mergedSystemInfo()
  const plus = (
    globalThis as unknown as {
      plus?: {
        runtime?: {
          version?: string
          appWgtVersion?: string
          appWgtRevision?: string
        }
      }
    }
  ).plus
  cachedStatic = {
    brand: sys.deviceBrand ?? sys.brand ?? '',
    md: sys.deviceModel ?? sys.model ?? '',
    sv: sys.osVersion ?? sys.system ?? '',
    v: sys.hostVersion ?? sys.version ?? '',
    ut: (sys.deviceType ?? 'unknown') as SystemInfoStatic['ut'],
    appVersion: plus?.runtime?.version ?? sys.appVersion ?? '',
    appWgtVersion:
      plus?.runtime?.appWgtVersion ??
      plus?.runtime?.appWgtRevision ??
      sys.appWgtVersion ??
      '',
    mpvHostVersion: (sys.hostVersion ?? sys.version ?? '').trim(),
    on: buildOnForStat(sys),
    sdkVersion: sys.hostSDKVersion ?? sys.SDKVersion ?? '',
    statusBarHeight:
      typeof sys.statusBarHeight === 'number' ? sys.statusBarHeight : 0,
    osP: normalizeStatOsP({
      platform: sys.platform,
      osName: sys.osName,
      system: sys.system,
    }),
  }
  return cachedStatic
}

/**
 * 取实时字段（lang / 窗口尺寸 / 屏幕尺寸 / dpr）。
 *
 * 每次调用重新走拆分 API + sync 合并，不复用缓存，避免旋转屏、改语言后失真。
 */
export function getLocaleAndScreen(): LocaleAndScreen {
  const sys = mergedSystemInfo()
  const prRaw =
    typeof sys.pixelRatio === 'number'
      ? sys.pixelRatio
      : typeof sys.devicePixelRatio === 'number'
      ? sys.devicePixelRatio
      : 1
  return {
    lang: (sys.hostLanguage ?? sys.language ?? '').replace(/_/g, '-'),
    ww: typeof sys.windowWidth === 'number' ? sys.windowWidth : 0,
    wh: typeof sys.windowHeight === 'number' ? sys.windowHeight : 0,
    sw: typeof sys.screenWidth === 'number' ? sys.screenWidth : 0,
    sh: typeof sys.screenHeight === 'number' ? sys.screenHeight : 0,
    pr: prRaw > 0 ? prRaw : 1,
  }
}

/** 仅供单测：重置 `getSystemInfo` 的内部缓存。 */
export function __resetCache(): void {
  cachedStatic = null
}
