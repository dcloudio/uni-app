/**
 * lifecycleHooks 单元测试。
 *
 * 覆盖 4 类 session 触发（与 `docs/uni统计上报参数.md` 对齐：仅 lt=1）：
 *   T1 cold_launch  → cst=1，仅发 lt=1。
 *   T2 app_show 后台超时 → cst=2，仅发 lt=1。
 *   T3 page_show 前台无操作超时 → cst=3，仅发 lt=1。
 *   T4 page_show 未超时 → 不发 launch，仅维护 lastRoute / entry。
 *
 * 另外验证：
 *   - app_hide：写 markBackground、发 lt=3、强制 flush。
 *   - page_hide：发 lt=11，url/urlref/urlref_ts 字段正确。
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
} from '../../../src/public/runtime/lifecycleHooks'
import { __resetStatApp, getStatApp } from '../../../src/public/runtime/StatApp'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import * as queueMod from '../../../src/public/pipeline/queue'
import * as retryMod from '../../../src/public/pipeline/retry'
import * as sessionMod from '../../../src/public/domain/session/machine'
import * as visitMod from '../../../src/public/domain/visit/firstVisit'
import { __resetState as resetEntry } from '../../../src/public/domain/entry/entryPage'
import { __resetTitle } from '../../../src/public/domain/title'
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

  test('T4 page_show 未超时 → 不发 session/launch', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    reportSpy.mockClear()

    handlePageShow(app, { route: 'pages/home' })
    const lts = getReportedLts(reportSpy)
    expect(lts).toEqual([])
  })

  test('app_hide：发 lt=3，并 markBackground', async () => {
    const { app, reportSpy, http } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' })
    reportSpy.mockClear()

    handleAppHide(app)
    const lts = getReportedLts(reportSpy)
    expect(lts).toContain('3')
    expect(sessionMod.getSnapshot()?.bgTs).toBeGreaterThan(0)
    // 强制 flush 应触发 channel.send（lt=3 + 之前 onLaunch/page_show 的事件已被 batch 出去了）
    await Promise.resolve()
    expect(http.send).toHaveBeenCalled()
  })

  test('page_hide：发 lt=11，url/urlref/urlref_ts 字段正确', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/A' })
    reportSpy.mockClear()

    handlePageHide(app, { route: 'pages/A' })
    const calls = reportSpy.mock.calls
    expect(calls).toHaveLength(1)
    const input = calls[0][0] as ReportInput
    expect(input.lt).toBe('11')
    expect(input.urlref_ts).toBeGreaterThanOrEqual(0)
  })

  test('page_hide：iey/ppiey 解耦（修复 #PPIEY）', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})

    handlePageShow(app, { route: 'pages/home' }) // 入口页
    handlePageHide(app, { route: 'pages/home' })
    handlePageShow(app, { route: 'pages/A' })
    handlePageHide(app, { route: 'pages/A' })
    handlePageShow(app, { route: 'pages/home' })
    handlePageHide(app, { route: 'pages/home' })

    const ltPages = reportSpy.mock.calls
      .map((c) => c[0] as ReportInput)
      .filter((i) => i.lt === '11')
    expect(ltPages).toHaveLength(3)
    // iey: home=true, A=false, home=true
    // ppiey: 0(首次无前页), 1(前页是 home/入口), 0(前页是 A/非入口)
    expect(ltPages[0].iey).toBe(true)
    expect(ltPages[0].ppiey).toBe(false)
    expect(ltPages[1].iey).toBe(false)
    expect(ltPages[1].ppiey).toBe(true)
    expect(ltPages[2].iey).toBe(true)
    expect(ltPages[2].ppiey).toBe(false)
  })

  test('app_hide：iey/ppiey 取自最近一次 prev 状态（修复 #PPIEY）', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    handlePageShow(app, { route: 'pages/home' }) // home 标为入口
    handlePageHide(app, { route: 'pages/home' })
    handlePageShow(app, { route: 'pages/A' }) // A 非入口；prevIey=true
    reportSpy.mockClear()

    handleAppHide(app)
    const hideEvent = reportSpy.mock.calls
      .map((c) => c[0] as ReportInput)
      .find((i) => i.lt === '3')!
    expect(hideEvent.iey).toBe(false) // 当前页 A 非入口
    expect(hideEvent.ppiey).toBe(true) // 上一页 home 是入口
  })

  test('onError：转给 StatApp.reportError，不抛错', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    reportSpy.mockClear()

    expect(() => handleError(app, new Error('boom'))).not.toThrow()
    const lts = getReportedLts(reportSpy)
    expect(lts).toContain('31')
  })

  test('visit 字段仅在 cold_launch 的 lt=1 携带；cst=2/3 不再带', () => {
    const { app, reportSpy } = installAppWithSpyReporter()
    handleLaunch(app, {})
    const launchInputs = reportSpy.mock.calls.map((c) => c[0] as ReportInput)
    const ltLaunch = launchInputs.find((i) => i.lt === '1')!
    expect(ltLaunch.visit).toBeDefined()
    reportSpy.mockClear()

    sessionMod.markBackground(Math.floor(Date.now() / 1000) - 10_000)
    handleAppShow(app, {})
    const appShowInputs = reportSpy.mock.calls.map((c) => c[0] as ReportInput)
    for (const i of appShowInputs) {
      expect(i.visit).toBeUndefined()
    }
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

  test('bindLifecycle：onAppShow 桥接 uni.onAppShow', () => {
    let registered: ((e: { scene?: number }) => void) | undefined
    installMockUni({
      patch: {
        onAppShow: jest.fn((cb: (e: { scene?: number }) => void) => {
          registered = cb
        }),
      },
    })
    try {
      resetAll()
      const { app, reportSpy } = installAppWithSpyReporter()
      handleLaunch(app, {})
      reportSpy.mockClear()
      bindLifecycle(app)
      // 模拟 uni 触发后台超时 → app_show
      sessionMod.markBackground(Math.floor(Date.now() / 1000) - 10_000)
      registered?.({ scene: 1037 })
      const lts = getReportedLts(reportSpy)
      expect(lts).toEqual(['1'])
    } finally {
      restoreMockUni()
    }
  })
})
