/**
 * 1.0 通道：HTTP POST 上报。
 *
 * 兼容私有版同协议（`uni.request(POST STAT_URL)`），并修复其历史缺陷：
 *   - #1 `_retry` 未初始化导致 NaN：本实现以 `withRetry({times})` 显式控制。
 *   - #16 H5 在 nvue/部分小程序无 `Image`：本实现以 `uni.request` 为主；TLS 公有版 image
 *     通道的 H5 路径亦优先 `uni.request` GET 以读取 HTTP 状态，避免误报成功。
 *
 * 接口契约：
 *   - `available()`：在任何 uni 平台都返回 true（HTTP 是兜底通道）。
 *   - `send(payload)`：成功 resolve；3 次重试全失败抛错（供 retry.persist 落盘）。
 *   - 不缓存任何状态；每次 `send` 是无状态的。
 */

import {
  HTTP_MAX_RETRIES,
  RETRY_BASE_DELAY_MS,
  STAT_H5_URL,
  STAT_URL,
} from '../../config'
import { logger } from '../../infra/logger'
import { getGlobalObject, resolveUniRuntime } from '../../infra/uniRuntime'
import { tryRun, withRetry } from '../../infra/safe'

import type { Channel, ReportPayload } from '../types'

interface UniRequestApi {
  request?: (opts: {
    url: string
    method?: 'POST' | 'GET'
    data?: unknown
    timeout?: number
    success?: (res: { statusCode?: number; data?: unknown }) => void
    fail?: (e: unknown) => void
  }) => void
}

function getUni(): UniRequestApi | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniRequestApi) : undefined
}

/**
 * 把 payload 拼成 query string，供 H5 image fallback 使用。
 *
 * 私有版用 `get_sgin(get_encodeURIComponent_options(data))` 还会算签名；公有版去掉签名
 * （服务端历史阶段仅 1.0 走签名，2.0 已弃用），保持 query 简单可读：
 *   `?usv=3&t=...&requests=URL_ENCODED_JSON`
 */
function toQuery(payload: ReportPayload): string {
  const out: string[] = []
  out.push('usv=' + encodeURIComponent(String(payload.usv)))
  out.push('t=' + encodeURIComponent(String(payload.t)))
  out.push('requests=' + encodeURIComponent(payload.requests))
  return out.join('&')
}

/**
 * H5 image 通道。仅在 `Image` 全局存在时调用；否则返回 false 让外层退回 `uni.request`。
 *
 * 不等待 onload/onerror（image 兜底语义即"发出去就算"），同步 resolve。
 * 若 `new Image()` 本身抛错也吞掉，转给 fallback。
 */
function tryImageRequest(payload: ReportPayload, h5Url = STAT_H5_URL): boolean {
  const ImageCtor = getGlobalObject().Image as
    | (new () => { src: string })
    | undefined
  if (typeof ImageCtor !== 'function') return false
  return tryRun(() => {
    const img = new ImageCtor()
    img.src = h5Url + '?' + toQuery(payload)
    return true
  }, false)
}

interface HttpChannelOptions {
  /** 上报地址，默认 STAT_URL；测试与多环境可注入。 */
  url?: string
  /** H5 image 上报地址。 */
  h5Url?: string
  /** 是否启用 image 兜底（默认根据全局 Image 是否存在自动判断）。测试可强制关闭。 */
  preferImageOnH5?: boolean
  /** 当前 ut 平台（与 adapter/platform.getPlatform() 一致；'h5' 时考虑 image fallback）。 */
  ut?: string
  /** 单次请求超时（ms）。 */
  timeoutMs?: number
  /** 注入 sleep（测试用，避免 fake timer）。 */
  sleep?: (ms: number) => Promise<void>
  /** 总重试次数。 */
  maxRetries?: number
}

export function createHttpChannel(opts: HttpChannelOptions = {}): Channel {
  const url = opts.url ?? STAT_URL
  const h5Url = opts.h5Url ?? STAT_H5_URL
  const ut = opts.ut ?? ''
  const timeoutMs = opts.timeoutMs ?? 10_000
  const maxRetries = opts.maxRetries ?? HTTP_MAX_RETRIES

  function once(payload: ReportPayload): Promise<void> {
    if (ut === 'h5' && opts.preferImageOnH5 !== false) {
      if (tryImageRequest(payload, h5Url)) return Promise.resolve()
    }
    const u = getUni()
    if (!u || typeof u.request !== 'function') {
      return Promise.reject(new Error('uni.request unavailable'))
    }
    return new Promise((resolve, reject) => {
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        reject(new Error('http timeout'))
      }, timeoutMs)
      u.request!({
        url,
        method: 'POST',
        data: payload,
        timeout: timeoutMs,
        success: (res) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          const code = res?.statusCode ?? 0
          if (code >= 200 && code < 300) resolve()
          else reject(new Error('http status ' + code))
        },
        fail: (e) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          reject(e instanceof Error ? e : new Error(String(e)))
        },
      })
    })
  }

  return {
    name: '1.0',
    available(): boolean {
      const u = getUni()
      return !!(u && typeof u.request === 'function')
    },
    async send(payload: ReportPayload): Promise<void> {
      try {
        await withRetry(() => once(payload), {
          times: maxRetries,
          baseDelayMs: RETRY_BASE_DELAY_MS,
          sleep: opts.sleep,
        })
      } catch (e) {
        logger.warn('[uni统计 2.0] 统计上报失败（HTTP 已重试）', e)
        throw e
      }
    },
  }
}
