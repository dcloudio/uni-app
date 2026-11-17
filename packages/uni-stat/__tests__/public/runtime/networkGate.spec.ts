/**
 * 公有版 networkGate：getNetworkType 门闸 + onNetworkStatusChange 恢复。
 */
import {
  __resetNetworkGate,
  isNetworkOffline,
  isOfflineNetResult,
  onNetworkOnline,
  setNetworkForeground,
} from '../../../src/public/runtime/networkGate'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('public/runtime/networkGate', () => {
  afterEach(() => {
    __resetNetworkGate()
    restoreMockUni()
  })

  test('isOfflineNetResult：仅 none 为无网', () => {
    expect(isOfflineNetResult({ net: 'none', raw: 'none' })).toBe(true)
    expect(isOfflineNetResult({ net: 'wifi', raw: 'wifi' })).toBe(false)
    expect(isOfflineNetResult({ net: 'unknown', raw: '' })).toBe(false)
  })

  test('isNetworkOffline：getNetworkType=none → true', async () => {
    installMockUni({
      platform: 'app',
      patch: {
        getNetworkType: ({
          success,
        }: {
          success?: (r: { networkType: string }) => void
        }) => {
          success?.({ networkType: 'none' })
        },
      },
    })
    await expect(isNetworkOffline()).resolves.toBe(true)
  })

  test('并发网络探测合并为一次 getNetworkType', async () => {
    let success: ((r: { networkType: string }) => void) | undefined
    const getNetworkType = jest.fn(
      (opts: { success?: (r: { networkType: string }) => void }) => {
        success = opts.success
      }
    )
    installMockUni({ platform: 'app', patch: { getNetworkType } })

    const first = isNetworkOffline()
    const second = isNetworkOffline()
    expect(getNetworkType).toHaveBeenCalledTimes(1)
    success?.({ networkType: 'wifi' })
    await expect(Promise.all([first, second])).resolves.toEqual([false, false])
  })

  test('App 首次网络探测结果供后续 flush 复用', async () => {
    const getNetworkType = jest.fn(
      (opts: { success?: (r: { networkType: string }) => void }) => {
        opts.success?.({ networkType: 'wifi' })
      }
    )
    installMockUni({ platform: 'app', patch: { getNetworkType } })

    await expect(isNetworkOffline()).resolves.toBe(false)
    await expect(isNetworkOffline()).resolves.toBe(false)
    expect(getNetworkType).toHaveBeenCalledTimes(1)
  })

  test('App 后台无快照时不调用 getNetworkType', async () => {
    const getNetworkType = jest.fn()
    installMockUni({ platform: 'app', patch: { getNetworkType } })

    setNetworkForeground(false)
    await expect(isNetworkOffline()).resolves.toBe(false)
    expect(getNetworkType).not.toHaveBeenCalled()
  })

  test('App 无快照从后台回前台时请求调用方恢复待发数据', () => {
    installMockUni({ platform: 'app' })

    expect(setNetworkForeground(false)).toBe(false)
    expect(setNetworkForeground(true)).toBe(true)
    expect(setNetworkForeground(true)).toBe(false)
  })

  test('App 前台恢复时离线快照失效并重新探测', async () => {
    const results = ['none', 'wifi']
    const getNetworkType = jest.fn(
      (opts: { success?: (r: { networkType: string }) => void }) => {
        opts.success?.({ networkType: results.shift() ?? 'wifi' })
      }
    )
    installMockUni({
      platform: 'app',
      patch: { getNetworkType, onNetworkStatusChange: undefined },
    })

    await expect(isNetworkOffline()).resolves.toBe(true)
    setNetworkForeground(false)
    await expect(isNetworkOffline()).resolves.toBe(true)
    expect(getNetworkType).toHaveBeenCalledTimes(1)

    expect(setNetworkForeground(true)).toBe(true)
    await expect(isNetworkOffline()).resolves.toBe(false)
    expect(getNetworkType).toHaveBeenCalledTimes(2)
  })

  test('onNetworkOnline：none→wifi 时触发回调', () => {
    let changeCb:
      | ((r: { networkType: string; isConnected?: boolean }) => void)
      | null = null
    installMockUni({
      platform: 'app',
      patch: {
        onNetworkStatusChange: (
          cb: (r: { networkType: string; isConnected?: boolean }) => void
        ) => {
          changeCb = cb
        },
        offNetworkStatusChange: jest.fn(),
      },
    })

    const spy = jest.fn()
    const off = onNetworkOnline(spy)
    expect(changeCb).toBeTruthy()
    changeCb!({ networkType: 'none', isConnected: false })
    expect(spy).not.toHaveBeenCalled()
    changeCb!({ networkType: 'wifi', isConnected: true })
    expect(spy).toHaveBeenCalledTimes(1)
    off()
  })

  test('网络变化结果直接供门闸复用，不再次 getNetworkType', async () => {
    let changeCb:
      | ((r: { networkType: string; isConnected?: boolean }) => void)
      | null = null
    const getNetworkType = jest.fn()
    installMockUni({
      platform: 'app',
      patch: {
        getNetworkType,
        onNetworkStatusChange: (
          cb: (r: { networkType: string; isConnected?: boolean }) => void
        ) => {
          changeCb = cb
        },
      },
    })

    const off = onNetworkOnline(jest.fn())
    changeCb!({ networkType: 'wifi', isConnected: true })
    await expect(isNetworkOffline()).resolves.toBe(false)
    expect(getNetworkType).not.toHaveBeenCalled()
    off()
  })
})
