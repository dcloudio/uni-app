/**
 * 公有版 networkGate：getNetworkType 门闸 + onNetworkStatusChange 恢复。
 */
import {
  isNetworkOffline,
  isOfflineNetResult,
  onNetworkOnline,
} from '../../../src/public/runtime/networkGate'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('public/runtime/networkGate', () => {
  afterEach(() => {
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
})
