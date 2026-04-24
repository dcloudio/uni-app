import { storage } from '../../../public/infra/storage'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'
import type { MockStorageController } from '../helpers/mockStorage'

describe('infra/storage', () => {
  let mock: MockStorageController

  beforeEach(() => {
    mock = installMockUni().storage
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID = 'app-test'
    storage.__resetCache()
  })

  afterEach(() => {
    restoreMockUni()
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
    storage.__resetCache()
  })

  describe('namespace', () => {
    test('key 自动加前缀 UNI_STAT_DATA:<appid>:<key>', () => {
      storage.set('foo', 1)
      expect(mock.__inspect()).toEqual({
        'UNI_STAT_DATA:app-test:foo': 1,
      })
    })

    test('UNI_APP_ID 缺失退化为 default', () => {
      delete (process.env as Record<string, string | undefined>).UNI_APP_ID
      storage.set('foo', 'v')
      expect(mock.__inspect()).toEqual({
        'UNI_STAT_DATA:default:foo': 'v',
      })
    })
  })

  describe('get/set/remove 闭环', () => {
    test('set 后 get 返回原值', () => {
      storage.set('k', { a: 1 })
      expect(storage.get('k')).toEqual({ a: 1 })
    })

    test('get 未命中返回 undefined（不是空字符串，向调用方屏蔽 uni 怪癖）', () => {
      expect(storage.get('absent')).toBeUndefined()
    })

    test('remove 后 get 返回 undefined', () => {
      storage.set('k', 'v')
      storage.remove('k')
      expect(storage.get('k')).toBeUndefined()
    })

    test('set undefined 等价于 remove', () => {
      storage.set('k', 'v')
      storage.set('k', undefined)
      expect(storage.get('k')).toBeUndefined()
      expect(mock.__inspect()).toEqual({})
    })
  })

  describe('缓存（修复缺陷 #18：避免重复 IO）', () => {
    /** spy globalThis.uni 上的方法（mockUni 把 mock controller 的引用赋给 uni，
     * 直接 spy mock 不会被 storage 模块感知）。 */
    function spyUniGet(): jest.SpyInstance {
      const u = (
        globalThis as unknown as {
          uni: { getStorageSync: (k: string) => unknown }
        }
      ).uni
      return jest.spyOn(u, 'getStorageSync')
    }

    test('第二次 get 命中缓存，不再调 uni.getStorageSync', () => {
      storage.set('k', 'v')
      const spy = spyUniGet()
      storage.get('k')
      storage.get('k')
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })

    test('cold get 一次 IO，再次 get 走缓存', () => {
      mock.setStorageSync('UNI_STAT_DATA:app-test:k', 'persisted')
      const spy = spyUniGet()
      expect(storage.get('k')).toBe('persisted')
      expect(storage.get('k')).toBe('persisted')
      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })
  })

  describe('safeRead（缺陷 #5 修复关键依赖）', () => {
    test('未命中：ok=true, value=undefined（区别于读异常）', () => {
      const r = storage.safeRead('absent')
      expect(r).toEqual({ ok: true, value: undefined })
    })

    test('命中：ok=true, value=值', () => {
      storage.set('k', 'v')
      storage.__resetCache()
      const r = storage.safeRead<string>('k')
      expect(r).toEqual({ ok: true, value: 'v' })
    })

    test('storage 抛错：ok=false（调用方据此保留内存上次值，避免老用户被误判为新用户）', () => {
      mock.__failNext({ get: new Error('quota') })
      const r = storage.safeRead('k')
      expect(r).toEqual({ ok: false, value: undefined })
    })
  })

  describe('容错（修复缺陷 #14：NPE）', () => {
    test('uni.getStorageSync 抛错时 get 返回 undefined 而不是崩', () => {
      mock.__failNext({ get: new Error('x') })
      expect(() => storage.get('k')).not.toThrow()
      expect(storage.get('k')).toBeUndefined()
    })

    test('uni.setStorageSync 抛错时缓存仍然更新（吞错）', () => {
      mock.__failNext({ set: new Error('quota') })
      expect(() => storage.set('k', 1)).not.toThrow()
      expect(storage.get('k')).toBe(1)
    })

    test('uni.removeStorageSync 抛错时缓存仍然清空', () => {
      storage.set('k', 1)
      mock.__failNext({ remove: new Error('x') })
      expect(() => storage.remove('k')).not.toThrow()
      expect(storage.get('k')).toBeUndefined()
    })
  })

  describe('batchGet / batchSet', () => {
    test('batchSet 写入 + batchGet 一次性读出', () => {
      storage.batchSet({ a: 1, b: 2, c: 3 })
      expect(storage.batchGet(['a', 'b', 'c', 'd'])).toEqual({
        a: 1,
        b: 2,
        c: 3,
        d: undefined,
      })
    })
  })

  describe('clearNamespace', () => {
    test('清除当前命名空间下、本次访问过的全部 key', () => {
      storage.set('a', 1)
      storage.set('b', 2)
      storage.clearNamespace()
      expect(storage.get('a')).toBeUndefined()
      expect(storage.get('b')).toBeUndefined()
      expect(mock.__inspect()).toEqual({})
    })
  })

  describe('uni 缺失', () => {
    test('uni 不可用时 get 不崩，返回 undefined（统计模块容错优先）', () => {
      restoreMockUni()
      expect(() => storage.get('k')).not.toThrow()
      expect(storage.get('k')).toBeUndefined()
      installMockUni()
    })

    test('uni 不可用时 safeRead 返回 ok=false（区分 storage 异常）', () => {
      restoreMockUni()
      expect(storage.safeRead('k')).toEqual({ ok: false, value: undefined })
      installMockUni()
    })

    test('uni 不可用时 set/remove 不抛错', () => {
      restoreMockUni()
      expect(() => storage.set('k', 1)).not.toThrow()
      expect(() => storage.remove('k')).not.toThrow()
      installMockUni()
    })
  })
})
