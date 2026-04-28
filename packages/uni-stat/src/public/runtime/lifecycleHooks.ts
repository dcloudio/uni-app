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
import { getPagesJsonNavigationTitle } from '../adapter/pagesTitle'
import {
  clearPageTitle,
  getCurrentTitle,
  setConfigTitle,
  setReportTitle,
} from '../domain/title'
import { ensureSession, markBackground } from '../domain/session/machine'
import { getCurrentRoute, getCurrentRouteWithQuery } from '../adapter/route'
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
  $page?: { route?: string; fullPath?: string }
  $scope?: { route?: string }
  $mp?: { page?: { route?: string; is?: string } }
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
}

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
  tryRun(() => clearEntry(), undefined)
  // cst=2：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
  // url 优先取 options.path；拿不到就用上次记录的 lastRoute（用户回到的页面通常即此）。
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
}

/**
 * 应用进入后台。
 *
 * 流程：
 *   1. markBackground(now)：写 bgTs，让下次 app_show 能算超时。
 *   2. 发 lt=3：`urlref` = 当前页（用户最后看到的页面），`urlref_ts` = 该页停留秒数（与私有版一致，不足 1 秒按 1 秒）。
 *   3. 进入后台后强制 flush（force=true），尽量在被 kill 前送出。
 */
export function handleAppHide(app: StatApp): void {
  const c = safeCollector(app)
  if (!c) return
  const now = nowSec()
  tryRun(() => markBackground(now), undefined)
  const deltaStay =
    state.lastRouteEnterTime > 0 ? now - state.lastRouteEnterTime : 0
  const stayed = clampUrlrefStaySec(deltaStay)
  c.report({
    lt: LT.Hide,
    t: now,
    urlref: state.lastRoute,
    urlref_ts: stayed,
  })
  void c
    .flush(true)
    .catch((e) => logger.warn('[uni-stat] flush on hide failed', e))
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
 *   - `iey` / `ppiey`：分别对应**离开页**是否入口、`urlref` 指向页是否入口（与字段字典「上级页面」口径一致）。
 *   - `ttn` / `ttpj` / `ttc`：三维独立内存（API 导航栏 / pages.json / uni.report('title')），
 *     **同一事件可同时非空**。离开页快照优先在 **`onHide` 且 `clearPageTitle` 之前**落盘；
 *     无 hide 场景依赖 **microtask**（晚于业务 `onShow`）— 由 `titleSnapGeneration` 防止被下一页 show 尾部误覆盖。
 *
 * 首次应用内 onShow（无前序页面）不发 `lt=11`。`enablePageLog=false` 时跳过整段 `lt=11`。
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
  const route = tryRun(() => getCurrentRoute(vm), '')
  const url = tryRun(() => getCurrentRouteWithQuery(vm), '') || route
  // 每页重置「自定义上报标题」维（ttc）；注入 pages.json 导航标题 → `ttpj`。
  //
  // **禁止**在此处调用 `clearPageTitle()`：uni-app 页面 `onLoad` 早于统计 mixin 的 `onShow`，
  // 业务常在 `onLoad` 里 `uni.setNavigationBarTitle`，拦截器已写入 `ttn`；若此处再清 page，
  // 会把刚设好的 ttn 抹掉。**跨页**时由 `handlePageHide` 在快照后 `clearPageTitle` 即可。
  tryRun(() => setReportTitle(''), undefined)
  tryRun(() => setConfigTitle(getPagesJsonNavigationTitle(route)), undefined)

  if (result.isNew) {
    // 新会话：清 entry → 先登记当前页为会话入口（与 lt=1「落地即入口」一致）→ 再发 lt=1。
    tryRun(() => clearEntry(), undefined)
  }
  if (route) {
    tryRun(() => markEntryPage(route), undefined)
  }
  if (result.isNew) {
    // cst=3：不再携带 fvts/lvts/tvc（首批已在 cold_launch 上报过）。
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
  if (state.lastRoute && opts.enablePageLog !== false) {
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
  }
  // 轮换路由链：当前页在下一轮成为「上一页」。
  state.beforeLastRoute = state.lastRoute
  state.beforeLastRouteFull = state.lastRouteFull
  state.prevIey = state.lastIey
  state.lastIey = !!route && tryRun(() => isEntry(route), false)
  state.lastRoute = route
  state.lastRouteFull = url
  state.lastRouteEnterTime = now
  // 不在此处同步快照：此时 lastRoute 已指向新页，getCurrentTitle 会是新页 ttpj+空 ttn，造成顶替。
  // 离开页快照见 handlePageHide（优先）；否则见 scheduleDeferredTitleSnapshot。
  scheduleDeferredTitleSnapshot()
  state.isHide = false
}

/**
 * Page.onHide / Page.onUnload：页面隐藏 / 卸载。
 *
 * 私有版用 `isHide` 区分 onUnload 是隐藏还是真离开；本模块同样兼容。
 *
 * 公有版调整（与 `docs/uni统计上报参数.md` 对齐）：
 *   - `lt=11` 不在 onHide 上报，统一在下一次 `handlePageShow` 上报离开页闭环数据。
 *   - onHide 仅做收尾：标记 isHide、清掉自定义 title，避免下次新页空标题。
 *   - lastRoute / lastRouteEnterTime / lastIey 保持不变，由 `handlePageShow` 统一切换。
 */
export function handlePageHide(app: StatApp, _vm: PageVm | undefined): void {
  const c = safeCollector(app)
  if (!c) return
  state.isHide = true
  // 离开前快照：此时仍保留「本页」ttpj/ttn/ttc；清空 page 维后仅丢 ttn，故必须先快照
  titleSnapGeneration++
  state.lastPageTitleSnap = Object.assign({}, getCurrentTitle())
  tryRun(() => clearPageTitle(), undefined)
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
 * ### 当前方案：`setTimeout(() => { throw e }, 0)` 异步重抛
 *
 * - 错误进入浏览器 / 端原生的 "Uncaught Exception" 通路（同 `window.onerror`），
 *   与**完全没接入统计**时的默认行为像素级一致：
 *     - devtools 红色标记 `Uncaught Error: xxx`
 *     - stack 完全是用户代码 stack（`e.stack` 在 throw 当下已 capture，重抛不变）
 *     - 日志"来源"列指向浏览器 task / 用户代码，**没有任何 SDK 文件路径痕迹**
 *
 * ### 防重入
 *
 * 重抛后错误会被全局 `window.onerror` 捕获；小程序端会被 `App.onError` 捕获并
 * 二次冒泡到 vue mixin 的 `onError`，造成 `handleError → setTimeout throw →
 * onError → handleError` 死循环。用 `rethrownErrors`(WeakSet) 标记已处理的
 * error 实例，重入时直接返回即可。
 *
 * ### 顺序
 *
 * 1. **先标记重入防护** —— 防止极端竞态下 setTimeout 在同步上报完成前已 fire。
 * 2. **再上报** —— 同步执行，确保 lt=31 一定入队。
 * 3. **最后异步重抛** —— `setTimeout 0` 排到下一个 task，不阻塞业务事件循环。
 *
 * 外层 `try/catch` 仅兜底 `reportError` 自身抛错（与私有版一致）；`tryRun` 兜底
 * `setTimeout` 在极端环境（如 SSR / 被 mock 的 timer）下不可用的情况。
 */
export function handleError(app: StatApp, e: unknown): void {
  const isObj = typeof e === 'object' && e !== null
  if (isObj && rethrownErrors.has(e as object)) return
  if (isObj) rethrownErrors.add(e as object)

  try {
    app.reportError(e)
  } catch (err) {
    logger.warn('[uni-stat] handleError failed', err)
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
  state.lastRouteFull = ''
  state.beforeLastRoute = ''
  state.beforeLastRouteFull = ''
  state.lastRouteEnterTime = 0
  state.lastPageTitleSnap = Object.assign({}, EMPTY_TITLE_SNAP)
  state.lastIey = false
  state.prevIey = false
  state.isHide = false
  titleSnapGeneration = 0
  firstVisitEmittedInProcess = false
}
