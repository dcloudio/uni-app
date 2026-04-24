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
/** 重试基础延迟（指数退避）。 */
export const RETRY_BASE_DELAY_MS = 1000

/**
 * uni-app appid。优先取构建期 `process.env.UNI_APP_ID`；未注入时返回 `''`，
 * 由调用方决定是否上报为 `'default'`。
 */
export function getAppId(): string {
  return (process.env as Record<string, string | undefined>).UNI_APP_ID ?? ''
}
