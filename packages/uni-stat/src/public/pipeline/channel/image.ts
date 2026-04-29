/**
 * 公有版默认通道：火山 TLS Web 采集。
 *
 * **H5**（`ut === 'h5'`）：
 *   - `GET ${host}/WebTrack.gif?ProjectId&TopicId&Logs=URI(JSON)&Source=webImg&Time=…`
 *   - 首选 `new Image().src`（无 CORS 读限制）；否则 `uni.request` GET。
 *
 * **非 H5**（小程序 / App 等，与 [TLS WebTracks](https://www.volcengine.com/docs/6470/141803?lang=zh) 对齐）：
 *   - `POST ${host}/WebTracks?ProjectId&TopicId`
 *   - Header：`Content-Type: application/json`（必选）、`x-tls-bodyrawsize` = 未压缩 body 字节数（必选）
 *   - Body：`{ "Source": "webImg", "Logs": [...] }`，且 **每条 Log 的 value 均为 string**（服务端强校验）。
 *
 * 设计要点：
 *   - H5 仍受 GET URL 长度约束（`maxUrlLength` / `maxRequestBytes` 反推）。
 *   - POST 单请求文档上限 5 MiB；本实现预留余量后校验 body，超限抛 `PermanentChannelError`。
 *   - 配置缺失、JSON 不可解析、环境无 `uni.request`：永久错误，不进无意义重试。
 */

import {
  IMAGE_MAX_RETRIES,
  IMAGE_REPORT_DEFAULTS,
  RETRY_BASE_DELAY_MS,
} from '../../config'
import { logger } from '../../infra/logger'
import { resolveUniRuntime } from '../../infra/uniRuntime'
import { tryRun, withRetry } from '../../infra/safe'

import {
  type Channel,
  PermanentChannelError,
  type ReportPayload,
  isPermanentChannelError,
} from '../types'

/** POST body 上限（字节）：文档单请求 5 MiB，预留 256KiB 给编码波动与头字段。 */
const WEBTRACKS_POST_BODY_MAX_BYTES = 5 * 1024 * 1024 - 256 * 1024

/** 非 H5 时 collector 对 `requests` 原文切片上限（与 POST body 同量级，留 JSON 包装开销）。 */
const WEBTRACKS_MAX_REQUEST_BYTES = 4 * 1024 * 1024

interface UniRequestApi {
  request?: (opts: {
    url: string
    method?: 'POST' | 'GET'
    data?: string | Record<string, unknown>
    header?: Record<string, string>
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
 * 计算 UTF-8 字节长度（与 `x-tls-bodyrawsize` 对齐；无 TextEncoder 时退化逐码点估算）。
 *
 * @param str 已序列化待发送的 JSON 串
 */
function utf8ByteLength(str: string): number {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(str).length
  }
  let n = 0
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    if (c < 0x80) n++
    else if (c < 0x800) n += 2
    else if (c < 0xd800 || c >= 0xe000) n += 3
    else {
      i++
      n += 4
    }
  }
  return n
}

/**
 * 估算 image GET URL 中"非 Logs"部分的固定字节预算：
 *   `https://…/WebTrack.gif?ProjectId=<uuid>&TopicId=<uuid>&Logs=&Source=webImg&Time=<13>`
 * 约 240B；保守取 256B，让 chunkEvents 留一点 headroom。
 */
const IMAGE_URL_BASE_OVERHEAD = 256

/**
 * `encodeURIComponent` 字节膨胀比的上界估算（取最坏值，避免任意业务下切片仍超长）。
 */
const IMAGE_ENCODE_RATIO = 3.0

/**
 * 拼装 H5 像素上报 URL。导出供测试/调试用。
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
 * 拼装 WebTracks POST 请求 URL（query 仅 ProjectId / TopicId，与文档一致）。
 *
 * @param host       TLS 接入点，可带末尾 `/`
 * @param projectId  日志项目 ID
 * @param topicId    日志主题 ID
 */
export function buildWebTracksPostUrl(
  host: string,
  projectId: string,
  topicId: string
): string {
  const h = host.replace(/\/+$/, '')
  return (
    h +
    '/WebTracks' +
    '?ProjectId=' +
    encodeURIComponent(projectId) +
    '&TopicId=' +
    encodeURIComponent(topicId)
  )
}

/**
 * 火山 WebTracks 要求 `Logs` 中每条日志的 **所有 value 均为 string**，否则返回
 * `InvalidArgumentsTypes`（如 `Value in Logs is not string data type`）。
 *
 * @param entry `requests` 解析后的单条事件对象
 * @returns 键保留、值全部转为 UTF-8 可序列化字符串后的记录
 */
function normalizeWebTracksLogEntry(entry: unknown): Record<string, string> {
  if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
    return { _raw: String(entry) }
  }
  const out: Record<string, string> = {}
  const obj = entry as Record<string, unknown>
  for (const key of Object.keys(obj)) {
    const v = obj[key]
    if (v === null || v === undefined) {
      out[key] = ''
    } else if (typeof v === 'string') {
      out[key] = v
    } else if (
      typeof v === 'number' ||
      typeof v === 'boolean' ||
      typeof v === 'bigint'
    ) {
      out[key] = String(v)
    } else {
      try {
        out[key] = JSON.stringify(v)
      } catch {
        out[key] = ''
      }
    }
  }
  return out
}

/**
 * 将 `ReportPayload.requests` 包装为 WebTracks POST JSON 串，并给出 UTF-8 字节长度。
 *
 * @param payload 批次 payload
 * @returns 序列化后的 body 与 `x-tls-bodyrawsize` 取值
 */
function buildWebTracksPostBody(payload: ReportPayload): {
  json: string
  rawByteSize: number
} {
  let logs: unknown
  try {
    logs = JSON.parse(payload.requests) as unknown
  } catch {
    throw new PermanentChannelError('webtracks invalid requests json')
  }
  if (!Array.isArray(logs)) {
    throw new PermanentChannelError('webtracks Logs must be a json array')
  }
  const normalizedLogs = logs.map((item) => normalizeWebTracksLogEntry(item))
  const body = { Source: 'webImg', Logs: normalizedLogs }
  let json: string
  try {
    json = JSON.stringify(body)
  } catch {
    throw new PermanentChannelError('webtracks body stringify failed')
  }
  const rawByteSize = utf8ByteLength(json)
  if (rawByteSize > WEBTRACKS_POST_BODY_MAX_BYTES) {
    throw new PermanentChannelError(
      'webtracks body too large: ' +
        rawByteSize +
        ' > ' +
        WEBTRACKS_POST_BODY_MAX_BYTES
    )
  }
  return { json, rawByteSize }
}

/**
 * 优先使用浏览器/H5 的 `new Image()`：仅触发 GET，不读响应。
 *
 * @returns 已发出 beacon 为 true；否则 false，由调用方退回 `uni.request`。
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
  /**
   * 宿主短码（与 `adapter/platform.getPlatform()` 一致）。
   * **`h5`** 走 WebTrack.gif；其余走 **POST /WebTracks**。
   */
  ut?: string
  /** 是否优先使用 `new Image()`（仅 H5 有意义），默认 true。 */
  preferImageBeacon?: boolean
  /** uni.request 单次超时（ms），默认 10s。 */
  timeoutMs?: number
  /** 注入 sleep（测试用，避免 fake timer）。 */
  sleep?: (ms: number) => Promise<void>
  /** 总重试次数。 */
  maxRetries?: number
  /**
   * 单次 GIF URL 长度上限（仅 H5）；超出直接抛 `PermanentChannelError`。
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
  const ut = opts.ut ?? ''
  const isH5 = ut === 'h5'

  function configured(): boolean {
    return !!(host && projectId && topicId)
  }

  /**
   * H5：校验 GIF URL 长度，返回完整 URL。
   */
  function preflightGif(payload: ReportPayload): string {
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
   * 非 H5：组装 WebTracks POST 的 URL 与 body。
   */
  function preflightPost(payload: ReportPayload): {
    url: string
    json: string
    rawByteSize: number
  } {
    if (!configured()) {
      throw new PermanentChannelError('image channel not configured')
    }
    const url = buildWebTracksPostUrl(host, projectId, topicId)
    const { json, rawByteSize } = buildWebTracksPostBody(payload)
    return { url, json, rawByteSize }
  }

  /**
   * H5：GET gif（Image 或 uni.request）。
   */
  function onceGif(url: string): Promise<void> {
    if (preferBeacon && tryImageBeacon(url)) {
      return Promise.resolve()
    }

    const u = getUni()
    if (!u || typeof u.request !== 'function') {
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

  /**
   * 非 H5：POST /WebTracks，带 TLS 必选头。
   */
  function oncePost(
    url: string,
    json: string,
    rawByteSize: number
  ): Promise<void> {
    const u = getUni()
    if (!u || typeof u.request !== 'function') {
      return Promise.reject(
        new PermanentChannelError('uni.request unavailable')
      )
    }
    return new Promise((resolve, reject) => {
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        reject(new Error('webtracks timeout'))
      }, timeoutMs)
      u.request!({
        url,
        method: 'POST',
        data: json,
        header: {
          'Content-Type': 'application/json',
          'x-tls-bodyrawsize': String(rawByteSize),
        },
        timeout: timeoutMs,
        success: (res) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          const code = res?.statusCode ?? 0
          if (code >= 200 && code < 300) resolve()
          else reject(new Error('webtracks status ' + code))
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
      return configured()
    },
    maxRequestBytes(): number {
      if (isH5) {
        const raw =
          (maxUrlLength - IMAGE_URL_BASE_OVERHEAD) / IMAGE_ENCODE_RATIO
        return Math.max(512, Math.floor(raw))
      }
      return WEBTRACKS_MAX_REQUEST_BYTES
    },
    async send(payload: ReportPayload): Promise<void> {
      try {
        if (isH5) {
          const url = preflightGif(payload)
          await withRetry(() => onceGif(url), {
            times: maxRetries,
            baseDelayMs: RETRY_BASE_DELAY_MS,
            sleep: opts.sleep,
          })
        } else {
          const { url, json, rawByteSize } = preflightPost(payload)
          await withRetry(() => oncePost(url, json, rawByteSize), {
            times: maxRetries,
            baseDelayMs: RETRY_BASE_DELAY_MS,
            sleep: opts.sleep,
          })
        }
      } catch (e) {
        if (isPermanentChannelError(e)) {
          logger.warn('[uni-stat] image channel permanent error, skip retry', e)
        } else {
          logger.warn('[uni-stat] image channel send failed after retries', e)
        }
        throw e
      }
    },
  }
}
