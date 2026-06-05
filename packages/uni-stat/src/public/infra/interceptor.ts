import { resolveUniRuntime } from './uniRuntime'

/**
 * uni.addInterceptor 的去重 / 解绑封装。
 *
 * 修复的私有版缺陷：
 *   - #26 `uni.addInterceptor(api, opts)` 多次 add 会覆盖前一次的回调；私有版若反复
 *     注册（例如 hot reload / 多入口）会丢失早期 hook。公有版用 `Map<api, Set<cb>>`
 *     去重 + 重新装配，保证多次 add 都生效，解绑时只摘除当前调用方的回调。
 *
 * 修复（精准解绑，避免误删宿主/第三方拦截器）：
 *   uni 运行时 `uni.removeInterceptor(api)` **不带第二参数时会 `delete scopedInterceptors[api]`**，
 *   即清空该 api 上的**全部**拦截器（含业务方 / 其它插件注册的）。本模块 hook 的
 *   `login/requestPayment/share/setNavigationBarTitle` 若被业务方也注册过，旧实现的
 *   「先 blanket remove 再 add」会静默移除业务方的拦截器。
 *   现改为：记录本模块每个 api 最近一次装入的 fanout 引用，重装 / 解绑时调用
 *   `uni.removeInterceptor(api, prevFanout)` **按 handler 引用精准移除**，只摘除本模块
 *   自己的 fanout，与第三方拦截器共存。对个别忽略第二参数的端，最坏退化为旧行为（无回归）。
 */

export interface InterceptorHandlers {
  invoke?: (args: unknown) => void | boolean
  success?: (res: unknown) => void
  fail?: (err: unknown) => void
  complete?: (res: unknown) => void
  returnValue?: (res: unknown) => unknown
}

interface UniInterceptorAPI {
  addInterceptor(api: string, handlers: InterceptorHandlers): void
  /**
   * 第二参数 `handlers` 存在时按引用精准移除该拦截器；缺省时清空整个 api（uni 原生语义）。
   * 本模块**始终传入** prevFanout 以避免误删第三方拦截器。
   */
  removeInterceptor(api: string, handlers?: InterceptorHandlers): void
}

const registry = new Map<string, Set<InterceptorHandlers>>()

/**
 * 本模块每个 api 最近一次装入 uni 的 fanout 引用。
 * 用于重装 / 解绑时按引用精准 `removeInterceptor(api, prevFanout)`，不波及第三方拦截器。
 */
const installedFanout = new Map<string, InterceptorHandlers>()

/**
 * 注册一个拦截器。同一 api 重复注册会去重，并自动按当前注册集合重装到 uni。
 *
 * @returns 解绑函数。调用后从集合中移除本次的 handlers，并按剩余集合重新装配。
 */
export function add(api: string, handlers: InterceptorHandlers): () => void {
  const set = registry.get(api) ?? new Set()
  set.add(handlers)
  registry.set(api, set)
  reinstall(api)

  return () => {
    const cur = registry.get(api)
    if (!cur) return
    cur.delete(handlers)
    if (cur.size === 0) {
      registry.delete(api)
      const prev = installedFanout.get(api)
      installedFanout.delete(api)
      if (prev) {
        try {
          // 精准移除本模块的 fanout，保留第三方在同一 api 上的拦截器。
          getUni().removeInterceptor(api, prev)
        } catch {
          // 即使解绑失败也应保证下次重装时不带本次 handlers
        }
      }
    } else {
      reinstall(api)
    }
  }
}

/**
 * 把某个 api 的全部 handlers 合并成单个 fanout 拦截器。
 *
 * 闭包持有 `set` 引用（registry 内的同一 Set），故 fanout 会实时反映集合的增删。
 */
function buildFanout(set: Set<InterceptorHandlers>): InterceptorHandlers {
  return {
    invoke(args) {
      let blocked = false
      for (const h of set) {
        if (!h.invoke) continue
        const r = h.invoke(args)
        if (r === false) blocked = true
      }
      return blocked ? false : undefined
    },
    success(res) {
      for (const h of set) h.success?.(res)
    },
    fail(err) {
      for (const h of set) h.fail?.(err)
    },
    complete(res) {
      for (const h of set) h.complete?.(res)
    },
    returnValue(res) {
      let v = res
      for (const h of set) {
        if (!h.returnValue) continue
        v = h.returnValue(v)
      }
      return v
    },
  }
}

/**
 * 把 registry 中某个 api 的全部 handlers 合并成一个 fanout 拦截器，重新挂到 uni。
 *
 * 精准重装：先按引用移除本模块**上一次**装入的 fanout（若有），再装入新 fanout；
 * 全程不调用「不带第二参数」的 blanket remove，故业务方 / 其它插件在同一 api 上的
 * 拦截器不会被波及。
 */
function reinstall(api: string): void {
  const set = registry.get(api)
  if (!set || set.size === 0) return

  const fanout = buildFanout(set)

  try {
    const uni = getUni()
    const prev = installedFanout.get(api)
    if (prev) {
      try {
        uni.removeInterceptor(api, prev)
      } catch {
        /* ignore：旧 fanout 移除失败不阻断新 fanout 装入 */
      }
    }
    uni.addInterceptor(api, fanout)
    installedFanout.set(api, fanout)
  } catch {
    // uni 不可用（例如 nvue 早期阶段）：保留 registry 与 installedFanout，等下次 reinstall 再试
  }
}

function getUni(): UniInterceptorAPI {
  const raw = resolveUniRuntime()
  const u =
    raw != null && typeof raw === 'object'
      ? (raw as UniInterceptorAPI)
      : undefined
  if (!u) throw new Error('[uni统计 2.0] uni interceptor API is not available')
  return u
}

/**
 * 仅供单测使用：清空 registry，让本模块「像刚加载」一样。
 */
export function __reset(): void {
  registry.clear()
  installedFanout.clear()
}

export const interceptor = { add, __reset }
