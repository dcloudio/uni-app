// 基础设施层 barrel：time/sid/safe/storage/logger/interceptor。
export { nowMs, nowSec, elapsedSec, clampUrlrefStaySec } from './time'
export { safeStringify, tryRun, withRetry } from './safe'
export type { RetryOptions } from './safe'
export { genSid } from './sid'
export { storage } from './storage'
export { logger } from './logger'
export {
  getActionLabel,
  logBoot,
  logCollect,
  logNoChannel,
  logRecoverItem,
  logRecoverStart,
  logReportFailure,
  logReportFailureReason,
  logReportSummary,
  logReportStart,
  logReportSuccess,
} from './debugLog'
export { interceptor } from './interceptor'
export type { InterceptorHandlers } from './interceptor'

export { omitEmptyStringFieldsForUpload } from './omitEmptyStringFields'
