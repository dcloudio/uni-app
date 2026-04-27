/**
 * Pipeline 层共享类型。
 *
 * 单独抽出避免 channel / queue / retry 之间循环 import。
 */

/**
 * 上行 payload。这是真正发到通道的最终结构，与服务端协议 1:1。
 *
 * 字段说明（与私有版兼容）：
 *   - `usv`：uni-app 编译器版本号（取自 `process.env.UNI_COMPILER_VERSION`），
 *     与权威参数文档 `docs/uni统计上报参数.md` 示例 `usv: "4.24"` 对齐；
 *     不再硬编码 `'3'`（`'3'` 是 SDK 协议版本，由 `src/plugin/index.ts` 选择入口包，与该字段无关）。
 *   - `t`：本批次发送时间戳（秒）。
 *   - `requests`：通过 `serializer.handleData(buckets)` 拼出的 JSON 字符串。
 *
 * 同时携带一个**仅前端用**的 `_id` 字段，便于 retry 层去重；服务端会忽略未知字段。
 */
export interface ReportPayload {
  /** 上行 SDK 版本号 = uni-app 编译器版本（如 "4.24"）；运行时缺省回退为空串。 */
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
  /**
   * 该通道单批 `payload.requests`（已 `JSON.stringify(events)` 的**原文**字节数）允许的上限。
   *
   * 设计动机：image 通道把 requests 经 `encodeURIComponent` 塞进 GET URL，膨胀比可达 ~2x（中英混排）
   * 甚至 3x（纯中文）。仅按"原文 4KB"切片不能保证 URL ≤ `maxUrlLength`：实测 4KB 原文 → URL 7.5KB > 6KB 上限。
   *
   * 因此各通道**按自身物理约束反推**给出原文上限：
   *   - image：`(maxUrlLength - urlBaseOverhead) / assumedEncodeRatio`
   *   - http / cloud：POST body 不受 URL 限制，但服务端通常有 1MB 上限，可返回较大值或不实现
   *
   * 缺省（`undefined`）→ collector 视为 `Infinity`，仅按全局 `BATCH_REQUESTS_MAX_BYTES` 切片。
   */
  maxRequestBytes?(): number
}

/** 通道发送结果，便于内部统一日志。 */
export interface SendResult {
  ok: boolean
  attempts: number
  error?: unknown
}

/**
 * 永久性通道错误：本次 payload 自身有问题（与网络无关），重试同一份 payload 永远不会过。
 *
 * 典型场景：
 *   - image 通道 GET URL 超过 `maxUrlLength`（例如 81718 > 6144），重发同一份必定再次超长；
 *   - 通道未配置（`image channel not configured`、`http endpoint missing`），换网络也救不了；
 *   - 浏览器内既无 `Image` 全局也没有 `uni.request`：环境本身缺失，重试无意义。
 *
 * 设计意图：
 *   - **不进 channel 内部 `withRetry`**：永久错误一抛立刻冒泡到 collector，避免协议层空转 N 次。
 *   - **不进 retry 队列**：collector 的 `report()` 捕获到 permanent 时跳过 `retry.persist`，
 *     避免下次冷启 `recoverRetry` 反复读出 → 反复失败 → 反复落盘的死循环
 *     （这是 `image url too long` 卡死队列的根因）。
 *   - **死信清理**：`recoverRetry` 重放历史 payload 时若再次拿到 permanent 错误，
 *     直接 `retry.ack(_id)` 删除，不再写回。
 *
 * 错误识别：用 `instanceof PermanentChannelError`。为兼容跨 bundle / 跨上下文（少见但
 * 防御性写法），同时设置 `permanent = true` 标志位，`isPermanentChannelError` 双重判定。
 */
export class PermanentChannelError extends Error {
  /** 兼容跨 bundle 的标志位；与 `instanceof` 任一为真即视为永久错误。 */
  readonly permanent = true
  constructor(message: string) {
    super(message)
    this.name = 'PermanentChannelError'
    // 修复 ts/babel 转译后 prototype 链丢失，导致 instanceof 失效
    Object.setPrototypeOf(this, PermanentChannelError.prototype)
  }
}

/**
 * 类型守卫：判定一个 unknown 错误是否为永久性通道错误。
 *
 * 兼容三种来源：
 *   1. `instanceof PermanentChannelError`（同一 bundle）；
 *   2. `err.name === 'PermanentChannelError'`（跨 bundle 但同名）；
 *   3. `err.permanent === true`（任意错误显式标记）。
 */
export function isPermanentChannelError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false
  if (err instanceof PermanentChannelError) return true
  const e = err as { name?: string; permanent?: unknown }
  if (e.name === 'PermanentChannelError') return true
  if (e.permanent === true) return true
  return false
}
