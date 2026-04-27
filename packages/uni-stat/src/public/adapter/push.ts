/**
 * uniPush ClientID 适配。
 *
 * 私有版（`core/stat.js#pushEvent`）逻辑：
 *   - 调 `uni.getPushClientId({ success(res){ cid = res.cid } })`，无 cid 直接丢弃。
 *   - 没有超时；某些机型 push 服务异常时，回调永远不来，导致这次 launch 的 push 上报丢失。
 *   - 返回值包在 success 回调里，无法 await，不便 pipeline 串接。
 *
 * 公有版职责：
 *   1. `getPushClientId({ enabled, timeoutMs })` 返回 `Promise<PushClientResult>`，
 *      永不 reject；超时 / 失败 / 关闭统一返回 `{ ok: false, cid: '' }`。
 *   2. `enabled` 默认 false（合规要求显式开启）；调用方应从 `config.uniPushClientID`
 *      透传。
 *   3. 不缓存：业务方需要会话维度复用时在 `domain/push.ts` 中缓存（待 Phase 5 接入）。
 */

import { tryRun } from '../infra/safe'

export interface PushClientResult {
  /** 是否成功拿到 cid。 */
  ok: boolean
  /** ClientID，失败为空串。 */
  cid: string
  /** 失败原因（仅调试用，不上行）。 */
  reason?: 'disabled' | 'unsupported' | 'timeout' | 'fail'
}

interface UniPushApi {
  getPushClientId?: (opts: {
    success?: (res: { cid?: string }) => void
    fail?: (e: unknown) => void
    complete?: () => void
  }) => void
}

function getUni(): UniPushApi | undefined {
  return (globalThis as unknown as { uni?: UniPushApi }).uni
}

export interface GetPushOptions {
  /** 是否启用；默认 false。 */
  enabled?: boolean
  /** 超时（ms），默认 3000。push 服务初次注册可能较慢，时长偏长但有上限。 */
  timeoutMs?: number
}

/**
 * 异步取 push clientId。
 *
 * 任意异常路径都 resolve（永不 reject），调用方只需根据 `ok` 字段判断是否上报。
 */
export function getPushClientId(
  opts: GetPushOptions = {}
): Promise<PushClientResult> {
  const { enabled = false, timeoutMs = 3000 } = opts
  return new Promise<PushClientResult>((resolve) => {
    if (!enabled) {
      resolve({ ok: false, cid: '', reason: 'disabled' })
      return
    }
    const u = getUni()
    if (!u || typeof u.getPushClientId !== 'function') {
      resolve({ ok: false, cid: '', reason: 'unsupported' })
      return
    }
    let settled = false
    const finish = (r: PushClientResult): void => {
      if (settled) return
      settled = true
      resolve(r)
    }
    const timer = setTimeout(
      () => finish({ ok: false, cid: '', reason: 'timeout' }),
      timeoutMs
    )
    tryRun(
      () =>
        u.getPushClientId!({
          success: (res) => {
            clearTimeout(timer)
            const cid = typeof res?.cid === 'string' ? res.cid : ''
            if (!cid) {
              finish({ ok: false, cid: '', reason: 'fail' })
              return
            }
            finish({ ok: true, cid })
          },
          fail: () => {
            clearTimeout(timer)
            finish({ ok: false, cid: '', reason: 'fail' })
          },
        }),
      undefined
    )
  })
}
