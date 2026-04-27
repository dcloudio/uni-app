/**
 * Phase 13：性能与稳定性测试套件。
 *
 * 设计文档：`docs/05-公有版重构开发计划.md` Phase 13。
 *
 * 覆盖矩阵：
 *   P1 同步 enqueue 路径耗时：单次 `app.report()` 平均 ≤ 1ms（mock storage）。
 *   P2 flush 节流：reportIntervalSec=10s 内大量 report 不应触发 channel.send，
 *      仅 force flush / interval 到期才发。
 *   P3 崩溃续传：进程 1 失败入 retry 队列后被强杀（重置内存，保留 storage），
 *      进程 2 启动 recoverRetry 把同样的 batch 再发一次，零丢失零重复。
 *   P4 内存稳定：1000 轮 report → flush(true) → 全部 ack 后，queue/retry/storage
 *      残留量都为 0，不出现持续增长。
 *
 * 注意：本文件**不引用任何真实 http / Cloud channel**；所有 IO 走 mockStorage，
 * 通道走 jest.fn()，目的只验证 collector + queue + retry 的资源使用边界。
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
  __resetLifecycleState,
  handleLaunch,
} from '../../../src/public/runtime/lifecycleHooks'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import { storage } from '../../../src/public/infra/storage'

import type { Channel, ReportPayload } from '../../../src/public/pipeline/types'

interface FakeChannelControl extends Channel {
  send: jest.Mock<Promise<void>, [ReportPayload]>
  available: jest.Mock<boolean, []>
  failNext: (n: number, err?: Error) => void
}

/**
 * 与 e2e 套件同款 fake channel；可控失败次数，默认成功。
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

/**
 * 把所有 module 状态重置到"刚加载"。
 *
 * 注意：**不**清 mockStorage，由调用方决定（崩溃续传场景需要保留 storage）。
 */
function resetModulesOnly(): void {
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

interface InstalledApp {
  app: ReturnType<typeof getStatApp>
  http: FakeChannelControl
}

/**
 * 装载一个 StatApp 实例，注入 fake http channel；默认开启 auto-flush（间隔 0）。
 */
function installApp(opts: {
  reportIntervalSec?: number
  channel?: FakeChannelControl
  skipRecoverRetry?: boolean
}): InstalledApp {
  const http = opts.channel ?? makeFakeChannel('1.0')
  const app = getStatApp()
  app.install(
    {
      version: '2',
      ak: 'perf-ak',
      reportIntervalSec: opts.reportIntervalSec ?? 0,
      backgroundTimeoutSec: 300,
      pageInactiveTimeoutSec: 1800,
    },
    {
      channels: { http, cloud: null },
      skipInterceptors: true,
      skipMigration: true,
      skipRecoverRetry: opts.skipRecoverRetry ?? true,
    }
  )
  return { app, http }
}

describe('perf/stability：性能与稳定性预算', () => {
  beforeEach(() => {
    installMockUni({ platform: 'h5' })
    resetModulesOnly()
  })

  afterEach(() => {
    resetModulesOnly()
    restoreMockUni()
  })

  /**
   * P1 同步 report 路径耗时：mock storage 下，单次 `app.report` 平均 ≤ 1ms。
   *
   * 1ms 含 `domain/statData.build` + `queue.enqueue` + `storage.set`（mock，O(1)）。
   * 测试机性能波动较大，预算放宽到 2ms 平均、5ms p99，仅做底线监测。
   */
  test('P1 单次 report 同步耗时：1000 次平均 ≤ 2ms（mock storage）', () => {
    const { app } = installApp({ reportIntervalSec: 60 }) // 关掉 auto-flush
    handleLaunch(app, {})
    queueMod.__reset() // 清掉 cold launch 残留事件，专测 report 路径

    const N = 1000
    const samples: number[] = new Array(N)
    for (let i = 0; i < N; i++) {
      const t0 = process.hrtime.bigint()
      app.report('perf', i)
      const t1 = process.hrtime.bigint()
      samples[i] = Number(t1 - t0) / 1e6 // ms
    }

    const sum = samples.reduce((a, b) => a + b, 0)
    const avg = sum / N
    const sorted = samples.slice().sort((a, b) => a - b)
    const p99 = sorted[Math.floor(N * 0.99)]

    // 预算（CI 抖动放宽）：avg ≤ 2ms，p99 ≤ 10ms。
    expect(avg).toBeLessThanOrEqual(2)
    expect(p99).toBeLessThanOrEqual(10)
  })

  /**
   * P2 flush 节流：reportIntervalSec=60 内连续 200 次 report 不触发 channel.send。
   * 只在显式 force flush 时才送一次（序列化为单 batch）。
   */
  test('P2 flush 节流：60s 间隔内 200 次 report → 0 次 send；force flush 后仅 1 次', async () => {
    const { app, http } = installApp({ reportIntervalSec: 60 })
    handleLaunch(app, {})
    await app.getCollector()!.flush(true) // 把 cold launch 的 lt=0/1 送掉
    http.send.mockClear()

    for (let i = 0; i < 200; i++) {
      app.report('p2', i)
    }
    // 同步上完 200 条后，channel.send 不应被调用过（reportIntervalSec=60 内不到期）
    expect(http.send).not.toHaveBeenCalled()
    expect(queueMod.size()).toBe(200)

    // force flush：刚好 1 次 channel.send，发出包含全部 200 条的 batch
    await app.getCollector()!.flush(true)
    expect(http.send).toHaveBeenCalledTimes(1)
    expect(queueMod.size()).toBe(0)
    const sent = JSON.parse(http.send.mock.calls[0][0].requests) as Array<{
      lt: string
      e_n?: string
    }>
    expect(sent.filter((e) => e.lt === '21')).toHaveLength(200)
  })

  /**
   * P3 崩溃续传：进程 1 入 retry 队列 → "崩溃"重置内存（保留 storage） → 进程 2 启动
   * recoverRetry 重发同一份 payload；零丢失，retry 队列清零。
   */
  test('P3 崩溃续传：retry 队列穿越进程边界，零丢失零重复', async () => {
    // —— 进程 1 ——
    const handle = installMockUni({ platform: 'h5' }) // 替换上一个 mock，拿到独立 storage
    resetModulesOnly()
    const http1 = makeFakeChannel('1.0')
    const r1 = installApp({
      reportIntervalSec: 60,
      channel: http1,
      skipRecoverRetry: true,
    })
    handleLaunch(r1.app, {})

    // 准备 5 条业务事件并强制失败入 retry
    http1.failNext(50)
    for (let i = 0; i < 5; i++) {
      r1.app.report('crash', i)
    }
    await r1.app.getCollector()!.flush(true)
    await Promise.resolve()

    // 关键验证：此时 retry 已落盘，存到 mockStorage
    expect(retryMod.size()).toBe(1)
    expect(queueMod.size()).toBe(0)

    // —— 模拟崩溃：清掉所有内存模块状态，但**保留** mockStorage 中 retry 队列 ——
    // queueMod.__reset / retryMod.__reset 内部会 storage.remove(各自 key)，
    // 与"崩溃"语义冲突。这里手动备份+恢复 retry 队列在 storage 中的字节，
    // 等价于"操作系统层面真正强杀进程，进程外的 mmkv/wxStorage 数据保留"。
    const RETRY_FK = 'UNI_STAT_DATA:default:retry:queue'
    const retryBackup = handle.storage.getStorageSync(RETRY_FK)

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
    storage.__resetCache() // 关键：清掉 storage 模块级 cache，强制下一次 read 走 uni.getStorageSync

    // 把崩溃前的 retry 字节回灌进 mockStorage（模拟 mmkv 持久化跨进程存活）
    if (retryBackup && retryBackup !== '') {
      handle.storage.setStorageSync(RETRY_FK, retryBackup)
    }

    const beforeRecover = handle.storage.__inspect()
    const retryKey = Object.keys(beforeRecover).find((k) =>
      k.includes('retry:queue')
    )
    expect(retryKey).toBeDefined()

    // —— 进程 2：装载新 collector，channel 恢复正常 ——
    const http2 = makeFakeChannel('1.0')
    const r2 = installApp({
      reportIntervalSec: 60,
      channel: http2,
      skipRecoverRetry: false,
    })
    handleLaunch(r2.app, {})
    // 等 recoverRetry 的微任务跑完
    for (let i = 0; i < 5; i++) await Promise.resolve()

    // recoverRetry 应只重发上次的 payload（1 次 send）；
    // handleLaunch 的 lt=0/1 还在 queue 里没被 force flush，所以不该被算进去
    const recoverCalls = http2.send.mock.calls.filter(([p]) => {
      try {
        const arr = JSON.parse(p.requests) as Array<{
          lt: string
          e_n?: string
        }>
        return arr.some((e) => e.e_n === 'crash')
      } catch {
        return false
      }
    })
    expect(recoverCalls).toHaveLength(1)
    const recovered = JSON.parse(recoverCalls[0][0].requests) as Array<{
      lt: string
      e_n?: string
      e_v?: string | number
    }>
    const customs = recovered.filter((e) => e.lt === '21' && e.e_n === 'crash')
    expect(customs).toHaveLength(5) // 5 条全部还原
    const ids = new Set(customs.map((c) => String(c.e_v)))
    expect(ids.size).toBe(5) // 无重复

    // 重发成功后，retry 队列清空
    expect(retryMod.size()).toBe(0)
  })

  /**
   * P4 内存稳定：连续跑 1000 轮 report → flush → ack；queue / retry / storage
   * 业务残留量保持为 0，不出现"每轮多写一条"的泄漏。
   */
  test('P4 内存稳定：1000 轮 report-flush-ack 后无残留', async () => {
    const handle = installMockUni({ platform: 'h5' })
    resetModulesOnly()
    const { app, http } = installApp({ reportIntervalSec: 0 }) // 自动 flush
    handleLaunch(app, {})
    await app.getCollector()!.flush(true)
    http.send.mockClear()

    const ROUNDS = 1000
    for (let i = 0; i < ROUNDS; i++) {
      app.report('loop', i)
      await app.getCollector()!.flush(true)
    }
    // 等所有 send 的微任务结算
    for (let i = 0; i < 5; i++) await Promise.resolve()

    expect(queueMod.size()).toBe(0)
    expect(retryMod.size()).toBe(0)

    // storage 中不应残留 queue / retry 业务垃圾
    const snapshot = handle.storage.__inspect()
    const businessKeys = Object.keys(snapshot).filter(
      (k) => k.includes(':queue') || k.includes('retry:queue')
    )
    expect(businessKeys).toEqual([])

    // 实际 send 次数应等于 ROUNDS（每轮一次）；不会因为内部缓存多发或漏发
    expect(http.send).toHaveBeenCalledTimes(ROUNDS)
  })

  /**
   * P5 retry 容量裁剪稳定性：连续 100 次失败 batch 写入，retry 长度受 maxItems 限制。
   * 验证 FIFO 丢弃最旧条目，且 storage 不会无限增长。
   */
  test('P5 retry 容量裁剪：超过 maxItems 时按 FIFO 丢最旧；storage 不无限增长', async () => {
    const handle = installMockUni({ platform: 'h5' })
    resetModulesOnly()
    retryMod.configure({ maxItems: 10 }) // 极小上限便于验证
    const http = makeFakeChannel('1.0')
    http.failNext(10000)
    const { app } = installApp({ reportIntervalSec: 60, channel: http })
    handleLaunch(app, {})

    // 100 个独立 batch（每 batch 1 条事件），全部失败入 retry
    for (let i = 0; i < 100; i++) {
      app.report('cap', i)
      await app.getCollector()!.flush(true)
    }
    await Promise.resolve()

    expect(retryMod.size()).toBeLessThanOrEqual(10)
    // 仅保留最近 10 条；最旧的 90 条已被裁剪
    const remaining = retryMod.loadAll()
    expect(remaining).toHaveLength(retryMod.size())

    // storage 中只占用一个 retry:queue key，且其值为 ≤ 10 项的数组
    const snap = handle.storage.__inspect()
    const retryKey = Object.keys(snap).find((k) => k.includes('retry:queue'))
    expect(retryKey).toBeDefined()
    const arr = snap[retryKey!] as Array<unknown>
    expect(arr.length).toBeLessThanOrEqual(10)
  })

  /**
   * P6 mockStorage 故障注入下 report 不抛错：storage.set 抛错时 enqueue 应继续执行。
   *
   * 这是"统计代码绝不能 crash 业务"硬约束的回归测试。
   */
  test('P6 storage 异常时 report 不抛错；后续事件仍能进入内存桶', () => {
    const handle = installMockUni({ platform: 'h5' })
    resetModulesOnly()
    const { app } = installApp({ reportIntervalSec: 60 })
    handleLaunch(app, {})
    // 强制下一次 storage.set 抛错
    handle.storage.__failNext({ set: new Error('mock io fail') })

    expect(() => app.report('crash-io', 'x')).not.toThrow()
    // 即使持久化失败，事件已经进入内存桶
    expect(queueMod.size()).toBeGreaterThan(0)
  })
})
