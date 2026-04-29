import {
  getUuid,
  __resetCache as resetDeviceCache,
} from '../../../src/public/adapter/device'
import { storage } from '../../../src/public/infra/storage'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('adapter/device', () => {
  beforeEach(() => {
    resetDeviceCache()
    storage.__resetCache()
  })

  afterEach(() => {
    resetDeviceCache()
    storage.__resetCache()
    restoreMockUni()
  })

  describe('getUuid', () => {
    test('App 端优先 uni.getDeviceInfo().deviceId', () => {
      installMockUni({
        platform: 'app-plus',
        patch: {
          getDeviceInfo: () => ({ deviceId: 'uni-device-info-1' }),
        },
      })
      expect(getUuid()).toBe('uni-device-info-1')
    })

    test('H5 端优先 uni.getDeviceInfo().deviceId', () => {
      installMockUni({
        platform: 'h5',
        patch: { getDeviceInfo: () => ({ deviceId: 'h5-device-id' }) },
      })
      expect(getUuid()).toBe('h5-device-id')
    })

    test('微信小程序优先 uni.getDeviceInfo().deviceId', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getDeviceInfo: () => ({ deviceId: 'wx-from-device-info' }) },
      })
      expect(getUuid()).toBe('wx-from-device-info')
    })

    test('非微信系小程序：不优先 getDeviceInfo，仍走 getSystemInfoSync', () => {
      installMockUni({
        platform: 'mp-alipay',
        patch: {
          getDeviceInfo: () => ({ deviceId: 'should-not-use-first' }),
          getSystemInfoSync: () => ({ deviceId: 'ali-sys-id' }),
        },
      })
      expect(getUuid()).toBe('ali-sys-id')
    })

    test('App 端无 getDeviceInfo 时退到 getSystemInfoSync().deviceId', () => {
      installMockUni({
        platform: 'app-plus',
        patch: { getSystemInfoSync: () => ({ deviceId: 'sys-fallback' }) },
      })
      expect(getUuid()).toBe('sys-fallback')
    })

    test('App 端 getDeviceInfo 抛错 → 退到 getSystemInfoSync().deviceId', () => {
      installMockUni({
        platform: 'app-plus',
        patch: {
          getDeviceInfo: () => {
            throw new Error('getDeviceInfo boom')
          },
          getSystemInfoSync: () => ({ deviceId: 'sys-after-boom' }),
        },
      })
      expect(getUuid()).toBe('sys-after-boom')
    })

    test('微信小程序无 getDeviceInfo 时退到 getSystemInfoSync().deviceId', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getSystemInfoSync: () => ({ deviceId: 'wx-device-1' }) },
      })
      expect(getUuid()).toBe('wx-device-1')
    })

    test('deviceId 缺失 → 走 storage 历史值', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getSystemInfoSync: () => ({}) },
      })
      storage.set('device:uuid', 'persisted-uuid')
      expect(getUuid()).toBe('persisted-uuid')
    })

    test('全部缺失 → 生成 anon uuid 并落 storage', () => {
      const handle = installMockUni({
        platform: 'mp-weixin',
        patch: { getSystemInfoSync: () => ({}) },
      })
      const uuid = getUuid()
      expect(uuid).toMatch(/^\d{18,21}$/)
      const snap = handle.storage.__inspect()
      const stored = Object.entries(snap).find(([k]) =>
        k.includes('device:uuid')
      )
      expect(stored?.[1]).toBe(uuid)
    })

    test('多次调用走内存缓存（不重复访问 getDeviceInfo / storage）', () => {
      const deviceInfoSpy = jest.fn(() => ({ deviceId: 'cached-dev' }))
      installMockUni({
        platform: 'app-plus',
        patch: { getDeviceInfo: deviceInfoSpy },
      })
      expect(getUuid()).toBe('cached-dev')
      expect(getUuid()).toBe('cached-dev')
      expect(getUuid()).toBe('cached-dev')
      expect(deviceInfoSpy).toHaveBeenCalledTimes(1)
    })

    test('storage.set 抛错 → 仍返回新生成的 uuid，不抛', () => {
      const handle = installMockUni({
        platform: 'mp-weixin',
        patch: { getSystemInfoSync: () => ({}) },
      })
      handle.storage.__failNext({ set: new Error('storage write failed') })
      expect(() => getUuid()).not.toThrow()
      expect(getUuid()).toMatch(/^\d{18,21}$/)
    })

    test('uni 缺失 → 不抛，返回 anon uuid', () => {
      delete (globalThis as { uni?: unknown }).uni
      const uuid = getUuid()
      expect(uuid).toMatch(/^\d{18,21}$/)
    })
  })
})
