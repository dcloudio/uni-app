/**
 * 自测 helpers，确保后续所有公有版用例的「测试基线」可信。
 * 这一层一旦出错，缺陷 #5 测试矩阵的所有结论都无意义，所以单独跑通。
 */

import { createMockStorage } from './helpers/mockStorage'
import { installMockUni, restoreMockUni } from './helpers/mockUni'

describe('helpers/mockStorage', () => {
  test('未命中 key 返回空字符串（与 uni 行为一致）', () => {
    const s = createMockStorage()
    expect(s.getStorageSync('not-exist')).toBe('')
  })

  test('set / get / remove 闭环', () => {
    const s = createMockStorage()
    s.setStorageSync('k', { a: 1 })
    expect(s.getStorageSync('k')).toEqual({ a: 1 })
    s.removeStorageSync('k')
    expect(s.getStorageSync('k')).toBe('')
  })

  test('set undefined 视为不写入', () => {
    const s = createMockStorage()
    s.setStorageSync('k', undefined)
    expect(s.__inspect()).toEqual({})
  })

  test('clearStorageSync 清空全部', () => {
    const s = createMockStorage()
    s.setStorageSync('a', 1)
    s.setStorageSync('b', 2)
    s.clearStorageSync()
    expect(s.__inspect()).toEqual({})
  })

  test('__inspect 返回浅拷贝快照', () => {
    const s = createMockStorage()
    s.setStorageSync('k', 'v')
    const snap = s.__inspect()
    snap.k = 'mutated'
    expect(s.getStorageSync('k')).toBe('v')
  })

  test('__failNext(get) 仅生效一次', () => {
    const s = createMockStorage()
    s.setStorageSync('k', 'v')
    s.__failNext({ get: new Error('boom') })
    expect(() => s.getStorageSync('k')).toThrow('boom')
    expect(s.__hasPendingFailure()).toBe(false)
    // 失败已消费，下一次正常
    expect(s.getStorageSync('k')).toBe('v')
  })

  test('__failNext(set) 抛错时不写入', () => {
    const s = createMockStorage()
    s.__failNext({ set: new Error('quota') })
    expect(() => s.setStorageSync('k', 'v')).toThrow('quota')
    expect(s.__inspect()).toEqual({})
  })

  test('__reset 清空数据与失败注入', () => {
    const s = createMockStorage()
    s.setStorageSync('k', 'v')
    s.__failNext({ get: new Error('x') })
    s.__reset()
    expect(s.__inspect()).toEqual({})
    expect(s.__hasPendingFailure()).toBe(false)
  })
})

describe('helpers/mockUni', () => {
  afterEach(() => {
    // 兜底，防止某个 case 漏 restore
    while ((globalThis as unknown as { uni?: unknown }).uni) {
      try {
        restoreMockUni()
      } catch {
        break
      }
      // 防御：栈空后 install 之前的 uni 可能也没了，break
      if (!(globalThis as unknown as { uni?: unknown }).uni) break
    }
  })

  test('install 后 uni.getStorageSync 走 mock', () => {
    const { storage } = installMockUni()
    const uni = (
      globalThis as unknown as {
        uni: {
          getStorageSync: (k: string) => unknown
          setStorageSync: (k: string, v: unknown) => void
        }
      }
    ).uni
    uni.setStorageSync('hello', 'world')
    expect(storage.getStorageSync('hello')).toBe('world')
    expect(uni.getStorageSync('hello')).toBe('world')
    restoreMockUni()
  })

  test('嵌套 install / restore 能正确还原', () => {
    const outer = installMockUni()
    outer.storage.setStorageSync('outer', 1)

    const inner = installMockUni()
    inner.storage.setStorageSync('inner', 2)

    // 内层 storage 不能看到外层的 outer
    expect(inner.storage.getStorageSync('outer')).toBe('')
    expect(inner.storage.getStorageSync('inner')).toBe(2)

    restoreMockUni()

    // 回到外层后，外层的 outer 仍在
    const uni = (
      globalThis as unknown as {
        uni: { getStorageSync: (k: string) => unknown }
      }
    ).uni
    expect(uni.getStorageSync('outer')).toBe(1)
    expect(uni.getStorageSync('inner')).toBe('')

    restoreMockUni()
  })

  test('platform 选项注入 process.env.UNI_PLATFORM', () => {
    installMockUni({ platform: 'mp-weixin' })
    expect(process.env.UNI_PLATFORM).toBe('mp-weixin')
    restoreMockUni()
    expect(process.env.UNI_PLATFORM).toBeUndefined()
  })
})
