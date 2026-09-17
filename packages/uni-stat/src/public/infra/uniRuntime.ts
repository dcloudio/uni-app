/**
 * 解析 uni-app 运行时根对象 `uni`。
 *
 * - H5 / App：常见为 `globalThis.uni`。
 * - 微信小程序等：多为 Vite/rollup 向**当前模块**注入的标识符 `uni`，
 *   **未必**同步挂到 `globalThis`；仅读 `globalThis.uni` 会导致
 *   `bindLifecycle` / `uni.request` / storage 等全部静默失败。
 * - 支付宝等旧版小程序：**无 `globalThis` 标识符**，须用 `getGlobalObject()` 兜底。
 * - H5 发行摇树：`pages.json.js` 会先把 `window.uni = {}` 占位；若仍按「有 object 即用」
 *   会误把空桩当真 uni。须用 `isUsableUniRuntime` 过滤后再择源。
 *
 * 第二路依赖宿主构建对 `uni` 的注入（与业务页面同一套解析规则），
 * 类型兜底见 `packages/uni-stat/src/uni-global.d.ts`。
 */

/** `resolveUniRuntime` 解析结果来源。 */
export type UniRuntimeSource = 'globalThis' | 'module' | 'injected' | 'none'

/** 当前构建是否启用了 uni-app x Vapor 统计适配。 */
export function isVaporStatRuntime(): boolean {
  return process.env.UNI_STAT_VAPOR === 'true'
}

/** `uni` 两路来源探测时的快照结构。 */
export interface UniRuntimeProbe {
  resolved: boolean
  source: UniRuntimeSource
  globalThisHasUni: boolean
  /** `globalThis.uni` 存在但缺少统计所需 API（典型：H5 发行 `{}` 空桩）。 */
  globalThisUniStub: boolean
  moduleUniDefined: boolean
  /** 是否能在当前宿主访问 `globalThis` 标识符（支付宝等为 false）。 */
  globalThisAvailable: boolean
  uni: unknown
}

/**
 * 判断候选 `uni` 是否具备统计 SDK 可用的最小 API 集合（排除 H5 摇树空桩 `{}`）。
 *
 * 任一核心 API 存在即视为可用；与具体平台无关，微信/QQ/抖音/支付宝/百度等
 * 完整 runtime 均满足，仅「占位空对象」会被过滤。
 */
export function isUsableUniRuntime(candidate: unknown): boolean {
  if (candidate == null || typeof candidate !== 'object') return false
  const u = candidate as Record<string, unknown>
  return (
    typeof u.getStorageSync === 'function' ||
    typeof u.onCreateVueApp === 'function' ||
    typeof u.request === 'function' ||
    typeof u.onAppShow === 'function' ||
    typeof u.onAppRoute === 'function'
  )
}

/**
 * 读取宿主向当前模块注入的 `uni`（小程序等）；不可用时返回 `undefined`。
 */
function getModuleUniCandidate(): unknown {
  if (typeof uni === 'undefined' || uni == null || typeof uni !== 'object') {
    return undefined
  }
  return uni
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

type UniApiFn = (...args: unknown[]) => unknown

/**
 * 统计运行时用到的 uni API 子集（全部可选，做 duck typing；完整类型以 `@dcloudio/types` 为准）。
 */
interface UniRuntimeApis {
  getStorageSync?: UniApiFn
  setStorageSync?: UniApiFn
  removeStorageSync?: UniApiFn
  getSystemInfoSync?: UniApiFn
  getDeviceInfo?: UniApiFn
  getAppBaseInfo?: UniApiFn
  getWindowInfo?: UniApiFn
  getNetworkType?: UniApiFn
  request?: UniApiFn
  onAppShow?: UniApiFn
  offAppShow?: UniApiFn
  onAppHide?: UniApiFn
  offAppHide?: UniApiFn
  onAppLaunch?: UniApiFn
  offAppLaunch?: UniApiFn
  onAppRoute?: UniApiFn
  offAppRoute?: UniApiFn
  onBeforeAppRoute?: UniApiFn
  offBeforeAppRoute?: UniApiFn
  getLaunchOptionsSync?: UniApiFn
  addInterceptor?: UniApiFn
  removeInterceptor?: UniApiFn
  getPushClientId?: UniApiFn
  getAccountInfoSync?: UniApiFn
  onCreateVueApp?: UniApiFn
}

/**
 * 用字面量 `uni.方法` 引用拼出一个可用的 `uni` facade。
 *
 * uni-app 各端构建的 API 注入器仅识别字面量成员表达式 `uni.方法`（H5 → `@dcloudio/uni-h5`，
 * 小程序 / App 同理），动态 `u.方法` 不会被注入。这里对所需 API 逐个写字面量 `uni.方法`，
 * 使其被注入后收敛为一个对象供下游适配器使用。
 *
 * 仅在 `globalThis.uni` 与模块 `uni` 均不可用时作为兜底（典型：H5 发行摇树后 `window.uni`
 * 为 `{}` 空桩）。未经注入的环境下 `uni.方法` 读到空桩 / 未声明，拼不出方法时返回 undefined。
 */
function buildInjectedUniRuntime(): Record<string, unknown> | undefined {
  try {
    const out: Record<string, unknown> = {}
    const pick = (name: string, fn: unknown): void => {
      if (typeof fn === 'function') out[name] = fn
    }
    // 必须逐个写字面量 `(uni as ...).方法`（emit 后为 `uni.方法`），不可别名 / 循环，否则不会被注入。
    pick('getStorageSync', (uni as UniRuntimeApis).getStorageSync)
    pick('setStorageSync', (uni as UniRuntimeApis).setStorageSync)
    pick('removeStorageSync', (uni as UniRuntimeApis).removeStorageSync)
    pick('getSystemInfoSync', (uni as UniRuntimeApis).getSystemInfoSync)
    pick('getDeviceInfo', (uni as UniRuntimeApis).getDeviceInfo)
    pick('getAppBaseInfo', (uni as UniRuntimeApis).getAppBaseInfo)
    pick('getWindowInfo', (uni as UniRuntimeApis).getWindowInfo)
    pick('getNetworkType', (uni as UniRuntimeApis).getNetworkType)
    pick('request', (uni as UniRuntimeApis).request)
    pick('onAppShow', (uni as UniRuntimeApis).onAppShow)
    pick('offAppShow', (uni as UniRuntimeApis).offAppShow)
    pick('onAppHide', (uni as UniRuntimeApis).onAppHide)
    pick('offAppHide', (uni as UniRuntimeApis).offAppHide)
    pick('onAppLaunch', (uni as UniRuntimeApis).onAppLaunch)
    pick('offAppLaunch', (uni as UniRuntimeApis).offAppLaunch)
    pick('onAppRoute', (uni as UniRuntimeApis).onAppRoute)
    pick('offAppRoute', (uni as UniRuntimeApis).offAppRoute)
    pick('onBeforeAppRoute', (uni as UniRuntimeApis).onBeforeAppRoute)
    pick('offBeforeAppRoute', (uni as UniRuntimeApis).offBeforeAppRoute)
    pick('getLaunchOptionsSync', (uni as UniRuntimeApis).getLaunchOptionsSync)
    pick('addInterceptor', (uni as UniRuntimeApis).addInterceptor)
    pick('removeInterceptor', (uni as UniRuntimeApis).removeInterceptor)
    pick('getPushClientId', (uni as UniRuntimeApis).getPushClientId)
    pick('getAccountInfoSync', (uni as UniRuntimeApis).getAccountInfoSync)
    pick('onCreateVueApp', (uni as UniRuntimeApis).onCreateVueApp)
    return Object.keys(out).length > 0 ? out : undefined
  } catch (_e) {
    // 未注入且 `uni` 未声明（单测 / 极端环境）→ ReferenceError，兜底返回 undefined。
    return undefined
  }
}

/**
 * 探测 `uni` 解析路径（不改变 `resolveUniRuntime` 行为，仅用于 debug 诊断）。
 */
export function probeUniRuntime(): UniRuntimeProbe {
  const globalThisAvailable = typeof globalThis !== 'undefined'
  const g = getGlobalObject()
  const globalUni = g.uni
  const globalThisHasUni = globalUni != null && typeof globalUni === 'object'
  const globalThisUniStub = globalThisHasUni && !isUsableUniRuntime(globalUni)
  const moduleUni = getModuleUniCandidate()
  const moduleUniDefined = moduleUni != null

  if (isUsableUniRuntime(globalUni)) {
    return {
      resolved: true,
      source: 'globalThis',
      globalThisHasUni: true,
      globalThisUniStub: false,
      moduleUniDefined,
      globalThisAvailable,
      uni: globalUni,
    }
  }
  if (isUsableUniRuntime(moduleUni)) {
    return {
      resolved: true,
      source: 'module',
      globalThisHasUni,
      globalThisUniStub,
      moduleUniDefined: true,
      globalThisAvailable,
      uni: moduleUni,
    }
  }
  // globalThis / 模块 uni 均不可用（典型 H5 发行空桩）时，用注入 facade 兜底。
  const injectedUni = buildInjectedUniRuntime()
  if (isUsableUniRuntime(injectedUni)) {
    return {
      resolved: true,
      source: 'injected',
      globalThisHasUni,
      globalThisUniStub,
      moduleUniDefined,
      globalThisAvailable,
      uni: injectedUni,
    }
  }
  return {
    resolved: false,
    source: 'none',
    globalThisHasUni,
    globalThisUniStub,
    moduleUniDefined,
    globalThisAvailable,
    uni: undefined,
  }
}

/**
 * 返回与业务侧一致的 `uni` 运行时根对象；均不可用时返回 `undefined`。
 */
export function resolveUniRuntime(): unknown {
  const probe = probeUniRuntime()
  return probe.resolved ? probe.uni : undefined
}
