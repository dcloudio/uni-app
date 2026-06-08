/**
 * 老版本（私有版 1.0/2.0）→ 公有版数据迁移。
 *
 * 老版本通过 `utils/db.js` 把所有字段写到一个聚合 key：
 *   `$$STAT__DBDATA:<appid>` → `{ '__first__visit__time': T, '__last__visit__time': T, ... }`
 *
 * 公有版改为按字段拆 key（`UNI_STAT_DATA:<appid>:<key>`）。
 *
 * 本模块职责（只读老数据，不删）：
 *   1. **一次性**把已知字段从老聚合 key 拆解写入新命名空间。
 *   2. 保留老 key（不 remove），让私有版同库共存场景仍能正常运行。
 *   3. 通过新命名空间下的 `migration:done` 哨兵避免重复执行。
 *   4. 任何步骤异常 → 静默吞掉，不影响采集主链路。
 *
 * 不做的事：
 *   - 不在迁移中写"今天本次启动"的 fvts/lvts；那是 `domain/visit/firstVisit` 的职责。
 *   - 不抛错；调用方无需 try/catch。
 *
 * 调用时机：
 *   - 由 `runtime/install.ts` 在公有版启动早期调用一次（在 `loadVisitSnapshot` 之前），
 *     保证 firstVisit 读到的是已迁移的新前缀数据。
 */

import { LEGACY_NAMESPACE_ROOT, storage } from '../infra/storage'
import { logger } from '../infra/logger'
import { tryRun } from '../infra/safe'
import { resolveUniRuntime } from '../infra/uniRuntime'

/** 已迁移哨兵 key（写到新命名空间）。值固定为 1。 */
const KEY_DONE = 'migration:done'

/**
 * 老聚合 key 内字段 → 新拆分 key 的映射表。
 *
 * 仅迁移**对公有版有用**的字段；其它（如 `__page__residence__time`）保留老 key，
 * 由 Phase 5 的对应 domain 模块按需读取。
 */
const KEY_MAP: ReadonlyArray<readonly [string, string]> = [
  ['__first__visit__time', 'visit:fvts'],
  ['__last__visit__time', 'visit:lvts'],
  ['__total__visit__count', 'visit:tvc'],
]

/** 取 UNI_APP_ID（与 storage 内部保持一致的回退）。 */
function getAppId(): string {
  const id = process.env.UNI_APP_ID
  if (typeof id === 'string' && id.length > 0) return id
  return 'default'
}

/**
 * 从底层 uni 读取老聚合 key（不走 `infra/storage`，避免命名空间被改写）。
 *
 * 任何异常一律返回 `null`，由调用方决定 noop。
 */
function readLegacyAggregate(): Record<string, unknown> | null {
  const u = resolveUniRuntime() as
    | { getStorageSync?: (k: string) => unknown }
    | undefined
  if (!u || typeof u.getStorageSync !== 'function') return null
  const key = `${LEGACY_NAMESPACE_ROOT}:${getAppId()}`
  const raw = tryRun(() => u.getStorageSync!(key), null)
  if (raw && typeof raw === 'object') return raw as Record<string, unknown>
  return null
}

/** 哨兵：本进程内不重复 run。 */
let ran = false

/**
 * 执行迁移；幂等：
 *   - 进程内已 run → 直接 return false。
 *   - 新命名空间已有 `migration:done` → 直接 return false。
 *   - 老聚合 key 不存在 / 为空 → 写 `migration:done`，return false。
 *   - 真正发生迁移 → return true。
 */
export function migrateLegacyData(): boolean {
  if (ran) return false
  ran = true

  const doneR = storage.safeRead<number | string>(KEY_DONE)
  if (doneR.ok && doneR.value) return false

  const legacy = readLegacyAggregate()
  if (!legacy) {
    storage.set(KEY_DONE, 1)
    return false
  }

  let migrated = 0
  for (let i = 0; i < KEY_MAP.length; i++) {
    const [oldKey, newKey] = KEY_MAP[i]
    if (!(oldKey in legacy)) continue
    const value = legacy[oldKey]
    // 已经存在新值就不覆盖（避免覆盖公有版自身已写入的更新值）
    const existing = storage.safeRead(newKey)
    if (existing.ok && existing.value !== undefined) continue
    storage.set(newKey, value)
    migrated++
  }

  storage.set(KEY_DONE, 1)
  if (migrated > 0) {
    logger.info('[uni统计 2.0] migrated legacy keys', migrated)
  }
  return migrated > 0
}

/** 仅供测试：清进程哨兵。 */
export function __resetState(): void {
  ran = false
}
