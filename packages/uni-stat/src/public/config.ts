/**
 * 公有版常量与可配置项的集中定义（版本号、URL、超时阈值等）。
 *
 * 该模块只导出**编译期常量**与**默认值**；运行时可变配置走 `runtime/StatApp` 注入。
 */
export const STAT_VERSION_PUBLIC = '3' as const

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
