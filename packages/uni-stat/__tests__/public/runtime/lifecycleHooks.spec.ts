/**
 * lifecycleHooks 单元测试。
 *
 * 覆盖 4 类 session 触发（与 `docs/uni统计上报参数.md` 对齐：仅 lt=1）：
 *   T1 cold_launch  → cst=1，仅发 lt=1。
 *   T2 app_show 后台超时 → cst=2，仅发 lt=1。
 *   T3 page_show 前台无操作超时 → cst=3，仅发 lt=1。
 *   T3.b cst=3 且有离开页：flush 后首包内 lt=1 早于 lt=11（LT_ORDER）。
 *   T4 page_show 未超时 → 不发 launch，仅维护 lastRoute / entry。
 *
 * 另外验证：
 *   - app_hide：写 markBackground、发 lt=11+lt=3、强制 flush。
 *   - app_show 新会话：lt=1 后强制 flush（与源码 `handleAppShow` 对齐）。
 *   - page_show：发 lt=11（进入新页 onShow 时上报**离开页**），
 *     url=离开页 / urlref=再上一层来源（首跳可无）/ urlref_ts=离开页停留秒数（≥1，与私有版一致）；首次 onShow 不发。
 *   - onError：转给 StatApp.reportError，不抛错。
 */

import {
  __resetLifecycleState,
  bindLifecycle,
  handleAppHide,
  handleAppShow,
  handleError,
  handleLaunch,
  handlePageHide,
  handlePageShow,
  shouldBindUniAppLifecycle,
  shouldMixinDispatchAppLifecycle,
} from '../../../src/public/runtime/lifecycleHooks'
import { __resetStatApp, getStatApp } from '../../../src/public/runtime/StatApp'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import * as queueMod from '../../../src/public/pipeline/queue'
import * as retryMod from '../../../src/public/pipeline/retry'
import * as sessionMod from '../../../src/public/domain/session/machine'
import * as visitMod from '../../../src/public/domain/visit/firstVisit'
import { __resetState as resetEntry } from '../../../src/public/domain/entry/entryPage'
import { __resetPagesTitleCache } from '../../../src/public/adapter/pagesTitle'
import { __resetTitle, setPageTitle } from '../../../src/public/domain/title'
import { __resetCache as resetDevice } from '../../../src/public/adapter/device'
import { __resetCache as resetPackage } from '../../../src/public/adapter/package'
import { __resetCache as resetSystem } from '../../../src/public/adapter/system'

import type { Channel, ReportPayload } from '../../../src/public/pipeline/types'
import type { ReportInput } from '../../../src/public/pipeline/collector'

interface FakeChannel extends Channel {
  send: jest.Mock<Promise<void>, [ReportPayload]>
  available: jest.Mock<boolean, []>
}

function fakeChannel(): FakeChannel {
  const send: jest.Mock<Promise<void>, [ReportPayload]> = jest.fn(
    (_p: ReportPayload) => Promise.resolve()
  )
  const available: jest.Mock<boolean, []> = jest.fn(() => true)
  return { name: '1.0', available, send }
}

function resetAll(): void {
  queueMod.__reset()
  retryMod.__reset()
  sessionMod.__resetState()
  visitMod.__resetState()
  resetEntry()
  __resetTitle()
  __resetPagesTitleCache()
  resetDevice()
  resetPackage()
  resetSystem()
  __resetLifecycleState()
  __resetStatApp()
}

function installAppWithSpyReporter(): {
  app: ReturnType<typeof getStatApp>
  reportSpy: jest.SpyInstance
  http: FakeChannel
} {
  const http = fakeChannel()
  const app = getStatApp()
  app.install(
    { version: '1', ak: 'k' },
    {
      channels: { http, cloud: null },
      skipInterceptors: true,
      skipMigration: true,
      skipRecoverRetry: true,
      collectorDepsPatch: {
        isNetworkOffline: async () => false,
      },
    }
  )
  const collector = app.getCollector()!
  const reportSpy = jest.spyOn(collector, 'report')
  return { app, reportSpy, http }
}

function getReportedLts(spy: jest.SpyInstance): string[] {
  return spy.mock.calls.map((c) => (c[0] as ReportInput).lt)
}

describe('runtime/lifecycleHooks', () => {
  beforeEach(() => {
    installMockUni({ platform: 'h5' })
    resetAll()
  })

  afterEach(() => {
    resetAll()
    restoreMockUni()
  })

  test('T1 cold_launch → cst=1，仅发 lt=1', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, { scene: 1001 })
    const lts = getReportedLts(reportSpy)
    expect(lts).toEqual(['1'])
    const session = sessionMod.getSnapshot()
    expect(session?.sct).toBe(1)
  })

  test('T1.b cold_launch options.path 透传成 lt=1 的 url', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, { scene: 1001, path: 'pages/index/index' })
    const launch = reportSpy.mock.calls
      .map((c) => c[0] as ReportInput)
      .find((i) => i.lt === '1')!
    expect(launch.url).toBe('pages/index/index')
    expect((launch as unknown as Record<string, unknown>).iey).toBeUndefined()
  })

  test('T2 app_show 后台超时 → cst=2，仅发 lt=1', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    reportSpy.mockClear()

    sessionMod.markBackground(Math.floor(Date.now() / 1000) - 10_000)
    handleAppShow(app, {})
    const lts = getReportedLts(reportSpy)
    expect(lts).toEqual(['1'])
    expect(sessionMod.getSnapshot()?.sct).toBe(2)
  })

  test('T2.c App onShow：storage bgTs 丢失时靠 backgroundEnteredAt 仍 cst=2', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
      const { app, reportSpy } = installAppWithSpyReporter()
      sessionMod.configure({ backgroundTimeoutSec: 10 })
      handleLaunch(app, {})
      handlePageShow(app, { route: 'pages/home' })
      jest.setSystemTime(Date.now() + 5_000)
      handleAppHide(app)
      reportSpy.mockClear()
      const snap = sessionMod.getSnapshot()!
      snap.bgTs = 0
      jest.setSystemTime(Date.now() + 15_000)
      handleAppShow(app, {})
      expect(getReportedLts(reportSpy)).toEqual(['1'])
      expect(sessionMod.getSnapshot()?.sct).toBe(2)
    } finally {
      jest.useRealTimers()
    }
  })

  test('T2.d Vue2：hide 后误触发 page onShow 不应消费 pending，真正回前台仍 cst=2', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
      const { app, reportSpy } = installAppWithSpyReporter()
      sessionMod.configure({ backgroundTimeoutSec: 10 })
      const { mixin } = bindLifecycle(app)
      const pageOnShow = mixin.onShow as (this: { mpType: string }) => void
      handleLaunch(app, {})
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      jest.setSystemTime(Date.now() + 5_000)
      handleAppHide(app)
      reportSpy.mockClear()
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      expect(getReportedLts(reportSpy)).toEqual([])
      jest.setSystemTime(Date.now() + 15_000)
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      expect(getReportedLts(reportSpy)).toEqual(['1'])
      expect(sessionMod.getSnapshot()?.sct).toBe(2)
    } finally {
      jest.useRealTimers()
    }
  })

  test('T2.b 仅页面 onShow 恢复（无 App onShow）后台超时仍应 cst=2', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
      const { app, reportSpy } = installAppWithSpyReporter()
      sessionMod.configure({ backgroundTimeoutSec: 10 })
      const { mixin } = bindLifecycle(app)
      const pageOnShow = mixin.onShow as (this: { mpType: string }) => void
      handleLaunch(app, {})
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      jest.setSystemTime(Date.now() + 5_000)
      handleAppHide(app)
      reportSpy.mockClear()
      jest.setSystemTime(Date.now() + 20_000)
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      expect(getReportedLts(reportSpy)).toEqual(['1'])
      expect(sessionMod.getSnapshot()?.sct).toBe(2)
    } finally {
      jest.useRealTimers()
    }
  })

  test('T3 page_show 前台无操作超时 → cst=3，仅发 lt=1', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    reportSpy.mockClear()

    const snap = sessionMod.getSnapshot()!
    snap.lastActive = Math.floor(Date.now() / 1000) - 999_999
    handlePageShow(app, { route: 'pages/home' })
    const lts = getReportedLts(reportSpy)
    expect(lts).toEqual(['1'])
    expect(sessionMod.getSnapshot()?.sct).toBe(3)
  })

  test('T3.c Vue2 mixin：前台无操作超时后切页不应多报 lt=3', () => {
    installMockUni({ platform: 'h5' })
    const { app, reportSpy } = installAppWithSpyReporter()
    const { mixin } = bindLifecycle(app)
    const pageOnHide = mixin.onHide as (this: {
      mpType: string
      route?: string
    }) => void
    const pageOnShow = mixin.onShow as (this: {
      mpType: string
      route?: string
    }) => void

    handleLaunch(app, {})
    pageOnShow.call({ mpType: 'page', route: 'pages/home' })
    reportSpy.mockClear()

    const snap = sessionMod.getSnapshot()!
    snap.lastActive = Math.floor(Date.now() / 1000) - 999_999

    pageOnHide.call({ mpType: 'page', route: 'pages/home' })
    pageOnShow.call({ mpType: 'page', route: 'pages/B' })

    const lts = getReportedLts(reportSpy)
    expect(lts).toContain('1')
    expect(lts).toContain('11')
    expect(lts.filter((lt) => lt === '3')).toHaveLength(0)
  })

  test('T3.b cst=3 新会话且有离开页：首包 requests 内 lt=1 早于 lt=11', async () => {
    const { app, reportSpy, http } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' })
    handlePageHide(app, { route: 'pages/home' })
    reportSpy.mockClear()
    http.send.mockClear()

    const snap = sessionMod.getSnapshot()!
    snap.lastActive = Math.floor(Date.now() / 1000) - 999_999
    handlePageShow(app, { route: 'pages/A' })

    expect(getReportedLts(reportSpy)).toContain('1')
    expect(getReportedLts(reportSpy)).toContain('11')

    await Promise.resolve()
    expect(http.send).toHaveBeenCalled()
    const payload = http.send.mock.calls[0][0] as ReportPayload
    const events = JSON.parse(payload.requests) as Array<{ lt?: string }>
    const order = events.map((e) => String(e.lt ?? ''))
    const i1 = order.indexOf('1')
    const i11 = order.indexOf('11')
    expect(i1).toBeGreaterThanOrEqual(0)
    expect(i11).toBeGreaterThanOrEqual(0)
    expect(i1).toBeLessThan(i11)
  })

  test('T4 page_show 未超时 → 不发 session/launch', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    reportSpy.mockClear()

    handlePageShow(app, { route: 'pages/home' })
    const lts = getReportedLts(reportSpy)
    expect(lts).toEqual([])
  })

  test('app_hide：发 lt=11 + lt=3，并 markBackground', async () => {
    const { app, reportSpy, http } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' })
    http.send.mockClear()
    reportSpy.mockClear()

    handleAppHide(app)
    const lts = getReportedLts(reportSpy)
    expect(lts).toContain('11')
    expect(lts).toContain('3')
    expect(sessionMod.getSnapshot()?.bgTs).toBeGreaterThan(0)
    // 强制 flush 应触发 channel.send（本轮包含 lt=11 与 lt=3）。
    await Promise.resolve()
    expect(http.send).toHaveBeenCalled()
    const payload = http.send.mock.calls[0][0] as ReportPayload
    const events = JSON.parse(payload.requests) as Array<{ lt?: string }>
    const order = events.map((e) => String(e.lt ?? ''))
    const i11 = order.indexOf('11')
    const i3 = order.indexOf('3')
    expect(i11).toBeGreaterThanOrEqual(0)
    expect(i3).toBeGreaterThanOrEqual(0)
    expect(i11).toBeLessThan(i3)
  })

  test('Vue2：不注册 uni.onAppHide，App onHide 走 mixin', () => {
    installMockUni({ platform: 'h5' })
    expect(shouldBindUniAppLifecycle()).toBe(false)
    expect(shouldMixinDispatchAppLifecycle()).toBe(true)
    const { app, reportSpy } = installAppWithSpyReporter()
    const { mixin } = bindLifecycle(app)
    handleLaunch(app, {})
    reportSpy.mockClear()
    ;(mixin.onHide as (this: { mpType: string }) => void).call({
      mpType: 'app',
    })
    expect(getReportedLts(reportSpy)).toContain('3')
  })

  test('Vue3 小程序：应注册 uni.onAppShow/Hide，mixin 不分发 App 前后台', () => {
    installMockUni({ platform: 'mp-alipay' })
    expect(shouldBindUniAppLifecycle()).toBe(true)
    expect(shouldMixinDispatchAppLifecycle()).toBe(false)
  })

  test('Vue2：无 uni.onAppHide 时 mixin App onHide 兜底', () => {
    const { uni } = installMockUni({
      platform: 'h5',
      patch: { onAppShow: () => () => {} },
    })
    delete uni.onAppHide
    const { app, reportSpy } = installAppWithSpyReporter()
    const { mixin } = bindLifecycle(app)
    handleLaunch(app, {})
    reportSpy.mockClear()
    ;(mixin.onHide as (this: { mpType: string }) => void).call({
      mpType: 'app',
    })
    expect(getReportedLts(reportSpy)).toContain('3')
  })

  test('H5：page onHide 且 visibility=hidden 时补记 lt=3（Vue3 进后台兜底）', () => {
    installMockUni({ platform: 'h5' })
    const origDoc = (globalThis as { document?: { visibilityState?: string } })
      .document
    Object.defineProperty(globalThis, 'document', {
      value: { visibilityState: 'hidden' },
      configurable: true,
    })
    try {
      const { app, reportSpy } = installAppWithSpyReporter()
      const { mixin } = bindLifecycle(app)
      handleLaunch(app, {})
      reportSpy.mockClear()
      ;(
        mixin.onHide as (this: { mpType: string; route?: string }) => void
      ).call({
        mpType: 'page',
        route: 'pages/home',
      })
      expect(getReportedLts(reportSpy)).toContain('3')
    } finally {
      if (origDoc === undefined) {
        delete (globalThis as { document?: unknown }).document
      } else {
        Object.defineProperty(globalThis, 'document', {
          value: origDoc,
          configurable: true,
        })
      }
    }
  })

  test('小程序：page onHide 延迟 120ms 后补记 lt=3', () => {
    jest.useFakeTimers()
    try {
      installMockUni({ platform: 'mp-weixin' })
      const { app, reportSpy } = installAppWithSpyReporter()
      const { mixin } = bindLifecycle(app)
      const pageOnHide = mixin.onHide as (this: {
        mpType: string
        route?: string
      }) => void
      const pageOnShow = mixin.onShow as (this: {
        mpType: string
        route?: string
      }) => void

      handleLaunch(app, {})
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      reportSpy.mockClear()
      pageOnHide.call({ mpType: 'page', route: 'pages/home' })
      expect(getReportedLts(reportSpy)).not.toContain('3')
      jest.advanceTimersByTime(120)
      expect(getReportedLts(reportSpy)).toContain('3')
    } finally {
      jest.useRealTimers()
    }
  })

  test('小程序：切页 onShow 取消 page onHide 延迟，不应多报 lt=3', () => {
    jest.useFakeTimers()
    try {
      installMockUni({ platform: 'mp-weixin' })
      const { app, reportSpy } = installAppWithSpyReporter()
      const { mixin } = bindLifecycle(app)
      const pageOnHide = mixin.onHide as (this: {
        mpType: string
        route?: string
      }) => void
      const pageOnShow = mixin.onShow as (this: {
        mpType: string
        route?: string
      }) => void

      handleLaunch(app, {})
      pageOnShow.call({ mpType: 'page', route: 'pages/home' })
      reportSpy.mockClear()
      pageOnHide.call({ mpType: 'page', route: 'pages/home' })
      pageOnShow.call({ mpType: 'page', route: 'pages/B' })
      jest.advanceTimersByTime(120)
      expect(getReportedLts(reportSpy).filter((lt) => lt === '3')).toHaveLength(
        0
      )
    } finally {
      jest.useRealTimers()
    }
  })

  test('小程序：uni.onAppHide 与 page 延迟兜底不重复 lt=3', () => {
    jest.useFakeTimers()
    try {
      const hideCallbacks: Array<() => void> = []
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onAppHide: (cb: () => void) => {
            hideCallbacks.push(cb)
            return () => {}
          },
        },
      })
      const { app, reportSpy } = installAppWithSpyReporter()
      const { mixin } = bindLifecycle(app)
      handleLaunch(app, {})
      ;(
        mixin.onShow as (this: { mpType: string; route?: string }) => void
      ).call({ mpType: 'page', route: 'pages/home' })
      reportSpy.mockClear()
      hideCallbacks[0]?.()
      expect(getReportedLts(reportSpy).filter((lt) => lt === '3')).toHaveLength(
        1
      )
      ;(
        mixin.onHide as (this: { mpType: string; route?: string }) => void
      ).call({ mpType: 'page', route: 'pages/home' })
      jest.advanceTimersByTime(120)
      expect(getReportedLts(reportSpy).filter((lt) => lt === '3')).toHaveLength(
        1
      )
    } finally {
      jest.useRealTimers()
    }
  })

  test('后台恢复：首个 page_show 不带历史超长停留，且忽略非页面 onShow', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-05-01T00:00:00.000Z'))
      const { app, reportSpy } = installAppWithSpyReporter()
      handleLaunch(app, {})
      handlePageShow(app, { route: 'pages/A' })
      handlePageHide(app, { route: 'pages/A' })
      jest.setSystemTime(Date.now() + 10_000)
      handleAppHide(app)

      // 进入后台后，模拟"五一假期"长时间未回前台。
      jest.setSystemTime(Date.now() + 5 * 24 * 60 * 60 * 1000)
      reportSpy.mockClear()
      handleAppShow(app, {})

      // H5 场景：mixin onShow 可能先收到 App 级 onShow（无 route/fullPath）。
      handlePageShow(app, {} as unknown as { route?: string })
      expect(getReportedLts(reportSpy)).toEqual(['1'])

      // 同页恢复展示：不应补发上一页 lt=11（后台前已由 lt=3 闭合）。
      handlePageShow(app, { route: 'pages/A' })
      let pageLogs = reportSpy.mock.calls
        .map((c) => c[0] as ReportInput)
        .filter((i) => i.lt === '11')
      expect(pageLogs).toHaveLength(0)

      // 后续真实页面切换仍应正常上报 lt=11，且停留时长应为前台停留，不含后台长时间。
      handlePageHide(app, { route: 'pages/A' })
      jest.setSystemTime(Date.now() + 2_000)
      handlePageShow(app, { route: 'pages/B' })
      pageLogs = reportSpy.mock.calls
        .map((c) => c[0] as ReportInput)
        .filter((i) => i.lt === '11')
      expect(pageLogs).toHaveLength(1)
      expect(pageLogs[0].url).toBe('pages/A')
      expect(pageLogs[0].urlref_ts).toBeGreaterThanOrEqual(1)
      expect(pageLogs[0].urlref_ts as number).toBeLessThan(60)
    } finally {
      jest.useRealTimers()
    }
  })

  test('cst=2 新会话后首个有效 lt=11 应仅统计前台停留', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-05-01T00:00:00.000Z'))
      const { app, reportSpy } = installAppWithSpyReporter()
      handleLaunch(app, {})
      handlePageShow(app, { route: 'pages/home' })
      handlePageHide(app, { route: 'pages/home' })

      // 先进入后台，确保后台前页面闭环由 lt=3 完成。
      jest.setSystemTime(Date.now() + 8_000)
      handleAppHide(app)

      // 超过 backgroundTimeout 触发 cst=2 新会话。
      jest.setSystemTime(Date.now() + 5 * 24 * 60 * 60 * 1000)
      reportSpy.mockClear()
      handleAppShow(app, {})
      const launchAfterResume = reportSpy.mock.calls
        .map((c) => c[0] as ReportInput)
        .find((i) => i.lt === '1')
      expect(launchAfterResume).toBeDefined()
      expect(sessionMod.getSnapshot()?.sct).toBe(2)

      // 恢复后同页展示不应产出 lt=11（避免补发历史停留）。
      handlePageShow(app, { route: 'pages/home' })
      const pageLogsAfterSameRoute = reportSpy.mock.calls
        .map((c) => c[0] as ReportInput)
        .filter((i) => i.lt === '11')
      expect(pageLogsAfterSameRoute).toHaveLength(0)

      // 发生真实页面切换后才上报 lt=11，且 urlref_ts 只反映前台停留（这里约 3 秒）。
      handlePageHide(app, { route: 'pages/home' })
      jest.setSystemTime(Date.now() + 3_000)
      handlePageShow(app, { route: 'pages/detail' })
      const pageLogs = reportSpy.mock.calls
        .map((c) => c[0] as ReportInput)
        .filter((i) => i.lt === '11')
      expect(pageLogs).toHaveLength(1)
      expect(pageLogs[0].url).toBe('pages/home')
      expect(pageLogs[0].urlref_ts).toBeGreaterThanOrEqual(1)
      // 宽松上限：用于防止把 5 天后台时长并入。
      expect(pageLogs[0].urlref_ts as number).toBeLessThan(120)
    } finally {
      jest.useRealTimers()
    }
  })

  test('page_show：lt=11 由下一页 onShow 触发，描述离开页（url=上一页）', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    // 首次 onShow：无上一页，不发 lt=11；只登记 lastRoute。
    handlePageShow(app, { route: 'pages/A' })
    expect(getReportedLts(reportSpy).filter((l) => l === '11')).toEqual([])
    handlePageHide(app, { route: 'pages/A' })
    reportSpy.mockClear()

    // 进入 B → lt=11 描述离开的 A；仅一层来源时不带 urlref。
    handlePageShow(app, { route: 'pages/B' })
    const calls = reportSpy.mock.calls.filter(
      (c) => (c[0] as ReportInput).lt === '11'
    )
    expect(calls).toHaveLength(1)
    const input = calls[0][0] as ReportInput
    expect(input.url).toBe('pages/A')
    expect(input.urlref).toBeUndefined()
    expect(input.urlref_ts).toBeGreaterThanOrEqual(1)
  })

  test('page_show：hide 冻结旧页标题且 show 保留新页 onLoad 已设置标题', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/A' })
    setPageTitle('A API 标题')
    app.report('title', 'A 上报标题')
    handlePageHide(app, { route: 'pages/A' })

    // 模拟新页 onLoad 早于统计 onShow。
    setPageTitle('B API 标题')
    app.report('title', 'B 上报标题')
    handlePageShow(app, { route: 'pages/B' })
    handlePageHide(app, { route: 'pages/B' })

    setPageTitle('C API 标题')
    app.report('title', 'C 上报标题')
    handlePageShow(app, { route: 'pages/C' })

    const pageLogs = reportSpy.mock.calls
      .map((call) => call[0] as ReportInput)
      .filter((input) => input.lt === '11')
    expect(pageLogs).toHaveLength(2)
    expect(pageLogs[0]).toEqual(
      expect.objectContaining({
        url: 'pages/A',
        ttn: 'A API 标题',
        ttc: 'A 上报标题',
      })
    )
    expect(pageLogs[1]).toEqual(
      expect.objectContaining({
        url: 'pages/B',
        ttn: 'B API 标题',
        ttc: 'B 上报标题',
      })
    )
  })

  test('page_show：iey/ppiey 解耦（修复 #PPIEY）', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})

    handlePageShow(app, { route: 'pages/home' }) // 入口页（首次，无 lt=11）
    handlePageHide(app, { route: 'pages/home' })
    handlePageShow(app, { route: 'pages/A' }) // lt=11：离开 home → url=home，无 urlref
    handlePageHide(app, { route: 'pages/A' })
    handlePageShow(app, { route: 'pages/home' }) // lt=11：离开 A → url=A，urlref=home
    handlePageHide(app, { route: 'pages/home' })

    const ltPages = reportSpy.mock.calls
      .map((c) => c[0] as ReportInput)
      .filter((i) => i.lt === '11')
    expect(ltPages).toHaveLength(2)
    // 第 1 条：离开 home（入口 iey=1），尚无再上一层 urlref
    expect(ltPages[0].url).toBe('pages/home')
    expect(ltPages[0].urlref).toBeUndefined()
    expect(ltPages[0].iey).toBe(true)
    expect(ltPages[0].ppiey).toBe(false)
    // 第 2 条：离开 A（非入口），urlref 指向 home（入口）
    expect(ltPages[1].url).toBe('pages/A')
    expect(ltPages[1].urlref).toBe('pages/home')
    expect(ltPages[1].iey).toBe(false)
    expect(ltPages[1].ppiey).toBe(true)
  })

  test('page_show：A→B→C→A→B 循环回入口后 iey/ppiey 不再为 1', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})

    handlePageShow(app, { route: 'pages/A' })
    handlePageHide(app, { route: 'pages/A' })
    handlePageShow(app, { route: 'pages/B' })
    handlePageHide(app, { route: 'pages/B' })
    handlePageShow(app, { route: 'pages/C' })
    handlePageHide(app, { route: 'pages/C' })
    handlePageShow(app, { route: 'pages/A' })
    handlePageHide(app, { route: 'pages/A' })
    handlePageShow(app, { route: 'pages/B' })
    handlePageHide(app, { route: 'pages/B' })

    const ltPages = reportSpy.mock.calls
      .map((c) => c[0] as ReportInput)
      .filter((i) => i.lt === '11')
    expect(ltPages).toHaveLength(4)
    // 首次离开入口 A
    expect(ltPages[0].url).toBe('pages/A')
    expect(ltPages[0].iey).toBe(true)
    expect(ltPages[0].ppiey).toBe(false)
    // 离开 B，urlref 仍指向首次入口 A
    expect(ltPages[1].url).toBe('pages/B')
    expect(ltPages[1].urlref).toBe('pages/A')
    expect(ltPages[1].iey).toBe(false)
    expect(ltPages[1].ppiey).toBe(true)
    // 离开 C
    expect(ltPages[2].url).toBe('pages/C')
    expect(ltPages[2].iey).toBe(false)
    expect(ltPages[2].ppiey).toBe(false)
    // 再次离开 A（循环回来，不再算入口）
    expect(ltPages[3].url).toBe('pages/A')
    expect(ltPages[3].urlref).toBe('pages/C')
    expect(ltPages[3].iey).toBe(false)
    expect(ltPages[3].ppiey).toBe(false)
  })

  // 回归：enablePageLog=false 时跳过 lt=11 上报。
  // 与私有版 is_page_report() 在 pageShow/pageHide 上的拦截语义完全一致：
  // 仅影响页面切换事件 lt=11，**不影响** lt=1（launch）/ lt=3（appHide）/ lt=21 / lt=31。
  test('enablePageLog=false 时跳过 lt=11；lt=1 / lt=3 不受影响', async () => {
    const { app, reportSpy, http } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' }, { enablePageLog: false })
    handlePageHide(app, { route: 'pages/home' })
    handlePageShow(app, { route: 'pages/A' }, { enablePageLog: false })
    handlePageHide(app, { route: 'pages/A' })

    const lts = getReportedLts(reportSpy)
    // 应包含 lt=1（launch）但不包含 lt=11（被跳过）
    expect(lts).toContain('1')
    expect(lts).not.toContain('11')

    // app_hide 仍然发 lt=3；enablePageLog=false 时不补 lt=11
    reportSpy.mockClear()
    handleAppHide(app, { enablePageLog: false })
    const ltsAfterHide = getReportedLts(reportSpy)
    expect(ltsAfterHide).toContain('3')
    expect(ltsAfterHide).not.toContain('11')
    await Promise.resolve()
    expect(http.send).toHaveBeenCalled()
  })

  test('enablePageLog=true（默认）时 lt=11 正常上报', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' }, { enablePageLog: true })
    handlePageHide(app, { route: 'pages/home' })
    handlePageShow(app, { route: 'pages/A' }, { enablePageLog: true })
    expect(getReportedLts(reportSpy)).toContain('11')
  })

  test('app_hide：lt=3 不上报 iey/ppiey（入口标记仅 lt=11）', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' })
    handlePageHide(app, { route: 'pages/home' })
    handlePageShow(app, { route: 'pages/A' })
    reportSpy.mockClear()

    handleAppHide(app)
    const hideEvent = reportSpy.mock.calls
      .map((c) => c[0] as ReportInput)
      .find((i) => i.lt === '3')!
    expect(
      (hideEvent as unknown as Record<string, unknown>).iey
    ).toBeUndefined()
    expect(
      (hideEvent as unknown as Record<string, unknown>).ppiey
    ).toBeUndefined()
  })

  test('onError：转给 StatApp.reportError，不抛错', () => {
    // fakeTimers 兜住 handleError 内部 `setTimeout(throw e)` 的异步重抛，
    // 否则 Node 事件循环会拿到 unhandled exception 把进程搞挂。
    jest.useFakeTimers()
    try {
      const { app, reportSpy } = installAppWithSpyReporter()
      handleLaunch(app, {})
      reportSpy.mockClear()

      expect(() => handleError(app, new Error('boom'))).not.toThrow()
      const lts = getReportedLts(reportSpy)
      expect(lts).toContain('31')
    } finally {
      jest.clearAllTimers()
      jest.useRealTimers()
    }
  })

  // 回归保护：原始错误必须通过 setTimeout 异步重抛，让浏览器 / 端的"Uncaught
  // Exception"通路接管。绝不能用 console.error，否则 devtools 会把 SDK 文件路径
  // 显示在控制台日志的"来源"列，违反"旁路监听"承诺。详见 lifecycleHooks.ts#handleError。
  test('onError：异步重抛原始 Error，让错误回归原生 Uncaught 通路', () => {
    jest.useFakeTimers()
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const { app } = installAppWithSpyReporter()
      handleLaunch(app, {})
      const original = new Error('boom-msg')
      handleError(app, original)

      // 严格旁路：handleError 内部不得直接调 console.error（避免 SDK 文件
      // 路径污染 devtools 控制台的"来源"列）
      expect(errSpy).not.toHaveBeenCalled()

      // 必须排了一个异步 task 重抛原对象（保留 stack）
      expect(() => jest.runAllTimers()).toThrow(original)
    } finally {
      jest.useRealTimers()
      errSpy.mockRestore()
    }
  })

  test('onError：小程序端不重抛，仅上报 lt=31（避免二次 onError / 多条 31）', () => {
    const prev = process.env.UNI_PLATFORM
    process.env.UNI_PLATFORM = 'mp-weixin'
    jest.useFakeTimers()
    try {
      const http = fakeChannel()
      const app = getStatApp()
      app.install(
        { version: '1', ak: 'k' },
        {
          channels: { http, cloud: null },
          skipInterceptors: true,
          skipMigration: true,
          skipRecoverRetry: true,
          collectorDepsPatch: { firstFlushDeferMs: 0 },
        }
      )
      const reportSpy = jest.spyOn(app.getCollector()!, 'report')
      handleLaunch(app, {})
      reportSpy.mockClear()

      expect(() => handleError(app, new Error('mp-boom'))).not.toThrow()
      expect(getReportedLts(reportSpy)).toContain('31')
      expect(jest.getTimerCount()).toBe(0)
      expect(() => jest.runAllTimers()).not.toThrow()
    } finally {
      process.env.UNI_PLATFORM = prev
      jest.clearAllTimers()
      jest.useRealTimers()
    }
  })

  test('onError：调用方可关闭重抛，仅保留 lt=31 上报', () => {
    jest.useFakeTimers()
    try {
      const { app, reportSpy } = installAppWithSpyReporter()
      handleLaunch(app, {})
      reportSpy.mockClear()

      handleError(app, new Error('native-reported'), undefined, false)

      expect(getReportedLts(reportSpy)).toContain('31')
      expect(jest.getTimerCount()).toBe(0)
    } finally {
      jest.clearAllTimers()
      jest.useRealTimers()
    }
  })

  test('onError：同一 Error 实例第二次进入时不再重抛（防重入死循环）', () => {
    jest.useFakeTimers()
    try {
      const { app } = installAppWithSpyReporter()
      handleLaunch(app, {})
      const e = new Error('reentry')
      handleError(app, e)
      jest.clearAllTimers()
      handleError(app, e) // 模拟 setTimeout 重抛后被自身的 onError 二次接住
      // 第二次不应再排重抛 task，否则会无限循环
      expect(jest.getTimerCount()).toBe(0)
    } finally {
      jest.useRealTimers()
    }
  })

  test('visit 字段：cold_launch 与 cst=2/3 新会话 lt=1 均携带', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    const launchInputs = reportSpy.mock.calls.map((c) => c[0] as ReportInput)
    const ltLaunch = launchInputs.find((i) => i.lt === '1')!
    expect(ltLaunch.visit).toBeDefined()
    reportSpy.mockClear()

    sessionMod.markBackground(Math.floor(Date.now() / 1000) - 10_000)
    handleAppShow(app, {})
    const appShowInputs = reportSpy.mock.calls.map((c) => c[0] as ReportInput)
    const ltAppShow = appShowInputs.find((i) => i.lt === '1')!
    expect(ltAppShow.visit).toBeDefined()
    expect(ltAppShow.visit!.lvts).toBeDefined()
  })

  test('bindLifecycle：返回 mixin 包含 6 个钩子，unbind 幂等', () => {
    const { app } = installAppWithSpyReporter()
    const bound = bindLifecycle(app)
    const keys = Object.keys(bound.mixin).sort()
    expect(keys).toEqual(
      ['onError', 'onHide', 'onLaunch', 'onLoad', 'onShow', 'onUnload'].sort()
    )
    expect(() => bound.unbind()).not.toThrow()
    expect(() => bound.unbind()).not.toThrow()
  })

  test('后台超时恢复：handleAppShow 上报 lt=1（与 uni.onAppShow 回调同路径）', () => {
    installMockUni({ platform: 'mp-weixin' })
    try {
      resetAll()
      const { app, reportSpy } = installAppWithSpyReporter()
      handleLaunch(app, {})
      reportSpy.mockClear()
      sessionMod.markBackground(Math.floor(Date.now() / 1000) - 10_000)
      handleAppShow(app, { scene: 1037 })
      expect(getReportedLts(reportSpy)).toEqual(['1'])
    } finally {
      restoreMockUni()
    }
  })

  test('Vue3 QQ：mixin App onShow + uni.onAppShow 同次回前台仅一条 lt=1', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
      installMockUni({ platform: 'mp-qq' })
      resetAll()
      const { app, reportSpy } = installAppWithSpyReporter()
      sessionMod.configure({ backgroundTimeoutSec: 10 })
      expect(shouldBindUniAppLifecycle()).toBe(true)
      const { mixin } = bindLifecycle(app)
      const appOnShow = mixin.onShow as (this: { mpType: string }) => void
      handleLaunch(app, { scene: 2001 })
      handlePageShow(app, { route: 'pages/index/index' })
      jest.setSystemTime(Date.now() + 5_000)
      handleAppHide(app)
      reportSpy.mockClear()
      jest.setSystemTime(Date.now() + 15_000)
      appOnShow.call({ mpType: 'app' })
      handleAppShow(app, { scene: 1011, path: 'pages/index/index' })
      expect(getReportedLts(reportSpy).filter((lt) => lt === '1')).toHaveLength(
        1
      )
      expect(sessionMod.getSnapshot()?.sct).toBe(2)
    } finally {
      jest.useRealTimers()
      restoreMockUni()
    }
  })
})
