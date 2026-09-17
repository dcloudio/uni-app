/**
 * Phase 12.A：自动化端到端冒烟测试套件。
 *
 * 通过 mock channel 抓取**真正落到通道层的字节**（payload.requests 的 JSON 字符串），
 * 端到端串联 lifecycle → collector → queue → serializer → channel.send 的完整链路，
 * 用以替代/前置 Phase 12.B 的 5 端真机抓包。
 *
 * 覆盖矩阵（与 `docs/05-公有版重构开发计划.md` Phase 12 §测试矩阵 1:1）：
 *   S1 冷启动                 → 仅发 lt=1；sid 新生成；lt=1 携带 sid/cst/fvts/lvts/tvc
 *   S2 热启动短（不超时）     → 不发新会话事件；sid 不变
 *   S3 热启动长（后台超时）   → 仅发 lt=1，cst=2；仍携带 fvts/lvts/tvc
 *   S4 长时无操作（前台超时） → 仅发 lt=1，cst=3
 *   S5 wx scene 切换          → 仅发 lt=1，cst=2
 *   S6 入口页 iey/ppiey 序列  → 首页 → A → B → 首页 → 序列符合 §4.2
 *   S7 自定义事件 uni.report  → lt=21，e_n/e_v/sid/url/iey 正确（seq 不再上行）
 *   S8 错误 throw new Error   → lt=31，em/url 正确
 *   S9 弱网 100 条 + 恢复     → 服务端收到 100 条，无重复
 *   S10 老服务端 1.0 通道     → 上行体含 sid/iey 等字段且不报错
 *
 * 注意：本套件**不直接走真实 http/Cloud channel**；http channel 注入 mock，
 * 用以模拟"成功 / 失败 / 失败后切换"等行为，验证 collector 的 ack / rollback / persist 链路。
 */

import * as queueMod from '../../../src/public/pipeline/queue'
import * as retryMod from '../../../src/public/pipeline/retry'
import * as sessionMod from '../../../src/public/domain/session/machine'
import * as visitMod from '../../../src/public/domain/visit/firstVisit'
import {
  __resetLifecycleState,
  handleAppHide,
  handleAppShow,
  handleError,
  handleLaunch,
  handlePageHide,
  handlePageShow,
} from '../../../src/public/runtime/lifecycleHooks'
import { __resetCache as resetDevice } from '../../../src/public/adapter/device'
import { __resetCache as resetPackage } from '../../../src/public/adapter/package'
import { __resetState as resetEntry } from '../../../src/public/domain/entry/entryPage'
import { __resetCache as resetSystem } from '../../../src/public/adapter/system'
import { __resetTitle } from '../../../src/public/domain/title'
import { __resetStatApp, getStatApp } from '../../../src/public/runtime/StatApp'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import { storage } from '../../../src/public/infra/storage'

import type { Channel, ReportPayload } from '../../../src/public/pipeline/types'

// ---------- 工具：可控 fakeChannel ----------

interface FakeChannelControl extends Channel {
  send: jest.Mock<Promise<void>, [ReportPayload]>
  available: jest.Mock<boolean, []>
  /** 强制后续 N 次 send 抛错；为 0 则恢复成功。 */
  failNext: (n: number, err?: Error) => void
}

/**
 * 构造一个 channel mock：默认成功；可通过 failNext(n) 强制失败 N 次。
 */
function makeFakeChannel(name: '1.0' | '2.0' = '1.0'): FakeChannelControl {
  let remainingFailures = 0
  let failureErr: Error = new Error('mock channel failure')
  const send: jest.Mock<Promise<void>, [ReportPayload]> = jest.fn(
    (_p: ReportPayload) => {
      if (remainingFailures > 0) {
        remainingFailures--
        return Promise.reject(failureErr)
      }
      return Promise.resolve()
    }
  )
  const available: jest.Mock<boolean, []> = jest.fn(() => true)
  return {
    name,
    available,
    send,
    failNext(n: number, err?: Error): void {
      remainingFailures = Math.max(0, n)
      if (err) failureErr = err
    },
  }
}

interface SentBatch {
  payload: ReportPayload
  events: Array<Record<string, unknown>>
}

/**
 * 解析 fakeChannel 收到的所有 payload，把每个 batch 里的 requests JSON 拆成事件数组。
 */
function dumpSent(http: FakeChannelControl): SentBatch[] {
  return http.send.mock.calls.map(([p]) => {
    let events: Array<Record<string, unknown>> = []
    try {
      const parsed = JSON.parse(p.requests)
      if (Array.isArray(parsed))
        events = parsed as Array<Record<string, unknown>>
    } catch {
      events = []
    }
    return { payload: p, events }
  })
}

/**
 * 从所有 batch 里抽出按发送顺序的 lt 列表。
 */
function flatLts(batches: SentBatch[]): string[] {
  const out: string[] = []
  for (const b of batches) {
    for (const ev of b.events) out.push(String(ev.lt))
  }
  return out
}

/**
 * 抽出所有事件（按发送顺序），便于按字段断言。
 */
function flatEvents(batches: SentBatch[]): Array<Record<string, unknown>> {
  const out: Array<Record<string, unknown>> = []
  for (const b of batches) for (const ev of b.events) out.push(ev)
  return out
}

// ---------- 通用 setup / teardown ----------

function resetAll(): void {
  queueMod.__reset()
  retryMod.__reset()
  sessionMod.__resetState()
  visitMod.__resetState()
  resetEntry()
  __resetTitle()
  resetDevice()
  resetPackage()
  resetSystem()
  __resetLifecycleState()
  __resetStatApp()
  // 关键：infra/storage 是模块级单例，内置 cache 跨用例存活；
  // 不清会导致前一个用例写入的 sid / entryRoute 等被本用例错误命中（缓存 vs mock store 不一致）。
  storage.__resetCache()
}

interface InstalledApp {
  app: ReturnType<typeof getStatApp>
  http: FakeChannelControl
}

/**
 * 统一安装 helper：注入 fake http channel，禁用 cloud / 拦截器 / 迁移 / retry 恢复。
 *
 * 默认 `reportIntervalSec=0` → 每条事件都 auto flush，便于在 send.mock.calls 里
 * 立刻看到字节。需要批量场景的子测试可以单独注入 reportIntervalSec=10。
 */
function installApp(
  opts: {
    version?: '1' | '2'
    reportIntervalSec?: number
    backgroundTimeoutSec?: number
    pageInactiveTimeoutSec?: number
    channelName?: '1.0' | '2.0'
  } = {}
): InstalledApp {
  const http = makeFakeChannel(opts.channelName ?? '1.0')
  const app = getStatApp()
  app.install(
    {
      version: opts.version ?? '2',
      ak: 'test-ak',
      reportIntervalSec: opts.reportIntervalSec ?? 0,
      backgroundTimeoutSec: opts.backgroundTimeoutSec ?? 300,
      pageInactiveTimeoutSec: opts.pageInactiveTimeoutSec ?? 1800,
    },
    {
      channels: { http, cloud: null },
      skipInterceptors: true,
      skipMigration: true,
      skipRecoverRetry: true,
    }
  )
  return { app, http }
}

/**
 * 触发一次显式 flush（即使 reportIntervalSec=0 已经 auto-flush，也走一次保平安）。
 */
async function drain(app: ReturnType<typeof getStatApp>): Promise<void> {
  const c = app.getCollector()
  if (!c) return
  await c.flush(true)
  // micro-task，确保 send().then(commitVisit) 执行完
  await Promise.resolve()
  await Promise.resolve()
}

// ---------- 用例集 ----------

describe('e2e/smoke：端到端冒烟（10 个核心场景）', () => {
  beforeEach(() => {
    installMockUni({ platform: 'h5' })
    resetAll()
  })

  afterEach(() => {
    resetAll()
    restoreMockUni()
  })

  /** S1 冷启动：仅发 lt=1（参数文档对齐）；sid 新生成；首批携带 fvts/lvts/tvc 的 visit 字段。 */
  test('S1 冷启动 → 仅发 lt=1；新 sid；首批带访问字段', async () => {
    const { app, http } = installApp()
    handleLaunch(app, { scene: 1001 })
    await drain(app)

    const events = flatEvents(dumpSent(http))
    expect(flatLts(dumpSent(http))).toEqual(['1'])

    const session = sessionMod.getSnapshot()!
    expect(session.sid).toBeTruthy()
    expect(session.sct).toBe(1)

    // lt=1 携带 sid/cst/fvts/lvts/tvc
    expect(events[0].sid).toBe(session.sid)
    expect(events[0].cst).toBe(1)
    expect(events[0].fvts).toBeDefined()
    expect(events[0].lvts).toBeDefined()
    expect(events[0].tvc).toBeDefined()
    // 旧字段（已剔除）
    expect(events[0].sst).toBeUndefined()
    expect(events[0].seq).toBeUndefined()
    expect(events[0].sct).toBeUndefined()
    expect(events[0].pid).toBeUndefined()
    expect(events[0].uuid).toBeUndefined()
    expect(events[0].odid).toBeUndefined()
    expect(events[0].did).toBeDefined()
  })

  /** S2 热启动短（不超时）：app_show 不超时 → 不发新会话事件；sid 不变。 */
  test('S2 热启动短（< backgroundTimeoutSec） → 不发新会话事件；sid 不变', async () => {
    const { app, http } = installApp({ backgroundTimeoutSec: 300 })
    handleLaunch(app, {})
    await drain(app)
    const sid1 = sessionMod.getSnapshot()!.sid
    http.send.mockClear()

    // 模拟刚切到后台，3s 后又回前台
    sessionMod.markBackground(Math.floor(Date.now() / 1000) - 3)
    handleAppShow(app, {})
    await drain(app)

    expect(flatLts(dumpSent(http))).toEqual([]) // 不发任何事件
    expect(sessionMod.getSnapshot()!.sid).toBe(sid1)
  })

  /** S3 热启动长（后台超时）：cst=2，仅发 lt=1。 */
  test('S3 热启动长（> backgroundTimeoutSec） → cst=2，仅发 lt=1', async () => {
    const { app, http } = installApp({ backgroundTimeoutSec: 60 })
    handleLaunch(app, {})
    await drain(app)
    const sid1 = sessionMod.getSnapshot()!.sid
    http.send.mockClear()

    sessionMod.markBackground(Math.floor(Date.now() / 1000) - 600)
    handleAppShow(app, {})
    await drain(app)

    const events = flatEvents(dumpSent(http))
    expect(flatLts(dumpSent(http))).toEqual(['1'])
    const sid2 = sessionMod.getSnapshot()!.sid
    expect(sid2).not.toBe(sid1)
    // 上行字段名 cst（与 docs/uni统计上报参数.md 对齐）
    expect(events[0].cst).toBe(2)
    // pid 已废弃：参数文档无该字段
    expect(events[0].pid).toBeUndefined()
    // cst=2 仍携带 fvts/lvts/tvc，避免 lvts 缺失被服务端误判为新用户
    expect(events[0].fvts).toBeDefined()
    expect(events[0].lvts).toBeDefined()
    expect(events[0].tvc).toBeDefined()
  })

  /** S4 长时无操作（前台无操作超时）：cst=3。 */
  test('S4 前台无操作 > pageInactiveTimeoutSec → cst=3', async () => {
    const { app, http } = installApp({ pageInactiveTimeoutSec: 10 })
    handleLaunch(app, {})
    await drain(app)
    http.send.mockClear()

    const snap = sessionMod.getSnapshot()!
    snap.lastActive = Math.floor(Date.now() / 1000) - 600
    handlePageShow(app, { route: 'pages/home' })
    await drain(app)

    const events = flatEvents(dumpSent(http))
    const lts = flatLts(dumpSent(http))
    expect(lts).toEqual(['1'])
    expect(sessionMod.getSnapshot()!.sct).toBe(3)
    const ltLaunch = events.find((e) => e.lt === '1')!
    expect(ltLaunch.cst).toBe(3)
    expect(ltLaunch.fvts).toBeDefined()
    expect(ltLaunch.lvts).toBeDefined()
    expect(ltLaunch.tvc).toBeDefined()
  })

  /** S5 wx scene 切换：app_show 时 scene 与上次不同 → cst=2 新 session。 */
  test('S5 wx scene 切换（不同 scene） → cst=2 新 session', async () => {
    const { app, http } = installApp()
    handleLaunch(app, { scene: '1001' })
    await drain(app)
    const sid1 = sessionMod.getSnapshot()!.sid
    http.send.mockClear()

    handleAppShow(app, { scene: '1037' })
    await drain(app)

    const lts = flatLts(dumpSent(http))
    expect(lts).toEqual(['1'])
    expect(sessionMod.getSnapshot()!.sct).toBe(2)
    expect(sessionMod.getSnapshot()!.sid).not.toBe(sid1)
  })

  /** S6 入口页：首页 → A → B → 首页 序列，iey/ppiey 字段符合设计文档 §4.2。 */
  test('S6 入口页 iey/ppiey 序列：首页 → A → B → 首页', async () => {
    const { app, http } = installApp()
    handleLaunch(app, {})
    await drain(app)
    http.send.mockClear()

    // 首页：iey=true，ppiey=false（首次无前页）
    handlePageShow(app, { route: 'pages/home/home' })
    handlePageHide(app, { route: 'pages/home/home' })
    // A：iey=false（已不在入口），ppiey=true（前一页是首页/入口）
    handlePageShow(app, { route: 'pages/A/A' })
    handlePageHide(app, { route: 'pages/A/A' })
    // B：iey=false，ppiey=false（A 不是入口）
    handlePageShow(app, { route: 'pages/B/B' })
    handlePageHide(app, { route: 'pages/B/B' })
    // 回首页：iey=true（仍是入口页），ppiey=false（B 不是入口）
    handlePageShow(app, { route: 'pages/home/home' })
    handlePageHide(app, { route: 'pages/home/home' })
    await drain(app)

    const ltPages = flatEvents(dumpSent(http)).filter((e) => e.lt === '11')
    // 下一页 onShow 上报「离开页」；首次 home onShow 无前序页不发。共 3 条 lt=11。
    expect(ltPages).toHaveLength(3)
    // A onShow：离开 home → url=home，无 urlref；iey=1（home 入口），ppiey=0
    expect(ltPages[0].url).toBe('pages/home/home')
    expect(ltPages[0].urlref).toBeUndefined()
    expect(ltPages[0].iey).toBe(1)
    expect(ltPages[0].ppiey).toBe(0)
    // B onShow：离开 A → url=A，urlref=home；iey=0，ppiey=1
    expect(ltPages[1].url).toBe('pages/A/A')
    expect(ltPages[1].urlref).toBe('pages/home/home')
    expect(ltPages[1].iey).toBe(0)
    expect(ltPages[1].ppiey).toBe(1)
    // home onShow：离开 B → url=B，urlref=A；iey=0，ppiey=0
    expect(ltPages[2].url).toBe('pages/B/B')
    expect(ltPages[2].urlref).toBe('pages/A/A')
    expect(ltPages[2].iey).toBe(0)
    expect(ltPages[2].ppiey).toBe(0)
  })

  /** S6.b 入口页：home → A → home（来回切）。验证 ppiey 不会随 iey 漂移。 */
  test('S6.b 入口页 ppiey 独立性：home → A → home，ppiey 不与 iey 同步', async () => {
    const { app, http } = installApp()
    handleLaunch(app, {})
    await drain(app)
    http.send.mockClear()

    handlePageShow(app, { route: 'pages/home/home' })
    handlePageHide(app, { route: 'pages/home/home' })
    handlePageShow(app, { route: 'pages/A/A' })
    handlePageHide(app, { route: 'pages/A/A' })
    handlePageShow(app, { route: 'pages/home/home' })
    handlePageHide(app, { route: 'pages/home/home' })
    await drain(app)

    const ltPages = flatEvents(dumpSent(http)).filter((e) => e.lt === '11')
    expect(ltPages).toHaveLength(2)
    // A onShow：离开 home
    expect(ltPages[0].url).toBe('pages/home/home')
    expect(ltPages[0].urlref).toBeUndefined()
    expect(ltPages[0].iey).toBe(1)
    expect(ltPages[0].ppiey).toBe(0)
    // home onShow：离开 A
    expect(ltPages[1].url).toBe('pages/A/A')
    expect(ltPages[1].urlref).toBe('pages/home/home')
    expect(ltPages[1].iey).toBe(0)
    expect(ltPages[1].ppiey).toBe(1)
  })

  /** S7 自定义事件：同时验证业务字段与当前页上下文。 */
  test('S7 自定义事件 uni.report → lt=21；e_n/e_v/sid/url/iey 正确', async () => {
    const { app, http } = installApp()
    handleLaunch(app, {})
    handlePageShow(app, {
      route: 'pages/home/home',
      $page: { route: 'pages/home/home', fullPath: 'pages/home/home?from=e2e' },
    })
    await drain(app)
    http.send.mockClear()

    app.report('purchase', { sku: 'a', amount: 9.9 })
    app.report('share', 'wx')
    await drain(app)

    const events = flatEvents(dumpSent(http))
    const customs = events.filter((e) => e.lt === '21')
    expect(customs).toHaveLength(2)
    expect(customs[0].e_n).toBe('purchase')
    // 对象类型 e_v 会被 stringify 为 JSON 字符串
    expect(typeof customs[0].e_v).toBe('string')
    expect(JSON.parse(customs[0].e_v as string)).toEqual({
      sku: 'a',
      amount: 9.9,
    })
    expect(customs[1].e_n).toBe('share')
    expect(customs[1].e_v).toBe('wx')

    // sid 都属于同一会话；seq 已不上行，仅本地状态（参数文档对齐）
    expect(customs[0].sid).toBe(customs[1].sid)
    expect(customs[0].url).toBe('pages/home/home?from=e2e')
    expect(customs[0].iey).toBe(1)
    expect(customs[0].seq).toBeUndefined()
    expect(customs[1].seq).toBeUndefined()
  })

  /** S8 错误：业务 throw new Error → lt=31，em 含 message。 */
  test('S8 onError throw → lt=31，em 含 message', async () => {
    // handleError 内部用 `setTimeout(throw e, 0)` 把原始错误异步重抛回原生
    // Uncaught 通路（详见 lifecycleHooks.ts#handleError）。Jest 默认 timer
    // 会让这个 throw 在事件循环中真正抛出，导致整个 Node 进程被 unhandled
    // exception 搞挂。这里用 fake timers 把 setTimeout mock 掉，让重抛只
    // "排队"不真触发；测试关注的是采集到的 lt=31，与"原生重抛"行为无关。
    jest.useFakeTimers()
    try {
      const { app, http } = installApp()
      handleLaunch(app, {})
      handlePageShow(app, { route: 'pages/error/error' })
      await drain(app)
      http.send.mockClear()

      handleError(app, new Error('boom-msg'))
      await drain(app)

      const events = flatEvents(dumpSent(http))
      const errs = events.filter((e) => e.lt === '31')
      expect(errs).toHaveLength(1)
      expect(typeof errs[0].em).toBe('string')
      expect(errs[0].em).toContain('boom-msg')
      expect(errs[0].url).toBe('pages/error/error')
    } finally {
      jest.clearAllTimers()
      jest.useRealTimers()
    }
  })

  /** S9 弱网 100 条 + 恢复：先全部失败入 retry queue，恢复后 recoverRetry 重放。 */
  test('S9 弱网：100 条事件 → 失败入 retry → 恢复后零丢失零重复', async () => {
    const { app, http } = installApp({ reportIntervalSec: 10 }) // 关掉 auto-flush，攒批
    handleLaunch(app, {})
    await drain(app)
    // 清掉冷启的 lt=1 痕迹，本用例只关心后续 100 条
    http.send.mockClear()
    retryMod.__reset()

    // 阶段 1：制造 200 次连续失败（足够覆盖任何潜在重试），强制走 retry.persist
    http.failNext(200)
    for (let i = 0; i < 100; i++) {
      app.report('evt', { i })
    }
    // 强制 flush 一次，让 100 条整批进 channel.send → 失败 → retry.persist
    await app.getCollector()!.flush(true)
    await Promise.resolve()

    // 关键断言：失败时 batch 写入 retry 队列；queue 已被 flush 清空。
    // 公有版默认开启 collector flush 切片（修复 image url too long 死循环），
    // 100 条事件可能被切成多片（每片 ≤ BATCH_MAX_EVENTS=30 / BATCH_REQUESTS_MAX_BYTES=4KB），
    // 因此 retry 队列长度 = 切片数（>=1），channel.send 调用次数也 = 切片数。
    expect(queueMod.size()).toBe(0)
    const sliceCount = retryMod.size()
    expect(sliceCount).toBeGreaterThanOrEqual(1)
    const failedSendCount = http.send.mock.calls.length
    expect(failedSendCount).toBe(sliceCount)

    // 阶段 2：网络恢复，调 recoverRetry 重放
    http.failNext(0)
    http.send.mockClear()
    await app.getCollector()!.recoverRetry()
    await Promise.resolve()

    // 每片 send 一次；retry 队列被 ack 清空
    expect(http.send).toHaveBeenCalledTimes(sliceCount)
    expect(retryMod.size()).toBe(0)

    // 服务端实际收到 100 条事件，无重复
    const recovered = flatEvents(dumpSent(http))
    const customs = recovered.filter((e) => e.lt === '21')
    expect(customs).toHaveLength(100)
    const ids = new Set(customs.map((c) => c.e_v as string))
    expect(ids.size).toBe(100) // e_v 全唯一
  })

  /** S10 老服务端 1.0 通道：version=1，上行体仍含 sid/iey 等新字段且 channel 选 http。 */
  test('S10 老 1.0 通道（version=1） → 走 http channel；新字段 sid/iey 正常携带', async () => {
    const { app, http } = installApp({ version: '1', channelName: '1.0' })
    handleLaunch(app, {})
    await drain(app)
    http.send.mockClear()

    // home 首次 onShow 不发 lt=11；切到 about 时下一页 onShow 才上报。
    handlePageShow(app, { route: 'pages/home/home' })
    handlePageHide(app, { route: 'pages/home/home' })
    handlePageShow(app, { route: 'pages/about/about' })
    handlePageHide(app, { route: 'pages/about/about' })
    app.report('legacy_test', 'v')
    await drain(app)

    const events = flatEvents(dumpSent(http))
    expect(events.length).toBeGreaterThan(0)
    // 任意事件都应含 sid（公有版强约束）
    for (const e of events) {
      expect(e.sid).toBeTruthy()
    }
    // lt=11 应带 iey 字段
    const ltPage = events.find((e) => e.lt === '11')
    expect(ltPage).toBeDefined()
    expect(ltPage!.iey).toBeDefined()

    // payload 元数据：usv = uni-app 编译器版本（process.env.UNI_COMPILER_VERSION）；
    // jest 默认环境下取不到 → 与 STAT_VERSION_PUBLIC 一样回退空串，二者同源即通过。
    const sent = dumpSent(http)
    expect(sent.length).toBeGreaterThan(0)
    expect(sent[0].payload.usv).toBe(process.env.UNI_COMPILER_VERSION || '')
  })

  /** S11 onAppHide：发 lt=11+lt=3 + 强制 flush，确保后台前页面闭环与会话语义都送出。 */
  test('S11 onAppHide → lt=11+lt=3，flush 强制送达', async () => {
    const { app, http } = installApp({ reportIntervalSec: 10 })
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home/home' })
    await drain(app)
    http.send.mockClear()

    handleAppHide(app)
    await Promise.resolve()
    await Promise.resolve()

    const lts = flatLts(dumpSent(http))
    expect(lts).toContain('11')
    expect(lts).toContain('3')
    // 同批次顺序：lt=11 在 lt=3 之前；lt=3 落末尾（serializer 排序约束）。
    const events = flatEvents(dumpSent(http))
    const i11 = events.findIndex((e) => e.lt === '11')
    const i3 = events.findIndex((e) => e.lt === '3')
    expect(i11).toBeGreaterThanOrEqual(0)
    expect(i3).toBeGreaterThanOrEqual(0)
    expect(i11).toBeLessThan(i3)
    expect(events[events.length - 1].lt).toBe('3')
  })

  /**
   * S12 后台链路：onAppHide 产出 lt=11+3；超时回前台仅产出 lt=1（cst=2）；
   * 首个同页 page_show 不重复 lt=11；后续真实切页再产出 lt=11（仅前台停留）。
   */
  test('S12 后台超时回前台链路：lt=11+3 -> lt=1(cst=2) -> 首个同页不重发11 -> 切页发11', async () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-05-01T00:00:00.000Z'))
      const { app, http } = installApp({
        reportIntervalSec: 10,
        backgroundTimeoutSec: 60,
      })
      handleLaunch(app, {})
      handlePageShow(app, { route: 'pages/home/home' })
      handlePageHide(app, { route: 'pages/home/home' })
      await drain(app)
      http.send.mockClear()

      // 进入后台：应发 lt=11+lt=3
      jest.setSystemTime(Date.now() + 8_000)
      handleAppHide(app)
      await Promise.resolve()
      await Promise.resolve()
      const hideEvents = flatEvents(dumpSent(http))
      const hideLts = hideEvents.map((e) => String(e.lt))
      expect(hideLts).toContain('11')
      expect(hideLts).toContain('3')
      const hide11 = hideEvents.find((e) => e.lt === '11')!
      expect(hide11.url).toBe('pages/home/home')
      http.send.mockClear()

      // 后台超时回前台：仅 lt=1(cst=2)
      jest.setSystemTime(Date.now() + 5 * 24 * 60 * 60 * 1000)
      handleAppShow(app, {})
      await drain(app)
      let events = flatEvents(dumpSent(http))
      expect(events.map((e) => String(e.lt))).toEqual(['1'])
      expect(events[0].cst).toBe(2)
      http.send.mockClear()

      // 首个同页 page_show 不应重复 lt=11
      handlePageShow(app, { route: 'pages/home/home' })
      await drain(app)
      events = flatEvents(dumpSent(http))
      expect(events.filter((e) => e.lt === '11')).toHaveLength(0)
      http.send.mockClear()

      // 后续切页才重新产出 lt=11，且停留时长为前台短停留（不含 5 天后台）。
      handlePageHide(app, { route: 'pages/home/home' })
      jest.setSystemTime(Date.now() + 2_000)
      handlePageShow(app, { route: 'pages/detail/detail' })
      await drain(app)
      events = flatEvents(dumpSent(http))
      const page11 = events.filter((e) => e.lt === '11')
      expect(page11).toHaveLength(1)
      expect(page11[0].url).toBe('pages/home/home')
      expect(Number(page11[0].urlref_ts)).toBeLessThan(120)
    } finally {
      jest.useRealTimers()
    }
  })
})
