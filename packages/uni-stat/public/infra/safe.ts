/**
 * 安全工具集：序列化、try 包裹、指数退避重试。
 *
 * 修复缺陷：
 *   - #1 `_retry` 未初始化导致重试链路 NaN（公有版直接以参数显式传 `times`）。
 *   - #7 取值反向（私有版 `if (data.length > MAX_LENGTH)` 误判）。
 *   - #8 循环引用导致 `JSON.stringify` 抛错（用 WeakSet replacer 兜底）。
 */

const DEFAULT_MAX_LENGTH = 4096
const TRUNCATED_SUFFIX = '…[truncated]'

/**
 * 序列化任意值为字符串：支持循环引用与最大长度截断。
 *
 * @param value 待序列化的值。`undefined` 返回 ''；string 直接返回（仍参与截断）。
 * @param max   字符串最大长度，默认 4096；超长会截断并附 `…[truncated]`。
 */
export function safeStringify(value: unknown, max = DEFAULT_MAX_LENGTH): string {
  if (value === undefined) return ''
  let raw: string
  if (typeof value === 'string') {
    raw = value
  } else {
    const seen = new WeakSet<object>()
    try {
      raw = JSON.stringify(value, (_key, val: unknown) => {
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val as object)) return '[Circular]'
          seen.add(val as object)
        }
        if (typeof val === 'bigint') return val.toString()
        if (typeof val === 'function') return `[Function ${val.name || 'anonymous'}]`
        return val
      }) ?? ''
    } catch (e) {
      raw = `[Unserializable: ${(e as Error).message}]`
    }
  }
  if (raw.length > max) {
    return raw.slice(0, Math.max(0, max - TRUNCATED_SUFFIX.length)) + TRUNCATED_SUFFIX
  }
  return raw
}

/**
 * 包裹同步函数，捕获任何抛出，返回 fallback。
 *
 * 不打印 console（由调用方按需 `logger.warn`）；保持纯函数风格便于热路径使用。
 */
export function tryRun<T>(fn: () => T, fallback: T): T {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export interface RetryOptions {
  /** 总尝试次数（含首次）；< 1 视为 1。 */
  times: number
  /** 第 n 次失败后等待时间 = `baseDelayMs * 2 ** (n - 1)`，最长建议 < 30s。 */
  baseDelayMs: number
  /** 可选：用于注入 sleep（默认 setTimeout）；测试可传同步实现避免 fake timer。 */
  sleep?: (ms: number) => Promise<void>
}

/**
 * 指数退避重试：失败时按 `baseDelayMs * 2^(n-1)` 等待后重试，全部失败抛出最后一个错误。
 *
 * @example
 *   await withRetry(() => fetch(url), { times: 3, baseDelayMs: 200 })
 *   // 第 1 次失败 → wait 200ms；第 2 次失败 → wait 400ms；第 3 次失败 → throw
 */
export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
  const total = Math.max(1, Math.floor(opts.times))
  const sleep = opts.sleep ?? defaultSleep
  let lastErr: unknown
  for (let attempt = 1; attempt <= total; attempt++) {
    try {
      return await fn()
    } catch (e) {
      lastErr = e
      if (attempt >= total) break
      await sleep(opts.baseDelayMs * 2 ** (attempt - 1))
    }
  }
  throw lastErr
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
