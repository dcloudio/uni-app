import {
  getNet,
  normalizeNet,
  onChange,
} from '../../../src/public/adapter/network'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('adapter/network', () => {
  afterEach(() => {
    restoreMockUni()
    jest.useRealTimers()
  })

  describe('normalizeNet', () => {
    test.each([
      ['wifi', 'wifi'],
      ['WIFI', 'wifi'],
      ['4g', '4g'],
      ['5G', '5g'],
      ['ethernet', 'ethernet'],
      ['none', 'none'],
      ['', 'unknown'],
      ['hotspot', 'unknown'],
    ])('%s → %s', (raw, expected) => {
      expect(normalizeNet(raw)).toBe(expected)
    })

    test('null / undefined 走 unknown', () => {
      expect(normalizeNet(null)).toBe('unknown')
      expect(normalizeNet(undefined)).toBe('unknown')
    })
  })

  describe('getNet', () => {
    test('uni 缺失 → resolve unknown', async () => {
      delete (globalThis as { uni?: unknown }).uni
      await expect(getNet()).resolves.toEqual({ net: 'unknown', raw: '' })
    })

    test('success 返回 wifi', async () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          getNetworkType: ({
            success,
          }: {
            success?: (r: { networkType: string }) => void
          }) => {
            success?.({ networkType: 'wifi' })
          },
        },
      })
      await expect(getNet()).resolves.toEqual({ net: 'wifi', raw: 'wifi' })
    })

    test('fail 也 resolve unknown', async () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          getNetworkType: ({ fail }: { fail?: (e: unknown) => void }) => {
            fail?.(new Error('no permission'))
          },
        },
      })
      await expect(getNet()).resolves.toEqual({ net: 'unknown', raw: '' })
    })

    test('超时也 resolve unknown', async () => {
      jest.useFakeTimers()
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          getNetworkType: () => {
            // 永不回调
          },
        },
      })
      const p = getNet(50)
      jest.advanceTimersByTime(60)
      await expect(p).resolves.toEqual({ net: 'unknown', raw: '' })
    })

    test('原始字符串归一化（4G → 4g）', async () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          getNetworkType: ({
            success,
          }: {
            success?: (r: { networkType: string }) => void
          }) => {
            success?.({ networkType: '4G' })
          },
        },
      })
      await expect(getNet()).resolves.toEqual({ net: '4g', raw: '4G' })
    })

    test('uni.getNetworkType 抛错 → 走超时（不抛）', async () => {
      jest.useFakeTimers()
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          getNetworkType: () => {
            throw new Error('boom')
          },
        },
      })
      const p = getNet(20)
      jest.advanceTimersByTime(30)
      await expect(p).resolves.toEqual({ net: 'unknown', raw: '' })
    })
  })

  describe('onChange', () => {
    test('uni 缺失 → 返回 noop unsubscribe', () => {
      delete (globalThis as { uni?: unknown }).uni
      const off = onChange(() => undefined)
      expect(typeof off).toBe('function')
      expect(() => off()).not.toThrow()
    })

    test('订阅后能收到归一化结果', () => {
      let registered:
        | ((r: { networkType: string; isConnected?: boolean }) => void)
        | undefined
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onNetworkStatusChange: (
            cb: (r: { networkType: string; isConnected?: boolean }) => void
          ) => {
            registered = cb
          },
          offNetworkStatusChange: jest.fn(),
        },
      })
      const got: Array<{ net: string; raw: string }> = []
      onChange((r) => got.push(r))
      expect(registered).toBeDefined()
      registered!({ networkType: 'WIFI', isConnected: true })
      registered!({ networkType: '5G', isConnected: true })
      registered!({ networkType: 'wifi', isConnected: false })
      expect(got).toEqual([
        { net: 'wifi', raw: 'WIFI' },
        { net: '5g', raw: '5G' },
        { net: 'none', raw: 'wifi' },
      ])
    })

    test('unsubscribe 调用 offNetworkStatusChange 并传同一回调引用', () => {
      const offSpy = jest.fn()
      let registered: ((r: { networkType: string }) => void) | undefined
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onNetworkStatusChange: (cb: (r: { networkType: string }) => void) => {
            registered = cb
          },
          offNetworkStatusChange: offSpy,
        },
      })
      const off = onChange(() => undefined)
      off()
      expect(offSpy).toHaveBeenCalledTimes(1)
      expect(offSpy).toHaveBeenCalledWith(registered)
    })

    test('回调内部抛错不会冒泡', () => {
      let registered: ((r: { networkType: string }) => void) | undefined
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          onNetworkStatusChange: (cb: (r: { networkType: string }) => void) => {
            registered = cb
          },
        },
      })
      onChange(() => {
        throw new Error('listener throws')
      })
      expect(() => registered!({ networkType: 'wifi' })).not.toThrow()
    })
  })
})
