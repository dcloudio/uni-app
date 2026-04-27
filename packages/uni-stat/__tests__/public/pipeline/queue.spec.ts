import { storage } from '../../../src/public/infra/storage'
import {
  __reset,
  configure,
  enqueue,
  flush,
  rollback,
  shouldFlush,
  size,
} from '../../../src/public/pipeline/queue'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../helpers/mockUni'

import type { StatData } from '../../../src/public/domain/statData'

function makeEvt(lt: string, extra: Partial<StatData> = {}): StatData {
  return Object.assign({ lt, t: 1700000000 } as StatData, extra)
}

describe('pipeline/queue', () => {
  let handle: MockUniHandle

  beforeEach(() => {
    handle = installMockUni()
    storage.__resetCache()
    __reset()
  })

  afterEach(() => {
    __reset()
    storage.__resetCache()
    restoreMockUni()
  })

  describe('enqueue + flush 基础', () => {
    test('入队 → 桶按 lt 分组', () => {
      enqueue(makeEvt('1'))
      enqueue(makeEvt('11'))
      enqueue(makeEvt('11'))
      expect(size()).toBe(3)
      const snap = flush()
      expect(snap).toBeDefined()
      expect(Object.keys(snap!).sort()).toEqual(['1', '11'])
      expect(snap!['1']).toHaveLength(1)
      expect(snap!['11']).toHaveLength(2)
    })

    test('flush 后桶清空', () => {
      enqueue(makeEvt('1'))
      flush()
      expect(size()).toBe(0)
      expect(flush()).toBeUndefined()
    })

    test('入队空桶 flush → undefined', () => {
      expect(flush()).toBeUndefined()
    })

    test('缺 lt → 丢弃', () => {
      enqueue({ t: 1 } as StatData)
      expect(size()).toBe(0)
    })

    test('非对象 → 丢弃', () => {
      enqueue(null as unknown as StatData)
      enqueue(undefined as unknown as StatData)
      expect(size()).toBe(0)
    })
  })

  describe('修复缺陷 #3：flush 期间并发入队不应被误删', () => {
    test('flush 取出快照后，立即入队的事件保留到下批', () => {
      enqueue(makeEvt('1', { e: 'a' }))
      enqueue(makeEvt('1', { e: 'b' }))
      const snap1 = flush()
      expect(snap1!['1']).toHaveLength(2)

      enqueue(makeEvt('1', { e: 'c' }))
      enqueue(makeEvt('11', { e: 'd' }))

      const snap2 = flush()
      expect(snap2).toBeDefined()
      expect(snap2!['1']).toHaveLength(1)
      expect((snap2!['1'][0] as { e: string }).e).toBe('c')
      expect(snap2!['11']).toHaveLength(1)
      expect(size()).toBe(0)
    })

    test('快照与桶引用隔离：mutate 快照不影响新桶', () => {
      enqueue(makeEvt('1', { e: 'a' }))
      const snap = flush()!
      snap['1'].push(makeEvt('1', { e: 'leak' }))
      enqueue(makeEvt('1', { e: 'b' }))
      const snap2 = flush()!
      expect(snap2['1']).toHaveLength(1)
      expect((snap2['1'][0] as { e: string }).e).toBe('b')
    })
  })

  describe('rollback', () => {
    test('回滚 → 下次 flush 能看到', () => {
      enqueue(makeEvt('1', { e: 'x' }))
      const snap = flush()!
      rollback(snap)
      const snap2 = flush()!
      expect(snap2['1']).toHaveLength(1)
      expect((snap2['1'][0] as { e: string }).e).toBe('x')
    })

    test('回滚 + 期间新事件 → 回滚的在前', () => {
      enqueue(makeEvt('1', { e: 'old' }))
      const snap = flush()!
      enqueue(makeEvt('1', { e: 'new' }))
      rollback(snap)
      const merged = flush()!
      expect((merged['1'] as { e: string }[]).map((x) => x.e)).toEqual([
        'old',
        'new',
      ])
    })

    test('rollback(undefined) → no-op', () => {
      expect(() =>
        rollback(undefined as unknown as Record<string, StatData[]>)
      ).not.toThrow()
    })
  })

  describe('shouldFlush', () => {
    test('force=true 始终 true', () => {
      configure({ intervalSec: 9999 })
      expect(shouldFlush(true)).toBe(true)
    })

    test('intervalSec=0 → 始终 true', () => {
      configure({ intervalSec: 0 })
      expect(shouldFlush()).toBe(true)
    })

    test('未到间隔 → false；到达后 → true', () => {
      const realDateNow = Date.now
      let now = 1_000_000
      Date.now = jest.fn(() => now)
      try {
        configure({ intervalSec: 10 })
        enqueue(makeEvt('1'))
        flush()
        expect(shouldFlush()).toBe(false)
        now += 9999
        expect(shouldFlush()).toBe(false)
        now += 2
        expect(shouldFlush()).toBe(true)
      } finally {
        Date.now = realDateNow
      }
    })
  })

  describe('持久化 + 冷启恢复', () => {
    test('入队后写 storage；flush 后清 storage', () => {
      enqueue(makeEvt('1', { e: 'p1' }))
      const stored = handle.storage.__inspect()['UNI_STAT_DATA:default:queue']
      expect(stored).toBeDefined()
      flush()
      const after = handle.storage.__inspect()['UNI_STAT_DATA:default:queue']
      expect(after).toBeUndefined()
    })

    test('冷启从 storage 恢复（首次入队前）', () => {
      handle.storage.setStorageSync('UNI_STAT_DATA:default:queue', {
        '1': [makeEvt('1', { e: 'recovered' })],
      })
      storage.__resetCache()
      enqueue(makeEvt('11', { e: 'fresh' }))
      const snap = flush()!
      expect(snap['1']).toHaveLength(1)
      expect((snap['1'][0] as { e: string }).e).toBe('recovered')
      expect(snap['11']).toHaveLength(1)
    })

    test('冷启脏数据（非对象） → 忽略', () => {
      handle.storage.setStorageSync('UNI_STAT_DATA:default:queue', 'not-obj')
      storage.__resetCache()
      enqueue(makeEvt('1', { e: 'a' }))
      const snap = flush()!
      expect(snap['1']).toHaveLength(1)
    })
  })
})
