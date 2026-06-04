/**
 * 客户端会话状态机（公有版核心新增）。
 *
 * 设计文档：`03-公有版架构设计.md` §3。
 *
 * 状态：
 *   - `None`：未生成过 session（首次启动 / clearStorage 后）。
 *   - `Active`：前台有有效 session，可继续 touch 推进 lastActive。
 *   - `Background`：应用进入后台，等待返回前台时判定是否超时。
 *
 * 触发器 → cst 映射：
 *   - `cold_launch`：进程冷启动 → cst=1。
 *   - `app_show` (从后台返回)：
 *       - now - bgTs >= backgroundTimeoutSec → 新 session, cst=2（与私有版 pageTime
 *         可读性对齐：配置为 10 秒时，隐藏端与显示端秒戳相差 10 即视为超时）。
 *       - 否则复用旧 session, cst=0。
 *   - `wx_scene_changed`：scene 与上次不同 → 新 session, cst=2。
 *   - `page_show` (前台已有 session)：
 *       - now - lastActive >= pageInactiveTimeoutSec → 新 session, cst=3。
 *       - 否则 touch & 复用, cst=0。
 *
 * 关键设计：所有 storage 操作都带 try / safeRead 兜底；任何路径都不抛异常，
 * 失败 → 退化生成新 session，避免阻塞采集链路。
 */

import { getUuid } from '../../adapter/device'
import { genSid } from '../../infra/sid'
import { storage } from '../../infra/storage'
import { CST, type CSTValue } from '../eventTypes'

const KEY_SID = 'session:id'
const KEY_SST = 'session:start'
const KEY_SCT = 'session:sct'
const KEY_SEQ = 'session:seq'
const KEY_LAST_ACTIVE = 'session:lastActive'
const KEY_BG_TS = 'session:bgTs'
const KEY_LAST_SCENE = 'session:lastScene'

export interface SessionConfig {
  /** 后台超时（秒）。默认 300 = 5min。 */
  backgroundTimeoutSec: number
  /** 前台无操作超时（秒）。默认 1800 = 30min。 */
  pageInactiveTimeoutSec: number
}

export interface SessionSnapshot {
  sid: string
  /** session 开始时间戳（秒）。 */
  sst: number
  /** session 创建类型。 */
  sct: CSTValue
  /** 当前 seq（已分配的最大值）。 */
  seq: number
  /** 上次操作时间戳（秒）。 */
  lastActive: number
  /** 进入后台时间戳（秒），未在后台为 0。 */
  bgTs: number
  /** 上次记录的 scene（仅 wx 系小程序使用）。 */
  lastScene: string
}

export type Trigger =
  | 'cold_launch'
  | 'app_show'
  | 'page_show'
  | 'wx_scene_changed'

export interface EnsureContext {
  /** 当前秒级时间戳。 */
  now: number
  /** wx scene；仅 wx_scene_changed / app_show 触发时有意义。 */
  scene?: string
  /**
   * 进入后台时刻（秒）；由 lifecycle `handleAppHide` 写入。
   *
   * 对齐私有版 `set_first_time` + `get_residence_time('app')`：即使 session 的
   * `bgTs` 未落盘，只要 lifecycle 确认走过 hide，仍可按 `backgroundTimeout` 判 cst=2。
   */
  backgroundEnteredAt?: number
}

export interface EnsureResult {
  snapshot: SessionSnapshot
  /** 是否生成了新 session（true 时上层应额外发一条 lt=1 携带新会话字段）。 */
  isNew: boolean
  /** 本次创建的 cst；isNew=false 时为 0。 */
  cst: CSTValue | 0
}

const DEFAULT_CONFIG: SessionConfig = {
  backgroundTimeoutSec: 300,
  pageInactiveTimeoutSec: 1800,
}

let config: SessionConfig = Object.assign({}, DEFAULT_CONFIG)
let cached: SessionSnapshot | null = null

/** 配置注入（runtime/install.ts 在启动时调一次）。 */
export function configure(c: Partial<SessionConfig>): void {
  config = Object.assign({}, DEFAULT_CONFIG, c)
}

/**
 * 工具：把 storage 读取到的值转 number；非法值返回 0。
 */
function readNum(key: string): number {
  const r = storage.safeRead<unknown>(key)
  if (!r.ok) return 0
  const v = r.value
  if (typeof v === 'number' && Number.isFinite(v) && v >= 0) return v
  if (typeof v === 'string' && v.length > 0) {
    const n = Number(v)
    if (Number.isFinite(n) && n >= 0) return n
  }
  return 0
}

function readStr(key: string): string {
  const r = storage.safeRead<unknown>(key)
  if (!r.ok) return ''
  return typeof r.value === 'string' ? r.value : ''
}

/**
 * 计算 `now - from` 的非负秒差，防止设备时钟回拨（NTP 校时 / 用户手动改时间）导致
 * `elapsed < 0` 使后台 / 无操作超时判定**永不触发**、会话被异常拉长。
 *
 * 与 `infra/time.elapsedSec` 同语义（负值钳零），此处因状态机入参 `now` 由调用方注入、
 * 不直接走 `nowSec()`，故就地实现保持纯函数可测。
 */
function elapsedNonNeg(now: number, from: number): number {
  const diff = now - from
  return diff > 0 ? diff : 0
}

/**
 * 从 storage 重建 snapshot；任意字段缺失返回 null。
 */
function loadFromStorage(): SessionSnapshot | null {
  const sid = readStr(KEY_SID)
  if (!sid) return null
  return {
    sid,
    sst: readNum(KEY_SST),
    sct: (readNum(KEY_SCT) || CST.ColdLaunch) as CSTValue,
    seq: readNum(KEY_SEQ),
    lastActive: readNum(KEY_LAST_ACTIVE),
    bgTs: readNum(KEY_BG_TS),
    lastScene: readStr(KEY_LAST_SCENE),
  }
}

function ensureCache(): SessionSnapshot | null {
  if (cached !== null) return cached
  cached = loadFromStorage()
  return cached
}

/**
 * 创建一个新 session，写入 storage 并返回新的 snapshot。
 *
 * 内部职责：
 *   - 重置 seq=0、lastActive=now、bgTs=0。
 *
 * 注：原"上一会话 sid（pid）"机制已移除——参数文档无 pid 字段，后端无入库口径，
 *     新会话的字段仅随当次 lt=1 携带。
 */
function createNew(now: number, sct: CSTValue, scene: string): SessionSnapshot {
  const sid = genSid(getUuid())
  const next: SessionSnapshot = {
    sid,
    sst: now,
    sct,
    seq: 0,
    lastActive: now,
    bgTs: 0,
    lastScene: scene,
  }
  storage.set(KEY_SID, sid)
  storage.set(KEY_SST, now)
  storage.set(KEY_SCT, sct)
  storage.set(KEY_SEQ, 0)
  storage.set(KEY_LAST_ACTIVE, now)
  storage.set(KEY_BG_TS, 0)
  storage.set(KEY_LAST_SCENE, scene)
  cached = next
  return next
}

/**
 * 主入口：根据 trigger 与上下文，确保 session 处于正确状态。
 *
 * 结果包含 isNew / cst，供 lifecycleHooks 决定本次 lt=1 是否携带 fvts/lvts/tvc。
 */
export function ensureSession(t: Trigger, ctx: EnsureContext): EnsureResult {
  const { now, scene = '' } = ctx
  const snap = ensureCache()

  if (t === 'cold_launch') {
    const created = createNew(now, CST.ColdLaunch, scene)
    return { snapshot: created, isNew: true, cst: CST.ColdLaunch }
  }

  if (!snap) {
    // 没有现存 session（罕见：app_show 但 storage 被清）→ 视为冷启动
    const created = createNew(now, CST.ColdLaunch, scene)
    return { snapshot: created, isNew: true, cst: CST.ColdLaunch }
  }

  if (t === 'app_show') {
    const enterCandidates: number[] = []
    if (ctx.backgroundEnteredAt && ctx.backgroundEnteredAt > 0) {
      enterCandidates.push(ctx.backgroundEnteredAt)
    }
    if (snap.bgTs > 0) {
      enterCandidates.push(snap.bgTs)
    }
    const enterTs =
      enterCandidates.length > 0 ? Math.min(...enterCandidates) : 0
    const elapsed =
      enterTs > 0
        ? elapsedNonNeg(now, enterTs)
        : elapsedNonNeg(now, snap.lastActive)
    const sceneChanged = !!scene && !!snap.lastScene && scene !== snap.lastScene
    const fromBackground = enterTs > 0
    if (
      sceneChanged ||
      (fromBackground && elapsed >= config.backgroundTimeoutSec)
    ) {
      const created = createNew(now, CST.BackgroundTimeout, scene)
      return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout }
    }
    // 未超时：清 bgTs，更新 lastActive
    touch(now)
    storage.set(KEY_BG_TS, 0)
    if (cached) cached.bgTs = 0
    return { snapshot: cached!, isNew: false, cst: 0 }
  }

  if (t === 'wx_scene_changed') {
    if (scene && scene !== snap.lastScene) {
      const created = createNew(now, CST.BackgroundTimeout, scene)
      return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout }
    }
    return { snapshot: snap, isNew: false, cst: 0 }
  }

  // page_show：判定前台无操作超时
  const elapsed = elapsedNonNeg(now, snap.lastActive)
  if (elapsed >= config.pageInactiveTimeoutSec) {
    const created = createNew(
      now,
      CST.PageInactiveTimeout,
      scene || snap.lastScene
    )
    return { snapshot: created, isNew: true, cst: CST.PageInactiveTimeout }
  }
  touch(now)
  return { snapshot: cached!, isNew: false, cst: 0 }
}

/**
 * 标记应用进入后台。写入 bgTs，供下次 app_show 判定超时。
 */
export function markBackground(now: number): void {
  if (!cached) cached = loadFromStorage()
  if (!cached) return
  storage.set(KEY_BG_TS, now)
  cached.bgTs = now
}

/**
 * 更新 lastActive；page_show 与**用户主动行为事件**（collector 在收到 lt=21 自定义/
 * 拦截器事件时调用）触发。这样「前台无操作超时（cst=3）」与文档「无任何 page/event
 * 触达」语义一致：用户持续点按但不翻页时不会被误判为无操作而开新会话。
 */
export function touch(now: number): void {
  if (!cached) cached = loadFromStorage()
  if (!cached) return
  storage.set(KEY_LAST_ACTIVE, now)
  cached.lastActive = now
}

/**
 * 取下一个 seq；先递增 storage 中的 seq，再返回新值。
 *
 * 失败兜底：若 storage 异常，仍以内存 cached.seq 自增；保证序号单调，但跨进程可能跳号。
 */
export function nextSeq(): number {
  if (!cached) cached = loadFromStorage()
  if (!cached) return 0
  const next = cached.seq + 1
  cached.seq = next
  storage.set(KEY_SEQ, next)
  return next
}

/** 取当前 snapshot；未初始化时尝试从 storage 加载，仍为空返回 null。 */
export function getSnapshot(): SessionSnapshot | null {
  return ensureCache()
}

/**
 * 同步更新 session 的 lastScene，不触发新会话。
 *
 * 用于同一次回前台多 hook 携带不同 scene 时，避免重复 lt=1 后补写正确 scene。
 */
export function syncLastScene(scene: string): void {
  if (!scene) return
  if (!cached) cached = loadFromStorage()
  if (!cached) return
  storage.set(KEY_LAST_SCENE, scene)
  cached.lastScene = scene
}

/** 仅供测试：清空内部缓存与配置。 */
export function __resetState(): void {
  cached = null
  config = Object.assign({}, DEFAULT_CONFIG)
}
