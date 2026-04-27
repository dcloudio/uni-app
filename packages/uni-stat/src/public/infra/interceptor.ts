/**
 * uni.addInterceptor 的去重 / 解绑封装。
 *
 * 修复的私有版缺陷：
 *   - #26 `uni.addInterceptor(api, opts)` 多次 add 会覆盖前一次的回调；私有版若反复
 *     注册（例如 hot reload / 多入口）会丢失早期 hook。公有版用 `Map<api, Set<cb>>`
 *     去重 + 重新装配，保证多次 add 都生效，解绑时只摘除当前调用方的回调。
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
  removeInterceptor(api: string): void
}

const registry = new Map<string, Set<InterceptorHandlers>>()

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
      try {
        getUni().removeInterceptor(api)
      } catch {
        // 即使解绑失败也应保证下次重装时不带本次 handlers
      }
    } else {
      reinstall(api)
    }
  }
}

/**
 * 把 registry 中某个 api 的全部 handlers 合并成一个 fanout 拦截器，重新挂到 uni。
 */
function reinstall(api: string): void {
  const set = registry.get(api)
  if (!set || set.size === 0) return

  const fanout: InterceptorHandlers = {
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

  try {
    const uni = getUni()
    // 先 remove 再 add，避免不同 uni 实现对"重复 add"行为不一致
    try {
      uni.removeInterceptor(api)
    } catch {
      /* ignore */
    }
    uni.addInterceptor(api, fanout)
  } catch {
    // uni 不可用（例如 nvue 早期阶段）：保留 registry，等下次 reinstall 时再尝试
  }
}

function getUni(): UniInterceptorAPI {
  const u = (globalThis as unknown as { uni?: UniInterceptorAPI }).uni
  if (!u)
    throw new Error('[uni统计公有版] uni interceptor API is not available')
  return u
}

/**
 * 仅供单测使用：清空 registry，让本模块「像刚加载」一样。
 */
export function __reset(): void {
  registry.clear()
}

export const interceptor = { add, __reset }
