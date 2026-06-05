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
 * 与私有版 `pageInfo.js#log` 的 msg_type 对齐。
 * 注：`lt=0` 已废弃（详见 `domain/eventTypes.ts` 头注释），新会话信息直接随 lt=1 上行。
 *
 * 未知 lt 走默认 "未知事件 (lt=X)"，便于排查异常上行。
 */
export function getActionLabel(lt: LTValue | string | undefined): string {
  switch (lt) {
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
 *   [uni统计 2.0] === 统计数据采集：应用启动 (lt=1) ===
 *   [uni统计 2.0] {lt: '1', t: 1714123456, ut: 'h5', ...}
 *   [uni统计 2.0] === 采集结束 ===
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
  /** 后台回前台新会话阈值（秒），对应 manifest `backgroundTimeout`，非 `reportInterval`。 */
  backgroundTimeoutSec?: number
  pageInactiveTimeoutSec?: number
  ak: string
  appName?: string
  debugFromManifest?: boolean
  /** 装配路径摘要：Vue2/Vue3 + manifest/runtime 主版本，便于排查误走 onCreateVueApp。 */
  vueMode?: string
}): void {
  if (!logger.isDebug()) return
  const timeoutParts: string[] = []
  if (info.backgroundTimeoutSec != null) {
    timeoutParts.push(`后台超时(新会话): ${info.backgroundTimeoutSec}s`)
  }
  if (info.pageInactiveTimeoutSec != null) {
    timeoutParts.push(`前台无操作超时: ${info.pageInactiveTimeoutSec}s`)
  }
  const timeoutSeg =
    timeoutParts.length > 0 ? ` | ${timeoutParts.join(' | ')}` : ''
  const lines = [
    '=== uni统计 2.0 已启用 ===',
    `上报间隔: ${info.reportIntervalSec}s${timeoutSeg} | 应用APPID: ${
      info.ak || '<未注入>'
    }${info.appName ? ` | 应用名: ${info.appName}` : ''}${
      info.vueMode ? ` | ${info.vueMode}` : ''
    }`,
  ]
  if (info.debugFromManifest) {
    lines.push('调试模式：已从 manifest.uniStatistics.debug 自动开启')
  }
  lines.push('=== 后续将在每次采集 / 上报时输出过程日志 ===')
  logger.debug(lines.join('\n'))
}

/**
 * 即将上报：取出 batch、选定 channel 后调用。
 *
 * 文案示意：
 *   ```text
 *   // 通道=${info.channel}
 *   [uni统计 2.0] === 准备上报： 共 4 条事件 (lt=1×1, lt=11×2, lt=21×1) [_id=p-xxxx] ===
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
  logger.debug(`=== 准备上报：共 ${total} 条事件 (${summary}) ===`)
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
  logger.debug(
    `=== 上报成功： ${info.count} 条事件已送达, 用时 ${info.elapsedMs}ms ===`
  )
}

/**
 * 上报失败。`persistedId` 不为空表示已落盘 retry，下次冷启会续传。
 *
 * 现状：collector 主路径已改用 `logReportFailureReason` + `logReportSummary` 组合
 * 输出（避免汇总行重复 headline），这里保留完整版以兼容外部直接调用与历史测试。
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
  logger.debug(
    `=== 上报失败： ${info.count} 条事件未送达, 用时 ${info.elapsedMs}ms ===`
  )
  logReportFailureReason({ error: info.error, persistedId: info.persistedId })
}

/**
 * 仅输出失败的"原因 / 重试落盘"细节，不输出 `=== 上报失败 ===` headline。
 *
 * 用于 collector 在切片化发送时**每次失败 send 后立即给出可观察性**：业务方能看到
 * 是哪一批因什么失败、是否进入了重试队列；而最终的"上报失败 / 上报完成（部分失败）"
 * 总览由 `logReportSummary` 统一输出，避免一次失败被打两次 headline。
 */
export function logReportFailureReason(info: {
  error: unknown
  persistedId?: string
}): void {
  if (!logger.isDebug()) return
  logger.debug(`原因: ${describeError(info.error)}`)
  if (info.persistedId) {
    logger.debug(
      `已暂存重试队列 [retryId=${info.persistedId}]，下次启动自动续传`
    )
  } else {
    logger.debug('未能写入重试队列：本批数据已丢弃')
  }
}

/**
 * 单批次上报的最终汇总。
 *
 * 设计原则：**对外只暴露"成功 / 失败"两种结果，不暴露"切片"等内部实现细节**。
 *
 * 切片是 collector 为了适配 image 通道 URL 长度上限 / 全局 batch 字节阈值而做的
 * 内部分批发送策略；业务方关心的只是"这一批数据有没有送达、送达多少、丢失多少"。
 * 因此本汇总以**事件数**（而非片数）为统计维度，文案与单批 `logReportSuccess` /
 * `logReportFailure` 完全对齐——业务方感知不到内部走了几次 send。
 *
 * 三种状态文案：
 *   - 全成功：`=== 上报成功： N 条事件已送达, 用时 Tms ===`（与 logReportSuccess 同）
 *   - 全失败：`=== 上报失败： N 条事件未送达, 用时 Tms ===`（与 logReportFailure 同）
 *   - 部分失败：`=== 上报完成：成功 X 条，失败 Y 条，用时 Tms ===`
 *
 * 失败原因 / 重试落盘 id 等细节由 collector 在每次失败 send 后通过 logReportFailure
 * 输出，本汇总不再重复，避免噪音。
 */
export function logReportSummary(info: {
  channel: string
  okCount: number
  failedCount: number
  elapsedMs: number
}): void {
  if (!logger.isDebug()) return
  if (info.failedCount === 0) {
    logger.debug(
      `=== 上报成功： ${info.okCount} 条事件已送达, 用时 ${info.elapsedMs}ms ===`
    )
  } else if (info.okCount === 0) {
    logger.debug(
      `=== 上报失败： ${info.failedCount} 条事件未送达, 用时 ${info.elapsedMs}ms ===`
    )
  } else {
    logger.debug(
      `=== 上报完成：成功 ${info.okCount} 条，失败 ${info.failedCount} 条，用时 ${info.elapsedMs}ms ===`
    )
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
  // const idTag = info.payloadId ? ` [_id=${info.payloadId}]` : ''
  if (info.ok) {
    logger.debug(`续传成功 (${info.index}/${info.total})`)
  } else {
    logger.debug(
      `续传失败 (${info.index}/${info.total})：${describeError(info.error)}`
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
