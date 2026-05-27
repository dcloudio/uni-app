/**
 * 解析 uni-app 运行时根对象 `uni`。
 *
 * - H5 / App：常见为 `globalThis.uni`。
 * - 微信小程序等：多为 Vite/rollup 向**当前模块**注入的标识符 `uni`，
 *   **未必**同步挂到 `globalThis`；仅读 `globalThis.uni` 会导致
 *   `bindLifecycle` / `uni.request` / storage 等全部静默失败。
 * - 支付宝等旧版小程序：**无 `globalThis` 标识符**，须用 `getGlobalObject()` 兜底。
 *
 * 第二路依赖宿主构建对 `uni` 的注入（与业务页面同一套解析规则），
 * 类型兜底见 `packages/uni-stat/src/uni-global.d.ts`。
 */

/** `resolveUniRuntime` 解析结果来源。 */
export type UniRuntimeSource = 'globalThis' | 'module' | 'none'

/** `uni` 两路来源探测时的快照结构。 */
export interface UniRuntimeProbe {
  resolved: boolean
  source: UniRuntimeSource
  globalThisHasUni: boolean
  moduleUniDefined: boolean
  /** 是否能在当前宿主访问 `globalThis` 标识符（支付宝等为 false）。 */
  globalThisAvailable: boolean
  uni: unknown
}

/**
 * H5 兜底：在 `globalThis` / `self` 不可用时尝试读取 `window`。
 *
 * 通过 `Function` 间接访问，避免 ESLint `no-restricted-globals` 对 `window` 标识符的限制；
 * 小程序等环境执行失败时返回 `undefined`。
 */
function getWindowObject(): Record<string, unknown> | undefined {
  try {
    const w = Function(
      'return typeof window !== "undefined" ? window : undefined'
    )() as Record<string, unknown> | undefined
    return w != null ? w : undefined
  } catch {
    return undefined
  }
}

/**
 * 安全获取全局对象。
 *
 * 支付宝 / 部分旧版小程序运行时未提供 `globalThis`，直接写 `globalThis` 会
 * `ReferenceError: globalThis is not defined`，导致 install 阶段整包崩溃。
 */
export function getGlobalObject(): Record<string, unknown> {
  if (typeof globalThis !== 'undefined' && globalThis != null) {
    return globalThis as Record<string, unknown>
  }
  if (typeof global !== 'undefined' && global != null) {
    return global as Record<string, unknown>
  }
  if (typeof self !== 'undefined' && self != null) {
    return self as unknown as Record<string, unknown>
  }
  const win = getWindowObject()
  if (win) return win
  return {}
}

/**
 * 探测 `uni` 解析路径（不改变 `resolveUniRuntime` 行为，仅用于 debug 诊断）。
 */
export function probeUniRuntime(): UniRuntimeProbe {
  const globalThisAvailable = typeof globalThis !== 'undefined'
  const g = getGlobalObject()
  const globalUni = g.uni
  const globalThisHasUni = globalUni != null && typeof globalUni === 'object'
  const moduleUniDefined =
    typeof uni !== 'undefined' && uni != null && typeof uni === 'object'

  if (globalThisHasUni) {
    return {
      resolved: true,
      source: 'globalThis',
      globalThisHasUni: true,
      moduleUniDefined,
      globalThisAvailable,
      uni: globalUni,
    }
  }
  if (moduleUniDefined) {
    return {
      resolved: true,
      source: 'module',
      globalThisHasUni: false,
      moduleUniDefined: true,
      globalThisAvailable,
      uni,
    }
  }
  return {
    resolved: false,
    source: 'none',
    globalThisHasUni: false,
    moduleUniDefined: false,
    globalThisAvailable,
    uni: undefined,
  }
}

/**
 * 返回与业务侧一致的 `uni` 运行时根对象；均不可用时返回 `undefined`。
 */
export function resolveUniRuntime(): unknown {
  const probe = probeUniRuntime()
  if (probe.source === 'globalThis') {
    return getGlobalObject().uni
  }
  if (probe.source === 'module') {
    return uni
  }
  return undefined
}
