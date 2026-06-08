/**
 * 拦截器与 collector 之间的最小契约。
 *
 * 不直接 import collector 类型，避免拦截器 → pipeline 反向依赖（domain/pipeline 间
 * 单向流动：interceptors → collector，由 runtime 注入实例）。
 */

import type { LTValue } from '../domain/eventTypes'

export interface InterceptorReportInput {
  lt: LTValue
  /** 自定义事件 key（lt=21 的 e_n / lt=31 的 em 等）。 */
  custom?: Record<string, unknown>
}

export interface InterceptorReporter {
  report(input: InterceptorReportInput): void
}
