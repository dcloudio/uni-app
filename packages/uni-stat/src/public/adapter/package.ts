/**
 * 包信息适配（公有版新增字段 `tdaid / pkn / an`）。
 *
 * 详细矩阵参考 `04-字段字典与平台获取矩阵.md` §3。本模块职责：
 *   - 启动时调用一次 `getPackageInfo()`，结果常驻内存；不入 storage。
 *   - 每端分支独立函数，便于单测精准 mock。
 *   - 任意端、任意 API 抛错 → 一律降级为 `''`，**绝不**抛出。
 *
 * 字段语义提示：
 *   - `tdaid`：第三方平台 appid（小程序 = 平台分配的 appid；App = manifest appid）。
 *   - `pkn`：包名（App = packageName / bundleId；小程序回填 tdaid，避免空字段）。
 *   - `an`：应用名（App = plus.runtime.appname；其他端 = `process.env.UNI_APP_NAME`）。
 */

import { resolveUniRuntime } from '../infra/uniRuntime'
import { tryRun } from '../infra/safe'

import { getPlatform, getRawPlatform, isApp, isH5, isMp } from './platform'

export interface PackageInfo {
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

interface UniWithCanIUse {
  canIUse?: (k: string) => boolean
  getAccountInfoSync?: () => { miniProgram?: { appId?: string } }
}

function getUni(): UniWithCanIUse | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniWithCanIUse) : undefined
}

function getPlus(): PlusLike | undefined {
  return (globalThis as unknown as { plus?: PlusLike }).plus
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
    case 'qq':
      if (u?.canIUse?.('getAccountInfoSync') && u.getAccountInfoSync) {
        return tryRun(
          () => u.getAccountInfoSync!().miniProgram?.appId ?? '',
          ''
        )
      }
      return ''
    case 'ali':
    case 'dt': {
      const my = (
        globalThis as unknown as {
          my?: {
            getAppIdSync?: () => string
            getAccountInfoSync?: () => { miniProgram?: { appId?: string } }
          }
        }
      ).my
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
      const tt = (
        globalThis as unknown as {
          tt?: { getEnvInfoSync?: () => { microapp?: { appId?: string } } }
        }
      ).tt
      return tryRun(() => tt?.getEnvInfoSync?.().microapp?.appId ?? '', '')
    }
    case 'bd': {
      const swan = (
        globalThis as unknown as {
          swan?: { getEnvInfoSync?: () => { common?: { appKey?: string } } }
        }
      ).swan
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
  return (process.env as Record<string, string | undefined>).UNI_APP_NAME ?? ''
}

/**
 * 取 H5 端应用名：优先编译期注入，回退 `document.title`。
 */
function getH5AppName(): string {
  const env = getEnvAppName()
  if (env) return env
  return tryRun(
    () =>
      (globalThis as { document?: { title?: string } }).document?.title ?? '',
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
  const raw = getRawPlatform()

  let tdaid = ''
  let pkn = ''
  let an = ''

  if (isApp()) {
    tdaid = tryRun(() => getPlus()?.runtime?.appid ?? '', '')
    pkn = getAppPkn() || tdaid
    an = getAppName() || getEnvAppName()
  } else if (isMp()) {
    tdaid = getMpTdaid(platform)
    // 小程序无包名概念，约定 pkn = tdaid，避免空字段
    pkn = tdaid
    an = getEnvAppName()
  } else if (isH5()) {
    tdaid = ''
    pkn = ''
    an = getH5AppName()
  } else {
    // unknown / 快应用等：尝试 env 注入即可
    tdaid = ''
    pkn = ''
    an = getEnvAppName()
  }

  cached = { tdaid, pkn, an }
  // raw 仅用于调试日志；公有版不写入字段，避免上行污染。
  void raw
  return cached
}

/** 仅供单测：清空缓存。 */
export function __resetCache(): void {
  cached = null
}
