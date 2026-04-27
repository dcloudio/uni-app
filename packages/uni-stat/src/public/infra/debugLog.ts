/**
 * 公有版调试日志：面向业务方的"采集 / 上报"过程日志封装。
 *
 * 与 `logger.debug` 的差异：
 *   - `logger.debug` 是底层 console.log + 闸门；调用点散落，文案随意。
 *   - 本模块提供**统一文案 / 统一格式**的高层包装，覆盖：
 *       1. 采集动作：每个 lt 都有中文动作名 +「采集 → 数据」标记。
 *       2. 上报生命周期：开始 / 成功 / 失败 / 冷启续传。
 *       3. 启动摘要：通道版本、上报间隔、ak 是否就位等。
 *   - 所有 helper 都内嵌 `logger.isDebug()` 判断；非 debug 模式下零开销，
 *     调用方无需再写 `if (logger.isDebug()) ...`。
 *
 * 文案风格参考私有版 `utils/pageInfo.js#log`：直接面向业务调试，**中文**为主，
 * 关键字段（lt / 通道 / 用时 / 错误原因）一目了然。
 *
 * 注意：不在此处吞错；任意 console.log 异常仍会冒泡。运行时调用方需要 `tryRun` 兜底
 * 时自行处理（一般 console.log 不会抛错，故未做包装）。
 */

import { LT, type LTValue } from '../domain/eventTypes'
import { logger } from './logger'
import { safeStringify } from './safe'

import type { StatData } from '../domain/statData'

/**
 * `lt` → 用户友好的中文动作名映射。
 *
 * 与私有版 `pageInfo.js#log` 的 msg_type 对齐，并新增 lt=0（公有版独有的会话创建）。
 *
 * 未知 lt 走默认 "未知事件 (lt=X)"，便于排查异常上行。
 */
export function getActionLabel(lt: LTValue | string | undefined): string {
  switch (lt) {
    case LT.Session:
      return '会话创建'
    case LT.Launch:
      return '应用启动'
    case LT.Hide:
      return '应用进入后台'
    case LT.Page:
      return '页面切换'
    case LT.Event:
      return '事件触发'
    case LT.Error:
      return '应用错误'
    case LT.Push:
      return 'PUSH 设备标识'
    default:
      return `未知事件 (lt=${String(lt ?? '?')})`
  }
}

/**
 * 计算 bucket（`Record<lt, StatData[]>`）内的事件总数。
 *
 * 仅在 debug 路径需要，单独抽出避免与 queue.size() 模块循环依赖。
 */
function bucketSize(bucket: Record<string, StatData[]>): number {
  let n = 0
  for (const lt of Object.keys(bucket)) {
    const arr = bucket[lt]
    if (Array.isArray(arr)) n += arr.length
  }
  return n
}

/**
 * 把 bucket 摘要成 "lt=1×1, lt=11×3, lt=21×2" 形式，方便控制台扫读。
 */
function bucketSummary(bucket: Record<string, StatData[]>): string {
  const parts: string[] = []
  for (const lt of Object.keys(bucket)) {
    const arr = bucket[lt]
    if (Array.isArray(arr) && arr.length > 0) {
      parts.push(`lt=${lt}×${arr.length}`)
    }
  }
  return parts.join(', ') || '<空>'
}

/**
 * 单次事件采集日志。
 *
 * 文案示意：
 *   ```text
 *   [uni-stat/public] === 统计数据采集：应用启动 (lt=1) ===
 *   [uni-stat/public] {lt: '1', t: 1714123456, ut: 'h5', ...}
 *   [uni-stat/public] === 采集结束 ===
 *   ```
 */
export function logCollect(data: StatData): void {
  if (!logger.isDebug()) return
  const lt = (data as unknown as { lt?: string }).lt
  const label = getActionLabel(lt as LTValue)
  logger.debug(`=== 统计数据采集：${label} (lt=${String(lt ?? '?')}) ===`)
  logger.debug(data)
  logger.debug('=== 采集结束 ===')
}

/**
 * 启动 / 配置摘要。`installPublicStat` 装配完毕后调用一次，方便业务方一眼确认接入状态。
 */
export function logBoot(info: {
  channel: string
  reportIntervalSec: number
  ak: string
  appName?: string
  debugFromManifest?: boolean
}): void {
  if (!logger.isDebug()) return
  logger.debug('=== uni 统计公有版（version=3）已启用 ===')
  logger.debug(
    `通道: ${info.channel} | 上报间隔: ${info.reportIntervalSec}s | ak: ${
      info.ak || '<未注入>'
    }${info.appName ? ` | appName: ${info.appName}` : ''}`
  )
  if (info.debugFromManifest) {
    logger.debug('调试模式：已从 manifest.uniStatistics.debug 自动开启')
  }
  logger.debug('=== 后续将在每次采集 / 上报时输出过程日志 ===')
}

/**
 * 即将上报：取出 batch、选定 channel 后调用。
 *
 * 文案示意：
 *   ```text
 *   [uni-stat/public] === 准备上报：通道=image, 共 4 条事件 (lt=1×1, lt=11×2, lt=21×1) [_id=p-xxxx] ===
 *   ```
 */
export function logReportStart(info: {
  channel: string
  bucket: Record<string, StatData[]>
  payloadId?: string
}): void {
  if (!logger.isDebug()) return
  const total = bucketSize(info.bucket)
  const summary = bucketSummary(info.bucket)
  const idTag = info.payloadId ? ` [_id=${info.payloadId}]` : ''
  logger.debug(
    `=== 准备上报：通道=${info.channel}, 共 ${total} 条事件 (${summary})${idTag} ===`
  )
}

/**
 * 上报成功。`elapsedMs` 是从 logReportStart 到 ack 的毫秒数。
 */
export function logReportSuccess(info: {
  channel: string
  count: number
  elapsedMs: number
  payloadId?: string
}): void {
  if (!logger.isDebug()) return
  const idTag = info.payloadId ? ` [_id=${info.payloadId}]` : ''
  logger.debug(
    `=== 上报成功：通道=${info.channel}, ${info.count} 条事件已送达, 用时 ${info.elapsedMs}ms${idTag} ===`
  )
}

/**
 * 上报失败。`persistedId` 不为空表示已落盘 retry，下次冷启会续传。
 */
export function logReportFailure(info: {
  channel: string
  count: number
  elapsedMs: number
  error: unknown
  payloadId?: string
  persistedId?: string
}): void {
  if (!logger.isDebug()) return
  const idTag = info.payloadId ? ` [_id=${info.payloadId}]` : ''
  const errMsg = describeError(info.error)
  logger.debug(
    `=== 上报失败：通道=${info.channel}, ${info.count} 条事件未送达, 用时 ${info.elapsedMs}ms${idTag} ===`
  )
  logger.debug(`原因: ${errMsg}`)
  if (info.persistedId) {
    logger.debug(
      `已暂存重试队列 [retryId=${info.persistedId}]，下次启动自动续传`
    )
  } else {
    logger.debug('未能写入重试队列：本批数据已丢弃')
  }
}

/**
 * 无可用通道：通常是 channelVersion=2 但 uniCloud space 未关联，或 image 配置缺失。
 */
export function logNoChannel(info: {
  bucket: Record<string, StatData[]>
}): void {
  if (!logger.isDebug()) return
  logger.debug(
    `=== 上报跳过：当前无可用通道，已回滚 ${bucketSize(
      info.bucket
    )} 条事件入队 ===`
  )
}

/**
 * 冷启续传：进入 recoverRetry 时调用。
 */
export function logRecoverStart(count: number): void {
  if (!logger.isDebug()) return
  logger.debug(`=== 冷启续传：发现 ${count} 条历史 payload，开始逐条重发 ===`)
}

/**
 * 冷启续传 - 单条结果。
 */
export function logRecoverItem(info: {
  index: number
  total: number
  payloadId?: string
  ok: boolean
  error?: unknown
}): void {
  if (!logger.isDebug()) return
  const idTag = info.payloadId ? ` [_id=${info.payloadId}]` : ''
  if (info.ok) {
    logger.debug(`续传成功 (${info.index}/${info.total})${idTag}`)
  } else {
    logger.debug(
      `续传失败 (${info.index}/${info.total})${idTag}：${describeError(
        info.error
      )}`
    )
  }
}

/**
 * 把 unknown 错误压成可读字符串；保留 message + name，避免业务方在控制台只看到 `[object Object]`。
 */
function describeError(e: unknown): string {
  if (!e) return '<无错误对象>'
  if (e instanceof Error) {
    return `${e.name}: ${e.message}`
  }
  if (typeof e === 'string') return e
  return safeStringify(e) || String(e)
}
