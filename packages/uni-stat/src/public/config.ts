/**
 * 公有版常量与可配置项的集中定义（版本号、URL、超时阈值等）。
 *
 * 该模块只导出**编译期常量**与**默认值**；运行时可变配置走 `runtime/StatApp` 注入。
 */
/**
 * 上行字段 `usv` 取值：**uni-app 编译器版本号**（与权威参数文档
 * `docs/uni统计上报参数.md` 中 `usv: "4.24"` 示例对齐）。
 *
 * 与私有版 `src/config.ts` 保持同源做法：直接读 `process.env.UNI_COMPILER_VERSION`，
 * 由 uni-cli 在用户应用打包阶段通过 vite `define` 替换成字面量字符串；
 * 运行时取不到时回退为空串，避免拼到 URL 时变成 `undefined`。
 *
 * 注意：这里**不再**硬编码 `'3'`。`'3'` 是统计 SDK 协议版本（用于私有版 1/2/3
 * 三套实现的入口分发），由 `src/plugin/index.ts` 的 `statVersion` 控制；
 * 与 `usv` 字段无关。
 */
export const STAT_VERSION_PUBLIC: string =
  process.env.UNI_COMPILER_VERSION || ''

/** 1.0 通道（HTTP）默认上报地址。 */
export const STAT_URL = 'https://tongji.dcloud.io/uni/stat'
/** H5 image 兜底通道（绕过跨域）。 */
export const STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif'

/** 默认上报间隔（秒）。queue 节流阈值。 */
export const REPORT_INTERVAL_SEC = 10
/** HTTP 协议层最大重试次数（含首次）。 */
export const HTTP_MAX_RETRIES = 3
/** Cloud 协议层最大重试次数（含首次）。 */
export const CLOUD_MAX_RETRIES = 2
/** Image 协议层最大重试次数（含首次）。 */
export const IMAGE_MAX_RETRIES = 2
/** 重试基础延迟（指数退避）。 */
export const RETRY_BASE_DELAY_MS = 1000

/**
 * 单条事件序列化后允许的最大字节数。
 *
 * 阈值取舍：
 *   - 6KB 是 image GET URL 上限（火山 TLS WebTrack）；扣掉 host / ProjectId / TopicId /
 *     Source / Time 等固定 query 约 200B，留给 `Logs=encodeURIComponent(payload.requests)`
 *     大约 5800B。
 *   - `encodeURIComponent` 对纯 ASCII 膨胀 ~1.05x，对中英混排 ~1.5–2x，对纯中文最坏 3x。
 *   - 取 **4KB 作为单条事件上限**：保证 ASCII 场景（含大段 Error stack）能放进单批；
 *     纯中文极端场景下，由 `chunkEvents` 单条独占一片 + image preflight 在 URL 编码后
 *     再做一次 6144 字节硬截断兜底。
 *   - 业务错误 stack 通常 ~1–3KB，4KB 足够；超 4KB 的单条多半是 base64 图片 / 大段 JSON
 *     这类**应该被业务自身收敛**的场景，直接丢弃并 warn 比静默卡死管道更安全。
 *
 * 超过本阈值的单条事件直接在 `queue.enqueue()` 内丢弃并 warn —— 不入桶、不持久化、
 * 不进入重试队列，避免 81KB 这种"任何 batch 切多细都过不了"的死信卡死管道。
 *
 * 参考排错文档：`docs/image-url-too-long-修复说明.md`。
 */
export const SINGLE_EVENT_MAX_BYTES = 4 * 1024

/**
 * 单批 `requests`（已 `JSON.stringify(events)`）允许的最大字节数。
 *
 * 与 `IMAGE_REPORT_DEFAULTS` 的 6KB URL 上限对应：`encodeURIComponent` 保守按 3x
 * 膨胀比估，4KB 原文恰好对应 ~12KB encoded —— 但中文场景多见 ASCII，实际膨胀 ~1.2x，
 * 留 25% buffer 后取 4KB 作为切片阈值。超阈值时 collector flush 会按事件数 + 字节数
 * 双阈值切多个 ReportPayload，逐个发送。
 */
export const BATCH_REQUESTS_MAX_BYTES = 4 * 1024

/** 单批最多容纳的事件数；与字节阈值取 min 作为切片边界。 */
export const BATCH_MAX_EVENTS = 30

/**
 * 单条 retry 队列条目允许的最大重放次数。
 *
 * 设置原因：`recoverRetry` 每次冷启串行重放历史 payload，对永久错误（例如曾经误塞入
 * 队列的超长 payload、协议早期版本的脏数据）只会反复 fail，永远卡在队列前部把后续
 * 健康 payload 也拖死。超过本阈值后由 `markAttempt` 自动 ack 删除（死信清理）。
 */
export const RETRY_MAX_ATTEMPTS = 5

/**
 * 公有版默认 image 通道（火山引擎 TLS WebTrack）。
 *
 * ⚠️ **内部参数，不对外暴露**：这三个参数是统计后端的接入凭证，由 SDK 维护者在迁移
 * 后端 / 切换 region / 轮换租户时**直接修改本文件**，业务方**不要**通过 `manifest.json`
 * 或运行时 API 改写它们。
 *
 *   - `host`：日志服务对接的 region 域名（火山 TLS 接入点）
 *   - `projectId / topicId`：日志服务侧的项目 / 主题 ID
 *
 * 内部测试场景仍可通过 `createImageChannel({host, projectId, topicId})` 直接覆盖
 * （参见 `pipeline/channel/image.ts`），但**不会**走 `manifest` / `installPublicStat`。
 */
export interface ImageReportDefaults {
  host: string
  projectId: string
  topicId: string
}

export const IMAGE_REPORT_DEFAULTS: ImageReportDefaults = {
  host: 'https://tls-cn-beijing.volces.com',
  projectId: '9fad19a2-b7f1-47f5-87ff-8621f545ab61',
  topicId: '99b55c91-ed80-406e-b205-e9d18aca744d',
}

/**
 * uni-app appid。优先取构建期 `process.env.UNI_APP_ID`；未注入时返回 `''`，
 * 由调用方决定是否上报为 `'default'`。
 */
export function getAppId(): string {
  return (process.env as Record<string, string | undefined>).UNI_APP_ID ?? ''
}
