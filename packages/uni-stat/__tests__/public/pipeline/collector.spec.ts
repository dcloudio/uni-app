import { createCollector } from '../../../public/pipeline/collector'

import type { CollectorDeps } from '../../../public/pipeline/collector'
import type { Channel, ReportPayload } from '../../../public/pipeline/types'
import type { Bucket } from '../../../public/pipeline/queue'
import type { StatData } from '../../../public/domain/statData'
import type { SessionSnapshot } from '../../../public/domain/session/machine'

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
    consumePrevId: jest.Mock
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
        consumePrevId: jest.fn(() => undefined),
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
    test('入队 + ctx 自动填充 t/session.seq/pid', () => {
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
          consumePrevId: jest.fn(() => 'prev-sid'),
        } as MockedDeps['session'],
      })
      const c = createCollector(deps)
      c.report({ lt: '1' })
      expect(deps.session.nextSeq).toHaveBeenCalledTimes(1)
      const builtCtx = deps.builder.build.mock.calls[0][0]
      expect(builtCtx.t).toBe(1700000000)
      expect(builtCtx.session?.seq).toBe(7)
      expect(builtCtx.session?.sid).toBe('sid-x')
      expect(builtCtx.pid).toBe('prev-sid')
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
          consumePrevId: jest.fn(() => undefined),
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

    test('成功 → channel.send 被调，commitVisitOnAck 被调', async () => {
      const deps = makeDeps()
      deps.queue.shouldFlush.mockReturnValue(true)
      const bucket: Bucket = { '1': [{ lt: '1' } as StatData] }
      deps.queue.flush.mockReturnValue(bucket)
      const channel = deps.selectChannel()!
      const c = createCollector(deps)
      await c.flush(true)
      expect(deps.serializer.handleData).toHaveBeenCalledWith(bucket)
      expect(channel.send as jest.Mock).toHaveBeenCalledTimes(1)
      const sent = (channel.send as jest.Mock).mock.calls[0][0] as ReportPayload
      expect(sent.usv).toBe('3')
      expect(sent._id).toBe('p-fixed')
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

    test('send 失败 → retry.persist + visit.rollbackPendingVisit', async () => {
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

    test('部分失败 → 失败项 markAttempt，成功项 ack', async () => {
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
