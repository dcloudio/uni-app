/**
 * 访问字段 `fvts / lvts / tvc` 状态机。**专项修复缺陷 #5：lvts=0 老用户被误判为新用户。**
 *
 * 私有版（`utils/pageTime.js`）的副作用链：
 *   1. `get_first_visit_time` 在写 fvts 时主动 `dbRemove(LAST_VISIT_TIME_KEY)`
 *      → 第 1 次启动结束 storage 中 lvts 为空。
 *   2. `get_last_visit_time` 在读时立即 `dbSet(LAST_VISIT_TIME_KEY, get_time())`
 *      → 把 "上一次" 当成 "本次"，下次启动读出来已是当前时间。
 *   3. 写入早于上报，上报失败时无法回滚，下次启动状态错乱。
 *
 * 公有版严格契约：
 *   1. 老用户三段拆分：`loadVisitSnapshot()` 纯读、`buildVisitFields()` 仅生成本次待写、
 *      `commitVisitOnAck()` 在上报 ack 后才落 storage（仅推进 lvts，永不主动清 lvts）。
 *   2. **新用户首条 lt=1 例外（保证"一生只计一次新增"）**：本条仍上报 `lvts=0`，但
 *      `buildVisitFields` 会**立即**把基线 `fvts/lvts/tvc=now/now/1` 落库（对齐私有版
 *      `get_last_visit_time` 的"读即写"）。这样本进程后续续会话、以及下次冷启动都会读到
 *      `lvts=now`（非 0），不再被重复计为新增；首条即便上报失败也已由 retry 暂存重试，
 *      不会丢失这唯一一次新增信号。**唯有卸载应用 / 清空缓存**清掉基线后才会重新计一次。
 *   3. `loadVisitSnapshot` 区分 "key 不存在" 与 "storage 异常"：
 *      - 不存在 → `lvts=0`，按新用户路径走（Yes new user）。
 *      - 异常   → 内存有上次 snapshot 时复用之；首次启动且异常 → fallback `lvts=0`，
 *        但**记录** `degraded=true`，上层可决定是否仍上报（Phase 5 collector 用）。
 *   4. 同一进程内只允许一次 `buildVisitFields`；后续 cst=2/3 触发的新会话 lt=1
 *      调用 `buildVisitFieldsForSessionRenewal`，复用 committed / lastBuilt 推进 tvc，
 *      并保证 lvts 仍随 lt=1 上行（缺失会被服务端误判为新用户）。
 *
 * 与 `pipeline/collector.ts` 的契约见 `05-公有版重构开发计划.md` §4.1.5。
 */

import { logger } from '../../infra/logger'
import { storage } from '../../infra/storage'
import { isVaporStatRuntime } from '../../infra/uniRuntime'

const KEY_FVTS = 'visit:fvts'
const KEY_LVTS = 'visit:lvts'
const KEY_TVC = 'visit:tvc'

export interface VisitSnapshot {
  /** 首次访问时间戳；0 表示尚未首装记录。 */
  fvts: number
  /** 上一次启动时间戳；0 表示新用户。 */
  lvts: number
  /** 累计访问次数；新用户首启该值上报为 1。 */
  tvc: number
  /**
   * 是否新用户。判据为 `lvts === 0`（对齐私有版：lvts 是唯一的"是否曾经访问"信号）。
   *
   * 不再用 `fvts === 0 || lvts === 0`：旧定义会把"lvts 有效但 fvts 因迁移/脏数据缺失"
   * 的老用户强制当成新用户上报 lvts=0，造成新增虚高。
   */
  isNewUser: boolean
  /**
   * storage 读取异常时为 true。collector 应据此打 warn，并保留 fallback 字段；
   * 不可粗暴退化为新用户。
   */
  degraded: boolean
}

interface PendingVisit {
  fvts: number
  lvts: number
  tvc: number
  /** 用于断言"必须先 build 再 commit"。 */
  now: number
}

const EMPTY_SNAPSHOT: VisitSnapshot = {
  fvts: 0,
  lvts: 0,
  tvc: 0,
  isNewUser: true,
  degraded: false,
}

/** 启动后通过 `loadVisitSnapshot` 写入；后续 build/commit 均基于此推进。 */
let loaded: VisitSnapshot | null = null

/** `buildVisitFields` 生成；`commitVisitOnAck` 落库后清空。 */
let pending: PendingVisit | null = null

/** cst=2/3 新会话 lt=1 生成；`commitVisitOnAck` 落库后清空。 */
let pendingRenewal: PendingVisit | null = null

/** `commitVisitOnAck` 落库后写入；同进程内 cst=2/3 后续事件复用此 snapshot。 */
let committed: VisitSnapshot | null = null

/**
 * 本进程内最近一次 `buildVisitFields` 的产出。即使 pending 已被 commit / rollback 清空，
 * 仍保留这份，用于：
 *   - cst=2/3 复用同一份字段（参见 T5/T6）。
 *   - 拦截同进程二次 `buildVisitFields` 误调（warn 后返回此值，不再生成新值）。
 */
let lastBuilt: { fvts: number; lvts: number; tvc: number } | null = null

/** 同进程内 `buildVisitFields` 只允许调用一次（缺陷 #5 修复点之一）。 */
let buildCalledInProcess = false

/**
 * 转 number（兼容历史 storage 中 string 形式的时间戳）。
 *
 * 异常 / NaN / 负数一律视为 0；
 * 这里保守不抛错，因为读流程要保证不让"脏数据"中断采集链路。
 */
function toNum(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v) && v >= 0) return v
  if (typeof v === 'string' && v.length > 0) {
    const n = Number(v)
    if (Number.isFinite(n) && n >= 0) return n
  }
  return 0
}

/**
 * snapshot 是否「确实是一台全新设备」：三字段全 0。
 *
 * 用于消费 `degraded`：storage 读取异常时 `lvts` 会退化为 0 而误判 `isNewUser=true`。
 * 若此时 `fvts/tvc` 仍读到非 0（说明是老用户、只是 lvts 这一项读失败），就**不能**当新增，
 * 也不能落库覆盖真实持久值；只有三字段都为 0 才是可信的全新设备。
 */
function isLikelyFreshDevice(snap: VisitSnapshot): boolean {
  return snap.fvts === 0 && snap.lvts === 0 && snap.tvc === 0
}

/**
 * 是否为「可信的新用户」：非 degraded 直接信任 `isNewUser`；degraded 时仅当三字段全 0
 * （`isLikelyFreshDevice`）才信任，否则视为「读失败的老用户」，走老用户兜底路径。
 */
function isTrustworthyNewUser(snap: VisitSnapshot): boolean {
  if (!snap.isNewUser) return false
  // Vapor 接入前可能只留下 fvts/tvc。仅在 Vapor 下把这种残缺历史视为老用户，
  // 避免改变现有公有版以 lvts 为唯一新用户信号的既有口径。
  if (isVaporStatRuntime() && !isLikelyFreshDevice(snap)) return false
  return !snap.degraded || isLikelyFreshDevice(snap)
}

/**
 * 从 storage 读取 snapshot。**纯读，无副作用**（spy `storage.set` 必须 not.toHaveBeenCalled）。
 *
 * 异常处理：
 *   - 三个 key 任意一个 `safeRead.ok=false` → degraded=true。
 *   - 后续读到值仍写 snapshot；调用方应根据 `degraded` 决策是否上报。
 */
export function loadVisitSnapshot(): VisitSnapshot {
  const fvtsR = storage.safeRead(KEY_FVTS)
  const lvtsR = storage.safeRead(KEY_LVTS)
  const tvcR = storage.safeRead(KEY_TVC)
  const degraded = !fvtsR.ok || !lvtsR.ok || !tvcR.ok
  const fvts = toNum(fvtsR.value)
  const lvts = toNum(lvtsR.value)
  const tvc = toNum(tvcR.value)
  const snapshot: VisitSnapshot = {
    fvts,
    lvts,
    tvc,
    isNewUser: lvts === 0,
    degraded,
  }
  if (degraded) {
    const likelyFresh =
      fvts === 0 && lvts === 0 && tvc === 0 && snapshot.isNewUser
    if (!likelyFresh) {
      logger.warn(
        '[uni统计 2.0] visit snapshot degraded; some storage keys read failed'
      )
    }
  }
  loaded = snapshot
  return snapshot
}

/**
 * 取已加载的 snapshot；未调用过 `loadVisitSnapshot` 时返回 EMPTY。
 *
 * 这里不主动调 `loadVisitSnapshot`，避免在错误时机产生隐式 IO；
 * collector 必须在启动时显式 load 一次。
 */
function ensureLoaded(): VisitSnapshot {
  if (!loaded) loaded = EMPTY_SNAPSHOT
  return loaded
}

/**
 * 新用户首条 lt=1 的**乐观落库**：立即把基线 `fvts/lvts/tvc=now/now/1` 写入 storage，
 * 并把内存 `loaded`/`committed` 刷新为"非新用户"基线。
 *
 * 目的：保证一台设备一生只上报一次 `lvts=0`（=只计一次新增）。对齐私有版
 * `get_first_visit_time`/`get_last_visit_time` 的"读即写"语义。
 *
 * 与 ack-commit 的关系：
 *   - 首条 lt=1 仍按 `lvts=0` 上报（在 `buildVisitFields` 里单独构造 pending 返回）；
 *     即便该条上报失败，也已由 `pipeline/retry` 暂存重试，唯一一次新增信号不丢。
 *   - 本进程后续续会话（`buildVisitFieldsForSessionRenewal`）命中 `committed` → lvts=now（非 0）；
 *     下次冷启动 `loadVisitSnapshot` 读到 storage 里的 lvts=now → `isNewUser=false`。
 *   - 唯有卸载应用 / 清空缓存清掉基线后，才会重新计一次新增。
 */
function persistNewUserBaseline(now: number): void {
  storage.set(KEY_FVTS, now)
  storage.set(KEY_LVTS, now)
  storage.set(KEY_TVC, 1)
  const baseline: VisitSnapshot = {
    fvts: now,
    lvts: now,
    tvc: 1,
    isNewUser: false,
    degraded: false,
  }
  loaded = baseline
  committed = baseline
}

/**
 * 生成本次启动要上报的 fvts/lvts/tvc 三元组。
 *
 * 推进规则：
 *   - 新用户（loaded.isNewUser）：本次上报 fvts=now, lvts=0（0 表示新增），tvc=1；
 *     **同时立即落库基线**（见 `persistNewUserBaseline`），确保后续不再重复计新增。
 *   - 老用户：**不写 storage**；fvts 维持 loaded.fvts；lvts 上报 loaded.lvts（"上一次"，
 *     不是 now）；tvc=loaded.tvc+1；真正落库由 `commitVisitOnAck` 在 ack 后推进。
 *
 * 注意：同一进程内只允许调用一次（参考 `domain/session` 设计）；cst=2/3 新会话应走
 * `buildVisitFieldsForSessionRenewal`。这里通过 `buildCalledInProcess` 哨兵防止误用，
 * 二次调用返回与首次相同的结果但发出 warn，便于排查上层 collector bug。
 */
export function buildVisitFields(now: number): {
  fvts: number
  lvts: number
  tvc: number
} {
  const snap = ensureLoaded()
  if (buildCalledInProcess && lastBuilt) {
    logger.warn(
      '[uni统计 2.0] buildVisitFields() called twice in same process; returning cached fields'
    )
    return Object.assign({}, lastBuilt)
  }
  buildCalledInProcess = true

  if (isTrustworthyNewUser(snap)) {
    pending = { fvts: now, lvts: 0, tvc: 1, now }
    persistNewUserBaseline(now)
  } else if (snap.isNewUser) {
    // degraded 且非全新设备：lvts 读失败被误当 0。按老用户兜底，**不**上报 lvts=0、
    // **不**落库基线（storage 不可靠），避免新增虚高与覆盖真实持久值。
    logger.warn(
      '[uni统计 2.0] visit degraded: lvts 读取失败但检测到历史数据，按老用户处理以避免新增虚高'
    )
    const fvts = snap.fvts > 0 ? snap.fvts : now
    pending = { fvts, lvts: fvts, tvc: snap.tvc + 1, now }
  } else {
    pending = {
      fvts: snap.fvts,
      lvts: snap.lvts,
      tvc: snap.tvc + 1,
      now,
    }
  }
  lastBuilt = { fvts: pending.fvts, lvts: pending.lvts, tvc: pending.tvc }
  return Object.assign({}, lastBuilt)
}

/**
 * 为 cst=2/3 新会话 lt=1 生成本次要上报的 visit 字段（**不写 storage**）。
 *
 * 与私有版 `sendReportRequest` 对齐：后台/前台超时触发的新会话仍携带 fvts/lvts/tvc，
 * 避免 lvts 缺失被服务端按新用户入库。
 *
 * 推进规则：
 *   - 已有 committed：fvts 不变，lvts 上报 committed.lvts，tvc=committed.tvc+1。
 *   - 冷启动 lt=1 尚未 ack：复用 lastBuilt，不重复递增 tvc。
 *   - 兜底读 loaded snapshot，逻辑同 buildVisitFields 的老用户路径。
 */
export function buildVisitFieldsForSessionRenewal(now: number): {
  fvts: number
  lvts: number
  tvc: number
} {
  let fvts: number
  let lvts: number
  let tvc: number

  if (committed) {
    fvts = committed.fvts
    lvts = committed.lvts
    tvc = committed.tvc + 1
  } else if (lastBuilt) {
    fvts = lastBuilt.fvts
    // 防御：新用户冷启首条 lt=1（lvts=0）尚未 ack 时，本进程后续续会话不能再上报 lvts=0，
    // 否则同一新设备被重复计新增。此时用"本次启动时间"(=fvts) 作为上一次访问时间。
    // 正常路径下 buildVisitFields 已落库基线并置 committed，会走上面的 committed 分支。
    lvts = lastBuilt.lvts !== 0 ? lastBuilt.lvts : lastBuilt.fvts
    tvc = lastBuilt.tvc
  } else {
    const snap = ensureLoaded()
    if (isTrustworthyNewUser(snap)) {
      // 续会话成为本进程首条 lt=1 且命中新用户（罕见：未走过冷启 build）：本条仍按
      // lvts=0 计一次新增，并立即落库基线，保证只计一次。
      fvts = now
      lvts = 0
      tvc = 1
      persistNewUserBaseline(now)
    } else if (snap.isNewUser) {
      // degraded 且非全新设备：按老用户兜底，不上报 lvts=0、不落库基线。
      fvts = snap.fvts > 0 ? snap.fvts : now
      lvts = fvts
      tvc = snap.tvc + 1
    } else {
      fvts = snap.fvts
      lvts = snap.lvts
      tvc = snap.tvc + 1
    }
  }

  pendingRenewal = { fvts, lvts, tvc, now }
  return { fvts, lvts, tvc }
}

/**
 * 上报 ack 成功后落库。
 *
 * 实际写入：
 *   - 新用户：`fvts=now, lvts=now, tvc=1`（本次启动既是首装也是上一次）。
 *   - 老用户：`fvts` 不变，`lvts=now`（注意：不是 pending.lvts，是 commit 时的 now），`tvc=pending.tvc`。
 *
 * pending 为空 / commit 重复调用一律 noop（保持幂等，便于 collector 重试逻辑）。
 */
export function commitVisitOnAck(now: number): void {
  if (pending) {
    const snap = ensureLoaded()
    const newFvts = snap.fvts === 0 ? now : snap.fvts
    const newLvts = now
    const newTvc = pending.tvc

    storage.set(KEY_FVTS, newFvts)
    storage.set(KEY_LVTS, newLvts)
    storage.set(KEY_TVC, newTvc)

    committed = {
      fvts: newFvts,
      lvts: newLvts,
      tvc: newTvc,
      isNewUser: false,
      degraded: false,
    }
    loaded = committed
    pending = null
    return
  }

  if (!pendingRenewal) return

  const newFvts = pendingRenewal.fvts
  const newLvts = now
  const newTvc = pendingRenewal.tvc

  storage.set(KEY_FVTS, newFvts)
  storage.set(KEY_LVTS, newLvts)
  storage.set(KEY_TVC, newTvc)

  committed = {
    fvts: newFvts,
    lvts: newLvts,
    tvc: newTvc,
    isNewUser: false,
    degraded: false,
  }
  loaded = committed
  pendingRenewal = null
}

/**
 * 上报失败回滚：清掉 pending，下次再 build 仍基于 loaded snapshot 推进。
 *
 * **不**重置 `buildCalledInProcess`：同一进程内即使首批失败，也不允许"重新"再造一份
 * fvts/lvts 上报，避免污染。失败的批次应由 `pipeline/retry` 负责持久化重试。
 */
export function rollbackPendingVisit(): void {
  pending = null
  pendingRenewal = null
}

/** 取已 commit 的 snapshot（cst=2/3 复用）。 */
export function getCommitted(): VisitSnapshot | null {
  return committed
}

/** 仅供测试：清空所有内部状态，让模块 "像刚加载一样"。 */
export function __resetState(): void {
  loaded = null
  pending = null
  pendingRenewal = null
  committed = null
  lastBuilt = null
  buildCalledInProcess = false
}
