import {
  getLaunchScene,
  onAppHide,
  onAppLaunch,
  onAppShow,
} from '../../../src/public/adapter/lifecycle'
import { uniPlatformMpAliRaw } from '../../../src/public/adapter/platform'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('adapter/lifecycle', () => {
  afterEach(() => {
    restoreMockUni()
  })

  describe('onAppShow', () => {
    test('uni 缺失 → 返回 noop unsubscribe', () => {
      delete (globalThis as { uni?: unknown }).uni
      const off = onAppShow(() => undefined)
      expect(typeof off).toBe('function')
      expect(() => off()).not.toThrow()
    })

    test('订阅 + 触发 + 解绑', () => {
      let registered: ((e: { scene?: string | number }) => void) | undefined
      const offSpy = jest.fn()
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onAppShow: (cb: (e: { scene?: string | number }) => void) => {
            registered = cb
          },
          offAppShow: offSpy,
        },
      })
      const got: Array<{ scene?: string | number }> = []
      const off = onAppShow((e) => got.push(e))
      registered!({ scene: 1001 })
      expect(got).toEqual([{ scene: 1001 }])
      off()
      expect(offSpy).toHaveBeenCalledTimes(1)
      expect(offSpy).toHaveBeenCalledWith(registered)
    })

    test('回调内部抛错不会冒泡', () => {
      let registered: ((e: unknown) => void) | undefined
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onAppShow: (cb: (e: unknown) => void) => {
            registered = cb
          },
        },
      })
      onAppShow(() => {
        throw new Error('listener throws')
      })
      expect(() => registered!({ scene: 1 })).not.toThrow()
    })
  })

  describe('onAppHide', () => {
    test('订阅 + 解绑', () => {
      let registered: (() => void) | undefined
      const offSpy = jest.fn()
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onAppHide: (cb: () => void) => {
            registered = cb
          },
          offAppHide: offSpy,
        },
      })
      const cb = jest.fn()
      const off = onAppHide(cb)
      registered!()
      expect(cb).toHaveBeenCalledTimes(1)
      off()
      expect(offSpy).toHaveBeenCalledWith(registered)
    })
  })

  describe('onAppLaunch', () => {
    test('uni 不支持 onAppLaunch → 返回 noop', () => {
      installMockUni({ platform: 'mp-weixin' })
      const off = onAppLaunch(() => undefined)
      expect(() => off()).not.toThrow()
    })
  })

  describe('getLaunchScene', () => {
    test('显式 override 优先', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getLaunchOptionsSync: () => ({ scene: 1001 }) },
      })
      expect(getLaunchScene('override-1')).toBe('override-1')
      expect(getLaunchScene(2002)).toBe('2002')
    })

    test('mp-weixin → getLaunchOptionsSync().scene', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getLaunchOptionsSync: () => ({ scene: 1001 }) },
      })
      expect(getLaunchScene()).toBe('1001')
    })

    test.each([
      'mp-qq',
      'mp-toutiao',
      'mp-baidu',
      uniPlatformMpAliRaw(),
      'mp-lark',
      'mp-kuaishou',
    ])('%s 也走 getLaunchOptionsSync', (platform) => {
      installMockUni({
        platform,
        patch: { getLaunchOptionsSync: () => ({ scene: 9999 }) },
      })
      expect(getLaunchScene()).toBe('9999')
    })

    test('h5/app 端 → 返回空字符串', () => {
      installMockUni({
        platform: 'h5',
        patch: { getLaunchOptionsSync: () => ({ scene: 1 }) },
      })
      expect(getLaunchScene()).toBe('')
    })

    test('getLaunchOptionsSync 抛错 → 返回空字符串', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          getLaunchOptionsSync: () => {
            throw new Error('boom')
          },
        },
      })
      expect(getLaunchScene()).toBe('')
    })

    test('uni 缺失 → 空字符串', () => {
      delete (globalThis as { uni?: unknown }).uni
      expect(getLaunchScene()).toBe('')
    })

    test('scene 为 0 → 返回 "0"，不是空串', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: { getLaunchOptionsSync: () => ({ scene: 0 }) },
      })
      expect(getLaunchScene()).toBe('0')
    })
  })
})
