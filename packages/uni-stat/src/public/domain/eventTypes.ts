/**
 * 事件类型与会话创建类型常量。
 *
 * 与私有版 / 文档 `uni统计上报参数.md` 的兼容关系：
 *   - 上行参数文档明确：`lt` 仅取 `1 / 3 / 11 / 21 / 31 / 41`，**没有** `lt=0`。
 *   - 历史架构文档（03-公有版架构设计.md §3.2）曾设计 `lt=0` 作为"客户端 session 边界"事件，
 *     但与服务端入库口径不一致（会话日志 = lt=1），已**整体移除**：
 *     新会话直接发一条 lt=1，会话字段（`sid / cst / fvts / lvts / tvc`）随 lt=1 上行。
 *   - 因此 `LT` 不再包含 `Session`；删除 lt=0 不影响老接收端。
 */

/**
 * Log Type（事件类型）。统一在此声明，禁止其他模块裸写字符串。
 *
 * 注：`lt=41`（uni-app x 原生崩溃日志）暂未在公有版实现，详见 `docs/暂未实现字段说明.md`。
 */
export const LT = {
  Launch: '1',
  Hide: '3',
  Page: '11',
  Event: '21',
  Error: '31',
  Push: '101',
} as const

export type LTValue = (typeof LT)[keyof typeof LT]

/**
 * Create Session Type / Session Create Type（同义）。
 *
 * - `1` 冷启动：进程刚起，第一次创建会话。
 * - `2` 后台超时：从后台返回前台，距离 `bgTs` 超过 `backgroundTimeoutSec`。
 * - `3` 前台无操作超时：在前台一段时间无任何 page/event 触达。
 *
 * 公有版预留 `0` 给"未触发新会话"的零值；不要用 0 覆写 storage，仅作为内部哨兵。
 */
export const CST = {
  ColdLaunch: 1,
  BackgroundTimeout: 2,
  PageInactiveTimeout: 3,
} as const

export type CSTValue = (typeof CST)[keyof typeof CST]

/**
 * 入口页标记。
 *
 * `iey` / `ppiey` 上行字段以 `0/1` 形式表达布尔，与私有版数字风格保持一致。
 */
export const IEY = {
  No: 0,
  Yes: 1,
} as const

export type IEYValue = (typeof IEY)[keyof typeof IEY]

/**
 * 把任意输入归一化为 `IEYValue`。
 *
 * 用于 `domain/entry` 在拼装字段时统一布尔→0/1。`true / 1 / '1'` 均视为 Yes。
 */
export function toIey(input: unknown): IEYValue {
  if (input === true || input === 1 || input === '1') return IEY.Yes
  return IEY.No
}
