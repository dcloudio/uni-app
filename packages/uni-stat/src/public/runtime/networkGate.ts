/**
 * 公有版网络门闸（仅 `src/public` 使用，不与私有版 core 共用）。
 *
 * 能力：
 *   1. `isNetworkOffline()`：基于 `uni.getNetworkType` 判断当前是否无网；
 *   2. `onNetworkOnline(cb)`：基于 `uni.onNetworkStatusChange`，在恢复有网时回调。
 *
 * 判定：`net === 'none'` 为无网；`unknown` **不**当无网（避免误挂起）。
 */

import { type NetResult, getNet, isApp, onNetChange } from '../adapter'

let observedNetwork: NetResult | undefined
let probingNetwork: Promise<NetResult> | undefined
let appForeground = true

/**
 * 根据 NetResult 判断是否无网。
 */
export function isOfflineNetResult(r: NetResult): boolean {
  return r.net === 'none'
}

/**
 * 先检查当前网络是否不可用。
 */
export async function isNetworkOffline(): Promise<boolean> {
  if (observedNetwork) return isOfflineNetResult(observedNetwork)
  // App 已进入后台且没有可复用快照时，不主动触发原生网络查询。按 unknown/有网
  // 继续走通道自身的失败重试，避免后台 getNetworkType 引发宿主崩溃。
  if (isApp() && !appForeground && !probingNetwork) return false
  if (!probingNetwork) {
    const current = getNet()
    probingNetwork = current
    const clear = (): void => {
      if (probingNetwork === current) probingNetwork = undefined
    }
    void current.then(clear, clear)
  }
  const r = await probingNetwork
  // App 端原生 getNetworkType 在后台频繁调用可能不稳定。首次主动探测后复用快照，
  // 后续网络切换由 onNetworkStatusChange 覆盖；非 App 端保持按需探测的旧语义。
  if (isApp() && !observedNetwork) observedNetwork = r
  return isOfflineNetResult(r)
}

/**
 * 同步 App 前后台状态。
 *
 * 前台恢复时仅让离线快照失效：下一次 flush 会在前台安全地重新探测并恢复积压；
 * 在线/unknown 快照继续复用，正常前后台切换不会增加 getNetworkType 调用。
 *
 * @returns 是否需要在前台主动补一次 flush / retry 恢复。
 */
export function setNetworkForeground(foreground: boolean): boolean {
  if (!isApp()) return false
  const wasForeground = appForeground
  appForeground = foreground
  let clearedOffline = false
  if (foreground && observedNetwork && isOfflineNetResult(observedNetwork)) {
    observedNetwork = undefined
    clearedOffline = true
  }
  return foreground && (!wasForeground || clearedOffline)
}

/**
 * 监听网络恢复为可用。返回 unsubscribe。
 *
 * @param cb 变为有网时触发（wifi/4g/...）；无网变化不触发。
 */
export function onNetworkOnline(cb: () => void): () => void {
  // 新一轮订阅不能沿用上次 install 遗留的状态；首次 flush 会主动探测一次。
  observedNetwork = undefined
  appForeground = true
  const off = onNetChange((r) => {
    // 变化事件已经携带完整网络状态，后续 flush 直接复用，避免回调内再次
    // getNetworkType，尤其避免 App 进入后台后的原生网络查询风暴。
    observedNetwork = r
    if (isOfflineNetResult(r)) return
    cb()
  })
  return () => {
    off()
    observedNetwork = undefined
  }
}

/** 仅供单测：清理模块内的网络快照与并发探测。 */
export function __resetNetworkGate(): void {
  observedNetwork = undefined
  probingNetwork = undefined
  appForeground = true
}
