/**
 * 生命周期 → collector 调度桥。
 *
 * 把 vue mixin / `uni.onAppShow|onAppHide` / push clientId 这些"运行时事件源"
 * 翻译成 collector 的 `report({lt, ...})` 调用，统一处理：
 *   - 会话状态机（ensureSession / markBackground）。
 *   - 入口页登记（entryPage）。
 *   - lastRoute / urlref / urlref_ts 维护。
 *   - 新会话首报先发 `lt=0`（Session）再发 `lt=1`（Launch），与设计文档 §3.5 对齐。
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
import { buildVisitFields } from '../domain/visit/firstVisit'
import { clearEntry, isEntry, markEntryPage } from '../domain/entry/entryPage'
import { clearPageTitle, setConfigTitle } from '../domain/title'
import { ensureSession, markBackground } from '../domain/session/machine'
import { getCurrentRoute, getCurrentRouteWithQuery } from '../adapter/route'
import { getLaunchScene } from '../adapter/lifecycle'
import { getPushClientId } from '../adapter/push'
import { logger } from '../infra/logger'
import { nowSec } from '../infra/time'
import { tryRun } from '../infra/safe'

import type { CollectorAPI } from '../pipeline/collector'
import type { StatApp } from './StatApp'

interface PageVm {
  route?: string
  $page?: { route?: string; fullPath?: string }
  $scope?: { route?: string }
  $mp?: { page?: { route?: string; is?: string } }
}

export interface LifecycleOptions {
  /** 是否开启 push CID 抓取（默认 false，符合 push 默认关闭）。 */
  enablePush?: boolean
  /** push CID 超时（ms）。 */
  pushTimeoutMs?: number
  /** 是否在新会话首报时发 lt=0（默认 true）。 */
  emitSessionEvent?: boolean
}

interface LifecycleState {
  /** 上一个页面 path（不含 query）。 */
  lastRoute: string
  /** 上一页 onShow 时间戳（秒）；用于计算 urlref_ts。 */
  lastRouteEnterTime: number
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
   * 读取时机：`handlePageHide` 上报 `ppiey: state.prevIey`，与字段语义对齐。
   */
  prevIey: boolean
  /** isHide 标记：与私有版一致，用于区分 onUnload 是真离开还是隐藏。 */
  isHide: boolean
}

/** 模块级状态。`bindLifecycle` 返回的 unbind 仅断订阅，不重置 state。 */
const state: LifecycleState = {
  lastRoute: '',
  lastRouteEnterTime: 0,
  lastIey: false,
  prevIey: false,
  isHide: false,
}

/**
 * 取 collector；未 install 时返回 undefined（调用方需负责 noop）。
 */
function safeCollector(app: StatApp): CollectorAPI | undefined {
  return app.getCollector()
}

/**
 * 新会话首报：先 `lt=0`（Session），再 `lt=1`（Launch），均带 cst。
 *
 * 重要约束（修复 lvts=0 缺陷）：
 *   - `fvts/lvts/tvc` **只在进程首报**（cold_launch 触发的首次 ensureSession）携带；
 *     cst=2（后台超时）/ cst=3（前台无操作超时）创建的新 session **不**带。
 *   - 通过 `firstVisitEmittedInProcess` 哨兵保证全进程只调用一次 `buildVisitFields`。
 *   - 若上层禁用 lt=0（emitSessionEvent=false），则只发 lt=1。
 */
function reportNewSession(
  c: CollectorAPI,
  cst: number,
  scene: string,
  emitSessionEvent: boolean,
  now: number,
  attachVisit: boolean
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
  }
  if (emitSessionEvent) {
    c.report({ lt: LT.Session, t: now, sc: scene, visit })
  }
  c.report({ lt: LT.Launch, t: now, sc: scene, visit })
}

/** 进程内是否已发过首批访问字段（fvts/lvts/tvc）。 */
let firstVisitEmittedInProcess = false

/**
 * App.onLaunch：冷启动入口。
 *
 * 流程：
 *   1. ensureSession('cold_launch') → cst=1，必产新 session。
 *   2. 发 lt=0（可选） + lt=1。
 *   3. 异步抓 push CID，成功后发 lt=101。
 *   4. 兜底 onLaunch options 可能携带 scene / path（小程序）。
 */
export function handleLaunch(
  app: StatApp,
  options: {
    scene?: string | number
    path?: string
    query?: Record<string, unknown>
  } = {},
  opts: LifecycleOptions = {}
): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  const scene = tryRun(() => getLaunchScene(options.scene), '')
  const result = tryRun(
    () => ensureSession('cold_launch', { now, scene }),
    null
  )
  if (!result) return
  reportNewSession(
    c,
    result.cst || CST.ColdLaunch,
    scene,
    opts.emitSessionEvent !== false,
    now,
    true
  )

  if (opts.enablePush) {
    void getPushClientId({ enabled: true, timeoutMs: opts.pushTimeoutMs })
      .then((r) => {
        if (!r.ok || !r.cid) return
        const c2 = safeCollector(app)
        if (!c2) return
        c2.report({ lt: LT.Push, cid: r.cid, t: nowSec() })
      })
      .catch((e) => logger.warn('[uni-stat] push cid fetch failed', e))
  }
}

/**
 * 应用从后台进入前台。
 *
 * 流程：
 *   1. ensureSession('app_show') → 命中 backgroundTimeout 时新 session（cst=2）。
 *   2. isNew=true 时发 lt=0 + lt=1；否则 noop（私有版同 oldcst=2 后续 page show 也不重发）。
 */
export function handleAppShow(
  app: StatApp,
  options: { scene?: string | number; path?: string } = {},
  opts: LifecycleOptions = {}
): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  const scene = tryRun(() => getLaunchScene(options.scene), '')
  const result = tryRun(() => ensureSession('app_show', { now, scene }), null)
  if (!result || !result.isNew) return
  // cst=2：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
  reportNewSession(
    c,
    result.cst || CST.BackgroundTimeout,
    scene,
    opts.emitSessionEvent !== false,
    now,
    false
  )
}

/**
 * 应用进入后台。
 *
 * 流程：
 *   1. markBackground(now)：写 bgTs，让下次 app_show 能算超时。
 *   2. 发 lt=3：`urlref` = 当前页（用户最后看到的页面），`urlref_ts` = 该页停留秒数。
 *   3. 进入后台后强制 flush（force=true），尽量在被 kill 前送出。
 */
export function handleAppHide(app: StatApp): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  tryRun(() => markBackground(now), undefined)
  const stayed =
    state.lastRouteEnterTime > 0
      ? Math.max(0, now - state.lastRouteEnterTime)
      : 0
  c.report({
    lt: LT.Hide,
    t: now,
    urlref: state.lastRoute,
    urlref_ts: stayed,
    iey: state.lastIey,
    // 与 lt=11 字段语义一致：ppiey 表示"切到当前页之前的那一页是否入口页"。
    ppiey: state.prevIey,
  })
  void c
    .flush(true)
    .catch((e) => logger.warn('[uni-stat] flush on hide failed', e))
}

/**
 * Page.onShow：页面前台展示。
 *
 * 流程：
 *   1. ensureSession('page_show')；命中 pageInactiveTimeout 时新 session（cst=3）。
 *   2. isNew=true 时发 lt=0 + lt=1。
 *   3. 取当前 route：
 *      - 新会话首页 / 当前未登记 entry → markEntryPage(route)。
 *      - 更新 lastRoute / lastRouteEnterTime 为下次 onPageHide 用。
 *   4. setConfigTitle(pages.json 标题)：runtime 暂时不读 manifest，
 *      由调用方在 install 时透传，否则保持空串。
 */
export function handlePageShow(
  app: StatApp,
  vm: PageVm | undefined,
  opts: LifecycleOptions = {}
): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  const result = tryRun(() => ensureSession('page_show', { now }), null)
  if (!result) return
  if (result.isNew) {
    // 新会话：清掉旧 entry，等待 markEntryPage 重新登记
    tryRun(() => clearEntry(), undefined)
    // cst=3：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
    reportNewSession(
      c,
      result.cst || CST.PageInactiveTimeout,
      '',
      opts.emitSessionEvent !== false,
      now,
      false
    )
  }
  const route = tryRun(() => getCurrentRoute(vm), '')
  if (route) {
    tryRun(() => markEntryPage(route), undefined)
  }
  // 关键（修复 #PPIEY）：先把"当前 lastIey"备份到 prevIey，再覆写 lastIey。
  // 这样下一个页面（onPageHide / 下一次 onPageShow）能正确读出"上一页是否入口页"。
  state.prevIey = state.lastIey
  state.lastRoute = route
  state.lastRouteEnterTime = now
  state.lastIey = !!route && tryRun(() => isEntry(route), false)
  state.isHide = false
}

/**
 * Page.onHide / Page.onUnload：页面隐藏 / 卸载。
 *
 * 私有版用 `isHide` 区分 onUnload 是隐藏还是真离开；本模块同样兼容。
 *
 * 流程：发 lt=11，url=当前页 fullPath, urlref=上一页 path, urlref_ts=本页停留秒数。
 */
export function handlePageHide(app: StatApp, vm: PageVm | undefined): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  const url = tryRun(() => getCurrentRouteWithQuery(vm), '')
  const route = tryRun(() => getCurrentRoute(vm), '')
  const stayed =
    state.lastRouteEnterTime > 0
      ? Math.max(0, now - state.lastRouteEnterTime)
      : 0
  c.report({
    lt: LT.Page,
    t: now,
    url,
    urlref:
      state.lastRoute && state.lastRoute !== route ? state.lastRoute : route,
    urlref_ts: stayed,
    iey: route ? tryRun(() => isEntry(route), false) : false,
    // ppiey 必须读 prevIey（"上一页是否入口页"）；不能复用 lastIey，否则与 iey 同义。
    ppiey: state.prevIey,
  })
  state.lastRoute = route
  state.lastIey = route ? tryRun(() => isEntry(route), false) : false
  state.lastRouteEnterTime = 0
  state.isHide = true
  tryRun(() => clearPageTitle(), undefined)
  // setConfigTitle 由 install 在新页 onShow 时回灌；onHide 不动它，避免 lt=11 上行字段空
  setConfigTitle(undefined)
}

/**
 * onError：把错误转给 StatApp.reportError。
 *
 * 与私有版一致，外层 try/catch 防止统计自身抛错引发死循环。
 */
export function handleError(app: StatApp, e: unknown): void {
  try {
    app.reportError(e)
  } catch (err) {
    logger.warn('[uni-stat] handleError failed', err)
  }
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
  return (globalThis as unknown as { uni?: UniLifecycleApi }).uni
}

export interface BindLifecycleResult {
  /** vue.mixin(...) 入参。 */
  mixin: Record<string, unknown>
  /** 解绑 uni.onAppShow / onAppHide。多次调用 noop。 */
  unbind: () => void
}

/**
 * 装配 vue mixin + uni 全局生命周期。
 *
 * 与私有版 `src/index.js` 行为差异：
 *   - 拆 onLaunch / onAppShow / onAppHide / onPageShow / onPageHide 五个独立调度，
 *     避免 mixin 内夹带"如何判定 page/app"的脏逻辑。
 *   - vue mixin 仍维持 `onLaunch/onLoad/onShow/onHide/onUnload/onError` 五段，与 vue
 *     生命周期 1:1，便于上层调试。
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
      handlePageShow(app, this, opts)
    },
    onHide(this: PageVm): void {
      handlePageHide(app, this)
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

  const u = getUni()
  let appShowCb:
    | ((e: { scene?: string | number; path?: string }) => void)
    | undefined
  let appHideCb: (() => void) | undefined

  if (u && typeof u.onAppShow === 'function') {
    appShowCb = (e): void => handleAppShow(app, e ?? {}, opts)
    tryRun(() => u.onAppShow!(appShowCb!), undefined)
  }
  if (u && typeof u.onAppHide === 'function') {
    appHideCb = (): void => handleAppHide(app)
    tryRun(() => u.onAppHide!(appHideCb!), undefined)
  }

  return {
    mixin,
    unbind(): void {
      if (!bound) return
      bound = false
      const cur = getUni()
      if (appShowCb && cur && typeof cur.offAppShow === 'function') {
        tryRun(() => cur.offAppShow!(appShowCb!), undefined)
      }
      if (appHideCb && cur && typeof cur.offAppHide === 'function') {
        tryRun(() => cur.offAppHide!(appHideCb!), undefined)
      }
    },
  }
}

/** 仅供测试：清空内部 lastRoute 等状态以及"已发首批 visit 字段"哨兵。 */
export function __resetLifecycleState(): void {
  state.lastRoute = ''
  state.lastRouteEnterTime = 0
  state.lastIey = false
  state.prevIey = false
  state.isHide = false
  firstVisitEmittedInProcess = false
}
