import {
  __resetState,
  clearEntry,
  getEntryRoute,
  isEntry,
  isEntryForIey,
  markEntryDeparted,
  markEntryPage,
} from '../../../../src/public/domain/entry/entryPage'
import { storage } from '../../../../src/public/infra/storage'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../../helpers/mockUni'

const KEY = 'UNI_STAT_DATA:entry-test:session:entryRoute'

describe('domain/entry/entryPage', () => {
  let handle: MockUniHandle

  beforeEach(() => {
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID =
      'entry-test'
    handle = installMockUni({ platform: 'mp-weixin' })
    storage.__resetCache()
    __resetState()
  })

  afterEach(() => {
    restoreMockUni()
    storage.__resetCache()
    __resetState()
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
  })

  describe('markEntryPage', () => {
    test('首次 mark → 写 storage 与缓存', () => {
      markEntryPage('pages/index/index')
      expect(handle.storage.__inspect()[KEY]).toBe('pages/index/index')
      expect(getEntryRoute()).toBe('pages/index/index')
    })

    test('已存在 entry → 第二次 mark noop（一会话一 entry）', () => {
      markEntryPage('pages/A/A')
      markEntryPage('pages/B/B')
      expect(getEntryRoute()).toBe('pages/A/A')
    })

    test('空字符串 / undefined → noop', () => {
      markEntryPage('')
      markEntryPage(undefined)
      expect(handle.storage.__inspect()).toEqual({})
    })
  })

  describe('isEntry', () => {
    test('当前路径与 entry 相同 → true', () => {
      markEntryPage('pages/A/A')
      expect(isEntry('pages/A/A')).toBe(true)
    })

    test('当前路径不同 → false', () => {
      markEntryPage('pages/A/A')
      expect(isEntry('pages/B/B')).toBe(false)
    })

    test('未 mark → false（不会把未知误判为入口）', () => {
      expect(isEntry('pages/A/A')).toBe(false)
    })

    test('route 为空 → false', () => {
      markEntryPage('pages/A/A')
      expect(isEntry('')).toBe(false)
      expect(isEntry(undefined)).toBe(false)
    })
  })

  describe('getEntryRoute', () => {
    test('storage 已有（跨会话恢复）→ 命中', () => {
      handle.storage.setStorageSync(KEY, 'pages/recover/recover')
      expect(getEntryRoute()).toBe('pages/recover/recover')
    })

    test('storage 异常 → 返回 undefined（不抛）', () => {
      handle.storage.__failNext({ get: new Error('boom') })
      expect(() => getEntryRoute()).not.toThrow()
      expect(getEntryRoute()).toBeUndefined()
    })

    test('第二次调用走缓存，不再 IO', () => {
      markEntryPage('pages/cached/cached')
      const spy = jest.spyOn(
        handle.uni as { getStorageSync: jest.Mock },
        'getStorageSync'
      )
      getEntryRoute()
      getEntryRoute()
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('clearEntry', () => {
    test('清掉 storage 与缓存', () => {
      markEntryPage('pages/A/A')
      clearEntry()
      expect(handle.storage.__inspect()[KEY]).toBeUndefined()
      expect(getEntryRoute()).toBeUndefined()
    })

    test('清掉后可以重新 mark 新 entry', () => {
      markEntryPage('pages/A/A')
      clearEntry()
      markEntryPage('pages/B/B')
      expect(getEntryRoute()).toBe('pages/B/B')
    })

    test('清掉后重置 entryDeparted（重新登记入口后再次生效）', () => {
      markEntryPage('pages/A/A')
      markEntryDeparted()
      clearEntry()
      markEntryPage('pages/A/A')
      expect(isEntryForIey('pages/A/A')).toBe(true)
    })
  })

  describe('isEntryForIey / markEntryDeparted', () => {
    test('首次离开前入口路由 → true；离开后同路由 → false', () => {
      markEntryPage('pages/A/A')
      expect(isEntryForIey('pages/A/A')).toBe(true)
      markEntryDeparted()
      // isEntry 仍认其为登记入口，但 isEntryForIey 因已离开而不再计入
      expect(isEntry('pages/A/A')).toBe(true)
      expect(isEntryForIey('pages/A/A')).toBe(false)
    })
  })
})
