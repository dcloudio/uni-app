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
 *     单条 batch 超过 `maxUrlLength`（默认 6KB）时抛出 `PermanentChannelError`，
 *     **不进入 `withRetry`**——同一份 payload 重发同一份必然再次超长，避免空转 N 次；
 *     上层 collector 捕获到 `PermanentChannelError` 后会跳过 `retry.persist`，避免反复落盘。
 *   - 配置缺失（host/projectId/topicId 任一为空）：同样抛 `PermanentChannelError`，避免脏数据持久化死循环。
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

import {
  type Channel,
  PermanentChannelError,
  type ReportPayload,
  isPermanentChannelError,
} from '../types'

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
 * 估算 image GET URL 中"非 Logs"部分的固定字节预算：
 *   `https://tls-cn-beijing.volces.com/WebTrack.gif?ProjectId=<uuid>&TopicId=<uuid>&Logs=&Source=webImg&Time=<13>`
 * 约 240B；保守取 256B，让 chunkEvents 留一点 headroom。
 */
const IMAGE_URL_BASE_OVERHEAD = 256

/**
 * `encodeURIComponent` 平均膨胀比的上界估算：
 *   - ASCII JSON（`{"a":1}` → `%7B%22a%22%3A1%7D`）≈ 2.0–2.3x
 *   - 中英混排实测 ≈ 1.8x
 *   - 纯中文最坏 3.0x
 * 取 **2.5** 作为中等保守值：覆盖大多数业务（含中文事件名 / 错误堆栈），
 * 极端纯中文场景由 `preflight` 抛 `PermanentChannelError` 兜底丢弃单片。
 */
const IMAGE_ENCODE_RATIO = 2.5

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

  /**
   * 入口预检：识别永久性错误（不可通过重试自愈），直接抛 PermanentChannelError 让上层立即丢弃。
   *
   * 在 send() 内做一次，比放在 once() 里更稳：永久错绝不进入 withRetry 的重试循环。
   */
  function preflight(payload: ReportPayload): string {
    if (!configured()) {
      throw new PermanentChannelError('image channel not configured')
    }
    const url = buildImageReportUrl(payload, {
      host,
      projectId,
      topicId,
      nowMs,
    })
    if (url.length > maxUrlLength) {
      throw new PermanentChannelError(
        'image url too long: ' + url.length + ' > ' + maxUrlLength
      )
    }
    return url
  }

  /**
   * 单次发送（已构好 URL）。**只处理网络层错误**，不再判断超长 / 配置缺失（已在 preflight）。
   */
  function once(url: string): Promise<void> {
    if (preferBeacon && tryImageBeacon(url)) {
      return Promise.resolve()
    }

    const u = getUni()
    if (!u || typeof u.request !== 'function') {
      // 环境本身既无 Image 也无 uni.request，重试不会自愈 → 永久错
      return Promise.reject(
        new PermanentChannelError('no Image and uni.request unavailable')
      )
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
    /**
     * 反推单批 `requests` 原文字节上限：
     *   原文 ≤ (maxUrlLength - IMAGE_URL_BASE_OVERHEAD) / IMAGE_ENCODE_RATIO
     *
     * 例：默认 `maxUrlLength = 6144`，IMAGE_URL_BASE_OVERHEAD = 256，IMAGE_ENCODE_RATIO = 2.5
     *   → 原文上限 = (6144 - 256) / 2.5 ≈ 2355 字节
     * collector 取该值与全局 `BATCH_REQUESTS_MAX_BYTES` 的 min 作为切片阈值；
     * 实测可让"100 条 ~440B 事件"切成 ~20 片，每片 encode 后稳定 < 6KB。
     *
     * 下限保护：512B（避免 `maxUrlLength` 配置过小导致单条事件都放不下）。
     */
    maxRequestBytes(): number {
      const raw = (maxUrlLength - IMAGE_URL_BASE_OVERHEAD) / IMAGE_ENCODE_RATIO
      return Math.max(512, Math.floor(raw))
    },
    async send(payload: ReportPayload): Promise<void> {
      // 1) 入口预检：永久错直接抛，**不进 withRetry**，避免协议层空转
      let url: string
      try {
        url = preflight(payload)
      } catch (e) {
        if (isPermanentChannelError(e)) {
          logger.warn('[uni-stat] image channel permanent error, skip retry', e)
        }
        throw e
      }
      // 2) 网络层重试
      try {
        await withRetry(() => once(url), {
          times: maxRetries,
          baseDelayMs: RETRY_BASE_DELAY_MS,
          sleep: opts.sleep,
        })
      } catch (e) {
        // 重试过程中若拿到 permanent（理论上极少：环境 API 在重试间消失），同样冒泡
        if (isPermanentChannelError(e)) {
          logger.warn(
            '[uni-stat] image channel permanent error during retry',
            e
          )
        } else {
          logger.warn('[uni-stat] image channel send failed after retries', e)
        }
        throw e
      }
    },
  }
}
