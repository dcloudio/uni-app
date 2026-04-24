import {
  type Buckets,
  flatten,
  handleData,
} from '../../../public/pipeline/serializer'

const make = (lt: string, tag: string) => ({ lt, t: 1, tag })

describe('pipeline/serializer（修复缺陷 #4）', () => {
  describe('flatten 排序', () => {
    test('lt=0 必落最前；lt=3 必落最末', () => {
      const buckets: Buckets = {
        '11': [make('11', 'a')],
        '3': [make('3', 'hide')],
        '0': [make('0', 'session')],
        '1': [make('1', 'launch')],
      }
      const out = flatten(buckets)
      expect(out.map((d) => d.lt)).toEqual(['0', '1', '11', '3'])
    })

    test('完整 7 类 lt 顺序：0 → 1 → 11 → 21 → 31 → 101 → 3', () => {
      const buckets: Buckets = {
        '101': [make('101', 'p')],
        '21': [make('21', 'e')],
        '31': [make('31', 'err')],
        '11': [make('11', 'page')],
        '3': [make('3', 'hide')],
        '1': [make('1', 'launch')],
        '0': [make('0', 'session')],
      }
      expect(flatten(buckets).map((d) => d.lt)).toEqual([
        '0',
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
        '0': [make('0', 's')],
      }
      expect(flatten(buckets).map((d) => d.lt)).toEqual(['0', '999', '3'])
    })

    test('空桶被跳过', () => {
      const buckets: Buckets = {
        '0': [],
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
        '0': [{ lt: '0', t: 100 }],
        '1': [{ lt: '1', t: 101 }],
      }
      const json = handleData(buckets)
      expect(typeof json).toBe('string')
      expect(JSON.parse(json)).toEqual([
        { lt: '0', t: 100 },
        { lt: '1', t: 101 },
      ])
    })

    test('全空 → "[]"', () => {
      expect(handleData({})).toBe('[]')
    })
  })
})
