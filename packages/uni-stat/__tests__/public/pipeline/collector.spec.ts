import { createCollector } from '../../../src/public/pipeline/collector'

import {
  type Channel,
  PermanentChannelError,
  type ReportPayload,
} from '../../../src/public/pipeline/types'

import type { CollectorDeps } from '../../../src/public/pipeline/collector'
import type { Bucket } from '../../../src/public/pipeline/queue'
import type { StatData } from '../../../src/public/domain/statData'
import type { SessionSnapshot } from '../../../src/public/domain/session/machine'

interface MockedDeps extends CollectorDeps {
  builder: { build: jest.Mock }
  queue: {
    enqueue: jest.Mock
    flush: jest.Mock
    rollback: jest.Mock
    shouldFlush: jest.Mock
  }
  serializer: { handleData: jest.Mock }
  selectChannel: jest.Mock
  retry: {
    persist: jest.Mock
    loadAll: jest.Mock
    ack: jest.Mock
    markAttempt: jest.Mock
  }
  visit: {
    commitVisitOnAck: jest.Mock
    rollbackPendingVisit: jest.Mock
  }
  session: {
    getSnapshot: jest.Mock
    nextSeq: jest.Mock
    touch: jest.Mock
  }
  nowMs: jest.Mock
  nowSec: jest.Mock
  genPayloadId: jest.Mock
}

function makeDeps(overrides: Partial<MockedDeps> = {}): MockedDeps {
  const session: SessionSnapshot = {
    sid: 'sid-1',
    sst: 1700000000,
    sct: 1,
    seq: 0,
    lastActive: 1700000000,
    bgTs: 0,
    lastScene: '',
  }
  const channel: Channel = {
    name: '2.0',
    available: () => true,
    send: jest.fn(() => Promise.resolve()),
  }
  return Object.assign(
    {
      builder: { build: jest.fn((ctx) => Object.assign({}, ctx) as StatData) },
      queue: {
        enqueue: jest.fn(),
        flush: jest.fn<Bucket | undefined, []>(),
        rollback: jest.fn(),
        shouldFlush: jest.fn(() => false),
      },
      serializer: { handleData: jest.fn(() => '[]') },
      selectChannel: jest.fn(() => channel),
      retry: {
        persist: jest.fn(() => 'rid-1'),
        loadAll: jest.fn(() => []),
        ack: jest.fn(),
        markAttempt: jest.fn(),
      },
      visit: {
        commitVisitOnAck: jest.fn(),
        rollbackPendingVisit: jest.fn(),
      },
      session: {
        getSnapshot: jest.fn(() => session),
        nextSeq: jest.fn(() => 1),
        touch: jest.fn(),
      },
      config: { usv: '3' },
      nowMs: jest.fn(() => 1700000000_000),
      nowSec: jest.fn(() => 1700000000),
      genPayloadId: jest.fn(() => 'p-fixed'),
    },
    overrides
  ) as MockedDeps
}

describe('pipeline/collector', () => {
  describe('report()', () => {
    test('入队 + ctx 自动填充 t/session.seq（不再附加 pid）', () => {
      const deps = makeDeps({
        session: {
          getSnapshot: jest.fn(() => ({
            sid: 'sid-x',
            sst: 1,
            sct: 1,
            seq: 0,
            lastActive: 0,
            bgTs: 0,
            lastScene: '',
          })),
          nextSeq: jest.fn(() => 7),
        } as MockedDeps['session'],
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      expect(deps.session.nextSeq).toHaveBeenCalledTimes(1)
      const builtCtx = deps.builder.build.mock.calls[0][0]
      expect(builtCtx.t).toBe(1700000000)
      expect(builtCtx.session?.seq).toBe(7)
      expect(builtCtx.session?.sid).toBe('sid-x')
      expect(builtCtx.pid).toBeUndefined()
      expect(deps.queue.enqueue).toHaveBeenCalledTimes(1)
    })

    test('入队前剔除值为空字符串的键（调试仍走完整 builder 输出）', () => {
      const deps = makeDeps({
        builder: {
          build: jest.fn(
            () =>
              ({
                lt: '1',
                t: 1,
                ak: 'k',
                ch: '',
                brand: '',
              } as StatData)
          ),
        },
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      expect(deps.queue.enqueue).toHaveBeenCalledWith({
        lt: '1',
        t: 1,
        ak: 'k',
      })
    })

    test('外部传入 t → 不覆盖', () => {
      const deps = makeDeps()
      const c = createCollector(deps)
      c.report({ lt: '1', t: 999 })
      expect(deps.builder.build.mock.calls[0][0].t).toBe(999)
    })

    test('shouldFlush=true → 自动 flush', async () => {
      const deps = makeDeps({
        queue: {
          enqueue: jest.fn(),
          flush: jest.fn(() => undefined),
          rollback: jest.fn(),
          shouldFlush: jest.fn(() => true),
        } as MockedDeps['queue'],
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      await Promise.resolve()
      expect(deps.queue.flush).toHaveBeenCalled()
    })

    test('firstFlushDeferMs>0 → 入队后不立即 flush，延迟后再 flush（方案 C）', async () => {
      jest.useFakeTimers()
      const queueFlush = jest.fn(() => undefined)
      const deps = makeDeps({
        firstFlushDeferMs: 2000,
        queue: {
          enqueue: jest.fn(),
          flush: queueFlush,
          rollback: jest.fn(),
          shouldFlush: jest.fn(() => true),
        } as MockedDeps['queue'],
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      expect(queueFlush).not.toHaveBeenCalled()
      jest.advanceTimersByTime(2000)
      await Promise.resolve()
      expect(queueFlush).toHaveBeenCalledTimes(1)
      jest.useRealTimers()
    })

    test('firstFlushDeferMs>0 时 flush(true) 立即 flush 并取消延迟任务', async () => {
      jest.useFakeTimers()
      const queueFlush = jest.fn(() => undefined)
      const deps = makeDeps({
        firstFlushDeferMs: 2000,
        queue: {
          enqueue: jest.fn(),
          flush: queueFlush,
          rollback: jest.fn(),
          shouldFlush: jest.fn(() => true),
        } as MockedDeps['queue'],
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      expect(queueFlush).not.toHaveBeenCalled()
      await c.flush(true)
      expect(queueFlush).toHaveBeenCalledTimes(1)
      jest.advanceTimersByTime(3000)
      await Promise.resolve()
      expect(queueFlush).toHaveBeenCalledTimes(1)
      jest.useRealTimers()
    })

    test('builder 抛错 → 不传播', () => {
      const deps = makeDeps({
        builder: {
          build: jest.fn(() => {
            throw new Error('builder boom')
          }),
        },
      })
      const c = createCollector(deps)
      expect(() => c.report({ lt: '1' })).not.toThrow()
    })

    test('session 为 null → ctx.session=undefined，不调 nextSeq', () => {
      const deps = makeDeps({
        session: {
          getSnapshot: jest.fn(() => null),
          nextSeq: jest.fn(),
        } as unknown as MockedDeps['session'],
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      expect(deps.session.nextSeq).not.toHaveBeenCalled()
      expect(deps.builder.build.mock.calls[0][0].session).toBeUndefined()
    })
  })

  describe('flush()', () => {
    test('isNetworkOffline=true → 不摘队列、不发送', async () => {
      const deps = makeDeps({
        isNetworkOffline: jest.fn(async () => true),
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.isNetworkOffline).toHaveBeenCalled()
      expect(deps.queue.flush).not.toHaveBeenCalled()
      expect(deps.selectChannel).not.toHaveBeenCalled()
    })

    test('shouldFlush=false 且 force=false → no-op', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(false)
      const c = createCollector(deps)
      await c.flush(false)
      expect(deps.queue.flush).not.toHaveBeenCalled()
    })

    test('队列空 → no-op', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(true)
      deps.queue.flush.mockReturnValue(undefined)
      const c = createCollector(deps)
      await c.flush()
      expect(deps.serializer.handleData).not.toHaveBeenCalled()
    })

    test('成功 → channel.send 被调一次（小批量未触发切片），commitVisitOnAck 被调', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(true)
      const bucket: Bucket = { '1': [{ lt: '1' } as StatData] }
      deps.queue.flush.mockReturnValue(bucket)
      const channel = deps.selectChannel()!
      const c = createCollector(deps)
      await c.flush(true)
      expect(channel.send as jest.Mock).toHaveBeenCalledTimes(1)
      const sent = (channel.send as jest.Mock).mock.calls[0][0] as ReportPayload
      expect(sent.usv).toBe('3')
      expect(sent._id).toBe('p-fixed')
      // requests 现在由 collector 直接通过 handleDataChunked 计算（lt=1 落第一片）
      expect(JSON.parse(sent.requests)).toEqual([{ lt: '1' }])
      expect(deps.visit.commitVisitOnAck).toHaveBeenCalledWith(1700000000)
      expect(deps.retry.persist).not.toHaveBeenCalled()
    })

    test('flush 前补齐运行时字段 ch', async () => {
      const deps = makeDeps({
        resolveUploadFields: () => ({ ch: 'dlmm-Android-oppo' }),
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      deps.queue.flush.mockReturnValue({ '1': [{ lt: '1' } as StatData] })
      const channel = deps.selectChannel()!
      const c = createCollector(deps)
      await c.flush(true)
      const sent = (channel.send as jest.Mock).mock.calls[0][0] as ReportPayload
      expect(JSON.parse(sent.requests)).toEqual([
        { lt: '1', ch: 'dlmm-Android-oppo' },
      ])
    })

    test('channel 缺失 → rollback 快照', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(true)
      const bucket: Bucket = { '1': [{ lt: '1' } as StatData] }
      deps.queue.flush.mockReturnValue(bucket)
      deps.selectChannel.mockReturnValue(undefined)
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.queue.rollback).toHaveBeenCalledWith(bucket)
    })

    test('send 失败（非永久错）→ retry.persist + visit.rollbackPendingVisit', async () => {
      const failing: Channel = {
        name: '2.0',
        available: () => true,
        send: jest.fn(() => Promise.reject(new Error('send fail'))),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => failing) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      deps.queue.flush.mockReturnValue({ '1': [{ lt: '1' } as StatData] })
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.retry.persist).toHaveBeenCalledTimes(1)
      expect(deps.visit.rollbackPendingVisit).toHaveBeenCalledTimes(1)
      expect(deps.visit.commitVisitOnAck).not.toHaveBeenCalled()
    })

    test('send 永久错 → 不 persist，且不 commit visit（修复 image url too long 死循环）', async () => {
      const failing: Channel = {
        name: 'image',
        available: () => true,
        send: jest.fn(() =>
          Promise.reject(
            new PermanentChannelError('image url too long: 81718 > 6144')
          )
        ),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => failing) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      deps.queue.flush.mockReturnValue({ '1': [{ lt: '1' } as StatData] })
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.retry.persist).not.toHaveBeenCalled()
      expect(deps.visit.commitVisitOnAck).not.toHaveBeenCalled()
      expect(deps.visit.rollbackPendingVisit).toHaveBeenCalledTimes(1)
    })

    test('切片结果为空 → 回滚队列，不静默丢数（P1-1）', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(true)
      // 桶非空（通过 lts 判空）但全是空数组 → flatten 后 chunkEvents 产出 0 片
      const emptyBucket = { '21': [] } as unknown as Bucket
      deps.queue.flush.mockReturnValue(emptyBucket)
      const channel = deps.selectChannel()!
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.queue.rollback).toHaveBeenCalledWith(emptyBucket)
      expect((channel.send as jest.Mock).mock.calls.length).toBe(0)
    })

    test('切片部分成功：含 lt=1 的首片成功 → 即使后续片失败也 commit visit（P2-4）', async () => {
      // 桶含 lt=1（首片）与大量 lt=21（后续片）；让第 2 片起失败（可重试）
      let call = 0
      const channel: Channel = {
        name: '2.0',
        available: () => true,
        send: jest.fn(() => {
          call++
          return call === 1
            ? Promise.resolve()
            : Promise.reject(new Error('later chunk fail'))
        }),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      const lt21: StatData[] = []
      for (let i = 0; i < 20; i++) lt21.push({ lt: '21', a: i } as StatData)
      deps.queue.flush.mockReturnValue({
        '1': [{ lt: '1' } as StatData],
        '21': lt21,
      })
      deps.batchLimits = { maxEvents: 5, maxBytes: 1024 * 1024 }
      const c = createCollector(deps)
      await c.flush(true)
      // 首片（lt=1）成功 → 访问被服务端接收 → commit；后续片失败只进 retry
      expect(deps.visit.commitVisitOnAck).toHaveBeenCalledTimes(1)
      expect(deps.visit.rollbackPendingVisit).not.toHaveBeenCalled()
      expect(deps.retry.persist).toHaveBeenCalled()
    })

    test('切片部分成功：含 lt=1 的首片失败 → rollback visit（P2-4）', async () => {
      const channel: Channel = {
        name: '2.0',
        available: () => true,
        send: jest.fn((p: ReportPayload) =>
          // 首片含 lt=1 → 失败；其余成功
          p.requests.indexOf('"lt":"1"') >= 0
            ? Promise.reject(new Error('first chunk fail'))
            : Promise.resolve()
        ),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      const lt21: StatData[] = []
      for (let i = 0; i < 10; i++) lt21.push({ lt: '21', a: i } as StatData)
      deps.queue.flush.mockReturnValue({
        '1': [{ lt: '1' } as StatData],
        '21': lt21,
      })
      deps.batchLimits = { maxEvents: 5, maxBytes: 1024 * 1024 }
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.visit.commitVisitOnAck).not.toHaveBeenCalled()
      expect(deps.visit.rollbackPendingVisit).toHaveBeenCalledTimes(1)
    })

    test('lt=21 自定义事件 → 刷新 session.touch（P1-2）', () => {
      const deps = makeDeps()
      const c = createCollector(deps)
      c.report({ lt: '21', custom: { e_n: 'click' } })
      expect(deps.session.touch).toHaveBeenCalledTimes(1)
      expect(deps.session.touch).toHaveBeenCalledWith(1700000000)
    })

    test('非 lt=21 事件（lt=1/lt=3）→ 不调用 session.touch（P1-2）', () => {
      const deps = makeDeps()
      const c = createCollector(deps)
      c.report({ lt: '1' })
      c.report({ lt: '3' })
      expect(deps.session.touch).not.toHaveBeenCalled()
    })

    test('destroy() → 取消延迟首 flush，幽灵定时器不再触发（P3-8）', () => {
      jest.useFakeTimers()
      try {
        const deps = makeDeps({ firstFlushDeferMs: 2000 })
        deps.queue.shouldFlush.mockReturnValue(true)
        deps.queue.flush.mockReturnValue({ '1': [{ lt: '1' } as StatData] })
        const c = createCollector(deps)
        // 触发自动 flush（进入延迟分支，安排定时器）
        c.report({ lt: '21', custom: { e_n: 'x' } })
        c.destroy()
        jest.advanceTimersByTime(5000)
        // destroy 已取消延迟定时器 → flush 不会被触发，队列未被取出
        expect(deps.queue.flush).not.toHaveBeenCalled()
      } finally {
        jest.useRealTimers()
      }
    })

    test('多事件 → 触发切片，channel.send 被多次调用', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(true)
      // 50 条事件 + maxEvents=10 → 至少切 5 片
      const arr: StatData[] = []
      for (let i = 0; i < 50; i++)
        arr.push({ lt: '21', a: 'x' + i } as StatData)
      deps.queue.flush.mockReturnValue({ '21': arr })
      deps.batchLimits = { maxEvents: 10, maxBytes: 1024 * 1024 }
      const channel = deps.selectChannel()!
      const c = createCollector(deps)
      await c.flush(true)
      expect(channel.send as jest.Mock).toHaveBeenCalledTimes(5)
      // 全部成功才 commit
      expect(deps.visit.commitVisitOnAck).toHaveBeenCalledTimes(1)
    })

    test('切片场景：某片永久错 → 该片丢弃不 persist，其他片照发；任一失败不 commit visit', async () => {
      // 第 2 片返回 permanent，其他成功
      let call = 0
      const failing: Channel = {
        name: 'image',
        available: () => true,
        send: jest.fn(() => {
          call++
          if (call === 2)
            return Promise.reject(
              new PermanentChannelError('image url too long')
            )
          return Promise.resolve()
        }),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => failing) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      const arr: StatData[] = []
      for (let i = 0; i < 20; i++) arr.push({ lt: '21', a: i } as StatData)
      deps.queue.flush.mockReturnValue({ '21': arr })
      deps.batchLimits = { maxEvents: 5, maxBytes: 1024 * 1024 }
      const c = createCollector(deps)
      await c.flush(true)
      // 永久错那一片：不 persist
      expect(deps.retry.persist).not.toHaveBeenCalled()
      // 任一片失败：不 commit
      expect(deps.visit.commitVisitOnAck).not.toHaveBeenCalled()
      expect(deps.visit.rollbackPendingVisit).toHaveBeenCalledTimes(1)
      // 4 片都被尝试发送
      expect((failing.send as jest.Mock).mock.calls.length).toBe(4)
    })

    test('channel.maxRequestBytes 比全局阈值更紧 → 用通道阈值切片', async () => {
      // 模拟 image 通道反馈"原文上限 200B"；20 条事件 ≈ 800B 原文 → 至少切 4 片
      const channel: Channel = {
        name: 'image',
        available: () => true,
        send: jest.fn(() => Promise.resolve()),
        maxRequestBytes: () => 200,
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      const arr: StatData[] = []
      for (let i = 0; i < 20; i++)
        arr.push({ lt: '21', a: 'value' + i } as StatData)
      deps.queue.flush.mockReturnValue({ '21': arr })
      // 全局给一个很大的值，确保是通道阈值生效
      deps.batchLimits = { maxEvents: 10000, maxBytes: 1024 * 1024 }
      const c = createCollector(deps)
      await c.flush(true)
      const sendMock = channel.send as jest.Mock
      // 20 条 ~24B 事件按 200B 阈值切片，至少 3 片
      expect(sendMock.mock.calls.length).toBeGreaterThanOrEqual(3)
      // 每片原文不超过 200B
      for (const call of sendMock.mock.calls) {
        const payload = call[0] as ReportPayload
        expect(payload.requests.length).toBeLessThanOrEqual(200)
      }
      // 全部成功 → commit
      expect(deps.visit.commitVisitOnAck).toHaveBeenCalledTimes(1)
    })

    test('channel.maxRequestBytes 比全局阈值更宽 → 仍受全局限制', async () => {
      const channel: Channel = {
        name: '2.0',
        available: () => true,
        send: jest.fn(() => Promise.resolve()),
        maxRequestBytes: () => 1024 * 1024, // 1MB
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.queue.shouldFlush.mockReturnValue(true)
      const arr: StatData[] = []
      for (let i = 0; i < 30; i++)
        arr.push({ lt: '21', a: 'value' + i } as StatData)
      deps.queue.flush.mockReturnValue({ '21': arr })
      deps.batchLimits = { maxEvents: 10000, maxBytes: 200 } // 全局更紧
      const c = createCollector(deps)
      await c.flush(true)
      const sendMock = channel.send as jest.Mock
      for (const call of sendMock.mock.calls) {
        const payload = call[0] as ReportPayload
        expect(payload.requests.length).toBeLessThanOrEqual(200)
      }
    })

    test('force=true 即使 shouldFlush=false 仍 flush', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockImplementation((force?: boolean) => !!force)
      deps.queue.flush.mockReturnValue({ '1': [{ lt: '1' } as StatData] })
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.queue.flush).toHaveBeenCalled()
    })
  })

  describe('recoverRetry()', () => {
    test('队列为空 → 不调 channel', async () => {
      const deps = makeDeps()
      const c = createCollector(deps)
      await c.recoverRetry()
      expect(deps.selectChannel).not.toHaveBeenCalled()
    })

    test('全部成功 → 全部 ack', async () => {
      const items: ReportPayload[] = [
        { usv: '3', t: 1, requests: '[]', _id: 'a' },
        { usv: '3', t: 2, requests: '[]', _id: 'b' },
      ]
      const deps = makeDeps()
      deps.retry.loadAll.mockReturnValue(items)
      const c = createCollector(deps)
      await c.recoverRetry()
      expect(deps.retry.ack).toHaveBeenCalledWith('a')
      expect(deps.retry.ack).toHaveBeenCalledWith('b')
    })

    test('并发调用合并为同一次续传，避免重复发送', async () => {
      let finishSend: (() => void) | undefined
      const channel: Channel = {
        name: 'image',
        available: () => true,
        send: jest.fn(
          () =>
            new Promise<void>((resolve) => {
              finishSend = resolve
            })
        ),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.retry.loadAll.mockReturnValue([
        { usv: '3', t: 1, requests: '[]', _id: 'once' },
      ])
      const c = createCollector(deps)
      const first = c.recoverRetry()
      const second = c.recoverRetry()

      expect(second).toBe(first)
      await Promise.resolve()
      expect(channel.send).toHaveBeenCalledTimes(1)
      finishSend!()
      await Promise.all([first, second])
      expect(deps.retry.ack).toHaveBeenCalledTimes(1)
      expect(deps.retry.loadAll).toHaveBeenCalledTimes(1)
    })

    test('续传重试发送前补齐运行时字段 ch', async () => {
      const items: ReportPayload[] = [
        { usv: '3', t: 1, requests: '[{"lt":"21"}]', _id: 'a' },
      ]
      const deps = makeDeps({
        resolveUploadFields: () => ({ ch: 'dlmm-Android-oppo' }),
      })
      deps.retry.loadAll.mockReturnValue(items)
      const channel = deps.selectChannel()!
      const c = createCollector(deps)
      await c.recoverRetry()
      const sent = (channel.send as jest.Mock).mock.calls[0][0] as ReportPayload
      expect(JSON.parse(sent.requests)).toEqual([
        { lt: '21', ch: 'dlmm-Android-oppo' },
      ])
      expect(deps.retry.ack).toHaveBeenCalledWith('a')
    })

    test('部分失败（非永久错）→ 失败项 markAttempt，成功项 ack', async () => {
      const items: ReportPayload[] = [
        { usv: '3', t: 1, requests: '[]', _id: 'a' },
        { usv: '3', t: 2, requests: '[]', _id: 'b' },
      ]
      const channel: Channel = {
        name: '2.0',
        available: () => true,
        send: jest.fn((p: ReportPayload) =>
          p._id === 'b' ? Promise.reject(new Error('x')) : Promise.resolve()
        ),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.retry.loadAll.mockReturnValue(items)
      const c = createCollector(deps)
      await c.recoverRetry()
      expect(deps.retry.ack).toHaveBeenCalledWith('a')
      expect(deps.retry.ack).not.toHaveBeenCalledWith('b')
      expect(deps.retry.markAttempt).toHaveBeenCalledWith('b')
    })

    test('永久错 → ack 死信，不 markAttempt（修复 retry 死循环）', async () => {
      const items: ReportPayload[] = [
        { usv: '3', t: 1, requests: '[]', _id: 'dead' },
      ]
      const channel: Channel = {
        name: 'image',
        available: () => true,
        send: jest.fn(() =>
          Promise.reject(
            new PermanentChannelError('image url too long: 81718 > 6144')
          )
        ),
      }
      const deps = makeDeps({
        selectChannel: jest.fn(() => channel) as MockedDeps['selectChannel'],
      })
      deps.retry.loadAll.mockReturnValue(items)
      const c = createCollector(deps)
      await c.recoverRetry()
      expect(deps.retry.ack).toHaveBeenCalledWith('dead')
      expect(deps.retry.markAttempt).not.toHaveBeenCalled()
    })

    test('channel 不可用 → 不动队列', async () => {
      const deps = makeDeps()
      deps.retry.loadAll.mockReturnValue([
        { usv: '3', t: 1, requests: '[]', _id: 'a' },
      ])
      deps.selectChannel.mockReturnValue(undefined)
      const c = createCollector(deps)
      await c.recoverRetry()
      expect(deps.retry.ack).not.toHaveBeenCalled()
    })
  })
})
