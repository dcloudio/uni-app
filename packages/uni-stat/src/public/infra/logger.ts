/**
 * 公有版统一日志出口。
 *
 * 修复的私有版缺陷：
 *   - #19 `!!process.env.UNI_STAT_DEBUG` 在构建时若被替换为字符串 `"false"` 仍是 truthy。
 *     公有版严格使用 `=== 'true'` 判定，并允许在运行时通过 `setDebug()` 临时打开
 *     （供调试 / 灰度小流量验证）。
 *
 * 行为约定：
 *   - `debug` 受调试开关控制；其他 level 始终输出到对应的 `console.*`。
 *   - 不强制对对象 `JSON.stringify`（避免吞掉运行时类型信息，方便控制台展开）。
 *
 * 兼容性：
 *   - 历史版本插件 define 误把 `process.env.UNI_STAT_DEBUG` 替换成布尔字面量
 *     （未 `JSON.stringify`），导致 dist 运行时该值为 `true`/`false` 而非 `'true'`/`'false'`。
 *     `isDebug()` 同时接受字符串 `'true'` 与布尔 `true`，避免历史构建产物完全失效。
 */

const TAG = '[uni-stat/public]'

let runtimeDebug: boolean | undefined

/**
 * 当前是否启用 debug 输出。优先级：
 *   1. `setDebug(value)` 显式设置过 → 直接返回。
 *   2. `process.env.UNI_STAT_DEBUG === 'true'` 或被构建期替换为布尔字面量 `true`
 *      （历史插件兼容路径）。
 */
function isDebug(): boolean {
  if (runtimeDebug !== undefined) return runtimeDebug
  const v = process.env.UNI_STAT_DEBUG as unknown
  return v === 'true' || v === true
}

/**
 * 运行时切换 debug 开关；传 `undefined` 恢复为「按 process.env 判断」。
 */
function setDebug(value: boolean | undefined): void {
  runtimeDebug = value
}

export const logger = {
  debug(...args: unknown[]): void {
    if (!isDebug()) return
    // eslint-disable-next-line no-console
    console.log(TAG, ...args)
  },
  info(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.info(TAG, ...args)
  },
  warn(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.warn(TAG, ...args)
  },
  error(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.error(TAG, ...args)
  },
  setDebug,
  isDebug,
}
