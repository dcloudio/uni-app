/**
 * 生命周期 → collector 调度桥。
 *
 * 把 vue mixin / `uni.onAppShow|onAppHide` / push clientId 这些"运行时事件源"
 * 翻译成 collector 的 `report({lt, ...})` 调用，统一处理：
 *   - 会话状态机（ensureSession / markBackground）。
 *   - 入口页登记（entryPage）。
 *   - lastRoute / urlref / urlref_ts 维护。
 *   - 新会话首报：仅发一条 `lt=1`（Launch），新会话字段（sid/cst/fvts/lvts/tvc）随之上行；
 *     与 `docs/uni统计上报参数.md` 口径对齐（不再发已废弃的 `lt=0`）。
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
 * 新会话首报：仅发一条 `lt=1`（Launch），新会话字段随之上行。
 *
 * 重要约束（修复 lvts=0 缺陷）：
 *   - `fvts/lvts/tvc` **只在进程首报**（cold_launch 触发的首次 ensureSession）携带；
 *     cst=2（后台超时）/ cst=3（前台无操作超时）创建的新 session **不**带。
 *   - 通过 `firstVisitEmittedInProcess` 哨兵保证全进程只调用一次 `buildVisitFields`。
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
  const url = options.path || ''
  reportNewSession(c, result.cst || CST.ColdLaunch, scene, now, true, url)

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
 *   2. isNew=true 时发一条 lt=1；否则 noop。
 */
export function handleAppShow(
  app: StatApp,
  options: { scene?: string | number; path?: string } = {},
  _opts: LifecycleOptions = {}
): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  const scene = tryRun(() => getLaunchScene(options.scene), '')
  const result = tryRun(() => ensureSession('app_show', { now, scene }), null)
  if (!result || !result.isNew) return
  // cst=2：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
  // url 优先取 options.path；拿不到就用上次记录的 lastRoute（用户回到的页面通常即此）。
  const url = options.path || state.lastRoute || ''
  reportNewSession(
    c,
    result.cst || CST.BackgroundTimeout,
    scene,
    now,
    false,
    url
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
 * 与权威参数文档 `docs/uni统计上报参数.md` 对齐：`lt=11`（页面日志）对应 `onShow` 事件。
 *
 * 流程：
 *   1. ensureSession('page_show')；命中 pageInactiveTimeout 时新 session（cst=3）。
 *   2. isNew=true 时发一条 lt=1（url=当前页 fullPath）。
 *   3. 上报 `lt=11`（仅当存在上一页）：
 *        - `url`     = 当前页 fullPath
 *        - `urlref`  = 上一页 path（state.lastRoute）
 *        - `urlref_ts` = 上一页停留秒数（now - state.lastRouteEnterTime）
 *        - `iey`     = 当前页是否入口页
 *        - `ppiey`   = 上一页是否入口页（state.lastIey）
 *      首次 onShow（无 state.lastRoute）跳过 `lt=11`，避免空 urlref。
 *   4. 更新状态：lastRoute / lastRouteEnterTime / lastIey / prevIey。
 *   5. setConfigTitle(pages.json 标题)：runtime 暂时不读 manifest，
 *      由调用方在 install 时透传，否则保持空串。
 */
export function handlePageShow(
  app: StatApp,
  vm: PageVm | undefined,
  _opts: LifecycleOptions = {}
): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  const result = tryRun(() => ensureSession('page_show', { now }), null)
  if (!result) return
  const route = tryRun(() => getCurrentRoute(vm), '')
  const url = tryRun(() => getCurrentRouteWithQuery(vm), '') || route
  if (result.isNew) {
    // 新会话：清掉旧 entry，等待 markEntryPage 重新登记
    tryRun(() => clearEntry(), undefined)
    // cst=3：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
    reportNewSession(
      c,
      result.cst || CST.PageInactiveTimeout,
      '',
      now,
      false,
      url
    )
  }
  if (route) {
    tryRun(() => markEntryPage(route), undefined)
  }
  // 上一页存在 → 发 lt=11（url=新页, urlref=上一页, urlref_ts=上一页停留时间）。
  // 首次 onShow（state.lastRoute 为空）不发，避免 urlref 空字符串污染数据。
  if (state.lastRoute) {
    const stayed =
      state.lastRouteEnterTime > 0
        ? Math.max(0, now - state.lastRouteEnterTime)
        : 0
    c.report({
      lt: LT.Page,
      t: now,
      url,
      urlref: state.lastRoute,
      urlref_ts: stayed,
      iey: !!route && tryRun(() => isEntry(route), false),
      // ppiey："上一页是否入口页" → 直接读上一次 onShow 末尾写入的 lastIey。
      ppiey: state.lastIey,
    })
  }
  // 状态切换：备份"上一页 iey"到 prevIey，再写入新页 iey；更新 lastRoute / 时间戳。
  state.prevIey = state.lastIey
  state.lastIey = !!route && tryRun(() => isEntry(route), false)
  state.lastRoute = route
  state.lastRouteEnterTime = now
  state.isHide = false
}

/**
 * Page.onHide / Page.onUnload：页面隐藏 / 卸载。
 *
 * 私有版用 `isHide` 区分 onUnload 是隐藏还是真离开；本模块同样兼容。
 *
 * 公有版调整（与 `docs/uni统计上报参数.md` 对齐）：
 *   - `lt=11` 不再在 onHide 上报，统一在下一次 `handlePageShow` 上报，确保
 *     `url`（新页）与 `urlref`（旧页）字段不会落到同一个值。
 *   - onHide 仅做收尾：标记 isHide、清掉自定义 title，避免下次新页空标题。
 *   - lastRoute / lastRouteEnterTime / lastIey 保持不变，由 `handlePageShow` 统一切换。
 */
export function handlePageHide(app: StatApp, _vm: PageVm | undefined): void {
  const c = safeCollector(app)
  if (!c) return
  state.isHide = true
  tryRun(() => clearPageTitle(), undefined)
  // setConfigTitle 由 install 在新页 onShow 时回灌；onHide 不动它，避免下次新页空标题
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
