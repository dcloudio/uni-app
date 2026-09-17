/**
 * 生命周期 → collector 调度桥。
 *
 * 把 vue mixin / `uni.onAppShow|onAppHide` / push clientId 这些"运行时事件源"
 * 翻译成 collector 的 `report({lt, ...})` 调用，统一处理：
 *   - 会话状态机（ensureSession / markBackground）。
 *   - 入口页登记（entryPage）。
 *   - lastRoute / urlref / urlref_ts 维护。
 *   - 新会话首报：仅发一条 `lt=1`（Launch），新会话字段（sid/cst/fvts/lvts/tvc）随之上行；
 *     `app_show` 新 sid 后立即 **flush(true)**；`page_show`（cst=3）新 sid 在本轮 lt=11
 *     入队后 **flush(true)**（同批内 `LT_ORDER` 保证 lt=1 先于 lt=11）。与 `app_hide` 的
 *     lt=3+flush 一并降低「锚点未送达、后续已用新 sid」的丢失风险（与参数文档对齐；
 *     不再发已废弃的 `lt=0`）。
 *   - push CID 异步抓取后再发 `lt=101`，超时 / 失败静默丢弃。
 *
 * 暴露：
 *   - `bindLifecycle(app, opts?)`：返回 mixin / onAppShow / onAppHide 句柄与
 *     unbind 函数，runtime/install.ts 据此装到 vue & uni 上。
 *   - 内部句柄（`onLaunch / onAppShow / onAppHide / onPageShow / onPageHide / onError`）
 *     单独导出便于单测精准触发。
 *
 * 注意：本模块**不直接**依赖任何 adapter（除 `getCurrentRoute*` 与 `getLaunchScene`），
 * adapter 调用全部走 `tryRun` 兜底，单端缺失不影响调度。
 */

import { CST } from '../domain/eventTypes'
import { LT } from '../domain/eventTypes'
import {
  buildVisitFields,
  buildVisitFieldsForSessionRenewal,
} from '../domain/visit/firstVisit'
import {
  clearEntry,
  isEntryForIey,
  markEntryDeparted,
  markEntryPage,
} from '../domain/entry/entryPage'
import { getPagesJsonNavigationTitle } from '../adapter/pagesTitle'
import {
  clearPageTitle,
  getCurrentTitle,
  setConfigTitle,
  setReportTitle,
} from '../domain/title'
import {
  ensureSession,
  markBackground,
  syncLastScene,
} from '../domain/session/machine'
import {
  getCurrentRoute,
  getCurrentRouteWithQuery,
  getPageVmType,
} from '../adapter/route'
import { getPlatform, isH5, isMp, isNvue } from '../adapter/platform'
import { getLaunchScene } from '../adapter/lifecycle'
import { getPushClientId } from '../adapter/push'
import { logger } from '../infra/logger'
import { resolveUniRuntime } from '../infra/uniRuntime'
import { clampUrlrefStaySec, nowSec } from '../infra/time'
import { tryRun } from '../infra/safe'

import type { CollectorAPI } from '../pipeline/collector'
import type { StatApp } from './StatApp'

interface PageVm {
  route?: string
  mpType?: string
  $mpType?: string
  $options?: { mpType?: string }
  $page?: { route?: string; fullPath?: string }
  $scope?: { route?: string }
  $mp?: { mpType?: string; page?: { route?: string; is?: string } }
}

export interface LifecycleOptions {
  /**
   * 是否开启 push CID 抓取（默认 false，符合 push 默认关闭）。
   *
   * 对应 manifest `uniStatistics.collectItems.uniPushClientID`，私有版同名同义。
   * `false` 时 `handleLaunch` 不会调用 `getPushClientId`，也不会上报 lt=101。
   */
  enablePush?: boolean
  /** push CID 超时（ms）。 */
  pushTimeoutMs?: number
  /**
   * 是否上报页面日志 lt=11（默认 true）。
   *
   * 对应 manifest `uniStatistics.collectItems.uniStatPageLog`，私有版同名同义：
   * 仅控制**页面切换事件 lt=11** 的上报；**不影响** lt=1 / lt=3 / lt=21 / lt=31。
   * 与私有版 `is_page_report()` 在 `pageShow / pageHide` 上的拦截语义完全一致。
   */
  enablePageLog?: boolean
}

/** 上一页在 `onShow` 末尾快照的标题三元组，供下次进入新页时随 lt=11 上报「离开页」的 ttn/ttpj/ttc。 */
interface TitleSnap {
  ttn: string
  ttpj: string
  ttc: string
}

const EMPTY_TITLE_SNAP: TitleSnap = { ttn: '', ttpj: '', ttc: '' }

function resolveEventTimeSec(value?: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.floor(value)
    : nowSec()
}

interface LifecycleState {
  /** 上一个页面 path（不含 query）。 */
  lastRoute: string
  /** 上一页完整路径（含 query）；与 `lastRoute` 同源，用于 lt=11 的 `url`。 */
  lastRouteFull: string
  /**
   * 上上个页面 path（不含 query）。
   * lt=11 的 `urlref`：离开 `lastRoute` 进入新页时，指向「再上一层」来源页。
   */
  beforeLastRoute: string
  /** 上上个页面完整路径（含 query）；优先于 `beforeLastRoute` 写入上行 `urlref`。 */
  beforeLastRouteFull: string
  /** 上一页 onShow 时间戳（秒）；用于计算「离开页」停留 urlref_ts。 */
  lastRouteEnterTime: number
  /** 上一页 onShow 结束时快照的标题（对应上一页 / 即本轮 lt=11 描述对象）。 */
  lastPageTitleSnap: TitleSnap
  /**
   * 当前页是否为入口页。
   *
   * 在 `handlePageShow` 中被覆盖为新页 iey。**不要**用它表达 ppiey；
   * 表达"上一页是否入口页"的语义请使用 `prevIey`（修复缺陷 #PPIEY）。
   */
  lastIey: boolean
  /**
   * 上一页（即"用户从哪页跳进当前页"）是否入口页。
   *
   * 写入时机：在 `handlePageShow` 把当前 `lastIey` 备份到这里之后，再写入新页的 iey。
   * 读取时机：下一轮进入新页发 `lt=11` 时写入 `ppiey`。
   */
  prevIey: boolean
  /** isHide 标记：与私有版一致，用于区分 onUnload 是真离开还是隐藏。 */
  isHide: boolean
  /**
   * 是否经历过 `onAppHide`（进入后台）。
   *
   * 用于后台恢复链路：截断页面停留、抑制误发 lt=11；与 `backgroundEnteredAt` 配合。
   */
  wasBackgrounded: boolean
  /**
   * 是否存在待处理的后台恢复（Vue2 H5 常在 hide 过程中误触发 page onShow，
   * 过早清空 wasBackgrounded；用本标记保证真正回前台时再消费一次）。
   */
  pendingBackgroundResume: boolean
  /**
   * 最近一次进入后台的时间戳（秒）；对齐私有版 `set_first_time`。
   *
   * `handleAppShow` 传给 `ensureSession('app_show')`，避免仅依赖 storage `bgTs`
   * 未写入时无法判 `backgroundTimeout`（cst=2）。
   */
  backgroundEnteredAt: number
  /**
   * 后台恢复后的首个 pageShow 需跳过离开页上报（lt=11）。
   *
   * 目的：进入后台时已通过 lt=3 闭合当前页停留；恢复后若同页再次 onShow，
   * 不能再把后台时长算进 lt=11.urlref_ts。
   */
  suppressNextPageLogAfterResume: boolean
  /**
   * 最近一次后台恢复 lt=1 上报时刻（秒）。
   *
   * QQ 等 Vue3 小程序同次回前台会先后触发 mixin App.onShow 与 `uni.onAppShow`，
   * 且 scene 可能不一致；用于 `handleAppShow` fallback 去重。
   */
  backgroundResumeLt1At: number
}

/** 模块级状态。`bindLifecycle` 返回的 unbind 仅断订阅，不重置 state。 */
const state: LifecycleState = {
  lastRoute: '',
  lastRouteFull: '',
  beforeLastRoute: '',
  beforeLastRouteFull: '',
  lastRouteEnterTime: 0,
  lastPageTitleSnap: Object.assign({}, EMPTY_TITLE_SNAP),
  lastIey: false,
  prevIey: false,
  isHide: false,
  wasBackgrounded: false,
  pendingBackgroundResume: false,
  backgroundEnteredAt: 0,
  suppressNextPageLogAfterResume: false,
  backgroundResumeLt1At: 0,
}

/** 当前可见页上下文，供 lt=21 / lt=31 与页面生命周期复用同一份路由和标题状态。 */
export function getCurrentStatPageContext(): {
  url?: string
  iey?: boolean
  ttn?: string
  ttpj?: string
  ttc?: string
} {
  const url = state.lastRouteFull || state.lastRoute
  if (!url) return {}
  return Object.assign({ url, iey: state.lastIey }, getCurrentTitle())
}

/** Vue2 H5 hide 过程中偶发 page onShow（间隔≈0s），低于此阈值不消费 pending。 */
const BACKGROUND_RESUME_DEBOUNCE_SEC = 1

/** 同一次回前台多 hook 重复 lt=1 的去重窗口（秒）。 */
const BACKGROUND_RESUME_LT1_DEDUP_SEC = 3

/** 小程序等：page onHide 延迟判定「真进后台」；切页会在短时内 onShow 并取消。 */
const PAGE_APP_HIDE_DEFER_MS = 120
let pageAppHideDeferTimer: ReturnType<typeof setTimeout> | undefined

/**
 * Vue3 小程序等已绑定 `uni.onAppShow` 时，后台恢复应仅由 `handleAppShow` 消费。
 *
 * mixin / page onShow 过早消费会在 QQ 等端与 uni 回调形成双 hook，且 scene 不一致
 * （如 2001 vs 1011）导致重复 lt=1。Vue2 / H5 仍走 mixin 提前消费以适配 Page 先于 App onShow。
 */
function shouldEarlyConsumeBackgroundResumeInMixin(): boolean {
  return !shouldBindUniAppLifecycle()
}

/**
 * 记录本进程内最近一次后台恢复 lt=1 上报时刻。
 */
function markBackgroundResumeLt1Emitted(now: number): void {
  state.backgroundResumeLt1At = now
}

/**
 * 同一次回前台是否已在去重窗口内上报过后台恢复 lt=1。
 */
function shouldSkipDuplicateBackgroundResumeLt1(now: number): boolean {
  return (
    state.backgroundResumeLt1At > 0 &&
    now - state.backgroundResumeLt1At <= BACKGROUND_RESUME_LT1_DEDUP_SEC
  )
}

/**
 * 取消 page onHide 触发的延迟进后台判定（Vue2/Vue3 共用）。
 */
function cancelPageAppHideDefer(): void {
  if (pageAppHideDeferTimer !== undefined) {
    clearTimeout(pageAppHideDeferTimer)
    pageAppHideDeferTimer = undefined
  }
}

/**
 * H5 进后台时部分工程只触发 page onHide（Vue2/Vue3 均可能出现），
 * 需在 visibility 已为 hidden 时补记 lt=3；普通切页不会满足 hidden。
 */
function tryAppHideFromPageOnHideWhenH5Hidden(
  app: StatApp,
  opts: LifecycleOptions
): void {
  if (!isH5()) return
  if (state.pendingBackgroundResume) return
  const vis = (
    globalThis as unknown as { document?: { visibilityState?: string } }
  ).document?.visibilityState
  if (vis === 'hidden') {
    handleAppHide(app, opts)
  }
}

/**
 * 小程序等非 H5：page onHide 后短时延迟补记 lt=3；若随后 page onShow 则取消（切页）。
 */
function tryAppHideFromPageOnHideWhenMpDefer(
  app: StatApp,
  opts: LifecycleOptions
): void {
  if (isH5()) return
  if (state.pendingBackgroundResume) return
  cancelPageAppHideDefer()
  pageAppHideDeferTimer = setTimeout(() => {
    pageAppHideDeferTimer = undefined
    if (state.pendingBackgroundResume) return
    handleAppHide(app, opts)
  }, PAGE_APP_HIDE_DEFER_MS)
}

// #ifndef VUE3
/**
 * Vue2 部分端进后台只触发 page onHide，须在此时补 `handleAppHide`。
 *
 * 普通切页也会触发 page onHide，**不能**无条件补记（否则多报 lt=3）。
 * 对齐私有版 `pageHide`：仅当 `__licationHide` 为真时不再发页面离开；此处等价于：
 *   - H5：`document.visibilityState === 'hidden'` 才补记；
 *   - 其它端：短时延迟，若下一页 onShow 则取消（切页），否则视为进后台。
 */
function tryVue2AppHideFromPageOnHide(
  app: StatApp,
  opts: LifecycleOptions
): void {
  if (state.pendingBackgroundResume) return
  if (isH5()) {
    tryAppHideFromPageOnHideWhenH5Hidden(app, opts)
    return
  }
  tryAppHideFromPageOnHideWhenMpDefer(app, opts)
}
// #endif

// #ifdef VUE3
/**
 * Vue3 进后台补记 lt=3：
 *   - H5：page onHide + visibility hidden（App onHide 常不触发）；
 *   - 小程序等：`uni.onAppHide` 为主路径，page onHide 延迟为兜底（部分端/时序不触发 uni 回调）。
 */
function tryVue3AppHideFromPageOnHide(
  app: StatApp,
  opts: LifecycleOptions
): void {
  if (state.pendingBackgroundResume) return
  if (isH5()) {
    tryAppHideFromPageOnHideWhenH5Hidden(app, opts)
    return
  }
  tryAppHideFromPageOnHideWhenMpDefer(app, opts)
}
// #endif

/**
 * 取 collector；未 install 时返回 undefined（调用方需负责 noop）。
 */
function safeCollector(app: StatApp): CollectorAPI | undefined {
  return app.getCollector()
}

/**
 * 将 onLaunch / onShow 透传的 path 归一为 `markEntryPage` 使用的 route（去 query、去前导 `/`）。
 *
 * 与 `getCurrentRoute()` 常见返回值对齐，避免入口登记与实际页面 path 不一致。
 */
function normalizePathForEntryMark(raw: string): string {
  if (!raw || typeof raw !== 'string') return ''
  const noQuery = raw.split('?')[0] ?? ''
  return noQuery.startsWith('/') ? noQuery.slice(1) : noQuery
}

/**
 * 新会话首报：仅发一条 `lt=1`（Launch），新会话字段随之上行。
 *
 * 重要约束（修复 lvts=0 / lvts 缺失缺陷）：
 *   - 进程内首次 lt=1（cold_launch）调用 `buildVisitFields`；
 *   - cst=2/3 新会话 lt=1 调用 `buildVisitFieldsForSessionRenewal`，仍携带 fvts/lvts/tvc，
 *     避免 lvts 缺失被服务端误判为新用户。
 *   - 通过 `firstVisitEmittedInProcess` 哨兵区分上述两条路径。
 *   - `cst` 入参仅用于将来可能的本地侧打印 / 监控；上行字段已由 statData 从 session
 *     snapshot 中读取（出口字段名为 `cst`）。
 *   - `url` 参数：参数文档要求 `lt=1` 携带当前启动页的完整 url；冷启动 / app_show
 *     可从 launch options.path 兜底；page_show 触发的 cst=3 由调用方直接传当前页路径。
 */
function reportNewSession(
  c: CollectorAPI,
  _cst: number,
  scene: string,
  now: number,
  attachVisit: boolean,
  url: string = ''
): void {
  let visit: { fvts: number; lvts: number; tvc: number } | undefined
  if (attachVisit && !firstVisitEmittedInProcess) {
    firstVisitEmittedInProcess = true
    visit = tryRun(
      () => buildVisitFields(now),
      undefined as unknown as {
        fvts: number
        lvts: number
        tvc: number
      }
    )
  } else {
    // 续会话（attachVisit=false），或同进程内冷启 lt=1 已发过又被二次触发
    // （attachVisit=true 但 firstVisitEmittedInProcess 已 true）：都复用 renewal 字段，
    // 确保 lt=1 始终携带 fvts/lvts/tvc，杜绝"裸 lt=1 缺 lvts 被服务端按新增计入"。
    visit = tryRun(
      () => buildVisitFieldsForSessionRenewal(now),
      undefined as unknown as {
        fvts: number
        lvts: number
        tvc: number
      }
    )
  }
  const payload: Parameters<CollectorAPI['report']>[0] = {
    lt: LT.Launch,
    t: now,
    sc: scene,
    visit,
  }
  // url 仅当非空时携带；避免 lt=1 上行体出现 url=""（参数文档要求 url 至多 255 字符，但允许缺省）。
  if (url) payload.url = url
  c.report(payload)
}

/** 进程内是否已发过首批访问字段（fvts/lvts/tvc）。 */
let firstVisitEmittedInProcess = false

/**
 * 标题三元组快照代数：hide 优先写入快照并 ++；show 尾部 microtask 携带快照时的代数，
 * 若已被 hide 抢先递增则丢弃 microtask，避免「新页刚灌的 ttpj」顶替「离开页」应有的 ttn/ttc。
 */
let titleSnapGeneration = 0

/** 在同步栈清空后再采样标题，确保晚于页面自己的 onShow / setNavigationBarTitle。 */
function scheduleDeferredTitleSnapshot(): void {
  const gen = titleSnapGeneration
  const run =
    typeof queueMicrotask === 'function'
      ? queueMicrotask
      : (fn: () => void): void => {
          void Promise.resolve().then(fn)
        }
  run(() => {
    tryRun(() => {
      if (gen !== titleSnapGeneration) return
      state.lastPageTitleSnap = Object.assign({}, getCurrentTitle())
    }, undefined as void)
  })
}

/**
 * App.onLaunch：冷启动入口。
 *
 * 流程：
 *   1. ensureSession('cold_launch') → cst=1，必产新 session。
 *   2. 发一条 lt=1（携带 sid/cst/fvts/lvts/tvc/sc/url）。
 *   3. 异步抓 push CID，成功后发 lt=101。
 *   4. 兜底 onLaunch options 可能携带 scene / path（小程序）；path 透传成 lt=1 的 url。
 */
export function handleLaunch(
  app: StatApp,
  options: {
    scene?: string | number
    path?: string
    query?: Record<string, unknown>
  } = {},
  opts: LifecycleOptions = {},
  eventTimeSec?: number
): void {
  const c = safeCollector(app)
  if (!c) return
  const now = resolveEventTimeSec(eventTimeSec)
  const scene = tryRun(() => getLaunchScene(options.scene), '')
  const result = tryRun(
    () => ensureSession('cold_launch', { now, scene }),
    null
  )
  if (!result) return
  // 冷启动同样视为新会话：清旧入口登记，再按 launch path 登记入口，最后发 lt=1（不含 iey，入口仅 lt=11）。
  tryRun(() => clearEntry(), undefined)
  const url = options.path || ''
  const entryKey = normalizePathForEntryMark(url)
  if (entryKey) {
    tryRun(() => markEntryPage(entryKey), undefined)
  }
  reportNewSession(c, result.cst || CST.ColdLaunch, scene, now, true, url)

  if (opts.enablePush) {
    void getPushClientId({ enabled: true, timeoutMs: opts.pushTimeoutMs })
      .then((r) => {
        if (!r.ok || !r.cid) return
        const c2 = safeCollector(app)
        if (!c2) return
        c2.report({ lt: LT.Push, cid: r.cid, t: nowSec() })
      })
      .catch((e) => logger.warn('[uni统计 2.0] push cid fetch failed', e))
  }
}

/**
 * 消费「从后台回前台」会话判定（cst=2）；返回 true 表示已处理（含防抖跳过但仍保留 pending）。
 *
 * Vue2：Page onShow 常早于 App onShow，且 hide 过程中可能误触发一次 page onShow，
 * 若在那时清空 pending/wasBackgrounded，App onShow 将看不到后台标记（用户截图现象）。
 */
function tryConsumeBackgroundResume(
  app: StatApp,
  options: { scene?: string | number; path?: string } = {},
  _opts: LifecycleOptions = {},
  _from: string = 'unknown',
  eventTimeSec?: number,
  trustedAppShow = false
): boolean {
  if (!state.pendingBackgroundResume) {
    return false
  }
  const bgEnterAt = state.backgroundEnteredAt
  if (bgEnterAt <= 0) {
    return false
  }

  const c = safeCollector(app)
  if (!c) {
    return false
  }

  const now = resolveEventTimeSec(eventTimeSec)
  const elapsed = now - bgEnterAt
  if (elapsed < BACKGROUND_RESUME_DEBOUNCE_SEC && !trustedAppShow) {
    state.suppressNextPageLogAfterResume = true
    return true
  }

  state.wasBackgrounded = false
  state.suppressNextPageLogAfterResume = true
  state.lastRouteEnterTime = now

  const scene = tryRun(() => getLaunchScene(options.scene), '')
  const result = tryRun(
    () =>
      ensureSession('app_show', {
        now,
        scene,
        backgroundEnteredAt: bgEnterAt,
      }),
    null
  )

  state.pendingBackgroundResume = false
  state.backgroundEnteredAt = 0

  if (!result || !result.isNew) {
    return true
  }

  tryRun(() => clearEntry(), undefined)
  const url = options.path || state.lastRoute || ''
  const entryKey = normalizePathForEntryMark(url)
  if (entryKey) {
    tryRun(() => markEntryPage(entryKey), undefined)
  }
  reportNewSession(
    c,
    result.cst || CST.BackgroundTimeout,
    scene,
    now,
    false,
    url
  )
  markBackgroundResumeLt1Emitted(now)
  void c
    .flush(true)
    .catch((e) =>
      logger.warn('[uni统计 2.0] flush after new session (app_show) failed', e)
    )
  return true
}

/**
 * 应用从后台进入前台。
 *
 * 流程：
 *   1. `tryConsumeBackgroundResume`（pending）→ ensureSession('app_show') / cst=2。
 *   2. isNew=true 时发一条 lt=1，并 **flush(true)**。
 *   3. 无 pending 时仅处理 scene 变化等（少见）。
 */
export function handleAppShow(
  app: StatApp,
  options: { scene?: string | number; path?: string } = {},
  opts: LifecycleOptions = {},
  eventTimeSec?: number,
  trustedAppShow = false
): void {
  if (
    tryConsumeBackgroundResume(
      app,
      options,
      opts,
      'handleAppShow',
      eventTimeSec,
      trustedAppShow
    )
  )
    return

  const c = safeCollector(app)
  if (!c) return
  const now = resolveEventTimeSec(eventTimeSec)
  const scene = tryRun(() => getLaunchScene(options.scene), '')
  if (shouldSkipDuplicateBackgroundResumeLt1(now)) {
    tryRun(() => syncLastScene(scene), undefined)
    return
  }
  const result = tryRun(() => ensureSession('app_show', { now, scene }), null)
  if (!result || !result.isNew) {
    return
  }
  tryRun(() => clearEntry(), undefined)
  const url = options.path || state.lastRoute || ''
  const entryKey = normalizePathForEntryMark(url)
  if (entryKey) {
    tryRun(() => markEntryPage(entryKey), undefined)
  }
  reportNewSession(
    c,
    result.cst || CST.BackgroundTimeout,
    scene,
    now,
    false,
    url
  )
  markBackgroundResumeLt1Emitted(now)
  void c
    .flush(true)
    .catch((e) =>
      logger.warn('[uni统计 2.0] flush after new session (app_show) failed', e)
    )
}

/**
 * 应用进入后台。
 *
 * 流程：
 *   1. markBackground(now)：写 bgTs，让下次 app_show 能算超时。
 *   2. 若存在当前页且启用页面日志：先发一条 lt=11，闭合"离开当前页"语义（含 url/urlref/urlref_ts/iey/ppiey/title）。
 *   3. 再发 lt=3：保留"应用进入后台"语义（urlref=urlref_ts 指向后台前最后可见页）。
 *   4. 进入后台后强制 flush（force=true），尽量在被 kill 前送出。
 */
export function handleAppHide(
  app: StatApp,
  opts: LifecycleOptions = {},
  eventTimeSec?: number
): void {
  if (state.pendingBackgroundResume) return
  const c = safeCollector(app)
  if (!c) return
  const now = resolveEventTimeSec(eventTimeSec)
  state.wasBackgrounded = true
  state.pendingBackgroundResume = true
  state.backgroundEnteredAt = now
  tryRun(() => markBackground(now), undefined)
  const deltaStay =
    state.lastRouteEnterTime > 0 ? now - state.lastRouteEnterTime : 0
  const stayed = clampUrlrefStaySec(deltaStay)
  if (state.lastRoute && opts.enablePageLog !== false) {
    const exitedUrl = state.lastRouteFull || state.lastRoute
    const ref = state.beforeLastRouteFull || state.beforeLastRoute || ''
    const snap = state.lastPageTitleSnap
    const payload: Parameters<CollectorAPI['report']>[0] = {
      lt: LT.Page,
      t: now,
      url: exitedUrl,
      urlref_ts: stayed,
      iey: state.lastIey,
      ppiey: state.prevIey,
      ttn: snap.ttn,
      ttpj: snap.ttpj,
      ttc: snap.ttc,
    }
    if (ref) payload.urlref = ref
    c.report(payload)
    if (state.lastIey) {
      tryRun(() => markEntryDeparted(), undefined)
      state.lastIey = false
    }
  }
  c.report({
    lt: LT.Hide,
    t: now,
    urlref: state.lastRoute,
    urlref_ts: stayed,
  })
  void c
    .flush(true)
    .catch((e) => logger.warn('[uni统计 2.0] flush on hide failed', e))
}

/**
 * Page.onShow：页面前台展示。
 *
 * `lt=11`（页面日志）在**进入新页**的 `onShow` 触发，但语义描述的是**刚刚离开的页面**
 *（只有离开后才能闭合停留时长、导航栏标题等）：
 *
 *   - `url`：离开页的完整路径（含 query），来自上一次 onShow 结束时登记的 `lastRouteFull`。
 *   - `urlref`：再上一层的来源页（「上上个页面」），来自 `beforeLastRouteFull`；
 *     首次从启动页外跳（只有一层来源）时不带 `urlref`。
 *   - `urlref_ts`：离开页停留秒数（`now - lastRouteEnterTime`，不足 1 秒按 1 秒，对齐私有版）。
 *   - `iey` / `ppiey`：分别对应**离开页**是否仍为有效入口、`urlref` 指向页是否仍为有效入口
 *     （会话内仅**首次离开**登记入口为 1；循环回到入口后再离开不算）。
 *   - `ttn` / `ttpj` / `ttc`：三维独立内存（API 导航栏 / pages.json / uni.report('title')），
 *     **同一事件可同时非空**。离开页快照优先在 **`onHide` 且 `clearPageTitle` 之前**落盘；
 *     无 hide 场景依赖 **microtask**（晚于业务 `onShow`）— 由 `titleSnapGeneration` 防止被下一页 show 尾部误覆盖。
 *
 * 首次应用内 onShow（无前序页面）不发 `lt=11`。`enablePageLog=false` 时跳过整段 `lt=11`。
 */
export function handlePageShow(
  app: StatApp,
  vm: PageVm | undefined,
  opts: LifecycleOptions = {},
  eventTimeSec?: number
): void {
  const c = safeCollector(app)
  if (!c) return
  if (
    state.pendingBackgroundResume &&
    shouldEarlyConsumeBackgroundResumeInMixin()
  ) {
    tryConsumeBackgroundResume(app, {}, opts, 'handlePageShow', eventTimeSec)
  }
  const now = resolveEventTimeSec(eventTimeSec)
  const route = tryRun(() => getCurrentRoute(vm), '')
  const url = tryRun(() => getCurrentRouteWithQuery(vm), '') || route
  /**
   * H5/部分端存在"App.onShow 也会打到 mixin onShow"的情况，此时 this 并非页面 vm，
   * route/fullPath 为空。该事件应由 `handleAppShow` 处理，不能当 page_show。
   */
  if (!route && !url) return
  const result = tryRun(() => ensureSession('page_show', { now }), null)
  if (!result) return
  // 注入 pages.json 导航标题 → `ttpj`。ttn / ttc 已在上一页 hide 快照后清空；
  // 不能在 show 再清，否则会抹掉新页面 onLoad 中已设置的标题。
  tryRun(() => setConfigTitle(getPagesJsonNavigationTitle(route)), undefined)

  if (result.isNew) {
    // 新会话：清 entry → 先登记当前页为会话入口（与 lt=1「落地即入口」一致）→ 再发 lt=1。
    tryRun(() => clearEntry(), undefined)
  }
  if (route) {
    tryRun(() => markEntryPage(route), undefined)
  }
  if (result.isNew) {
    // cst=3：复用 committed visit 字段，与私有版 sendReportRequest 对齐。
    // 注意：lt=1（新会话首报）**不受** enablePageLog 控制 —— 与私有版语义一致，
    // is_page_report 仅拦截 pageShow/pageHide，不影响 launch/appShow/appHide。
    reportNewSession(
      c,
      result.cst || CST.PageInactiveTimeout,
      '',
      now,
      false,
      url
    )
  }
  // 存在上一页 → 发 lt=11：描述「离开的上一页」，而非当前 vm 所在页。
  const shouldSuppressPageLog = state.suppressNextPageLogAfterResume
  if (
    state.lastRoute &&
    opts.enablePageLog !== false &&
    !shouldSuppressPageLog
  ) {
    const deltaStay =
      state.lastRouteEnterTime > 0 ? now - state.lastRouteEnterTime : 0
    const stayed = clampUrlrefStaySec(deltaStay)
    const exitedUrl = state.lastRouteFull || state.lastRoute
    const ref = state.beforeLastRouteFull || state.beforeLastRoute || ''
    const snap = state.lastPageTitleSnap
    const payload: Parameters<CollectorAPI['report']>[0] = {
      lt: LT.Page,
      t: now,
      url: exitedUrl,
      urlref_ts: stayed,
      // 离开页是否入口页 / urlref 指向页是否入口页（进入新页前状态尚未被本轮覆盖）。
      iey: state.lastIey,
      ppiey: state.prevIey,
    }
    if (ref) payload.urlref = ref
    // 三维并列上行，不因其一存在而省略其它；空串由 builder/omit 统一处理
    payload.ttn = snap.ttn
    payload.ttpj = snap.ttpj
    payload.ttc = snap.ttc
    c.report(payload)
    if (state.lastIey) {
      tryRun(() => markEntryDeparted(), undefined)
    }
  }
  // 轮换路由链：当前页在下一轮成为「上一页」。
  state.beforeLastRoute = state.lastRoute
  state.beforeLastRouteFull = state.lastRouteFull
  state.prevIey = state.lastIey
  state.lastIey = !!route && tryRun(() => isEntryForIey(route), false)
  state.lastRoute = route
  state.lastRouteFull = url
  state.lastRouteEnterTime = now
  state.suppressNextPageLogAfterResume = false
  // 不在此处同步快照：此时 lastRoute 已指向新页，getCurrentTitle 会是新页 ttpj+空 ttn，造成顶替。
  // 离开页快照见 handlePageHide（优先）；否则见 scheduleDeferredTitleSnapshot。
  scheduleDeferredTitleSnapshot()
  state.isHide = false
  // cst=3 新会话：本 tick 内可能已入队 lt=1 与（若有上一页）lt=11；serializer 按 LT_ORDER
  // 保证同批内 lt=1 先于 lt=11。此处强制 flush，避免仍等 reportInterval 才被杀死丢锚点。
  if (result.isNew) {
    void c
      .flush(true)
      .catch((e) =>
        logger.warn(
          '[uni统计 2.0] flush after new session (page_show) failed',
          e
        )
      )
  }
}

/**
 * Page.onHide / Page.onUnload：页面隐藏 / 卸载。
 *
 * 私有版用 `isHide` 区分 onUnload 是隐藏还是真离开；本模块同样兼容。
 *
 * 公有版调整（与 `docs/uni统计上报参数.md` 对齐）：
 *   - `lt=11` 不在 onHide 上报；页面离开闭环由「下一次 `handlePageShow` 或 `handleAppHide`」触发。
 *   - onHide 仅做收尾：标记 isHide、快照并清掉页面级 title，避免串入下一页。
 *   - lastRoute / lastRouteEnterTime / lastIey 保持不变，由 `handlePageShow` 统一切换。
 */
export function handlePageHide(app: StatApp, _vm: PageVm | undefined): void {
  const c = safeCollector(app)
  if (!c) return
  state.isHide = true
  // 离开前快照：此时仍保留「本页」ttpj/ttn/ttc，必须先快照再清空页面级标题。
  titleSnapGeneration++
  state.lastPageTitleSnap = Object.assign({}, getCurrentTitle())
  tryRun(() => clearPageTitle(), undefined)
  tryRun(() => setReportTitle(''), undefined)
}

/**
 * 已经被本模块"异步重抛"过的错误实例，用于阻断 `onError → 重抛 → onError` 死循环。
 *
 * ## 选 WeakSet 的原因
 *   - 弱引用语义：业务方在外部 catch 这些 error 后，error 仍可被 GC，不内存泄漏。
 *   - uni-app 全端原生支持（H5 / 微信/支付宝/百度/字节 等小程序 / App-iOS/Android /
 *     nvue / uvue / 鸿蒙）—— vue runtime 自身大量使用 WeakSet/WeakMap 做响应式，
 *     任何不支持 WeakSet 的环境，vue 本身就起不来。
 *
 * ## 为什么仍然加 typeof 守卫
 *   作为 SDK 必须 defensive。万一极端环境（自定义沙箱阉割、业务代码 `delete
 *   globalThis.WeakSet`、SSR mock 等）导致 `new WeakSet()` 抛错，会让整个统计模块
 *   在初始化期 `ReferenceError` 加载失败 —— 过激的失败模式。
 *
 *   降级策略：退化为 has=false / add=noop 的 stub。后果是失去防重入保护，但 SDK
 *   仍可正常工作；最坏情况（小程序端 setTimeout 重抛被 mixin 二次接住）会触发
 *   一次额外的 setTimeout（仍是异步、不会同步阻塞），第二次 setTimeout 抛出后会
 *   到达全局 onError，仍然不会无限循环 —— 影响完全可控。
 *
 * ## 仅处理 object 类型
 *   非 object 错误（极少见的 `throw 'string'` / `throw 42` 等）无法进 WeakSet；
 *   且重抛非 object 在多数端的全局 onError 不会再次触发 vue mixin 的 onError，
 *   无重入风险，无需特殊处理。
 */
const rethrownErrors: WeakSet<object> =
  typeof WeakSet === 'function'
    ? new WeakSet<object>()
    : // 极端环境降级：has=false 永不命中，add=noop；本模块只用 has/add 两个方法，
      // 其它方法（delete / [Symbol.toStringTag]）调用方不依赖，类型断言即可。
      ({
        has: () => false,
        add: () => rethrownErrors,
      } as unknown as WeakSet<object>)

/**
 * onError：上报错误（lt=31）+ 异步重抛，让错误回归原生 "Uncaught Error" 通路。
 *
 * ## 设计目标：统计是**旁路监听**，绝不侵入业务方的报错体验
 *
 * ### 私有版（含早期公有版）的两种错误做法都不达标
 *
 * 1. **私有版 `src/index.js#onError`**：仅 `stat.error(e)`，**完全吞掉错误**。
 *    一旦 mixin 注册了 onError，uni-app/Vue 视为业务已处理 → Vue 不再 console.error
 *    → 业务方在 H5 端排错时控制台一片空白，看不到任何 stack。
 *
 * 2. **早期公有版 `console.error(e)` 兜底**：能看到 stack，但 devtools 会把
 *    `console.error` 的**调用文件**（即 SDK 路径 `uni-stat-public.es.js:行号`）
 *    显示在控制台日志右侧的"来源"列。业务方误以为统计 SDK 出现在他们的错误栈里，
 *    与"旁路监听"承诺相悖。
 *
 * ### 当前方案：`setTimeout(() => { throw e }, 0)` 异步重抛（**仅非小程序**）
 *
 * - **H5 / App 等**：错误进入浏览器 / 原生 "Uncaught Exception" 通路（同 `window.onerror`），
 *   与**完全没接入统计**时的默认行为一致，且控制台「来源」指向用户任务而非 SDK。
 *
 * - **各小程序（`mp-*`）**：**不重抛**。运行时已在首次异常路径打印 `MiniProgramError` 等；
 *   若再 `setTimeout(throw)`，会二次进入全局 `onError`，且微信往往传入**新的包装对象**，
 *   `WeakSet` 无法按引用去重 → 多条 `lt=31`、控制台刷屏。统计在此只做旁路上报。
 *
 * ### 防重入（主要针对仍走重抛的环境）
 *
 * 重抛后可能被二次回调；用 `rethrownErrors`(WeakSet) 标记已处理的 error 实例。
 *
 * ### 顺序
 *
 * 1. **先标记重入防护** —— 防止极端竞态下 setTimeout 在同步上报完成前已 fire。
 * 2. **再上报** —— 同步执行，确保 lt=31 一定入队。
 * 3. **非小程序**：**最后**异步重抛 —— `setTimeout 0` 排到下一 task；小程序端跳过此步。
 *
 * 外层 `try/catch` 仅兜底 `reportError` 自身抛错（与私有版一致）；`tryRun` 兜底
 * `setTimeout` 在极端环境（如 SSR / 被 mock 的 timer）下不可用的情况。
 */
export function handleError(
  app: StatApp,
  e: unknown,
  eventTimeSec?: number,
  rethrow = true
): void {
  const isObj = typeof e === 'object' && e !== null
  if (isObj && rethrownErrors.has(e as object)) return
  if (isObj) rethrownErrors.add(e as object)

  try {
    app.reportError(e, eventTimeSec)
  } catch (err) {
    logger.warn('[uni统计 2.0] handleError failed', err)
  }

  if (!rethrow || isMp()) {
    return
  }

  tryRun(() => {
    setTimeout(() => {
      throw e
    }, 0)
  }, undefined as void)
}

interface UniLifecycleApi {
  onAppShow?: (
    cb: (e: { scene?: string | number; path?: string }) => void
  ) => void
  onAppHide?: (cb: () => void) => void
  offAppShow?: (
    cb: (e: { scene?: string | number; path?: string }) => void
  ) => void
  offAppHide?: (cb: () => void) => void
}

function getUni(): UniLifecycleApi | undefined {
  const u = resolveUniRuntime()
  return u != null && typeof u === 'object' ? (u as UniLifecycleApi) : undefined
}

/**
 * 是否由 mixin 分发 App 级 onShow/onHide（对齐私有版 `stat.show` / `stat.hide`）。
 *
 * - Vue2：始终走 mixin（`load_stat` 不注册 uni.onAppShow/Hide）。
 * - Vue3：仅 H5 / nvue 走 mixin；小程序等走 `uni.onAppShow` / `onAppHide`。
 *
 * 使用赋值而非连续 `return`：公有版 dist 经 Rollup 打包时，连续 return 会导致
 * `#ifdef VUE3` 分支被 tree-shake；应用构建再剥离 `#ifndef VUE3` 后函数体为空 → undefined。
 */
export function shouldMixinDispatchAppLifecycle(): boolean {
  let result = isH5() || getPlatform() === 'n' || isNvue()
  // #ifndef VUE3
  result = true
  // #endif
  // #ifdef VUE3
  result = isH5() || getPlatform() === 'n' || isNvue()
  // #endif
  return result
}

/**
 * 是否注册 `uni.onAppShow` / `onAppHide`（对齐私有版 `index.js#load_stat` VUE3 分支）。
 *
 * 仅 Vue3 且非 H5、非 nvue（即小程序等）为 true；Vue2 必须为 false。
 */
export function shouldBindUniAppLifecycle(): boolean {
  let result = !isH5() && getPlatform() !== 'n' && !isNvue()
  // #ifndef VUE3
  result = false
  // #endif
  // #ifdef VUE3
  result = !isH5() && getPlatform() !== 'n' && !isNvue()
  // #endif
  return result
}

const uniAppHookRegistry = {
  showBound: false,
  hideBound: false,
  appShowCb: undefined as
    | ((e: { scene?: string | number; path?: string }) => void)
    | undefined,
  appHideCb: undefined as (() => void) | undefined,
}

/**
 * 订阅应用级 `uni.onAppShow` / `onAppHide`；`uni` 或 API 未就绪时返回 false，可稍后重试。
 *
 * show/hide 分别绑定：避免 `onAppShow` 晚就绪时连 `onAppHide` 也无法注册（lt=3 缺失）。
 */
export function tryBindUniAppLifecycle(
  app: StatApp,
  opts: LifecycleOptions = {}
): boolean {
  if (!shouldBindUniAppLifecycle()) return false
  const u = getUni()
  if (!u) return false

  if (!uniAppHookRegistry.showBound && typeof u.onAppShow === 'function') {
    uniAppHookRegistry.appShowCb = (e): void =>
      handleAppShow(app, e ?? {}, opts)
    tryRun(() => u.onAppShow!(uniAppHookRegistry.appShowCb!), undefined)
    uniAppHookRegistry.showBound = true
  }

  if (!uniAppHookRegistry.hideBound && typeof u.onAppHide === 'function') {
    uniAppHookRegistry.appHideCb = (): void => handleAppHide(app, opts)
    tryRun(() => u.onAppHide!(uniAppHookRegistry.appHideCb!), undefined)
    uniAppHookRegistry.hideBound = true
  }

  return uniAppHookRegistry.showBound && uniAppHookRegistry.hideBound
}

/** 解绑 `tryBindUniAppLifecycle` 注册的回调。 */
function unbindUniAppLifecycle(): void {
  if (!uniAppHookRegistry.showBound && !uniAppHookRegistry.hideBound) return
  const cur = getUni()
  if (
    uniAppHookRegistry.showBound &&
    uniAppHookRegistry.appShowCb &&
    cur?.offAppShow
  ) {
    tryRun(() => cur.offAppShow!(uniAppHookRegistry.appShowCb!), undefined)
  }
  if (
    uniAppHookRegistry.hideBound &&
    uniAppHookRegistry.appHideCb &&
    cur?.offAppHide
  ) {
    tryRun(() => cur.offAppHide!(uniAppHookRegistry.appHideCb!), undefined)
  }
  uniAppHookRegistry.showBound = false
  uniAppHookRegistry.hideBound = false
  uniAppHookRegistry.appShowCb = undefined
  uniAppHookRegistry.appHideCb = undefined
}

export interface BindLifecycleResult {
  /** vue.mixin(...) 入参。 */
  mixin: Record<string, unknown>
  /** 解绑 uni.onAppShow / onAppHide。多次调用 noop。 */
  unbind: () => void
  /** 在 `uni.onAppShow` 晚就绪时重试订阅；已成功则返回 true。 */
  tryBindUniAppHooks: () => boolean
}

/**
 * 装配 vue mixin；Vue3 小程序等另由 `tryBindUniAppLifecycle` 订阅 uni 应用前后台。
 *
 * 与私有版 `src/index.js` + `core/stat.js#show|hide` 对齐：
 *   - Vue2：仅 `Vue.mixin`，App/Page 均在 mixin 的 onShow/onHide 内分支。
 *   - Vue3：H5/nvue 的 App 前后台在 mixin；其它端用 uni.onAppShow/onAppHide。
 */
export function bindLifecycle(
  app: StatApp,
  opts: LifecycleOptions = {}
): BindLifecycleResult {
  let bound = true

  const mixin: Record<string, unknown> = {
    onLaunch(
      this: unknown,
      options: { scene?: string | number; path?: string } = {}
    ): void {
      handleLaunch(app, options, opts)
    },
    onLoad(): void {
      // 保留钩子位，用于未来扩展（query 收集等）；当前 noop。
    },
    onShow(this: PageVm): void {
      const vmType = getPageVmType(this)
      cancelPageAppHideDefer()
      if (
        state.pendingBackgroundResume &&
        shouldEarlyConsumeBackgroundResumeInMixin()
      ) {
        tryConsumeBackgroundResume(app, {}, opts, 'mixin.onShow')
      }
      state.isHide = false
      if (vmType === 'page') {
        handlePageShow(app, this, opts)
      }
      if (shouldMixinDispatchAppLifecycle() && vmType === 'app') {
        handleAppShow(app, {}, opts)
      }
    },
    onHide(this: PageVm): void {
      state.isHide = true
      if (getPageVmType(this) === 'page') {
        handlePageHide(app, this)
        // #ifndef VUE3
        tryVue2AppHideFromPageOnHide(app, opts)
        // #endif
        // #ifdef VUE3
        tryVue3AppHideFromPageOnHide(app, opts)
        // #endif
      }
      if (
        shouldMixinDispatchAppLifecycle() &&
        getPageVmType(this) === 'app' &&
        !state.pendingBackgroundResume
      ) {
        handleAppHide(app, opts)
      }
    },
    onUnload(this: PageVm): void {
      if (state.isHide) {
        state.isHide = false
        return
      }
      handlePageHide(app, this)
    },
    onError(this: unknown, e: unknown): void {
      handleError(app, e)
    },
  }

  if (shouldBindUniAppLifecycle()) {
    tryBindUniAppLifecycle(app, opts)
  }

  return {
    mixin,
    tryBindUniAppHooks: (): boolean =>
      shouldBindUniAppLifecycle() && tryBindUniAppLifecycle(app, opts),
    unbind(): void {
      if (!bound) return
      bound = false
      unbindUniAppLifecycle()
    },
  }
}

/** 仅供测试：清空内部 lastRoute 等状态以及"已发首批 visit 字段"哨兵。 */
export function __resetLifecycleState(): void {
  state.lastRoute = ''
  state.lastRouteFull = ''
  state.beforeLastRoute = ''
  state.beforeLastRouteFull = ''
  state.lastRouteEnterTime = 0
  state.lastPageTitleSnap = Object.assign({}, EMPTY_TITLE_SNAP)
  state.lastIey = false
  state.prevIey = false
  state.isHide = false
  state.wasBackgrounded = false
  state.pendingBackgroundResume = false
  state.backgroundEnteredAt = 0
  state.suppressNextPageLogAfterResume = false
  state.backgroundResumeLt1At = 0
  titleSnapGeneration = 0
  firstVisitEmittedInProcess = false
  unbindUniAppLifecycle()
  cancelPageAppHideDefer()
}
