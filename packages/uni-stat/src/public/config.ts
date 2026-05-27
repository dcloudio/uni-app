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
 * 注意：这里**不再**硬编码统计实现版本。统计入口由 `src/plugin/index.ts`
 * 的统计类型（`public` / `private`）控制；
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
 * 微信小程序是否用 `wx.preloadAssets` + `WebTrack.gif` GET 上报（与 H5 信标同路径）。
 *
 * - `true`（默认）：仅 `UNI_PLATFORM === 'mp-weixin'` 走 preload；其余小程序仍 POST。
 * - `false`：微信与其它非 H5 宿主统一走 `POST /WebTracks`。
 *
 * 可在 `createImageChannel({ mpWeixinPreloadReport: false })` 覆盖（测试 / 临时回退）。
 */
export const MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT = true

/**
 * 微信 `wx.preloadAssets` 单次等待上限（ms）。
 *
 * 冷启动首包常慢于 10s（DNS/TLS/首连），而 image 通道默认 `timeoutMs=10000` 会先于
 * `success` 触发 SDK 超时；Network 里请求可能已是 200。默认放宽到 30s，POST 仍用 10s。
 */
export const MP_WEIXIN_PRELOAD_TIMEOUT_MS = 30_000

/**
 * 微信小程序 preload 冷启动首包 flush 延迟（ms）。
 *
 * `onLaunch` 入队 lt=1 后，`queue.shouldFlush()` 会因 `lastFlushAt=0` 立即为 true；
 * 若在 App 尚未完成启动时调用 `wx.preloadAssets`，易出现 30s 无 success。延迟后再 flush，
 * 用于验证「启动时机」是否为根因（方案 C）。设为 `0` 则关闭延迟。
 */
export const MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS = 2_000

/**
 * 单条事件序列化后允许的最大字节数。
 *
 * 阈值取舍：
 *   - **仅 H5**：`WebTrack.gif` GET 的 URL 上限约 6KB（见 `docs/image-url-too-long-修复说明.md`）；
 *     扣掉 host / ProjectId / TopicId / Source / Time 等固定 query 后，留给
 *     `Logs=encodeURIComponent(payload.requests)` 约 5.8KB 量级。
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
 * **H5 / 微信 preload 信标** 与 `WebTrack.gif` URL 上限相关：`encodeURIComponent` 保守按 3x 估，
 * 4KB 原文与 collector、`createImageChannel` 的 `maxRequestBytes()` 取 min 后切片。
 * **其它非 H5** 走 `POST /WebTracks`，单批可更大（仍受本常量与 `BATCH_MAX_EVENTS` 约束）；
 * 详见 `docs/火山TLS-WebTracks上报说明.md`。
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
 *   - `projectId / topicId`：日志服务侧的项目 / 主题 ID（当前默认 **正式环境**）
 *
 * 同 host 下双路径（见 `pipeline/channel/image.ts` 与 `docs/火山TLS-WebTracks上报说明.md`）：
 *   - **H5 / 微信（`MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT`）**：`GET …/WebTrack.gif?…`
 *   - **其它非 H5**：`POST …/WebTracks?ProjectId&TopicId`（TLS 文档：`Content-Type: application/json`、
 *     必选头 `x-tls-bodyrawsize`、body `{ Source, Logs }`）
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
  /** 正式环境 */
  projectId: '964f0397-af5d-45bf-99d6-8fb3500d7849',
  topicId: '8563e231-f4cd-4ab0-8870-917e4b04e810',
  // 以下为历史测试环境（已停用，勿删便于回切排查）
  // projectId: '9fad19a2-b7f1-47f5-87ff-8621f545ab61',
  // topicId: '99b55c91-ed80-406e-b205-e9d18aca744d',
}

/**
 * uni-app appid。优先取构建期 `process.env.UNI_APP_ID`；未注入时返回 `''`，
 * 由调用方决定是否上报为 `'default'`。
 */
export function getAppId(): string {
  return (process.env as Record<string, string | undefined>).UNI_APP_ID ?? ''
}
