import {
  __resetState,
  migrateLegacyData,
} from '../../../public/domain/migration'
import { storage } from '../../../public/infra/storage'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../helpers/mockUni'

const APPID = 'mig-test'
const LEGACY_KEY = `$$STAT__DBDATA:${APPID}`
const KFV = `UNI_STAT_DATA:${APPID}:visit:fvts`
const KLV = `UNI_STAT_DATA:${APPID}:visit:lvts`
const KTV = `UNI_STAT_DATA:${APPID}:visit:tvc`
const KDONE = `UNI_STAT_DATA:${APPID}:migration:done`

describe('domain/migration', () => {
  let handle: MockUniHandle

  beforeEach(() => {
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID = APPID
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

  test('老聚合 key 存在 → 拆解到新前缀，老 key 不删', () => {
    handle.storage.setStorageSync(LEGACY_KEY, {
      __first__visit__time: 1000,
      __last__visit__time: 2000,
      __total__visit__count: 5,
      __page__residence__time: 99,
    })
    const did = migrateLegacyData()
    expect(did).toBe(true)
    const snap = handle.storage.__inspect()
    expect(snap[KFV]).toBe(1000)
    expect(snap[KLV]).toBe(2000)
    expect(snap[KTV]).toBe(5)
    expect(snap[KDONE]).toBe(1)
    // 老聚合 key 仍在
    expect(snap[LEGACY_KEY]).toMatchObject({ __first__visit__time: 1000 })
  })

  test('migration:done 已写 → 第二次直接 noop', () => {
    handle.storage.setStorageSync(KDONE, 1)
    handle.storage.setStorageSync(LEGACY_KEY, { __first__visit__time: 9999 })
    const did = migrateLegacyData()
    expect(did).toBe(false)
    expect(handle.storage.__inspect()[KFV]).toBeUndefined()
  })

  test('新前缀已有值 → 不覆盖（公有版自身可能已写）', () => {
    handle.storage.setStorageSync(KFV, 8888)
    handle.storage.setStorageSync(LEGACY_KEY, { __first__visit__time: 1000 })
    migrateLegacyData()
    expect(handle.storage.__inspect()[KFV]).toBe(8888)
  })

  test('老聚合 key 不存在 → 写 done，return false', () => {
    const did = migrateLegacyData()
    expect(did).toBe(false)
    expect(handle.storage.__inspect()[KDONE]).toBe(1)
  })

  test('进程内重复调用 → 第二次 noop（不 IO）', () => {
    handle.storage.setStorageSync(LEGACY_KEY, {
      __first__visit__time: 1,
      __last__visit__time: 2,
      __total__visit__count: 1,
    })
    expect(migrateLegacyData()).toBe(true)
    const spy = jest.spyOn(
      handle.uni as { getStorageSync: jest.Mock },
      'getStorageSync'
    )
    expect(migrateLegacyData()).toBe(false)
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test('uni 缺失 → 不抛，不写任何 key', () => {
    restoreMockUni()
    delete (globalThis as { uni?: unknown }).uni
    expect(() => migrateLegacyData()).not.toThrow()
  })

  test('老 key 内有未知字段 → 忽略不迁移', () => {
    handle.storage.setStorageSync(LEGACY_KEY, {
      __first__visit__time: 1,
      __unknown__: 'x',
    })
    migrateLegacyData()
    const snap = handle.storage.__inspect()
    expect(snap[KFV]).toBe(1)
    expect(snap['UNI_STAT_DATA:mig-test:__unknown__']).toBeUndefined()
  })
})
