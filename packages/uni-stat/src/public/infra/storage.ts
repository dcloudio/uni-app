/**
 * 公有版本地存储抽象（重写自私有版 `utils/db.js`）。
 *
 * 修复的私有版缺陷：
 *   - #14 `dbRemove` 第二段 `data = uni.getStorageSync(...)` 无 `|| {}` 兜底导致 NPE。
 *   - #18 每次 get/set/remove 都做 2~3 次 storage IO（read-modify-write），
 *         公有版改为「按 key 独立存储 + 内存缓存」，每次操作只 1 次同步 IO。
 *
 * 关键能力（供 Phase 4 缺陷 #5 修复使用）：
 *   - `safeRead`：读取失败时返回 `{ ok: false }` 而不是 `undefined`，调用方据此区分
 *     "key 不存在 / storage 异常"，避免老用户被 lvts=0 误判为新用户。
 *
 * 命名空间：所有 key 自动加前缀 `UNI_STAT_DATA:<appid>:`；`<appid>` 取
 * `process.env.UNI_APP_ID`，缺失时退化为 `default`。
 *
 * 注意：本模块依赖 `uni.{getStorageSync,setStorageSync,removeStorageSync}`，
 * 解析规则见 `infra/uniRuntime.ts`（含小程序注入路径）。
 * 测试中通过 `helpers/mockUni` 注入。
 */

import { resolveUniRuntime } from './uniRuntime'

/**
 * 公有版命名空间前缀，遵循公司内部统一规范 `UNI_STAT_DATA:<appid>:<key>`。
 *
 * 私有版（旧）使用 `$$STAT__DBDATA:<appid>` 作为单一聚合 key；这里**不再**使用旧前缀，
 * 仅在 Phase 4 `domain/migration` 中通过显式只读 API 读取一次老聚合数据并拆解到新前缀，
 * 保证平滑迁移；除迁移路径外，新代码全部写入 `UNI_STAT_DATA:` 命名空间。
 */
const NAMESPACE_ROOT = 'UNI_STAT_DATA'

/** 仅供迁移层读取老数据用：私有版聚合 key 的前缀。 */
export const LEGACY_NAMESPACE_ROOT = '$$STAT__DBDATA'

/**
 * 内存缓存。值语义：
 *   - 命中且非 undefined → cache 中的真实值
 *   - 命中且 undefined   → 已经主动 `remove` 或确认 storage 中不存在
 *   - 未命中              → 还没读过 storage
 */
const cache = new Map<string, unknown>()

/** 已知存在过的全部完整 key（用于 `clearNamespace`）。 */
const knownKeys = new Set<string>()

/**
 * 拼装命名空间下的完整 key。
 */
function fullKey(key: string): string {
  const appid = process.env.UNI_APP_ID || 'default'
  return `${NAMESPACE_ROOT}:${appid}:${key}`
}

/**
 * 取真实 uni 对象。剥离到函数里，便于测试用 mockUni 替换后立即生效。
 */
function getUni(): {
  getStorageSync(k: string): unknown
  setStorageSync(k: string, v: unknown): void
  removeStorageSync(k: string): void
} {
  const raw = resolveUniRuntime()
  const u =
    raw != null && typeof raw === 'object'
      ? (raw as {
          getStorageSync(k: string): unknown
          setStorageSync(k: string, v: unknown): void
          removeStorageSync(k: string): void
        })
      : undefined
  if (!u || typeof u.getStorageSync !== 'function') {
    throw new Error('[uni统计公有版] uni storage API is not available')
  }
  return u
}

/**
 * 获取一个 key 的值。
 *
 * @returns 命中返回值；未命中或 storage 异常返回 `undefined`（无法区分两种情况，
 *          需要区分时请使用 `safeRead`）。
 */
function get<T = unknown>(key: string): T | undefined {
  const fk = fullKey(key)
  if (cache.has(fk)) return cache.get(fk) as T | undefined
  try {
    const raw = getUni().getStorageSync(fk)
    // uni 规范：未命中返回空字符串
    if (raw === '' || raw === null || raw === undefined) {
      cache.set(fk, undefined)
      return undefined
    }
    cache.set(fk, raw)
    knownKeys.add(fk)
    return raw as T
  } catch {
    return undefined
  }
}

/**
 * 安全读取：明确区分「未命中 / 读异常」。
 *
 * @returns
 *   - `{ ok: true, value }`：成功读取（value 可能为 undefined 表示 key 不存在）。
 *   - `{ ok: false, value: undefined }`：storage 抛错；调用方应使用上次内存值兜底，
 *     **绝不**直接退化为 0 / null（否则会复现缺陷 #5：老用户被误判为新用户）。
 */
function safeRead<T = unknown>(
  key: string
): { ok: boolean; value: T | undefined } {
  const fk = fullKey(key)
  if (cache.has(fk)) return { ok: true, value: cache.get(fk) as T | undefined }
  try {
    const raw = getUni().getStorageSync(fk)
    if (raw === '' || raw === null || raw === undefined) {
      cache.set(fk, undefined)
      return { ok: true, value: undefined }
    }
    cache.set(fk, raw)
    knownKeys.add(fk)
    return { ok: true, value: raw as T }
  } catch {
    return { ok: false, value: undefined }
  }
}

/**
 * 写入一个 key。`undefined` 视为删除（与私有版语义对齐）。
 *
 * 失败策略：先更新缓存，再写 storage；storage 抛错时不回滚缓存，
 * 由调用方决定是否补偿（视调用方场景而定，热路径不应阻塞）。
 */
function set<T = unknown>(key: string, value: T): void {
  const fk = fullKey(key)
  if (value === undefined) {
    remove(key)
    return
  }
  cache.set(fk, value)
  knownKeys.add(fk)
  try {
    getUni().setStorageSync(fk, value)
  } catch {
    // 缓存已更新，吞掉异常；调用方如需感知请使用 try/catch 显式包裹。
  }
}

/**
 * 删除一个 key。
 */
function remove(key: string): void {
  const fk = fullKey(key)
  cache.set(fk, undefined)
  try {
    getUni().removeStorageSync(fk)
  } catch {
    // 同 set：忽略 storage 异常，缓存已置空。
  }
}

/**
 * 批量读：返回 `Record<key, value>`，未命中 / 异常的 key 取值为 `undefined`。
 */
function batchGet(keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const k of keys) out[k] = get(k)
  return out
}

/**
 * 批量写：逐个 `set`，等价于循环调用，便于调用侧聚合。
 */
function batchSet(entries: Record<string, unknown>): void {
  for (const k of Object.keys(entries)) set(k, entries[k])
}

/**
 * 清除当前 appid 命名空间下、自模块加载以来访问过的所有 key。
 *
 * 注意：受限于 uni storage 不一定支持 `getStorageInfoSync`，本函数只清理
 * 「本模块写入或读取过的 key」；未触达过的历史脏数据需要调用方显式处理。
 */
function clearNamespace(): void {
  let uni: ReturnType<typeof getUni> | undefined
  try {
    uni = getUni()
  } catch {
    // uni 不可用：仅清缓存，无法清持久化
  }
  for (const fk of Array.from(knownKeys)) {
    try {
      uni?.removeStorageSync(fk)
    } catch {
      // 单 key 失败不影响其他 key 的清理
    }
    cache.set(fk, undefined)
  }
  knownKeys.clear()
}

/**
 * 仅供单测使用：清空内部缓存与 knownKeys 索引，让模块"像刚加载"一样。
 *
 * 单测必须在每个用例之间调用，否则会跨用例泄漏缓存状态。
 */
function __resetCache(): void {
  cache.clear()
  knownKeys.clear()
}

export const storage = {
  get,
  set,
  remove,
  safeRead,
  batchGet,
  batchSet,
  clearNamespace,
  __resetCache,
}
