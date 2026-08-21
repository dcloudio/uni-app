/**
 * 包信息适配（公有版新增字段 `tdaid / pkn / an`）。
 *
 * 详细矩阵参考 `04-字段字典与平台获取矩阵.md` §3。本模块职责：
 *   - 启动时调用一次 `getPackageInfo()`，结果常驻内存；不入 storage。
 *   - 每端分支独立函数，便于单测精准 mock。
 *   - 任意端、任意 API 抛错 → 一律降级为 `''`，**绝不**抛出。
 *
 * 字段语义提示：
 *   - `mpn`：兼容字段；各端「原生包名或小程序 appid」的统一口径（与文档 `mpn` 对齐）。
 *   - `tdaid`：第三方平台 appid（如微信小程序 appid）。
 *   - `pkn`：原生包名 / bundleId（App）；小程序无独立包名时为空串，**不与** tdaid 混填。
 *   - `an`：应用展示名（App = plus.runtime.appname；小程序/H5 = `process.env.UNI_APP_NAME` 等）。
 */

import {
  getGlobalObject,
  isVaporStatRuntime,
  resolveUniRuntime,
} from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import { getPlatform, isApp, isH5, isMp } from './platform'

export interface PackageInfo {
  /** 各端包名或小程序 appid 的统一字段（`tdaid`/`pkn`/`an` 为拆分语义）。 */
  mpn: string
  tdaid: string
  pkn: string
  an: string
}

let cached: PackageInfo | null = null

interface PlusLike {
  runtime?: {
    appid?: string
    appname?: string
    name?: string
    channel?: string
  }
  android?: {
    runtimeMainActivity?: () => { getPackageName?: () => string }
  }
  ios?: {
    bundleId?: string
  }
  os?: { name?: string }
}

interface AppBaseInfoLike {
  appId?: string
  appName?: string
  hostPackageName?: string
  packageName?: string
  bundleId?: string
  bundleName?: string
}

interface UniWithCanIUse {
  canIUse?: (k: string) => boolean
  getAccountInfoSync?: () => { miniProgram?: { appId?: string } }
  getAppBaseInfo?: () => AppBaseInfoLike
}

function getUni(): UniWithCanIUse | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniWithCanIUse) : undefined
}

function getPlus(): PlusLike | undefined {
  return getGlobalObject().plus as PlusLike | undefined
}

function getAppBaseInfo(): AppBaseInfoLike {
  return tryRun(() => getUni()?.getAppBaseInfo?.() ?? {}, {})
}

/**
 * 取小程序系列的 tdaid。各端 API 不同：
 *   - 微信/QQ：`uni.getAccountInfoSync().miniProgram.appId`（基础库 ≥ 1.10.0）。
 *   - 支付宝：`my.getAppIdSync()`（部分版本可用）。
 *   - 头条/飞书：`tt.getEnvInfoSync().microapp.appId`。
 *   - 百度：`swan.getEnvInfoSync().common.appKey` 兜底。
 *   - 其他端：暂时返回 ''；后续真机探测后再补。
 *
 * 任何分支抛错都返回 ''。
 */
function getMpTdaid(platform: string): string {
  const u = getUni() as
    | (UniWithCanIUse & {
        canIUse?: (k: string) => boolean
        getAccountInfoSync?: () => { miniProgram?: { appId?: string } }
      })
    | undefined

  switch (platform) {
    case 'wx':
    case 'qq': {
      if (typeof u?.getAccountInfoSync === 'function') {
        const id = tryRun(
          () => u.getAccountInfoSync!().miniProgram?.appId ?? '',
          ''
        )
        if (id) return id
      }
      const wxHost = getGlobalObject().wx as
        | {
            getAccountInfoSync?: () => { miniProgram?: { appId?: string } }
          }
        | undefined
      if (typeof wxHost?.getAccountInfoSync === 'function') {
        const id2 = tryRun(
          () => wxHost.getAccountInfoSync!().miniProgram?.appId ?? '',
          ''
        )
        if (id2) return id2
      }
      const envId = process.env.UNI_APP_ID
      return typeof envId === 'string' ? envId : ''
    }
    case 'ali':
    case 'dt': {
      const my = getGlobalObject().my as
        | {
            getAppIdSync?: () => string
            getAccountInfoSync?: () => { miniProgram?: { appId?: string } }
          }
        | undefined
      if (!my) return ''
      const v1 = tryRun(() => my.getAppIdSync?.() ?? '', '')
      if (v1) return v1
      return tryRun(
        () => my.getAccountInfoSync?.().miniProgram?.appId ?? '',
        ''
      )
    }
    case 'tt':
    case 'lark': {
      const tt = getGlobalObject().tt as
        | { getEnvInfoSync?: () => { microapp?: { appId?: string } } }
        | undefined
      return tryRun(() => tt?.getEnvInfoSync?.().microapp?.appId ?? '', '')
    }
    case 'bd': {
      const swan = getGlobalObject().swan as
        | { getEnvInfoSync?: () => { common?: { appKey?: string } } }
        | undefined
      return tryRun(() => swan?.getEnvInfoSync?.().common?.appKey ?? '', '')
    }
    default:
      return ''
  }
}

/**
 * App 端 packageName / bundleId。
 *
 * Android 走 `plus.android.runtimeMainActivity().getPackageName()`；
 * iOS 走 `plus.ios.bundleId`，缺失时退化 `plus.runtime.appid`；
 * HarmonyOS 暂时取 `plus.runtime.appid` 兜底（待 OS API 稳定后扩展）。
 */
function getAppPkn(): string {
  const plus = getPlus()
  if (!plus) return ''
  const osName = plus.os?.name?.toLowerCase() ?? ''
  if (osName.includes('android')) {
    return tryRun(
      () => plus.android?.runtimeMainActivity?.()?.getPackageName?.() ?? '',
      ''
    )
  }
  if (osName === 'ios' || osName === 'iphone os') {
    const v = tryRun(() => plus.ios?.bundleId ?? '', '')
    return v || tryRun(() => plus.runtime?.appid ?? '', '')
  }
  return tryRun(() => plus.runtime?.appid ?? '', '')
}

/**
 * 取 plus.runtime.appname / plus.runtime.name。
 *
 * 旧版本 plus 上字段名不一致，两个都试一次。
 */
function getAppName(): string {
  const plus = getPlus()
  if (!plus) return ''
  return (
    tryRun(() => plus.runtime?.appname ?? '', '') ||
    tryRun(() => plus.runtime?.name ?? '', '')
  )
}

/**
 * 取编译期注入的 UNI_APP_NAME。
 *
 * `plugin/index.ts` 后续会读取 `manifest.json#name` 注入此字段；当前若未注入返回 ''。
 */
function getEnvAppName(): string {
  return process.env.UNI_APP_NAME ?? ''
}

/**
 * 取 H5 端应用名：优先编译期注入，回退 `document.title`。
 */
function getH5AppName(): string {
  const env = getEnvAppName()
  if (env) return env
  return tryRun(
    () =>
      (getGlobalObject().document as { title?: string } | undefined)?.title ??
      '',
    ''
  )
}

/**
 * 启动时获取一次包信息；结果缓存于内存。
 *
 * 所有字段保证返回 `string`；缺失统一为 `''`，符合 `domain/statData.ts` 的字段处理约定。
 */
export function getPackageInfo(): PackageInfo {
  if (cached) return cached
  const platform = getPlatform()

  let mpn = ''
  let tdaid = ''
  let pkn = ''
  let an = ''

  if (isApp()) {
    const base = getAppBaseInfo()
    if (isVaporStatRuntime()) {
      // uni-app x Vapor 不提供 plus，只读取当前已公开的 getAppBaseInfo 字段。
      tdaid = base.appId || ''
      pkn =
        base.packageName ||
        base.bundleId ||
        base.bundleName ||
        base.hostPackageName ||
        ''
      an = base.appName || getEnvAppName()
    } else {
      tdaid =
        tryRun(() => getPlus()?.runtime?.appid ?? '', '') || base.appId || ''
      pkn = getAppPkn() || base.hostPackageName || tdaid
      an = getAppName() || base.appName || getEnvAppName()
    }
    mpn = pkn || tdaid
  } else if (isMp()) {
    tdaid = getMpTdaid(platform)
    pkn = ''
    an = getEnvAppName()
    mpn =
      tdaid ||
      (typeof process.env.UNI_APP_ID === 'string' ? process.env.UNI_APP_ID : '')
  } else if (isH5()) {
    tdaid = ''
    pkn = ''
    an = getH5AppName()
    mpn = ''
  } else {
    // unknown / 快应用等：尝试 env 注入即可
    tdaid = ''
    pkn = ''
    an = getEnvAppName()
    mpn = ''
  }

  cached = { mpn, tdaid, pkn, an }

  return cached
}

/** 仅供单测：清空缓存。 */
export function __resetCache(): void {
  cached = null
}
