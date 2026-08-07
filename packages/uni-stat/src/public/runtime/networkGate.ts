/**
 * 公有版网络门闸（仅 `src/public` 使用，不与私有版 core 共用）。
 *
 * 能力：
 *   1. `isNetworkOffline()`：基于 `uni.getNetworkType` 判断当前是否无网；
 *   2. `onNetworkOnline(cb)`：基于 `uni.onNetworkStatusChange`，在恢复有网时回调。
 *
 * 判定：`net === 'none'` 为无网；`unknown` **不**当无网（避免误挂起）。
 */

import { type NetResult, getNet, onNetChange } from '../adapter'

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
  const r = await getNet()
  return isOfflineNetResult(r)
}

/**
 * 监听网络恢复为可用。返回 unsubscribe。
 *
 * @param cb 变为有网时触发（wifi/4g/...）；无网变化不触发。
 */
export function onNetworkOnline(cb: () => void): () => void {
  return onNetChange((r) => {
    if (isOfflineNetResult(r)) return
    cb()
  })
}
