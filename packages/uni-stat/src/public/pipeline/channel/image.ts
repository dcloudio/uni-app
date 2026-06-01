/**
 * 公有版默认通道：火山 TLS Web 采集。
 *
 * **官方 GET**（`uni.request`，App / 小程序 / H5·微信回退）：
 *   `GET ${host}/WebTrack?ProjectId&TopicId&Logs&Source&Time&…`
 *   与文档 `curl GET 'http://${host}/WebTrack?ProjectId=…&TopicId=…&key=val'` 一致。
 *
 * **信标 GET**（仅 H5 `Image`、微信 `preloadAssets`）：
 *   `GET ${host}/WebTrack.gif?…`（query 与 `/WebTrack` 相同，路径为 1×1 像素接口）。
 *
 * **已废弃 POST**：`POST ${host}/WebTracks?ProjectId&TopicId` + JSON body。
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

/** 官方 GET 接口路径（`uni.request`）。 */
const WEBTRACK_API_PATH = '/WebTrack'

/** 浏览器 / 微信 preload 信标路径。 */
const WEBTRACK_BEACON_PATH = '/WebTrack.gif'

interface UniRequestApi {
  request?: (opts: {
    url: string
    method?: 'GET'
    timeout?: number
    success?: (res: { statusCode?: number; data?: unknown }) => void
    fail?: (e: unknown) => void
  }) => void
}

/**
 * 解析运行时 `uni.request` API。
 */
function getUni(): UniRequestApi | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniRequestApi) : undefined
}

/** URL 中除 `Logs` 外的固定 query 字节预算（保守值）。 */
const REPORT_URL_BASE_OVERHEAD = 256

/** `encodeURIComponent` 字节膨胀比上界（用于 collector 切片反推）。 */
const REPORT_ENCODE_RATIO = 3.0

/**
 * 拼装统计上报 query（ProjectId / TopicId / Logs / Source / Time）。
 *
 * @param payload 上报 payload；`requests` 为 `JSON.stringify(events)`。
 * @param opts    host / projectId / topicId / path / nowMs。
 */
function buildStatReportUrl(
  payload: ReportPayload,
  opts: {
    host: string
    projectId: string
    topicId: string
    path: string
    nowMs?: () => number
  }
): string {
  const t = (opts.nowMs ?? (() => Date.now()))()
  const logs = encodeURIComponent(payload.requests)
  const host = opts.host.replace(/\/+$/, '')
  return (
    host +
    opts.path +
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
 * 官方 GET URL（`/WebTrack`）。供 `uni.request` 使用。
 */
export function buildWebTrackGetUrl(
  payload: ReportPayload,
  opts: {
    host: string
    projectId: string
    topicId: string
    nowMs?: () => number
  }
): string {
  return buildStatReportUrl(payload, {
    host: opts.host,
    projectId: opts.projectId,
    topicId: opts.topicId,
    nowMs: opts.nowMs,
    path: WEBTRACK_API_PATH,
  })
}

/**
 * 信标 URL（`/WebTrack.gif`）。供 H5 `Image`、微信 `preloadAssets` 使用。
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
  return buildStatReportUrl(payload, {
    host: opts.host,
    projectId: opts.projectId,
    topicId: opts.topicId,
    nowMs: opts.nowMs,
    path: WEBTRACK_BEACON_PATH,
  })
}

/**
 * 将 `uni.request` 返回的 `data` 压成短串，便于在 Error.message 中展示。
 *
 * @param data   success 回调中的 `res.data`
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
 * H5：`Image` 触发 `/WebTrack.gif`；`onload` / `onerror` 均 resolve，仅超时 reject。
 *
 * @param url 完整信标 URL
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
 * 读取微信 `wx.preloadAssets`（仅 mp-weixin 信标使用）。
 */
function getWxPreloadAssets(): WxPreloadAssetsApi['preloadAssets'] | undefined {
  const wx = getGlobalObject().wx as WxPreloadAssetsApi | undefined
  return typeof wx?.preloadAssets === 'function' ? wx.preloadAssets : undefined
}

/**
 * 规范化 `wx.preloadAssets` 的 fail 入参。
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
 * 微信：`wx.preloadAssets` 拉取 `/WebTrack.gif`；仅 `success` 视为送达。
 *
 * @param url     完整信标 URL
 * @param ms      超时毫秒
 * @param preload 已校验存在的 `wx.preloadAssets`
 */
function mpWeixinPreloadAssetsBeaconAwait(
  url: string,
  ms: number,
  preload: NonNullable<WxPreloadAssetsApi['preloadAssets']>
): Promise<void> {
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
  host?: string
  projectId?: string
  topicId?: string
  ut?: string
  rawPlatform?: string
  mpWeixinPreloadReport?: boolean
  preferImageBeacon?: boolean
  timeoutMs?: number
  sleep?: (ms: number) => Promise<void>
  maxRetries?: number
  maxUrlLength?: number
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
  const mpWeixinPreload = isMpWeixinPreloadEnabled(opts)

  function configured(): boolean {
    return !!(host && projectId && topicId)
  }

  const reportOpts = { host, projectId, topicId, nowMs }

  /**
   * 校验配置并拼装 URL；超长抛 `PermanentChannelError`。
   *
   * @param payload 批次数据
   * @param path    `WEBTRACK_API_PATH` 或 `WEBTRACK_BEACON_PATH`
   */
  function preflightUrl(payload: ReportPayload, path: string): string {
    if (!configured()) {
      throw new PermanentChannelError(
        '统计上报未配置：请设置 TLS host、projectId、topicId'
      )
    }
    const url = buildStatReportUrl(payload, {
      host: reportOpts.host,
      projectId: reportOpts.projectId,
      topicId: reportOpts.topicId,
      nowMs: reportOpts.nowMs,
      path,
    })
    if (url.length > maxUrlLength) {
      throw new PermanentChannelError(
        '统计上报 URL 过长: ' + url.length + ' > ' + maxUrlLength
      )
    }
    return url
  }

  /**
   * `uni.request` GET `/WebTrack`（官方普通 GET，非信标）。
   */
  function webTrackGetViaRequest(url: string): Promise<void> {
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
   * H5：默认 `/WebTrack.gif` 信标；否则 `uni.request` GET `/WebTrack`。
   */
  function onceH5(payload: ReportPayload): Promise<void> {
    const ImageCtor = getGlobalObject().Image as (new () => unknown) | undefined
    if (preferBeacon && typeof ImageCtor === 'function') {
      return imageBeaconAwait(
        preflightUrl(payload, WEBTRACK_BEACON_PATH),
        timeoutMs
      )
    }
    return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH))
  }

  /**
   * 微信：优先 `/WebTrack.gif` preload；否则 `uni.request` GET `/WebTrack`。
   */
  function onceMpWeixin(payload: ReportPayload): Promise<void> {
    const preloadFn = getWxPreloadAssets()
    if (preloadFn) {
      return mpWeixinPreloadAssetsBeaconAwait(
        preflightUrl(payload, WEBTRACK_BEACON_PATH),
        MP_WEIXIN_PRELOAD_TIMEOUT_MS,
        preloadFn
      )
    }
    logger.warn(
      '[uni-stat] wx.preloadAssets 不可用，回退 uni.request GET /WebTrack'
    )
    return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH))
  }

  /**
   * 按宿主选择发送方式。
   */
  function dispatchReport(payload: ReportPayload): Promise<void> {
    if (isH5) return onceH5(payload)
    if (mpWeixinPreload) return onceMpWeixin(payload)
    return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH))
  }

  return {
    name: 'image',
    available(): boolean {
      return configured()
    },
    maxRequestBytes(): number {
      const raw =
        (maxUrlLength - REPORT_URL_BASE_OVERHEAD) / REPORT_ENCODE_RATIO
      return Math.max(512, Math.floor(raw))
    },
    async send(payload: ReportPayload): Promise<void> {
      try {
        await withRetry(() => dispatchReport(payload), {
          times: maxRetries,
          baseDelayMs: RETRY_BASE_DELAY_MS,
          sleep: opts.sleep,
        })
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
