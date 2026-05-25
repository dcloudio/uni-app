/**
 * 事件入队 + 批量 flush，修复私有版缺陷 #3。
 *
 * 私有版 `report.js#request` 的入队逻辑：
 *   ```
 *   uniStatData = dbGet(KEY) || {}
 *   uniStatData[lt].push(data)
 *   dbSet(KEY, uniStatData)         // <-- 写
 *   ...
 *   const stat_data = handle_data(uniStatData)
 *   dbRemove(KEY)                   // <-- 删，但不是原子的
 *   sendRequest(...)
 *   ```
 *
 * 缺陷 #3：在 `dbSet` 与 `dbRemove` 之间，若有并发的 `request()` 调用执行
 * `dbGet → push → dbSet`，最后的 `dbRemove` 会**误删**这一批新数据。
 *
 * 公有版修复策略：
 *   - 入队全部走"内存桶 + 持久化镜像"双写；持久化只为冷启续传准备。
 *   - flush() 走一次"原子 swap"：把当前桶交换给空对象，立刻清持久化镜像；
 *     在 swap 之后插入的新事件落到新桶，绝不被 flush 误删。
 *   - flush() 仅返回快照，**不直接发送**：发送由 collector 负责，便于解耦
 *     单测与运行时（collector 不需要 mock 通道）。
 *
 * 数据形态：
 *   - bucket: `Record<lt, StatData[]>`，与私有版 `uniStatData` 兼容。
 *   - 持久化 key：`UNI_STAT_DATA:<appid>:queue`。
 */

import { REPORT_INTERVAL_SEC, SINGLE_EVENT_MAX_BYTES } from '../config'
import { logger } from '../infra/logger'
import { nowMs } from '../infra/time'
import { storage } from '../infra/storage'

import type { StatData } from '../domain/statData'

const STORAGE_KEY = 'queue'
const DEFAULT_SINGLE_EVENT_MAX_BYTES = SINGLE_EVENT_MAX_BYTES

/** 入队桶：与私有版 uniStatData 同形。 */
export type Bucket = Record<string, StatData[]>

interface QueueState {
  bucket: Bucket
  /** 上次 flush 的时间戳（ms），用于 shouldFlush 节流判断。 */
  lastFlushAt: number
}

const state: QueueState = {
  bucket: {},
  lastFlushAt: 0,
}

let intervalSec = REPORT_INTERVAL_SEC
let singleEventMaxBytes = DEFAULT_SINGLE_EVENT_MAX_BYTES
let restored = false

/**
 * 配置上报间隔；运行时可在 runtime/StatApp 初始化时注入。
 */
export function configure(opts: {
  intervalSec?: number
  singleEventMaxBytes?: number
}): void {
  if (typeof opts.intervalSec === 'number' && opts.intervalSec >= 0) {
    intervalSec = Math.floor(opts.intervalSec)
  }
  if (
    typeof opts.singleEventMaxBytes === 'number' &&
    opts.singleEventMaxBytes > 0
  ) {
    singleEventMaxBytes = Math.floor(opts.singleEventMaxBytes)
  }
}

/**
 * 持久化当前内存桶。失败仅打日志，不影响主流程。
 */
function persistBucket(): void {
  if (Object.keys(state.bucket).length === 0) {
    storage.remove(STORAGE_KEY)
    return
  }
  try {
    storage.set(STORAGE_KEY, state.bucket)
  } catch (e) {
    logger.warn('[uni-stat] queue persist failed', e)
  }
}

/**
 * 冷启时尝试从 storage 恢复上一次进程未上报的桶；只在第一次入队前执行一次。
 *
 * 若 storage 中存在合法的桶数据，与当前内存桶**合并**而不是覆盖（合并语义防止极端
 * 边界场景下丢失冷启已入队的事件）。
 */
function restoreOnce(): void {
  if (restored) return
  restored = true
  const raw = storage.safeRead<Bucket>(STORAGE_KEY)
  if (!raw.ok || !raw.value || typeof raw.value !== 'object') return
  const persisted = raw.value
  for (const lt of Object.keys(persisted)) {
    const arr = persisted[lt]
    if (!Array.isArray(arr) || arr.length === 0) continue
    if (!state.bucket[lt]) state.bucket[lt] = []
    state.bucket[lt].push(...arr)
  }
}

/**
 * 把一条事件入队到对应 lt 的桶。
 *
 * 不抛错；data.lt 必填，缺失/类型异常时打日志丢弃。
 *
 * 单条体积保护：序列化后超过 `singleEventMaxBytes`（默认 2KB）的事件直接丢弃 ——
 * 进了桶最终一定打不出去（无论怎么切片都会顶满 GET URL），还会污染 retry 队列。
 * 典型源头：业务方在 `key/value` 里塞了 base64 图片 / 大段 JSON / 长 stack 等。
 */
export function enqueue(data: StatData): void {
  if (!data || typeof data !== 'object') return
  const lt = String(data.lt ?? '')
  if (!lt) {
    logger.warn('[uni-stat] enqueue dropped: missing lt', data)
    return
  }
  let serialized = ''
  try {
    serialized = JSON.stringify(data)
  } catch (e) {
    logger.warn('[uni-stat] enqueue dropped: stringify failed', e)
    return
  }
  if (serialized.length > singleEventMaxBytes) {
    logger.warn(
      '[uni-stat] enqueue dropped: single event too large',
      'lt=' + lt,
      'bytes=' + serialized.length,
      'limit=' + singleEventMaxBytes
    )
    return
  }
  restoreOnce()
  if (!state.bucket[lt]) state.bucket[lt] = []
  state.bucket[lt].push(data)
  persistBucket()
}

/**
 * 是否到达 flush 阈值。
 *
 * @param force 如为 true 直接返回 true（用于 onAppHide / 错误兜底等场景）。
 */
export function shouldFlush(force = false): boolean {
  if (force) return true
  if (intervalSec <= 0) return true
  const elapsedSec = (nowMs() - state.lastFlushAt) / 1000
  return elapsedSec >= intervalSec
}

/**
 * 原子取出当前桶并清空（修复缺陷 #3）。
 *
 * 调用时机：由 collector 决定（间隔触发 / app hide / 强制刷新）。
 *
 * @returns 取出的桶；若空桶返回 undefined（调用方据此跳过本次发送）。
 */
export function flush(): Bucket | undefined {
  restoreOnce()
  const lts = Object.keys(state.bucket)
  if (lts.length === 0) return undefined
  const snapshot = state.bucket
  state.bucket = {}
  state.lastFlushAt = nowMs()
  storage.remove(STORAGE_KEY)
  return snapshot
}

/**
 * 发送失败回滚：把 flush 取出的快照重新合并回当前桶，等待下一次 flush。
 *
 * 注意：合并时插入到桶的"前面"，保留 FIFO 语义。
 */
export function rollback(snapshot: Bucket): void {
  if (!snapshot) return
  for (const lt of Object.keys(snapshot)) {
    const arr = snapshot[lt]
    if (!Array.isArray(arr) || arr.length === 0) continue
    if (!state.bucket[lt]) state.bucket[lt] = []
    state.bucket[lt] = arr.concat(state.bucket[lt])
  }
  persistBucket()
}

/**
 * 当前桶内事件总数（按 lt 加总）。
 */
export function size(): number {
  let n = 0
  for (const lt of Object.keys(state.bucket)) {
    n += state.bucket[lt].length
  }
  return n
}

/**
 * 仅供单测：把模块状态恢复到"刚加载"的样子。
 */
export function __reset(): void {
  state.bucket = {}
  state.lastFlushAt = 0
  intervalSec = REPORT_INTERVAL_SEC
  singleEventMaxBytes = DEFAULT_SINGLE_EVENT_MAX_BYTES
  restored = false
  storage.remove(STORAGE_KEY)
}
