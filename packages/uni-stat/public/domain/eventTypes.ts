/**
 * 事件类型与会话创建类型常量。
 *
 * 与私有版的兼容关系：
 *   - 私有版 `lt` 字段是 string；公有版保持 string，避免上行协议变更。
 *   - 公有版**新增** `lt='0'`（客户端会话创建）；老接收端忽略未知字段。
 *   - `cst` 与 `sct` 数值一致：cst 用于"本次启动事件"瞬时标识；
 *     sct 写入 storage 与 session 一同常驻，用于会话维度归因。
 */

/**
 * Log Type（事件类型）。统一在此声明，禁止其他模块裸写字符串。
 */
export const LT = {
  /** 客户端会话创建（公有版新增）。与 `Launch` 配对发送，先发 Session 再发 Launch。 */
  Session: '0',
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
