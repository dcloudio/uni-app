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
