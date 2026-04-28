/**
 * 上行体瘦身：去掉值为空字符串 `''` 的字段。
 *
 * - **调试日志**：`collector.report` 在瘦身前把完整 `StatData` 交给 `logCollect`，空串字段仍会打印，
 *   便于对照「是真的没采集到」还是「协议口径为空」。
 * - **入队 / 发送**：经本函数后再 `queue.enqueue`，缩短 image GET URL（encode 后的 Logs），
 *   仅减少体积，不改变非空字段语义。
 *
 * 注意：
 *   - 只处理**顶层**键；`StatData` 事件对象为单层 KV。
 *   - 仅剔除 `v === ''`，保留 `0`、`false`、`null`（若上游传入）；当前 builder 不会主动写入 null。
 */

import type { StatData } from '../domain/statData'

/**
 * 返回浅拷贝：值为 `''` 的键不拷贝到结果对象。
 */
export function omitEmptyStringFieldsForUpload(data: StatData): StatData {
  const out: StatData = {}
  for (const key of Object.keys(data)) {
    const v = data[key]
    if (v === '') continue
    out[key] = v
  }
  return out
}
