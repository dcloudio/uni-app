/**
 * Pipeline 层桶文件。仅 re-export，不在此处放任何业务逻辑。
 */
export * from './types'
export * from './serializer'
export * from './channel'
export * as queue from './queue'
export * as retry from './retry'
export { createCollector } from './collector'
export type { CollectorAPI, CollectorDeps, ReportInput } from './collector'
