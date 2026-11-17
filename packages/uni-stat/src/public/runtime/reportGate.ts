/**
 * 公有版服务端上报门闸。
 *
 * 与旧公有版 `is_report_data` 保持相同语义：
 *   - 首次发送前按 appid 查询服务端 `{ ret, enable }`；
 *   - 查询结果缓存 24 小时；缓存过期时先沿用旧值，并在后台刷新；
 *   - 接口失败、超时或响应非法时 fail-open，默认允许上报。
 *
 * 与旧实现的差异仅在控制流：`enable=0` 明确返回 `false`，不再通过永不结束的
 * Promise 阻塞调用链，避免 collector 的 flush 状态永久悬挂。
 */

import {
  REPORT_CONTROL_CACHE_TTL_MS,
  REPORT_CONTROL_TIMEOUT_MS,
  REPORT_CONTROL_URL,
} from '../config'
import { storage } from '../infra/storage'
import { resolveUniRuntime } from '../infra/uniRuntime'

const REPORT_STATUS_KEY = 'report:control-status'
const REPORT_STATUS_TIME_KEY = 'report:control-checked-at'

type ReportStatus = 0 | 1

interface ReportControlResponse {
  ret?: unknown
  enable?: unknown
}

interface UniRequestApi {
  request?: (opts: {
    url: string
    method?: 'GET'
    data?: Record<string, string>
    timeout?: number
    success?: (res: { statusCode?: number; data?: unknown }) => void
    fail?: (error: unknown) => void
  }) => void
}

export interface ReportGateOptions {
  appId: string
  usv: string
  url?: string
  timeoutMs?: number
  cacheTtlMs?: number
  nowMs?: () => number
  /** 单测注入；生产环境默认读取 uni.request。 */
  request?: NonNullable<UniRequestApi['request']>
}

/** 不同 appid / 控制地址之间不得共享正在进行的请求结果。 */
const refreshing = new Map<string, Promise<boolean>>()

function refreshKey(opts: ReportGateOptions): string {
  return `${opts.url ?? REPORT_CONTROL_URL}\n${opts.appId}\n${opts.usv}`
}

function getRequest(): NonNullable<UniRequestApi['request']> | undefined {
  const raw = resolveUniRuntime()
  const u =
    raw != null && typeof raw === 'object' ? (raw as UniRequestApi) : undefined
  return typeof u?.request === 'function' ? u.request : undefined
}

function normalizeStatus(value: unknown): ReportStatus | undefined {
  if (value === 0 || value === '0') return 0
  if (value === 1 || value === '1') return 1
  return undefined
}

function normalizeTime(value: unknown): number | undefined {
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) && n > 0 ? n : undefined
}

function parseResponse(data: unknown): ReportStatus | undefined {
  let value = data
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value) as unknown
    } catch {
      return undefined
    }
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }
  const response = value as ReportControlResponse
  if (response.ret !== 0) return undefined
  return normalizeStatus(response.enable)
}

function requestStatus(
  opts: ReportGateOptions,
  requestedAt: number
): Promise<ReportStatus | undefined> {
  const request = opts.request ?? getRequest()
  if (!request) return Promise.resolve(undefined)
  const timeoutMs = opts.timeoutMs ?? REPORT_CONTROL_TIMEOUT_MS

  return new Promise((resolve) => {
    let settled = false
    const finish = (status: ReportStatus | undefined): void => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(status)
    }
    const timer = setTimeout(() => finish(undefined), timeoutMs)

    try {
      request({
        url: opts.url ?? REPORT_CONTROL_URL,
        method: 'GET',
        data: {
          usv: opts.usv,
          conf: JSON.stringify({ ak: opts.appId }),
          // 控制接口链路存在按完整 URL 缓存的中间层；固定查询串会在控制台
          // 切换后继续命中旧值。时间戳只用于去缓存，不参与服务端判定。
          t: String(requestedAt),
        },
        timeout: timeoutMs,
        success: (res) => {
          const statusCode = res?.statusCode
          if (
            typeof statusCode === 'number' &&
            (statusCode < 200 || statusCode >= 300)
          ) {
            finish(undefined)
            return
          }
          finish(parseResponse(res?.data))
        },
        fail: () => finish(undefined),
      })
    } catch {
      finish(undefined)
    }
  })
}

function refreshStatus(
  opts: ReportGateOptions,
  checkedAt: number
): Promise<boolean> {
  const key = refreshKey(opts)
  const inFlight = refreshing.get(key)
  if (inFlight) return inFlight
  const current = requestStatus(opts, checkedAt).then((status) => {
    if (status === undefined) return true
    storage.batchSet({
      [REPORT_STATUS_KEY]: status,
      [REPORT_STATUS_TIME_KEY]: checkedAt,
    })
    return status === 1
  })
  refreshing.set(key, current)
  const clear = (): void => {
    if (refreshing.get(key) === current) refreshing.delete(key)
  }
  void current.then(clear, clear)
  return current
}

/**
 * 判断服务端当前是否允许上报。
 *
 * 有缓存时立即使用缓存；缓存超过 24 小时则后台刷新，刷新结果从下一次发送开始生效。
 * 无缓存时等待首次查询完成，确保服务端关闭可以在第一批数据发送前生效。
 */
export async function isReportEnabled(
  opts: ReportGateOptions
): Promise<boolean> {
  const now = (opts.nowMs ?? Date.now)()
  const status = normalizeStatus(storage.get(REPORT_STATUS_KEY))
  const checkedAt = normalizeTime(storage.get(REPORT_STATUS_TIME_KEY))

  if (status === undefined) {
    return refreshStatus(opts, now)
  }

  const ttl = opts.cacheTtlMs ?? REPORT_CONTROL_CACHE_TTL_MS
  if (checkedAt === undefined || now - checkedAt > ttl) {
    void refreshStatus(opts, now)
  }
  return status === 1
}

/** 仅供单测：清理进程内并发请求状态；持久化缓存由 storage 测试夹具清理。 */
export function __resetReportGate(): void {
  refreshing.clear()
}
