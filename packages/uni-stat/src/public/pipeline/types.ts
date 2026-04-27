/**
 * Pipeline 层共享类型。
 *
 * 单独抽出避免 channel / queue / retry 之间循环 import。
 */

/**
 * 上行 payload。这是真正发到通道的最终结构，与服务端协议 1:1。
 *
 * 字段说明（与私有版兼容）：
 *   - `usv`：统计 SDK 版本（公有版固定 `'3'`）。
 *   - `t`：本批次发送时间戳（秒）。
 *   - `requests`：通过 `serializer.handleData(buckets)` 拼出的 JSON 字符串。
 *
 * 同时携带一个**仅前端用**的 `_id` 字段，便于 retry 层去重；服务端会忽略未知字段。
 */
export interface ReportPayload {
  /** 上行 SDK 版本号。 */
  usv: string
  /** 本批次时间戳（秒）。 */
  t: number
  /** 序列化后的事件数组 JSON 字符串。 */
  requests: string
  /** 仅前端：批次 id，retry 队列里用作幂等键。 */
  _id?: string
}

/** Channel 的统一接口，便于 queue / retry 与具体实现解耦。 */
export interface Channel {
  /**
   * 通道名称：
   *   - `'1.0'`  : 私有版 HTTP（兼容性保留）
   *   - `'2.0'`  : 私有版 uniCloud（兼容性保留）
   *   - `'image'`: 公有版默认通道，火山 TLS WebTrack.gif（GET 图片像素）
   */
  readonly name: '1.0' | '2.0' | 'image'
  /** 是否在当前环境可用（manifest 配置 + API 检查）。 */
  available(): boolean
  /**
   * 发送 payload；resolve 表示**服务端已接收**。
   *
   * 失败一律 reject（通道内部已做"协议层重试"的，仅在最终失败时 reject）。
   * 调用方根据 reject 决定是否走 `retry.persist`。
   */
  send(payload: ReportPayload): Promise<void>
}

/** 通道发送结果，便于内部统一日志。 */
export interface SendResult {
  ok: boolean
  attempts: number
  error?: unknown
}
