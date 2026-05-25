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
 *   1. 三段拆分：`loadVisitSnapshot()` 纯读、`buildVisitFields()` 仅生成本次待写、
 *      `commitVisitOnAck()` 在上报 ack 后才落 storage。
 *   2. **禁止**任何函数同时写 fvts 与 lvts；fvts 仅在 `commitVisitOnAck` 中且只在
 *      "首次启动" 路径写一次，永不主动清 lvts。
 *   3. `loadVisitSnapshot` 区分 "key 不存在" 与 "storage 异常"：
 *      - 不存在 → `lvts=0`，按新用户路径走（Yes new user）。
 *      - 异常   → 内存有上次 snapshot 时复用之；首次启动且异常 → fallback `lvts=0`，
 *        但**记录** `degraded=true`，上层可决定是否仍上报（Phase 5 collector 用）。
 *   4. 同一进程内只允许一次 `buildVisitFields`；后续 cst=2/3 触发的事件**不调用**本函数，
 *      由 collector 直接复用 `getCommitted()` 的内存 snapshot 继续推进 tvc/lvts。
 *
 * 与 `pipeline/collector.ts` 的契约见 `05-公有版重构开发计划.md` §4.1.5。
 */

import { logger } from '../../infra/logger'
import { storage } from '../../infra/storage'

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
  /** 等价 `fvts === 0 || lvts === 0`，调用方判分支用。 */
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
    isNewUser: fvts === 0 || lvts === 0,
    degraded,
  }
  if (degraded) {
    const likelyFresh =
      fvts === 0 && lvts === 0 && tvc === 0 && snapshot.isNewUser
    if (!likelyFresh) {
      logger.warn(
        '[uni-stat] visit snapshot degraded; some storage keys read failed'
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
 * 生成本次启动要上报的 fvts/lvts/tvc 三元组（**不写 storage**）。
 *
 * 推进规则：
 *   - 新用户（loaded.isNewUser）：本次 fvts=now, lvts=0（仍上报 0 表示新用户），tvc=1。
 *   - 老用户：fvts 维持 loaded.fvts；lvts 上报 loaded.lvts（"上一次"，不是 now）；tvc=loaded.tvc+1。
 *
 * 注意：同一进程内只允许调用一次（参考 `domain/session` 设计），后续 cst=2/3 事件
 * 不携带 fvts/lvts/tvc。这里通过 `buildCalledInProcess` 哨兵防止误用，二次调用返回
 * 与首次相同的结果但发出 warn，便于排查上层 collector bug。
 */
export function buildVisitFields(now: number): {
  fvts: number
  lvts: number
  tvc: number
} {
  const snap = ensureLoaded()
  if (buildCalledInProcess && lastBuilt) {
    logger.warn(
      '[uni-stat] buildVisitFields() called twice in same process; returning cached fields'
    )
    return Object.assign({}, lastBuilt)
  }
  buildCalledInProcess = true

  if (snap.isNewUser) {
    pending = { fvts: now, lvts: 0, tvc: 1, now }
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
 * 上报 ack 成功后落库。
 *
 * 实际写入：
 *   - 新用户：`fvts=now, lvts=now, tvc=1`（本次启动既是首装也是上一次）。
 *   - 老用户：`fvts` 不变，`lvts=now`（注意：不是 pending.lvts，是 commit 时的 now），`tvc=pending.tvc`。
 *
 * pending 为空 / commit 重复调用一律 noop（保持幂等，便于 collector 重试逻辑）。
 */
export function commitVisitOnAck(now: number): void {
  if (!pending) return
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
}

/**
 * 上报失败回滚：清掉 pending，下次再 build 仍基于 loaded snapshot 推进。
 *
 * **不**重置 `buildCalledInProcess`：同一进程内即使首批失败，也不允许"重新"再造一份
 * fvts/lvts 上报，避免污染。失败的批次应由 `pipeline/retry` 负责持久化重试。
 */
export function rollbackPendingVisit(): void {
  pending = null
}

/** 取已 commit 的 snapshot（cst=2/3 复用）。 */
export function getCommitted(): VisitSnapshot | null {
  return committed
}

/** 仅供测试：清空所有内部状态，让模块 "像刚加载一样"。 */
export function __resetState(): void {
  loaded = null
  pending = null
  committed = null
  lastBuilt = null
  buildCalledInProcess = false
}
