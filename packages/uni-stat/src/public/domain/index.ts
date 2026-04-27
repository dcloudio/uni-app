/**
 * Domain 层统一出口。
 *
 * 顺序：常量 → 子领域 → 集中拼装 → 迁移。
 *
 * 使用方应**只**通过本 barrel 导入 domain，方便后续重构和 tree-shaking。
 */
export * from './eventTypes'
export * as entry from './entry'
export * as session from './session'
export * as visit from './visit'
export * from './statData'
export * from './migration'
