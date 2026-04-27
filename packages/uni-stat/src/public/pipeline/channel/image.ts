/**
 * 公有版默认通道：火山 TLS WebTrack.gif 图片像素上报。
 *
 * 上行格式：
 *   `${host}/WebTrack.gif?ProjectId=${pid}&TopicId=${tid}&Logs=${URI(JSON.stringify(logs))}&Source=webImg&Time=${Date.now()}`
 *
 * 设计要点：
 *   - 首选 `new Image().src=...`：浏览器/H5/部分小程序均可用，**不受 CORS 限制**，命中即认为送达。
 *   - 浏览器以外环境（App / 部分小程序无 Image 全局）：退回 `uni.request({ method: 'GET' })`，
 *     成功状态码 `2xx` 视为送达。
 *   - 上行体积保护：`payload.requests` 已是 `JSON.stringify(events)`，再 `encodeURIComponent` 后塞入 URL；
 *     单条 batch 超过 `maxUrlLength`（默认 6KB）时直接 reject 让 retry 持久化下次再发，
 *     避免被 CDN/网关静默截断。
 *   - 不做"重试 = 业务错"的兜底：网络抖动一律由 `withRetry` 处理；最终失败由 collector → retry.persist 接管。
 *
 * 与 cloud / http 通道一致：
 *   - `available()`：host/projectId/topicId 均非空即可（不要求 Image 一定存在，因为有 uni.request 兜底）。
 *   - `send(payload)`：成功 resolve、失败 reject。
 *   - 不缓存任何状态。
 */

import {
  IMAGE_MAX_RETRIES,
  IMAGE_REPORT_DEFAULTS,
  RETRY_BASE_DELAY_MS,
} from '../../config'
import { logger } from '../../infra/logger'
import { tryRun, withRetry } from '../../infra/safe'

import type { Channel, ReportPayload } from '../types'

interface UniRequestApi {
  request?: (opts: {
    url: string
    method?: 'POST' | 'GET'
    timeout?: number
    success?: (res: { statusCode?: number; data?: unknown }) => void
    fail?: (e: unknown) => void
  }) => void
}

function getUni(): UniRequestApi | undefined {
  return (globalThis as unknown as { uni?: UniRequestApi }).uni
}

/**
 * 拼装最终请求 URL。导出供测试/调试用。
 *
 * @param payload  上报 payload；其中 `requests` 已是 `JSON.stringify(events)`。
 * @param opts     host/projectId/topicId 与 nowMs。
 */
export function buildImageReportUrl(
  payload: ReportPayload,
  opts: {
    host: string
    projectId: string
    topicId: string
    nowMs?: () => number
  }
): string {
  const t = (opts.nowMs ?? (() => Date.now()))()
  // payload.requests 已经是 JSON 字符串（事件数组），无需再次 stringify
  const logs = encodeURIComponent(payload.requests)
  const host = opts.host.replace(/\/+$/, '')
  return (
    host +
    '/WebTrack.gif' +
    '?ProjectId=' +
    encodeURIComponent(opts.projectId) +
    '&TopicId=' +
    encodeURIComponent(opts.topicId) +
    '&Logs=' +
    logs +
    '&Source=webImg' +
    '&Time=' +
    t
  )
}

/**
 * 优先使用浏览器/H5 的 `new Image()`：仅触发 GET，不读响应；图片 onload/onerror 都视为已送达
 * （图片像素 1x1，服务端只关心 query 落库）。
 *
 * 返回 `true`：当前环境支持 Image，已发出请求。
 * 返回 `false`：缺少 Image 全局或构造抛错，调用方应退回 `uni.request`。
 */
function tryImageBeacon(url: string): boolean {
  const ImageCtor = (
    globalThis as unknown as {
      Image?: new () => { src: string }
    }
  ).Image
  if (typeof ImageCtor !== 'function') return false
  return tryRun(() => {
    const img = new ImageCtor()
    img.src = url
    return true
  }, false)
}

interface ImageChannelOptions {
  /** 上报 host，例如 `https://tls-cn-beijing.volces.com`。缺省走 IMAGE_REPORT_DEFAULTS。 */
  host?: string
  /** 火山 TLS 项目 ID。 */
  projectId?: string
  /** 火山 TLS 主题 ID。 */
  topicId?: string
  /** 是否优先使用 `new Image()`，默认 true；测试可强制关闭走 uni.request 路径。 */
  preferImageBeacon?: boolean
  /** uni.request 单次超时（ms），默认 10s。 */
  timeoutMs?: number
  /** 注入 sleep（测试用，避免 fake timer）。 */
  sleep?: (ms: number) => Promise<void>
  /** 总重试次数。 */
  maxRetries?: number
  /**
   * 单次 URL 长度上限；超出直接 reject 走 retry 持久化。
   * GET 在多数 CDN 网关上 8KB 是边界，留 2KB 余量给 query schema 自身。
   */
  maxUrlLength?: number
  /** 注入 nowMs（测试可固定时间戳）。 */
  nowMs?: () => number
}

export function createImageChannel(opts: ImageChannelOptions = {}): Channel {
  const host = opts.host ?? IMAGE_REPORT_DEFAULTS.host
  const projectId = opts.projectId ?? IMAGE_REPORT_DEFAULTS.projectId
  const topicId = opts.topicId ?? IMAGE_REPORT_DEFAULTS.topicId
  const timeoutMs = opts.timeoutMs ?? 10_000
  const maxRetries = opts.maxRetries ?? IMAGE_MAX_RETRIES
  const maxUrlLength = opts.maxUrlLength ?? 6 * 1024
  const preferBeacon = opts.preferImageBeacon !== false
  const nowMs = opts.nowMs

  /** 是否填齐了发包必备参数。 */
  function configured(): boolean {
    return !!(host && projectId && topicId)
  }

  function once(payload: ReportPayload): Promise<void> {
    if (!configured()) {
      return Promise.reject(new Error('image channel not configured'))
    }
    const url = buildImageReportUrl(payload, {
      host,
      projectId,
      topicId,
      nowMs,
    })
    if (url.length > maxUrlLength) {
      return Promise.reject(
        new Error('image url too long: ' + url.length + ' > ' + maxUrlLength)
      )
    }

    if (preferBeacon && tryImageBeacon(url)) {
      return Promise.resolve()
    }

    const u = getUni()
    if (!u || typeof u.request !== 'function') {
      return Promise.reject(new Error('no Image and uni.request unavailable'))
    }
    return new Promise((resolve, reject) => {
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        reject(new Error('image timeout'))
      }, timeoutMs)
      u.request!({
        url,
        method: 'GET',
        timeout: timeoutMs,
        success: (res) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          const code = res?.statusCode ?? 0
          if (code >= 200 && code < 400) resolve()
          else reject(new Error('image status ' + code))
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
    name: 'image',
    available(): boolean {
      // 配置齐全即可：浏览器无 Image 时仍能走 uni.request 兜底
      return configured()
    },
    async send(payload: ReportPayload): Promise<void> {
      try {
        await withRetry(() => once(payload), {
          times: maxRetries,
          baseDelayMs: RETRY_BASE_DELAY_MS,
          sleep: opts.sleep,
        })
      } catch (e) {
        logger.warn('[uni-stat] image channel send failed after retries', e)
        throw e
      }
    },
  }
}
