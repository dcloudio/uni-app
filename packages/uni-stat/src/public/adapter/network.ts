/**
 * 网络类型适配。
 *
 * 公有版要求（`03-公有版架构设计.md` §5.9）：
 *   - 返回 `Promise<NetResult>`，失败一律给默认值，**绝不**中断上报链路（修复缺陷 #10）。
 *   - 提供 `onChange` 订阅，便于会话上下文里"网络切换 → 触发一次 sessionDirty"。
 *
 * 字段映射：上行字段 `net`，与私有版字段保持一致；可选值：
 *   `wifi | 2g | 3g | 4g | 5g | ethernet | unknown | none`。
 */

import { tryRun } from '../infra/safe'

/** 受控的 NetType 联合，统一所有平台返回值。 */
export type NetType =
  | 'wifi'
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'ethernet'
  | 'unknown'
  | 'none'

export interface NetResult {
  /** 标准化后的 net 字段值。 */
  net: NetType
  /** 原始 networkType（便于调试，公有版不上报）。 */
  raw: string
}

const DEFAULT_RESULT: NetResult = { net: 'unknown', raw: '' }

/** 已知映射；命中外的统一归 unknown。 */
const NET_MAP: Record<string, NetType> = {
  wifi: 'wifi',
  '2g': '2g',
  '3g': '3g',
  '4g': '4g',
  '5g': '5g',
  ethernet: 'ethernet',
  none: 'none',
  unknown: 'unknown',
}

interface UniNetworkApi {
  getNetworkType?: (opts: {
    success?: (res: { networkType: string }) => void
    fail?: (e: unknown) => void
    complete?: () => void
  }) => void
  onNetworkStatusChange?: (
    cb: (res: { networkType: string; isConnected?: boolean }) => void
  ) => void
  offNetworkStatusChange?: (
    cb: (res: { networkType: string; isConnected?: boolean }) => void
  ) => void
}

function getUni(): UniNetworkApi | undefined {
  return (globalThis as unknown as { uni?: UniNetworkApi }).uni
}

/**
 * 把 uni 原始 networkType 字符串归一化为 `NetType`。
 *
 * 抽出独立函数，便于上层直接复用（例如 `onChange` 回调里也要做归一）。
 */
export function normalizeNet(raw: string | undefined | null): NetType {
  if (typeof raw !== 'string' || raw.length === 0) return 'unknown'
  return NET_MAP[raw.toLowerCase()] ?? 'unknown'
}

/**
 * 异步取当前网络类型。
 *
 * 一律 resolve（永不 reject）：
 *   - uni 缺失 / 调用抛错 / fail 回调 / 超时 → resolve(`{ net: 'unknown', raw: '' }`）。
 *   - 默认 1500ms 超时；防止 H5 端 navigator.connection 卡住采集链路。
 */
export function getNet(timeoutMs = 1500): Promise<NetResult> {
  return new Promise<NetResult>((resolve) => {
    const u = getUni()
    if (!u || typeof u.getNetworkType !== 'function') {
      resolve(DEFAULT_RESULT)
      return
    }

    let settled = false
    const finish = (r: NetResult): void => {
      if (settled) return
      settled = true
      resolve(r)
    }

    const timer = setTimeout(() => finish(DEFAULT_RESULT), timeoutMs)

    tryRun(
      () =>
        u.getNetworkType!({
          success: (res) => {
            clearTimeout(timer)
            const raw = res?.networkType ?? ''
            finish({ net: normalizeNet(raw), raw })
          },
          fail: () => {
            clearTimeout(timer)
            finish(DEFAULT_RESULT)
          },
        }),
      undefined
    )
  })
}

/**
 * 订阅网络变化。返回 unsubscribe 函数，方便测试与运行时解绑。
 *
 * 注意：私有版直接调 `uni.onNetworkStatusChange` 但没有解绑，导致 nvue 多次 install 时
 * 会注册多个回调（缺陷 #16）。公有版返回 unsubscribe 强制调用方持有；
 * `runtime/install.ts` 会保证 install 多次时复用单实例。
 */
export function onChange(cb: (r: NetResult) => void): () => void {
  const u = getUni()
  if (!u || typeof u.onNetworkStatusChange !== 'function') {
    return () => {
      /* noop */
    }
  }
  const wrapped = (res: {
    networkType: string
    isConnected?: boolean
  }): void => {
    const raw = res?.networkType ?? ''
    const net = res?.isConnected === false ? 'none' : normalizeNet(raw)
    tryRun(() => cb({ net, raw }), undefined)
  }
  u.onNetworkStatusChange(wrapped)
  return () => {
    if (typeof u.offNetworkStatusChange === 'function') {
      tryRun(() => u.offNetworkStatusChange!(wrapped), undefined)
    }
  }
}
