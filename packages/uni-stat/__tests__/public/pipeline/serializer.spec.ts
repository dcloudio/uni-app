import {
  type Buckets,
  chunkEvents,
  flatten,
  handleData,
  handleDataChunked,
} from '../../../src/public/pipeline/serializer'

const make = (lt: string, tag: string) => ({ lt, t: 1, tag })

describe('pipeline/serializer（修复缺陷 #4）', () => {
  describe('flatten 排序', () => {
    test('lt=1 必落最前；lt=3 必落最末', () => {
      const buckets: Buckets = {
        '11': [make('11', 'a')],
        '3': [make('3', 'hide')],
        '1': [make('1', 'launch')],
      }
      const out = flatten(buckets)
      expect(out.map((d) => d.lt)).toEqual(['1', '11', '3'])
    })

    test('完整 6 类 lt 顺序：1 → 11 → 21 → 31 → 101 → 3', () => {
      const buckets: Buckets = {
        '101': [make('101', 'p')],
        '21': [make('21', 'e')],
        '31': [make('31', 'err')],
        '11': [make('11', 'page')],
        '3': [make('3', 'hide')],
        '1': [make('1', 'launch')],
      }
      expect(flatten(buckets).map((d) => d.lt)).toEqual([
        '1',
        '11',
        '21',
        '31',
        '101',
        '3',
      ])
    })

    test('同一 lt 内保留 push 顺序（稳定排序）', () => {
      const buckets: Buckets = {
        '11': [
          make('11', 'page-A'),
          make('11', 'page-B'),
          make('11', 'page-C'),
        ],
      }
      expect(flatten(buckets).map((d) => d.tag)).toEqual([
        'page-A',
        'page-B',
        'page-C',
      ])
    })

    test('未知 lt 落到 lt=3 之前（不至于挤到最末打乱 hide 语义）', () => {
      const buckets: Buckets = {
        '3': [make('3', 'hide')],
        '999': [make('999', 'mystery')],
        '1': [make('1', 's')],
      }
      expect(flatten(buckets).map((d) => d.lt)).toEqual(['1', '999', '3'])
    })

    test('空桶被跳过', () => {
      const buckets: Buckets = {
        '1': [],
        '11': [make('11', 'p')],
        '3': [],
      }
      expect(flatten(buckets).map((d) => d.lt)).toEqual(['11'])
    })

    test('全空 → 返回空数组', () => {
      expect(flatten({})).toEqual([])
    })
  })

  describe('handleData', () => {
    test('返回合法 JSON 字符串', () => {
      const buckets: Buckets = {
        '1': [{ lt: '1', t: 100 }],
        '11': [{ lt: '11', t: 101 }],
      }
      const json = handleData(buckets)
      expect(typeof json).toBe('string')
      expect(JSON.parse(json)).toEqual([
        { lt: '1', t: 100 },
        { lt: '11', t: 101 },
      ])
    })

    test('全空 → "[]"', () => {
      expect(handleData({})).toBe('[]')
    })
  })

  describe('chunkEvents 切片（修复 image url too long 死循环）', () => {
    test('按事件数切片：30 条 + maxEvents=10 → 3 片', () => {
      const events = Array.from({ length: 30 }, (_, i) => ({
        lt: '21',
        i,
      }))
      const chunks = chunkEvents(events, { maxEvents: 10 })
      expect(chunks).toHaveLength(3)
      expect(chunks[0]).toHaveLength(10)
      expect(chunks[2]).toHaveLength(10)
    })

    test('按字节数切片：每条 ~50B、maxBytes=200 → 切成多片且每片 < 200B', () => {
      const events = Array.from({ length: 10 }, (_, i) => ({
        lt: '21',
        // 让单条 stringify 后约 25-30B
        a: 'x'.repeat(20),
        i,
      }))
      const chunks = chunkEvents(events, { maxBytes: 200 })
      expect(chunks.length).toBeGreaterThan(1)
      for (const c of chunks) {
        expect(JSON.stringify(c).length).toBeLessThanOrEqual(200)
      }
      // 不丢事件
      const total = chunks.reduce((n, c) => n + c.length, 0)
      expect(total).toBe(10)
    })

    test('双阈值 min 生效：取更紧的那个', () => {
      const events = Array.from({ length: 100 }, () => ({ lt: '21' }))
      // events JSON 单条 ~10B，100 条全部 stringify ~ 1100B
      const chunks = chunkEvents(events, { maxEvents: 5, maxBytes: 1024 * 64 })
      // maxEvents=5 占主导
      expect(chunks).toHaveLength(20)
    })

    test('单条事件即超阈值 → 独占一片（不丢失）', () => {
      const events = [{ lt: '21', payload: 'a'.repeat(500) }]
      const chunks = chunkEvents(events, { maxBytes: 100 })
      expect(chunks).toHaveLength(1)
      expect(chunks[0]).toEqual(events)
    })

    test('空数组 → []', () => {
      expect(chunkEvents([], { maxBytes: 1024 })).toEqual([])
    })

    test('保持 flatten 排序契约：lt=1 在第一片首位、lt=3 在最后一片末尾', () => {
      const buckets: Buckets = {
        '21': Array.from({ length: 25 }, (_, i) => ({ lt: '21', i })),
        '1': [{ lt: '1', start: true }],
        '3': [{ lt: '3', end: true }],
      }
      const chunks = handleDataChunked(buckets, { maxEvents: 10 }).map(
        (s) => JSON.parse(s) as { lt: string }[]
      )
      expect(chunks.length).toBeGreaterThanOrEqual(3)
      // 第一片首位是 lt=1
      expect(chunks[0][0].lt).toBe('1')
      // 最后一片末位是 lt=3
      const last = chunks[chunks.length - 1]
      expect(last[last.length - 1].lt).toBe('3')
    })
  })

  describe('handleDataChunked', () => {
    test('空 buckets → []', () => {
      expect(handleDataChunked({})).toEqual([])
    })

    test('每片都是合法 JSON 数组', () => {
      const buckets: Buckets = {
        '1': [{ lt: '1' }],
        '21': Array.from({ length: 5 }, () => ({ lt: '21' })),
      }
      const out = handleDataChunked(buckets, { maxEvents: 2 })
      expect(out.length).toBeGreaterThan(1)
      for (const s of out) {
        expect(Array.isArray(JSON.parse(s))).toBe(true)
      }
    })
  })
})
