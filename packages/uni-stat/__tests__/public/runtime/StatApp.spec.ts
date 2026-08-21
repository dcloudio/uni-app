/**
 * StatApp 单元测试。
 *
 * 覆盖：
 *   - install 幂等：重复 install 仅生效一次。
 *   - install 子步骤：迁移 / loadVisit / recoverRetry 是否被触发，能被 skip。
 *   - report('title', value) → 写 reportTitle，不入队。
 *   - report('foo', value) → lt=21 自定义事件。
 *   - reportError(Error / string / object) → lt=31。
 *   - 测试 overrides 注入：channel 替换、跳过拦截器。
 */

import {
  StatApp,
  __resetStatApp,
  getStatApp,
} from '../../../src/public/runtime/StatApp'
import { APP_CHANNEL_FIRST_FLUSH_DELAY_MS } from '../../../src/public/config'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import { installMockPlus, restoreMockPlus } from '../helpers/mockPlus'
import * as queueMod from '../../../src/public/pipeline/queue'
import * as retryMod from '../../../src/public/pipeline/retry'
import * as sessionMod from '../../../src/public/domain/session/machine'
import * as visitMod from '../../../src/public/domain/visit/firstVisit'
import { __resetTitle, getCurrentTitle } from '../../../src/public/domain/title'
import { __resetCache as resetDevice } from '../../../src/public/adapter/device'
import { __resetCache as resetPackage } from '../../../src/public/adapter/package'
import { __resetCache as resetSystem } from '../../../src/public/adapter/system'
import { logger } from '../../../src/public/infra/logger'

import type { Channel, ReportPayload } from '../../../src/public/pipeline/types'

interface FakeChannel extends Channel {
  send: jest.Mock<Promise<void>, [ReportPayload]>
  available: jest.Mock<boolean, []>
}

function fakeChannel(name: '1.0' | '2.0' = '1.0'): FakeChannel {
  const send: jest.Mock<Promise<void>, [ReportPayload]> = jest.fn(
    (_p: ReportPayload) => Promise.resolve()
  )
  const available: jest.Mock<boolean, []> = jest.fn(() => true)
  return { name, available, send }
}

function resetAllModules(): void {
  queueMod.__reset()
  retryMod.__reset()
  sessionMod.__resetState()
  visitMod.__resetState()
  __resetTitle()
  resetDevice()
  resetPackage()
  resetSystem()
  __resetStatApp()
}

describe('runtime/StatApp', () => {
  beforeEach(() => {
    installMockUni({ platform: 'h5' })
    resetAllModules()
  })

  afterEach(() => {
    resetAllModules()
    restoreMockUni()
    restoreMockPlus()
  })

  test('install：App 端默认从 plus.runtime.channel 解析 ch', () => {
    installMockUni({ platform: 'app' })
    installMockPlus({ runtime: { channel: 'oppo' } })
    const app = getStatApp()
    app.install(
      {},
      { skipInterceptors: true, skipMigration: true, skipRecoverRetry: true }
    )
    expect(app.getConfig()?.ch).toBe('oppo')
  })

  test('install：App 端始终以 plus.runtime.channel 为准，不被显式 ch 覆盖', () => {
    installMockUni({ platform: 'app' })
    installMockPlus({ runtime: { channel: 'oppo' } })
    const app = getStatApp()
    app.install(
      { ch: '1001' },
      { skipInterceptors: true, skipMigration: true, skipRecoverRetry: true }
    )
    expect(app.getConfig()?.ch).toBe('oppo')
  })

  test('report：App 端发送前重新读取 plus.runtime.channel，避免安装/入队过早固定为空', async () => {
    installMockUni({ platform: 'app' })
    installMockPlus({ runtime: { channel: '' } })
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    app.report('foo', 'bar')
    ;(
      globalThis as unknown as {
        plus: { runtime: { channel: string } }
      }
    ).plus.runtime.channel = 'dlmm-Android-oppo'

    await app.getCollector()!.flush(true)
    expect(http.send).toHaveBeenCalledTimes(1)
    expect(http.send.mock.calls[0][0].requests).toMatch(
      /"ch":"dlmm-Android-oppo"/
    )
  })

  test('report：App 端 channel 为空时自动首包短延迟，等待发送前补齐 ch', async () => {
    jest.useFakeTimers()
    try {
      installMockUni({ platform: 'app' })
      installMockPlus({ runtime: { channel: '' } })
      const app = getStatApp()
      const http = fakeChannel('1.0')
      app.install(
        { version: '1' },
        {
          channels: { http, cloud: null },
          skipInterceptors: true,
          skipMigration: true,
          skipRecoverRetry: true,
        }
      )

      app.report('foo', 'bar')
      expect(http.send).not.toHaveBeenCalled()
      ;(
        globalThis as unknown as {
          plus: { runtime: { channel: string } }
        }
      ).plus.runtime.channel = 'dlmm-Android-honor'

      await jest.advanceTimersByTimeAsync(APP_CHANNEL_FIRST_FLUSH_DELAY_MS)
      expect(http.send).toHaveBeenCalledTimes(1)
      expect(http.send.mock.calls[0][0].requests).toMatch(
        /"ch":"dlmm-Android-honor"/
      )
    } finally {
      jest.useRealTimers()
    }
  })

  test('install：非 App 端允许手动传入 ch', () => {
    installMockUni({ platform: 'h5' })
    const app = getStatApp()
    app.install(
      { ch: 'campaign-a' },
      { skipInterceptors: true, skipMigration: true, skipRecoverRetry: true }
    )
    expect(app.getConfig()?.ch).toBe('campaign-a')
  })

  test('Vapor：windowWidth 缺失时 ww 回退 screenWidth，wh 保留有效窗口高度', async () => {
    ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR = 'true'
    try {
      installMockUni({
        platform: 'app',
        patch: {
          getWindowInfo: () => ({
            windowWidth: 0,
            windowHeight: 700,
            screenWidth: 390,
            screenHeight: 800,
          }),
        },
      })
      const app = getStatApp()
      const http = fakeChannel('1.0')
      app.install(
        { version: '1' },
        {
          channels: { http, cloud: null },
          skipInterceptors: true,
          skipMigration: true,
          skipRecoverRetry: true,
        }
      )

      app.report('screen_probe', 'value')
      await app.getCollector()!.flush(true)
      expect(http.send.mock.calls[0][0].requests).toMatch(/"ww":390/)
      expect(http.send.mock.calls[0][0].requests).toMatch(/"wh":700/)
    } finally {
      delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
    }
  })

  test('单例：getInstance / getStatApp 返回同一实例', () => {
    const a = StatApp.getInstance()
    const b = getStatApp()
    expect(a).toBe(b)
  })

  test('install 幂等：重复 install 仅生效一次', () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { ak: 'ak1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    const cfg1 = app.getConfig()
    const collector1 = app.getCollector()
    expect(app.isInstalled()).toBe(true)
    expect(cfg1?.ak).toBe('ak1')

    app.install({ ak: 'ak2' }, { skipInterceptors: true })
    expect(app.getConfig()?.ak).toBe('ak1')
    expect(app.getCollector()).toBe(collector1)
  })

  test('install 默认值合并：未传 reportIntervalSec 走 config 默认（默认通道 image）', () => {
    const app = getStatApp()
    app.install(
      {},
      { skipInterceptors: true, skipMigration: true, skipRecoverRetry: true }
    )
    const cfg = app.getConfig()
    expect(cfg?.reportIntervalSec).toBeGreaterThan(0)
    expect(cfg?.backgroundTimeoutSec).toBe(300)
    expect(cfg?.pageInactiveTimeoutSec).toBe(1800)
    expect(cfg?.version).toBe('image')
  })

  test('overrides.skipMigration=true → 不调 migrateLegacyData', () => {
    // 注入一条老 storage 数据，验证 skip 后未被搬迁。
    const oldKey = '$$STAT__DBDATA:default:visit:fvts'
    ;(
      globalThis as unknown as {
        uni: { setStorageSync: (k: string, v: unknown) => void }
      }
    ).uni.setStorageSync(oldKey, 1234)
    const app = getStatApp()
    app.install(
      {},
      { skipInterceptors: true, skipMigration: true, skipRecoverRetry: true }
    )
    // 仍然存在，因为我们 skip 了
    const u = (
      globalThis as unknown as {
        uni: { getStorageSync: (k: string) => unknown }
      }
    ).uni
    expect(u.getStorageSync(oldKey)).toBe(1234)
  })

  test('overrides.channels 注入：collector.flush 走自定义 channel', async () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { version: '1', ak: 'k' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    const c = app.getCollector()!
    c.report({ lt: '21', custom: { e_n: 'foo', e_v: 'bar' } })
    await c.flush(true)
    expect(http.send).toHaveBeenCalledTimes(1)
  })

  test('report("title", value) → 写 reportTitle，不入队、不发请求', async () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    app.report('title', '我的页面')
    expect(getCurrentTitle().ttc).toBe('我的页面')
    await app.getCollector()!.flush(true)
    expect(http.send).not.toHaveBeenCalled()
  })

  test('report("foo", value) → lt=21 自定义事件（通过 channel 验证）', async () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    app.report('foo', { x: 1 })
    await app.getCollector()!.flush(true)
    expect(http.send).toHaveBeenCalledTimes(1)
    const payload = http.send.mock.calls[0][0]
    expect(payload.requests).toMatch(/"lt":"21"/)
    expect(payload.requests).toMatch(/"e_n":"foo"/)
    expect(payload.requests).toMatch(/"e_v":"\{\\"x\\":1\}"/)
  })

  test('Vapor：即使存在上次 session，onLaunch 前事件仍按原时间暂存并使用新 session', () => {
    jest.useFakeTimers()
    try {
      jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
      const oldNow = Math.floor(Date.now() / 1000) - 100
      sessionMod.ensureSession('cold_launch', { now: oldNow })
      const oldSid = sessionMod.getSnapshot()!.sid
      const app = getStatApp()
      app.install(
        { version: '1' },
        {
          deferReportsUntilSession: true,
          skipInterceptors: true,
          skipMigration: true,
          skipRecoverRetry: true,
        }
      )
      const report = jest.spyOn(app.getCollector()!, 'report')
      app.report('before_launch', 'value')
      expect(report).not.toHaveBeenCalled()

      const now = Math.floor(Date.now() / 1000)
      sessionMod.ensureSession('cold_launch', { now })
      expect(sessionMod.getSnapshot()!.sid).not.toBe(oldSid)
      jest.setSystemTime(Date.now() + 5_000)
      app.releaseDeferredReports()

      expect(report).toHaveBeenCalledWith(
        expect.objectContaining({
          lt: '21',
          t: now,
          custom: { e_n: 'before_launch', e_v: 'value' },
        })
      )
    } finally {
      jest.useRealTimers()
    }
  })

  test('Vapor：启动前事件暂存有上限且仅提示一次', () => {
    const app = getStatApp()
    app.install(
      { version: '1' },
      {
        deferReportsUntilSession: true,
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    const report = jest.spyOn(app.getCollector()!, 'report')
    const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {})

    for (let i = 0; i < 102; i++) app.report('before_launch', i)
    sessionMod.ensureSession('cold_launch', {
      now: Math.floor(Date.now() / 1000),
    })
    app.releaseDeferredReports()

    expect(report).toHaveBeenCalledTimes(100)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('启动前事件暂存超过上限'),
      'limit=100'
    )
    warn.mockRestore()
  })

  test('reportError(Error) → lt=31，errMsg 含 stack（通过 channel 验证）', async () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    app.reportError(new Error('boom'))
    await app.getCollector()!.flush(true)
    expect(http.send).toHaveBeenCalledTimes(1)
    const payload = http.send.mock.calls[0][0]
    expect(payload.requests).toMatch(/"lt":"31"/)
    expect(payload.requests).toMatch(/Error: boom/)
  })

  test('reportError(string) → lt=31，errMsg = string', async () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    app.reportError('plain error')
    await app.getCollector()!.flush(true)
    const payload = http.send.mock.calls[0][0]
    expect(payload.requests).toMatch(/"em":"plain error"/)
  })

  test('未 install 时 report / reportError → noop', () => {
    const app = getStatApp()
    expect(() => app.report('foo', 'v')).not.toThrow()
    expect(() => app.reportError(new Error('x'))).not.toThrow()
    expect(queueMod.size()).toBe(0)
  })

  test('uninstall 后再 install 重新生效', () => {
    const app = getStatApp()
    const http = fakeChannel('1.0')
    app.install(
      { ak: 'first', version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    expect(app.getConfig()?.ak).toBe('first')
    app.uninstall()
    expect(app.isInstalled()).toBe(false)
    expect(app.getCollector()).toBeUndefined()
    app.install(
      { ak: 'second', version: '1' },
      {
        channels: { http, cloud: null },
        skipInterceptors: true,
        skipMigration: true,
        skipRecoverRetry: true,
      }
    )
    expect(app.getConfig()?.ak).toBe('second')
  })

  test('skipInterceptors=false 时 install 调用拦截器装配', () => {
    const addInterceptor = jest.fn()
    const removeInterceptor = jest.fn()
    installMockUni({
      patch: { addInterceptor, removeInterceptor },
    })
    try {
      const app = getStatApp()
      app.install(
        { version: '1' },
        {
          channels: { http: fakeChannel('1.0'), cloud: null },
          skipMigration: true,
          skipRecoverRetry: true,
        }
      )
      expect(addInterceptor).toHaveBeenCalled()
    } finally {
      restoreMockUni()
    }
  })
})
