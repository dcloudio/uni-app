/**
 * 公有版默认通道：火山 TLS Web 采集。
 *
 * **H5**（`ut === 'h5'`）：
 *   - `GET ${host}/WebTrack.gif?ProjectId&TopicId&Logs=URI(JSON)&Source=webImg&Time=…`
 *   - **默认**用浏览器 `Image` 触发 GET（利于跨域）；**异步** `onload` 或 `onerror` 均视为信标已发出
 *     （TLS 常返回 JSON 导致 `onerror`，与 HTTP 200 并存，见 `imageBeaconAwait` 注释）。
 *   - 仅当 `preferImageBeacon: false` 或环境无 `Image` 时，才用 `uni.request` GET（可带 HTTP 状态，但可能受跨域限制）。
 *
 * **微信小程序**（`UNI_PLATFORM === 'mp-weixin'` 且 `MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT` 为 true）：
 *   - 与 H5 相同拼 `WebTrack.gif` GET URL，经 `wx.preloadAssets({ type:'image', src:url })` 发出；
 *   - **`success` 即视为送达**（与 H5 `Image` 的 onload/onerror 语义不同）；`fail` / 超时走重试；
 *   - 无 `wx.preloadAssets`（基础库 &lt; 2.22.1）时自动 **回退 POST /WebTracks**。
 *
 * **其它非 H5**（支付宝等小程序 / App，与 [TLS WebTracks](https://www.volcengine.com/docs/6470/141803?lang=zh) 对齐）：
 *   - `POST ${host}/WebTracks?ProjectId&TopicId`
 *   - Header：`Content-Type: application/json`（必选）、`x-tls-bodyrawsize` = 未压缩 body 字节数（必选）
 *   - Body：`{ "Source": "webImg", "Logs": [{ "Logs": "<JSON.stringify(events)>" }] }`。
 *     `Logs` 数组固定仅 1 个对象，内层 `Logs` 保存字符串化事件数组。
 *
 * 设计要点：
 *   - H5 / 微信 preload 仍受 GET URL 长度约束（`maxUrlLength` / `maxRequestBytes` 反推）。
 *   - POST 单请求文档上限 5 MiB；本实现预留余量后校验 body，超限抛 `PermanentChannelError`。
 *   - 配置缺失、JSON 不可解析、环境无 `uni.request`：永久错误，不进无意义重试。
 */

import { getRawPlatform } from '../../adapter/platform'
import {
  IMAGE_MAX_RETRIES,
  IMAGE_REPORT_DEFAULTS,
  MP_WEIXIN_PRELOAD_TIMEOUT_MS,
  MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT,
  RETRY_BASE_DELAY_MS,
} from '../../config'
import { logger } from '../../infra/logger'
import { getGlobalObject, resolveUniRuntime } from '../../infra/uniRuntime'
import { withRetry } from '../../infra/safe'

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
 * 拼装 H5 WebTrack.gif 上报 URL。导出供测试/调试用。
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
    throw new PermanentChannelError('上报数据 JSON 无效，无法解析 requests')
  }
  if (!Array.isArray(logs)) {
    throw new PermanentChannelError('上报数据格式错误：应为事件对象数组')
  }
  let serializedLogs = ''
  try {
    serializedLogs = JSON.stringify(logs)
  } catch {
    throw new PermanentChannelError('上报数据序列化失败')
  }
  const body = {
    Source: 'uniapp',
    Logs: [{ Logs: serializedLogs }],
  }
  let json: string
  try {
    json = JSON.stringify(body)
  } catch {
    throw new PermanentChannelError('上报数据序列化失败')
  }
  const rawByteSize = utf8ByteLength(json)
  if (rawByteSize > WEBTRACKS_POST_BODY_MAX_BYTES) {
    throw new PermanentChannelError(
      '上报数据体积过大: ' + rawByteSize + ' > ' + WEBTRACKS_POST_BODY_MAX_BYTES
    )
  }
  return { json, rawByteSize }
}

/**
 * 将 `uni.request` 返回的 `data` 压成短串，便于在 Error.message 中展示（如 TLS JSON 错误体）。
 *
 * @param data  success 回调中的 `res.data`
 * @param maxLen 最大字符数
 */
function summarizeHttpErrorBody(data: unknown, maxLen = 320): string {
  if (data == null) return ''
  if (typeof data === 'string') {
    return data.length <= maxLen ? data : data.slice(0, maxLen) + '…'
  }
  try {
    const s = JSON.stringify(data)
    return s.length <= maxLen ? s : s.slice(0, maxLen) + '…'
  } catch {
    return String(data).slice(0, maxLen)
  }
}

/**
 * H5 用 `Image` 触发 WebTrack.gif GET（信标）：须等 `onload`/`onerror` 或超时，禁止设完 `src` 立刻成功。
 *
 * **为何 `onerror` 仍算送达：** 火山 TLS 等接入点对 `.gif` 常返回 HTTP 200 + `Content-Type: application/json`
 *（甚至空 body）。浏览器无法把响应当成位图解码，会走 `onerror`，但**请求已发出且服务端已处理**。
 * 若在此 reject，会出现 Network 为 200 而 SDK 判失败。故信标语义下 **`onload` 与 `onerror` 均 resolve**，
 * 仅**超时**（长时间无任何回调）视为失败。
 *
 * @param url 完整 WebTrack.gif URL
 * @param ms  超时毫秒
 */
function imageBeaconAwait(url: string, ms: number): Promise<void> {
  type Img = {
    src: string
    onload: (() => void) | null
    onerror: (() => void) | null
    naturalWidth: number
    naturalHeight: number
  }
  const ImageCtor = getGlobalObject().Image as (new () => Img) | undefined
  if (typeof ImageCtor !== 'function') {
    return Promise.reject(new PermanentChannelError('当前环境无法完成统计上报'))
  }
  return new Promise((resolve, reject) => {
    let settled = false
    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      reject(new Error('统计上报超时'))
    }, ms)
    const img = new ImageCtor()
    img.onload = () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve()
    }
    img.onerror = () => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      // 见函数注释：非图片 Content-Type 时浏览器走 onerror，与 HTTP 是否 200 无关。
      resolve()
    }
    img.src = url
  })
}

interface WxPreloadAssetsApi {
  preloadAssets?: (opts: {
    data: Array<{ type: 'image'; src: string }>
    success?: (resp: unknown) => void
    fail?: (err: unknown) => void
    complete?: () => void
  }) => void
}

/**
 * 读取微信基础库 `wx.preloadAssets`（仅 mp-weixin 预加载信标路径使用）。
 */
function getWxPreloadAssets(): WxPreloadAssetsApi['preloadAssets'] | undefined {
  const wx = getGlobalObject().wx as WxPreloadAssetsApi | undefined
  return typeof wx?.preloadAssets === 'function' ? wx.preloadAssets : undefined
}

/**
 * 规范化 `wx.preloadAssets` 的 fail 入参，避免业务侧访问 `err.errMsg` 时 err 为 undefined。
 */
function formatWxPreloadFail(err: unknown): Error {
  if (err instanceof Error) return err
  if (err != null && typeof err === 'object' && 'errMsg' in err) {
    const msg = (err as { errMsg?: unknown }).errMsg
    if (typeof msg === 'string' && msg.length > 0) return new Error(msg)
  }
  if (err == null) return new Error('preloadAssets fail (empty err)')
  return new Error(String(err))
}

/**
 * 微信小程序：`wx.preloadAssets` 拉取 WebTrack.gif URL；**仅 `success` 视为送达**。
 *
 * @param url 完整 WebTrack.gif URL（与 H5 相同）
 * @param ms  超时毫秒
 */
function mpWeixinPreloadAssetsBeaconAwait(
  url: string,
  ms: number
): Promise<void> {
  const preload = getWxPreloadAssets()
  if (!preload) {
    return Promise.reject(
      new PermanentChannelError(
        '当前环境无法完成统计上报（无 wx.preloadAssets）'
      )
    )
  }
  return new Promise((resolve, reject) => {
    let settled = false
    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      reject(new Error('统计上报超时(preloadAssets)'))
    }, ms)
    try {
      preload({
        data: [{ type: 'image', src: url }],
        success: () => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          resolve()
        },
        fail: (err) => {
          if (settled) return
          settled = true
          clearTimeout(timer)
          reject(formatWxPreloadFail(err))
        },
      })
    } catch (e) {
      if (settled) return
      settled = true
      clearTimeout(timer)
      reject(e instanceof Error ? e : new Error(String(e)))
    }
  })
}

/**
 * 是否对当前宿主走 WebTrack.gif GET 信标路径（H5 `Image` 或微信 `preloadAssets`）。
 */
function useGifReportPath(opts: {
  ut?: string
  rawPlatform?: string
  mpWeixinPreloadReport?: boolean
}): boolean {
  if (opts.ut === 'h5') return true
  const enabled =
    opts.mpWeixinPreloadReport ?? MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT
  if (!enabled) return false
  const raw = opts.rawPlatform ?? getRawPlatform()
  return raw === 'mp-weixin'
}

/**
 * 微信小程序是否启用 preload 信标（开关开且宿主为 mp-weixin）。
 */
function isMpWeixinPreloadEnabled(opts: {
  rawPlatform?: string
  mpWeixinPreloadReport?: boolean
}): boolean {
  const enabled =
    opts.mpWeixinPreloadReport ?? MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT
  if (!enabled) return false
  const raw = opts.rawPlatform ?? getRawPlatform()
  return raw === 'mp-weixin'
}

interface ImageChannelOptions {
  /** 上报 host，例如 `https://tongji-collector.dcloud.net.cn`。缺省走 IMAGE_REPORT_DEFAULTS。 */
  host?: string
  /** 火山 TLS 项目 ID。 */
  projectId?: string
  /** 火山 TLS 主题 ID。 */
  topicId?: string
  /**
   * 宿主短码（与 `adapter/platform.getPlatform()` 一致）。
   * **`h5`** 走 WebTrack.gif；**`mp-weixin` + preload 开关** 同 GIF；其余 POST。
   */
  ut?: string
  /** `process.env.UNI_PLATFORM` 原值；用于识别 mp-weixin（`ut` 为 `wx`）。 */
  rawPlatform?: string
  /**
   * 微信小程序是否用 `wx.preloadAssets` 走 GIF 信标。
   * 缺省读 `config.MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT`（默认 true）。
   */
  mpWeixinPreloadReport?: boolean
  /**
   * H5 是否优先使用 `Image` 触发 GET（默认 true，与跨域场景一致）。
   * 设为 `false` 时强制 `uni.request` GET（可读取 HTTP 状态，但可能受跨域策略影响）。
   */
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
  const gifPath = useGifReportPath(opts)
  const mpWeixinPreload = isMpWeixinPreloadEnabled(opts)

  function configured(): boolean {
    return !!(host && projectId && topicId)
  }

  /**
   * H5：校验 GIF URL 长度，返回完整 URL。
   */
  function preflightGif(payload: ReportPayload): string {
    if (!configured()) {
      throw new PermanentChannelError(
        '统计上报未配置：请设置 TLS host、projectId、topicId'
      )
    }
    const url = buildImageReportUrl(payload, {
      host,
      projectId,
      topicId,
      nowMs,
    })
    if (url.length > maxUrlLength) {
      throw new PermanentChannelError(
        '统计上报 URL 过长: ' + url.length + ' > ' + maxUrlLength
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
      throw new PermanentChannelError(
        '统计上报未配置：请设置 TLS host、projectId、topicId'
      )
    }
    const url = buildWebTracksPostUrl(host, projectId, topicId)
    const { json, rawByteSize } = buildWebTracksPostBody(payload)
    return { url, json, rawByteSize }
  }

  /**
   * H5：无 `Image` 或关闭 `preferImageBeacon` 时，用 `uni.request` GET（可读取 HTTP 状态与错误体摘要）。
   */
  function gifGetViaRequest(url: string): Promise<void> {
    const u = getUni()
    if (!u || typeof u.request !== 'function') {
      return Promise.reject(
        new PermanentChannelError('当前环境无法完成统计上报')
      )
    }
    return new Promise((resolve, reject) => {
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        reject(new Error('统计上报超时'))
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
          if (code >= 200 && code < 300) {
            resolve()
            return
          }
          const hint = summarizeHttpErrorBody(res?.data)
          reject(
            new Error(
              hint ? `统计上报 HTTP ${code}: ${hint}` : `统计上报 HTTP ${code}`
            )
          )
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
   * H5：默认 `Image` 触发 GET；否则 `uni.request` GET。
   */
  function onceGif(url: string): Promise<void> {
    const ImageCtor = getGlobalObject().Image as (new () => unknown) | undefined
    const hasImage = typeof ImageCtor === 'function'

    if (preferBeacon && hasImage) {
      return imageBeaconAwait(url, timeoutMs)
    }
    return gifGetViaRequest(url)
  }

  /**
   * 微信：优先 `wx.preloadAssets`；API 不可用时回退 POST（保证旧基础库可上报）。
   */
  async function onceMpWeixin(
    url: string,
    payload: ReportPayload
  ): Promise<void> {
    const preloadFn = getWxPreloadAssets()
    if (mpWeixinPreload && preloadFn) {
      return mpWeixinPreloadAssetsBeaconAwait(url, MP_WEIXIN_PRELOAD_TIMEOUT_MS)
    }
    if (mpWeixinPreload && !preloadFn) {
      logger.warn('[uni-stat] wx.preloadAssets 不可用，回退 POST /WebTracks')
    }
    const { url: postUrl, json, rawByteSize } = preflightPost(payload)
    return oncePost(postUrl, json, rawByteSize)
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
        new PermanentChannelError('当前环境无法完成统计上报')
      )
    }
    return new Promise((resolve, reject) => {
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        reject(new Error('统计上报超时'))
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
          else {
            const hint = summarizeHttpErrorBody(res?.data)
            reject(
              new Error(
                hint
                  ? `统计上报 HTTP ${code}: ${hint}`
                  : `统计上报 HTTP ${code}`
              )
            )
          }
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
      if (gifPath) {
        const raw =
          (maxUrlLength - IMAGE_URL_BASE_OVERHEAD) / IMAGE_ENCODE_RATIO
        return Math.max(512, Math.floor(raw))
      }
      return WEBTRACKS_MAX_REQUEST_BYTES
    },
    async send(payload: ReportPayload): Promise<void> {
      try {
        if (gifPath) {
          const url = preflightGif(payload)
          if (isH5) {
            await withRetry(() => onceGif(url), {
              times: maxRetries,
              baseDelayMs: RETRY_BASE_DELAY_MS,
              sleep: opts.sleep,
            })
          } else {
            await withRetry(() => onceMpWeixin(url, payload), {
              times: maxRetries,
              baseDelayMs: RETRY_BASE_DELAY_MS,
              sleep: opts.sleep,
            })
          }
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
          logger.warn('[uni-stat] 统计上报失败（不可重试）', e)
        } else {
          logger.warn('[uni-stat] 统计上报失败（已重试）', e)
        }
        throw e
      }
    },
  }
}
