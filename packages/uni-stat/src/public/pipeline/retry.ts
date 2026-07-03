/**
 * 失败重试落盘队列。
 *
 * 设计动机：
 *   - 私有版仅在 1.0 通道内做了 3 次内存级重试；进程被杀（应用退出 / kill）后所有
 *     未上报数据**直接丢失**，且 2.0 通道根本没有重试。
 *   - 公有版引入"内存重试 + 失败落盘 + 下次冷启重放"双层兜底：
 *       通道层：`channel.send` 内部已用 `withRetry` 做协议层重试。
 *       本模块：协议层最终失败后调用 `persist(payload)` 写入 storage；
 *               冷启时调 `loadAll()` 取出，逐条尝试重放，成功后 `ack(_id)` 删除。
 *
 * 数据结构：
 *   `UNI_STAT_DATA:<appid>:retry:queue`：`Array<RetryItem>`，最多 `maxItems` 条；
 *   超容时按 FIFO 丢弃最旧条目。每条带创建时间戳，超过 `maxAgeMs` 的过期清理。
 *
 * 与 retry 队列只存"已序列化的 ReportPayload"——不再依赖 collector / domain，
 * 由调用方负责重组业务字段（如重试时不需要再次重算 visit/session）。
 */

import { RETRY_MAX_ATTEMPTS } from '../config'
import { storage } from '../infra/storage'
import { logger } from '../infra/logger'
import { nowMs } from '../infra/time'

import type { ReportPayload } from './types'

const STORAGE_KEY = 'retry:queue'
const DEFAULT_MAX_ITEMS = 50
const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000
const DEFAULT_MAX_ATTEMPTS = RETRY_MAX_ATTEMPTS

interface RetryItem {
  id: string
  payload: ReportPayload
  createdAt: number
  attempts: number
}

interface RetryConfig {
  maxItems: number
  maxAgeMs: number
  /** 单条 payload 允许的最大重放次数；超过自动死信清理（在 markAttempt 内 ack）。 */
  maxAttempts: number
}

const config: RetryConfig = {
  maxItems: DEFAULT_MAX_ITEMS,
  maxAgeMs: DEFAULT_MAX_AGE_MS,
  maxAttempts: DEFAULT_MAX_ATTEMPTS,
}

/**
 * 配置上限。运行时由 runtime 注入；未配置时走默认值。
 */
export function configure(opts: Partial<RetryConfig>): void {
  if (typeof opts.maxItems === 'number' && opts.maxItems > 0) {
    config.maxItems = Math.floor(opts.maxItems)
  }
  if (typeof opts.maxAgeMs === 'number' && opts.maxAgeMs > 0) {
    config.maxAgeMs = Math.floor(opts.maxAgeMs)
  }
  if (typeof opts.maxAttempts === 'number' && opts.maxAttempts > 0) {
    config.maxAttempts = Math.floor(opts.maxAttempts)
  }
}

/**
 * 读取队列。出现异常或非数组时返回空数组（不影响主流程）。
 */
function readQueue(): RetryItem[] {
  const raw = storage.safeRead<RetryItem[]>(STORAGE_KEY)
  if (!raw.ok || !Array.isArray(raw.value)) return []
  return raw.value.filter(
    (it) =>
      it &&
      typeof it.id === 'string' &&
      it.payload &&
      typeof it.payload === 'object'
  )
}

/**
 * 写回队列。空数组时直接 remove，避免存储垃圾。
 */
function writeQueue(items: RetryItem[]): void {
  if (items.length === 0) {
    storage.remove(STORAGE_KEY)
    return
  }
  storage.set(STORAGE_KEY, items)
}

/**
 * 生成 retry item id。优先复用 payload._id（来自 queue 出栈时分配的批次 id）。
 */
function genId(payload: ReportPayload): string {
  if (payload._id) return payload._id
  return (
    'r-' + nowMs().toString(36) + '-' + Math.random().toString(36).slice(2, 6)
  )
}

/**
 * 持久化一条失败 payload。
 *
 * @param payload 协议层最终失败的 payload。
 * @returns 实际写入的 retry id；若被丢弃返回 undefined。
 */
export function persist(payload: ReportPayload): string | undefined {
  if (!payload) return undefined
  const id = genId(payload)
  const items = readQueue()
  if (items.some((it) => it.id === id)) {
    return id
  }
  const item: RetryItem = {
    id,
    payload: Object.assign({}, payload, { _id: id }),
    createdAt: nowMs(),
    attempts: 0,
  }
  items.push(item)
  while (items.length > config.maxItems) {
    const dropped = items.shift()
    logger.warn('[uni统计 2.0] retry queue overflow, drop oldest', dropped?.id)
  }
  writeQueue(items)
  return id
}

/**
 * 取出全部待重试条目（同时清理过期项），按入队顺序返回。
 *
 * 调用方应自行决定是否串行重放；本模块**不**自动触发任何网络。
 */
export function loadAll(): ReportPayload[] {
  const items = readQueue()
  if (items.length === 0) return []
  const cutoff = nowMs() - config.maxAgeMs
  const alive: RetryItem[] = []
  for (const it of items) {
    if (it.createdAt < cutoff) {
      logger.warn('[uni统计 2.0] retry item expired, drop', it.id)
      continue
    }
    alive.push(it)
  }
  if (alive.length !== items.length) writeQueue(alive)
  return alive.map((it) => it.payload)
}

/**
 * 重放成功后删除指定 id；id 不存在视为 no-op。
 */
export function ack(id: string): void {
  if (!id) return
  const items = readQueue()
  const next = items.filter((it) => it.id !== id)
  if (next.length === items.length) return
  writeQueue(next)
}

/**
 * 标记一次重放失败：累加 `attempts`，超过 `config.maxAttempts` 自动死信清理。
 *
 * 死信清理动机：`recoverRetry` 串行重放，永久错误（脏 payload / 历史协议数据）若不
 * 主动丢弃，会反复占据队列前部，把后续健康 payload 也拖到失败 —— 这是 image url too
 * long 看似"重试无穷大"的次因。本兜底与"过期清理（maxAgeMs）+ 容量裁剪（maxItems）"
 * 形成三道防线。
 */
export function markAttempt(id: string): void {
  if (!id) return
  const items = readQueue()
  let nextItems: RetryItem[] | null = null
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    if (it.id !== id) continue
    it.attempts++
    if (it.attempts >= config.maxAttempts) {
      logger.warn(
        '[uni统计 2.0] retry item exceeded maxAttempts, drop as dead letter',
        id,
        'attempts=' + it.attempts
      )
      nextItems = items.slice(0, i).concat(items.slice(i + 1))
    } else {
      nextItems = items
    }
    break
  }
  if (nextItems) writeQueue(nextItems)
}

/**
 * 仅供单测：读取当前 maxAttempts 配置。
 */
export function __getMaxAttempts(): number {
  return config.maxAttempts
}

/**
 * 当前队列长度（含未过期与过期项；过期清理仅在 `loadAll` 时发生）。
 */
export function size(): number {
  return readQueue().length
}

/**
 * 仅供单测：清空 retry 队列与配置回到默认值。
 */
export function __reset(): void {
  storage.remove(STORAGE_KEY)
  config.maxItems = DEFAULT_MAX_ITEMS
  config.maxAgeMs = DEFAULT_MAX_AGE_MS
  config.maxAttempts = DEFAULT_MAX_ATTEMPTS
}
