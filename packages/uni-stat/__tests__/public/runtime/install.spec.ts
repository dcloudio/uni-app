/**
 * runtime/install 单元测试。
 *
 * 重点覆盖：
 *   I1 模块加载即触发安装；幂等性。
 *   I2 `process.env.UNI_STATISTICS_CONFIG` 被正确解析为 StatApp.install 的 config。
 *   I3 `opts.config` 优先级高于 manifest 配置。
 *   I4 字段类型异常 / JSON 损坏时不抛、走默认值。
 *
 * 注：本测试不验证 vue.mixin 装载，因为 jest 环境没有 vue runtime；通过 `skipVueMixin` 跳过。
 */

import * as queueMod from '../../../src/public/pipeline/queue'
import * as retryMod from '../../../src/public/pipeline/retry'
import * as sessionMod from '../../../src/public/domain/session/machine'
import * as visitMod from '../../../src/public/domain/visit/firstVisit'
import { __resetCache as resetDevice } from '../../../src/public/adapter/device'
import { __resetState as resetEntry } from '../../../src/public/domain/entry/entryPage'
import { __resetCache as resetPackage } from '../../../src/public/adapter/package'
import { __resetCache as resetSystem } from '../../../src/public/adapter/system'
import { __resetTitle } from '../../../src/public/domain/title'
import { __resetStatApp, getStatApp } from '../../../src/public/runtime/StatApp'
import {
  __resetInstall,
  installPublicStat,
} from '../../../src/public/runtime/install'
import { __resetLifecycleState } from '../../../src/public/runtime/lifecycleHooks'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import { installMockPlus, restoreMockPlus } from '../helpers/mockPlus'
import { storage } from '../../../src/public/infra/storage'
import { logger } from '../../../src/public/infra/logger'

function resetAll(): void {
  __resetInstall()
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
  storage.__resetCache()
}

describe('runtime/install', () => {
  beforeEach(() => {
    installMockUni({ platform: 'h5' })
    resetAll()
    delete (process.env as Record<string, string | undefined>)
      .UNI_STATISTICS_CONFIG
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
  })

  afterEach(() => {
    delete (process.env as Record<string, string | undefined>)
      .UNI_STATISTICS_CONFIG
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
    resetAll()
    restoreMockUni()
    restoreMockPlus()
  })

  test('I1 install 幂等：重复调用不再重新装配', () => {
    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const first = getStatApp().getCollector()
    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const second = getStatApp().getCollector()
    expect(first).toBe(second) // 同一引用 → 第二次 noop
  })

  test('I1.b install 将 uni.report 挂到业务可见的 uni 对象', () => {
    installPublicStat({ skipVueMixin: true })
    expect(
      typeof (globalThis as unknown as { uni: { report?: unknown } }).uni.report
    ).toBe('function')
  })

  test('I2 manifest.uniStatistics → StatApp.install config 透传（超时/间隔/上报通道版本）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        enable: true,
        version: 3, // 模块版本，公有版语境下被忽略
        channelVersion: 1, // 强制走 HTTP 1.0 通道
        backgroundTimeoutSec: 30,
        pageInactiveTimeoutSec: 45,
        reportIntervalSec: 5,
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.version).toBe('1') // channelVersion 映射到通道版本
    expect(cfg.backgroundTimeoutSec).toBe(30)
    expect(cfg.pageInactiveTimeoutSec).toBe(45)
    expect(cfg.reportIntervalSec).toBe(5)
  })

  test('I2.b manifest.uniStatistics 不应覆盖上行身份字段 ak/v/ch', () => {
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID =
      'real-appid'
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        ak: 'manifest-ak',
        v: 'manifest-version',
        ch: '1001',
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.ak).toBe('real-appid')
    expect(cfg.v).toBeUndefined()
    expect(cfg.ch).toBe('')
  })

  test('I2.c App 端 manifest ch=1001 不覆盖 plus.runtime.channel', () => {
    installMockUni({ platform: 'app' })
    installMockPlus({ runtime: { channel: 'custom-channel' } })
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({ ch: '1001' })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.ch).toBe('custom-channel')
  })

  test('I3 opts.config 优先级高于 manifest', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        channelVersion: 1,
        backgroundTimeoutSec: 30,
      })

    installPublicStat({
      config: { backgroundTimeoutSec: 999 },
      skipVueMixin: true,
      skipUniReport: true,
    })
    const cfg = getStatApp().getConfig()!
    expect(cfg.backgroundTimeoutSec).toBe(999) // opts 覆盖
    expect(cfg.version).toBe('1') // manifest 通道版本仍生效
  })

  test('I4 JSON 损坏时不抛错，走默认值', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      '{not_json'
    expect(() =>
      installPublicStat({ skipVueMixin: true, skipUniReport: true })
    ).not.toThrow()
    const cfg = getStatApp().getConfig()!
    expect(cfg.backgroundTimeoutSec).toBe(300) // 默认值
    expect(cfg.pageInactiveTimeoutSec).toBe(1800)
  })

  test('I5 manifest 字段类型异常时仅忽略该字段，其他字段仍生效', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        channelVersion: 1,
        backgroundTimeoutSec: 'oops', // 非法
        pageInactiveTimeoutSec: 60, // 合法
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.version).toBe('1') // channelVersion 合法
    expect(cfg.backgroundTimeoutSec).toBe(300) // 非法 → 走默认
    expect(cfg.pageInactiveTimeoutSec).toBe(60) // 合法值生效
  })

  test('I6 未设置 UNI_STATISTICS_CONFIG 时 install 仍能完成（默认 version=image）', () => {
    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.version).toBe('image') // StatApp.normalizeConfig 默认
    expect(cfg.backgroundTimeoutSec).toBe(300)
  })

  test('I7 manifest.imageReport 字段被忽略：host/projectId/topicId 属于 SDK 内部参数', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        channelVersion: 'image',
        // 这些字段不应被解析进 cfg，业务方设了也不生效
        imageReport: {
          host: 'https://my-tls.example.com',
          projectId: 'my-pid',
          topicId: 'my-tid',
        },
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()! as unknown as Record<string, unknown>
    expect(cfg.version).toBe('image')
    // image 字段不存在于 StatAppConfig，imageReport 整个被忽略
    expect(cfg.image).toBeUndefined()
  })

  // === 与私有版字段命名严格对齐的回归（reportInterval / backgroundTimeout / pageInactiveTimeout）===

  test('I8 私有版字段 reportInterval 优先被识别（无 Sec 后缀）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        reportInterval: 7, // 私有版同名字段
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.reportIntervalSec).toBe(7)
  })

  test('I8.b reportInterval=0 表示立即上报（私有版语义保留）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({ reportInterval: 0 })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.reportIntervalSec).toBe(0)
  })

  test('I8.c 旧别名 reportIntervalSec 仍兼容（向后不破坏）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({ reportIntervalSec: 9 })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.reportIntervalSec).toBe(9)
  })

  test('I8.d reportInterval 与别名同时存在时，优先取无后缀的', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({ reportInterval: 3, reportIntervalSec: 99 })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.reportIntervalSec).toBe(3)
  })

  test('I9 公有版扩展字段 backgroundTimeout / pageInactiveTimeout（无后缀）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        backgroundTimeout: 60,
        pageInactiveTimeout: 120,
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.backgroundTimeoutSec).toBe(60)
    expect(cfg.pageInactiveTimeoutSec).toBe(120)
  })

  test('I9.b 旧别名 backgroundTimeoutSec / pageInactiveTimeoutSec 仍兼容', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        backgroundTimeoutSec: 60,
        pageInactiveTimeoutSec: 120,
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.backgroundTimeoutSec).toBe(60)
    expect(cfg.pageInactiveTimeoutSec).toBe(120)
  })

  test('I9.c manifest 为字符串数字时仍解析（工具链/手工 JSON 常见）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        backgroundTimeout: '90',
        pageInactiveTimeout: '120',
        reportInterval: '8',
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.backgroundTimeoutSec).toBe(90)
    expect(cfg.pageInactiveTimeoutSec).toBe(120)
    expect(cfg.reportIntervalSec).toBe(8)
  })

  test('I9.e enable:false 但注入含 backgroundTimeout 时仍生效（手动 import 场景）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        enable: false,
        debug: true,
        type: 'public',
        backgroundTimeout: 10,
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.backgroundTimeoutSec).toBe(10)
  })

  // === collectItems：与私有版完全同名同义 ===

  test('I10 collectItems.uniPushClientID=true → enablePush=true', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        collectItems: { uniPushClientID: true },
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.enablePush).toBe(true)
    expect(getStatApp().getConfig()!.enablePageLog).toBe(true) // 默认
  })

  test('I10.b collectItems.uniStatPageLog=false → enablePageLog=false', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        collectItems: { uniStatPageLog: false },
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.enablePageLog).toBe(false)
    expect(getStatApp().getConfig()!.enablePush).toBe(false) // 默认
  })

  test('I10.c collectItems 缺省 → 走私有版默认（push=false, pageLog=true）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({})

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.enablePush).toBe(false)
    expect(getStatApp().getConfig()!.enablePageLog).toBe(true)
  })

  test('I10.d collectItems 类型异常时整体跳过，不抛', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        collectItems: 'not-an-object', // 非法
      })

    expect(() =>
      installPublicStat({ skipVueMixin: true, skipUniReport: true })
    ).not.toThrow()
    expect(getStatApp().getConfig()!.enablePush).toBe(false)
    expect(getStatApp().getConfig()!.enablePageLog).toBe(true)
  })

  test('I10.e collectItems 子字段类型异常时仅忽略该子字段', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        collectItems: {
          uniPushClientID: 'yes', // 非法
          uniStatPageLog: false, // 合法
        },
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    expect(getStatApp().getConfig()!.enablePush).toBe(false) // 非法 → 默认
    expect(getStatApp().getConfig()!.enablePageLog).toBe(false)
  })

  test('I12 Vue2：缺少 onAppShow 时仍同步装配 mixin，且不打印「推迟绑定」告警', () => {
    const { uni } = installMockUni({ platform: 'h5' })
    delete uni.onAppShow
    delete uni.onAppHide
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const deferredWarn = warnSpy.mock.calls.some((args) =>
      String(args.join(' ')).includes('统计生命周期绑定已推迟')
    )
    expect(deferredWarn).toBe(false)
    warnSpy.mockRestore()
  })

  test('I11 timeout=0 不应被采纳（语义不合理，转为默认值）', () => {
    ;(process.env as Record<string, string | undefined>).UNI_STATISTICS_CONFIG =
      JSON.stringify({
        backgroundTimeout: 0, // 0 = 立即超时？无意义，应走默认
        pageInactiveTimeout: 0,
      })

    installPublicStat({ skipVueMixin: true, skipUniReport: true })
    const cfg = getStatApp().getConfig()!
    expect(cfg.backgroundTimeoutSec).toBe(300) // 默认
    expect(cfg.pageInactiveTimeoutSec).toBe(1800)
  })

  test('I13 Vue3：resolveUniRuntime 可用时通过 onCreateVueApp 注入 mixin', () => {
    const mixinApplied = jest.fn()
    const prev = (globalThis as unknown as { uni?: unknown }).uni
    try {
      ;(globalThis as unknown as { uni: unknown }).uni = {
        getStorageSync: () => '',
        setStorageSync: () => undefined,
        removeStorageSync: () => undefined,
        onCreateVueApp: (
          cb: (app: { mixin: (m: unknown) => void }) => void
        ) => {
          cb({ mixin: mixinApplied })
        },
      }
      installPublicStat({ skipUniReport: true })
      expect(mixinApplied).toHaveBeenCalled()
    } finally {
      resetAll()
      ;(globalThis as unknown as { uni?: unknown }).uni = prev
    }
  })

  test('I14 Vue3：H5 空桩 global.uni={} 且无 onCreateVueApp 时告警', () => {
    const prev = (globalThis as unknown as { uni?: unknown }).uni
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.useFakeTimers()
    try {
      logger.setMuteNonDebug(false)
      ;(globalThis as unknown as { uni: unknown }).uni = {}
      installPublicStat({ skipUniReport: true })
      jest.advanceTimersByTime(50 * 21)
      const warned = warnSpy.mock.calls.some((args) =>
        String(args.join(' ')).includes('onCreateVueApp 在重试后仍不可用')
      )
      expect(warned).toBe(true)
    } finally {
      logger.setMuteNonDebug(undefined)
      jest.useRealTimers()
      warnSpy.mockRestore()
      resetAll()
      ;(globalThis as unknown as { uni?: unknown }).uni = prev
    }
  })
})
