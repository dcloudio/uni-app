import {
  getOdid,
  getUuid,
  __resetCache as resetDeviceCache,
} from '../../../public/adapter/device'
import { storage } from '../../../public/infra/storage'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

function setPlus(plus: unknown): void {
  ;(globalThis as { plus?: unknown }).plus = plus
}

function clearPlus(): void {
  delete (globalThis as { plus?: unknown }).plus
}

describe('adapter/device', () => {
  beforeEach(() => {
    resetDeviceCache()
    storage.__resetCache()
  })

  afterEach(() => {
    resetDeviceCache()
    storage.__resetCache()
    restoreMockUni()
    clearPlus()
  })

  describe('getUuid', () => {
    test('App 端优先 plus.runtime.getDCloudId', () => {
      installMockUni({ platform: 'app-plus' })
      setPlus({ runtime: { getDCloudId: () => 'dcloud-xyz' } })
      expect(getUuid()).toBe('dcloud-xyz')
    })

    test('App 端 getDCloudId 抛错 → 退到 deviceId / storage / anon', () => {
      installMockUni({
        platform: 'app-plus',
        patch: { getSystemInfoSync: () => ({ deviceId: 'sys-abc' }) },
      })
      setPlus({
        runtime: {
          getDCloudId: () => {
            throw new Error('plus boom')
          },
        },
      })
      expect(getUuid()).toBe('sys-abc')
    })

    test('小程序端：优先 system.deviceId', () => {
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
      expect(uuid).toMatch(/^device-anon-[0-9a-z]+-[0-9a-z]{10}$/)
      const snap = handle.storage.__inspect()
      const stored = Object.entries(snap).find(([k]) =>
        k.includes('device:uuid')
      )
      expect(stored?.[1]).toBe(uuid)
    })

    test('多次调用走内存缓存（不重复访问 plus / storage）', () => {
      const dcloudSpy = jest.fn(() => 'dcloud-xyz')
      installMockUni({ platform: 'app-plus' })
      setPlus({ runtime: { getDCloudId: dcloudSpy } })
      expect(getUuid()).toBe('dcloud-xyz')
      expect(getUuid()).toBe('dcloud-xyz')
      expect(getUuid()).toBe('dcloud-xyz')
      expect(dcloudSpy).toHaveBeenCalledTimes(1)
    })

    test('storage.set 抛错 → 仍返回新生成的 uuid，不抛', () => {
      const handle = installMockUni({
        platform: 'mp-weixin',
        patch: { getSystemInfoSync: () => ({}) },
      })
      handle.storage.__failNext({ set: new Error('storage write failed') })
      expect(() => getUuid()).not.toThrow()
      expect(getUuid()).toMatch(/^device-anon-/)
    })

    test('uni 缺失 → 不抛，返回 anon uuid', () => {
      delete (globalThis as { uni?: unknown }).uni
      const uuid = getUuid()
      expect(uuid).toMatch(/^device-anon-/)
    })
  })

  describe('getOdid', () => {
    test('小程序端固定为空串（不复用 uuid，避免污染老设备识别）', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getSystemInfoSync: () => ({ deviceId: 'wx-device-1' }) },
      })
      expect(getOdid()).toBe('')
    })

    test('H5 端固定为空串', () => {
      installMockUni({ platform: 'h5' })
      expect(getOdid()).toBe('')
    })

    test('App 端取 plus.device.uuid', () => {
      installMockUni({ platform: 'app-plus' })
      setPlus({ device: { uuid: 'plus-old-uuid' } })
      expect(getOdid()).toBe('plus-old-uuid')
    })

    test('App 端 plus 抛错 → 返回空串', () => {
      installMockUni({ platform: 'app-plus' })
      setPlus({
        device: {
          get uuid(): string {
            throw new Error('plus boom')
          },
        },
      })
      expect(getOdid()).toBe('')
    })

    test('多次调用走缓存', () => {
      installMockUni({ platform: 'app-plus' })
      const spy = jest.fn(() => 'plus-uuid')
      setPlus({
        device: {
          get uuid(): string {
            return spy()
          },
        },
      })
      getOdid()
      getOdid()
      getOdid()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
