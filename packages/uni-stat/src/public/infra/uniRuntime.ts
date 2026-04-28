/**
 * 解析 uni-app 运行时根对象 `uni`。
 *
 * - H5 / App：常见为 `globalThis.uni`。
 * - 微信小程序等：多为 Vite/rollup 向**当前模块**注入的标识符 `uni`，
 *   **未必**同步挂到 `globalThis`；仅读 `globalThis.uni` 会导致
 *   `bindLifecycle` / `uni.request` / storage 等全部静默失败。
 *
 * 第二路依赖宿主构建对 `uni` 的注入（与业务页面同一套解析规则），
 * 类型兜底见 `packages/uni-stat/src/uni-global.d.ts`。
 */

/**
 * 返回与业务侧一致的 `uni` 运行时根对象；均不可用时返回 `undefined`。
 */
export function resolveUniRuntime(): unknown {
  const g = globalThis as unknown as { uni?: unknown }
  if (g.uni != null && typeof g.uni === 'object') {
    return g.uni
  }

  // 宿主注入：小程序 vendor 中常见，且不在 globalThis 上
  if (typeof uni !== 'undefined' && uni != null && typeof uni === 'object') {
    return uni
  }

  return undefined
}
