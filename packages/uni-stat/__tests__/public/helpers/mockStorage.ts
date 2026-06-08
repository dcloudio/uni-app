/**
 * mockStorage —— 公有版测试通用 storage 替身。
 *
 * 设计目标：
 *   1. 与真实 `uni.getStorageSync / setStorageSync / removeStorageSync / clearStorageSync`
 *      行为对齐：`get` 未命中返回空字符串（与 uni 文档一致）。
 *   2. 提供 `__inspect()` 调试快照，用于断言「上报 ack 后 storage 终态」（缺陷 #5 测试矩阵）。
 *   3. 提供 `__failNext()` 单次异常注入，用于覆盖 storage 抛错路径（缺陷 #5 T7/T8）。
 *   4. 100% 内存实现，无任何持久化副作用，方便每个用例 `__reset()` 重置。
 */

export interface StorageFailureSpec {
  get?: Error
  set?: Error
  remove?: Error
  clear?: Error
}

export interface MockStorageController {
  /** 同步读取，未命中返回空字符串（与 uni 行为一致）。 */
  getStorageSync(key: string): unknown
  /** 同步写入；undefined 等价于不写。 */
  setStorageSync(key: string, value: unknown): void
  /** 同步删除指定 key；不存在时静默。 */
  removeStorageSync(key: string): void
  /** 清空全部 key。 */
  clearStorageSync(): void
  /** 返回当前 storage 的浅拷贝快照，仅供测试断言使用。 */
  __inspect(): Record<string, unknown>
  /** 直接清空内部状态（与 clearStorageSync 等价，但语义更明确：「重置测试夹具」）。 */
  __reset(): void
  /** 注入下一次 get/set/remove/clear 调用要抛出的异常；命中后自动失效，仅生效一次。 */
  __failNext(spec: StorageFailureSpec): void
  /** 当前是否还有未消费的失败注入（用于断言 helpers 自身无泄漏）。 */
  __hasPendingFailure(): boolean
}

/**
 * 创建一个全新的内存 storage 控制器。
 *
 * @returns 控制器实例；同名方法可直接挂到 `uni` / `wx` / `my` 等全局对象上。
 */
export function createMockStorage(): MockStorageController {
  const store = new Map<string, unknown>()
  let pendingFailure: StorageFailureSpec = {}

  /** 消费一次失败注入；命中则抛出，未命中返回 false。 */
  const consumeFailure = (op: keyof StorageFailureSpec): boolean => {
    const err = pendingFailure[op]
    if (err) {
      pendingFailure = {}
      throw err
    }
    return false
  }

  return {
    getStorageSync(key: string): unknown {
      consumeFailure('get')
      // uni 规范：未命中返回空字符串
      return store.has(key) ? store.get(key) : ''
    },
    setStorageSync(key: string, value: unknown): void {
      consumeFailure('set')
      if (value === undefined) return
      store.set(key, value)
    },
    removeStorageSync(key: string): void {
      consumeFailure('remove')
      store.delete(key)
    },
    clearStorageSync(): void {
      consumeFailure('clear')
      store.clear()
    },
    __inspect(): Record<string, unknown> {
      const snapshot: Record<string, unknown> = {}
      store.forEach((v, k) => {
        snapshot[k] = v
      })
      return snapshot
    },
    __reset(): void {
      store.clear()
      pendingFailure = {}
    },
    __failNext(spec: StorageFailureSpec): void {
      pendingFailure = { ...pendingFailure, ...spec }
    },
    __hasPendingFailure(): boolean {
      return (
        !!pendingFailure.get ||
        !!pendingFailure.set ||
        !!pendingFailure.remove ||
        !!pendingFailure.clear
      )
    },
  }
}
