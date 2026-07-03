import { storage } from '../../../src/public/infra/storage'
import {
  __reset,
  ack,
  configure,
  loadAll,
  markAttempt,
  persist,
  size,
} from '../../../src/public/pipeline/retry'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../helpers/mockUni'

import type { ReportPayload } from '../../../src/public/pipeline/types'

function makePayload(id: string, t = 1700000000): ReportPayload {
  return {
    usv: '3',
    t,
    requests: '[{"lt":"1","t":' + t + '}]',
    _id: id,
  }
}

describe('pipeline/retry', () => {
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

  describe('persist + loadAll + ack 基础三段', () => {
    test('persist 一条 → loadAll 拿到同一条 → ack 后清空', () => {
      const id = persist(makePayload('a1'))
      expect(id).toBe('a1')
      expect(size()).toBe(1)

      const items = loadAll()
      expect(items).toHaveLength(1)
      expect(items[0]._id).toBe('a1')

      ack('a1')
      expect(size()).toBe(0)
      expect(loadAll()).toEqual([])
    })

    test('persist 多条 → 入队顺序 FIFO', () => {
      persist(makePayload('a1'))
      persist(makePayload('a2'))
      persist(makePayload('a3'))
      const ids = loadAll().map((it) => it._id)
      expect(ids).toEqual(['a1', 'a2', 'a3'])
    })

    test('persist 重复 id → 视为幂等不重复入队', () => {
      persist(makePayload('a1'))
      persist(makePayload('a1'))
      expect(size()).toBe(1)
    })

    test('persist 无 _id → 自动生成 r-* 前缀的 id', () => {
      const id = persist({ usv: '3', t: 1, requests: '[]' })
      expect(id).toMatch(/^r-/)
      expect(size()).toBe(1)
      expect(loadAll()[0]._id).toBe(id)
    })

    test('ack 不存在 id → no-op，不抛错', () => {
      persist(makePayload('a1'))
      expect(() => ack('not-exist')).not.toThrow()
      expect(size()).toBe(1)
    })

    test('ack("") → no-op', () => {
      persist(makePayload('a1'))
      ack('')
      expect(size()).toBe(1)
    })
  })

  describe('容量裁剪（FIFO 丢弃最旧）', () => {
    test('超过 maxItems → 丢弃最旧条目', () => {
      configure({ maxItems: 3 })
      persist(makePayload('a1'))
      persist(makePayload('a2'))
      persist(makePayload('a3'))
      persist(makePayload('a4'))
      const ids = loadAll().map((it) => it._id)
      expect(ids).toEqual(['a2', 'a3', 'a4'])
    })
  })

  describe('过期清理', () => {
    test('loadAll 时清掉超过 maxAgeMs 的条目', () => {
      const realDateNow = Date.now
      let now = 1_000_000
      Date.now = jest.fn(() => now)
      try {
        configure({ maxAgeMs: 1000 })
        persist(makePayload('old'))
        now += 5000
        persist(makePayload('new'))
        const items = loadAll()
        expect(items.map((it) => it._id)).toEqual(['new'])
        expect(size()).toBe(1)
      } finally {
        Date.now = realDateNow
      }
    })
  })

  describe('markAttempt', () => {
    test('累加 attempts 计数（未到 maxAttempts 不丢弃）', () => {
      configure({ maxAttempts: 5 })
      persist(makePayload('a1'))
      markAttempt('a1')
      markAttempt('a1')
      expect(size()).toBe(1)
      expect(loadAll().map((it) => it._id)).toEqual(['a1'])
    })

    test('id 不存在 → no-op', () => {
      expect(() => markAttempt('x')).not.toThrow()
    })

    test('到达 maxAttempts → 自动 ack 死信清理', () => {
      configure({ maxAttempts: 3 })
      persist(makePayload('dead'))
      persist(makePayload('alive'))
      markAttempt('dead')
      markAttempt('dead')
      // 第 3 次 markAttempt → attempts==3，命中阈值，自动从队列删除
      markAttempt('dead')
      const ids = loadAll().map((it) => it._id)
      expect(ids).toEqual(['alive'])
      expect(size()).toBe(1)
    })

    test('maxAttempts=1 → 一次失败即丢弃（极端配置）', () => {
      configure({ maxAttempts: 1 })
      persist(makePayload('once'))
      markAttempt('once')
      expect(size()).toBe(0)
    })
  })

  describe('storage 异常容错', () => {
    test('storage.set 抛错 → persist 不抛错（缓存仍生效）', () => {
      handle.storage.__failNext({ set: new Error('disk full') })
      expect(() => persist(makePayload('a1'))).not.toThrow()
    })

    test('storage 读取脏数据（非数组） → loadAll 返回空', () => {
      handle.storage.setStorageSync(
        'UNI_STAT_DATA:default:retry:queue',
        'not-an-array'
      )
      storage.__resetCache()
      expect(loadAll()).toEqual([])
    })
  })
})
