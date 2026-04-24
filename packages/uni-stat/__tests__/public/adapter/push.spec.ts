import { getPushClientId } from '../../../public/adapter/push'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('adapter/push', () => {
  afterEach(() => {
    restoreMockUni()
    jest.useRealTimers()
  })

  test('enabled=false（默认）→ disabled，不调 uni.getPushClientId', async () => {
    const spy = jest.fn()
    installMockUni({
      platform: 'app-plus',
      patch: { getPushClientId: spy },
    })
    await expect(getPushClientId()).resolves.toEqual({
      ok: false,
      cid: '',
      reason: 'disabled',
    })
    expect(spy).not.toHaveBeenCalled()
  })

  test('uni 缺失 → unsupported', async () => {
    delete (globalThis as { uni?: unknown }).uni
    await expect(getPushClientId({ enabled: true })).resolves.toEqual({
      ok: false,
      cid: '',
      reason: 'unsupported',
    })
  })

  test('未实现 getPushClientId → unsupported', async () => {
    installMockUni({ platform: 'mp-weixin' })
    await expect(getPushClientId({ enabled: true })).resolves.toEqual({
      ok: false,
      cid: '',
      reason: 'unsupported',
    })
  })

  test('success 拿到 cid → ok', async () => {
    installMockUni({
      platform: 'app-plus',
      patch: {
        getPushClientId: ({
          success,
        }: {
          success?: (r: { cid: string }) => void
        }) => {
          success?.({ cid: 'CID_ABC_123' })
        },
      },
    })
    await expect(getPushClientId({ enabled: true })).resolves.toEqual({
      ok: true,
      cid: 'CID_ABC_123',
    })
  })

  test('success 但 cid 为空 → fail', async () => {
    installMockUni({
      platform: 'app-plus',
      patch: {
        getPushClientId: ({
          success,
        }: {
          success?: (r: { cid: string }) => void
        }) => {
          success?.({ cid: '' })
        },
      },
    })
    await expect(getPushClientId({ enabled: true })).resolves.toEqual({
      ok: false,
      cid: '',
      reason: 'fail',
    })
  })

  test('fail 回调 → fail', async () => {
    installMockUni({
      platform: 'app-plus',
      patch: {
        getPushClientId: ({ fail }: { fail?: (e: unknown) => void }) => {
          fail?.(new Error('push not registered'))
        },
      },
    })
    await expect(getPushClientId({ enabled: true })).resolves.toEqual({
      ok: false,
      cid: '',
      reason: 'fail',
    })
  })

  test('超时 → timeout', async () => {
    jest.useFakeTimers()
    installMockUni({
      platform: 'app-plus',
      patch: {
        getPushClientId: () => {
          // 永不回调
        },
      },
    })
    const p = getPushClientId({ enabled: true, timeoutMs: 50 })
    jest.advanceTimersByTime(60)
    await expect(p).resolves.toEqual({ ok: false, cid: '', reason: 'timeout' })
  })

  test('uni.getPushClientId 抛错 → 走超时不抛', async () => {
    jest.useFakeTimers()
    installMockUni({
      platform: 'app-plus',
      patch: {
        getPushClientId: () => {
          throw new Error('boom')
        },
      },
    })
    const p = getPushClientId({ enabled: true, timeoutMs: 30 })
    jest.advanceTimersByTime(40)
    await expect(p).resolves.toEqual({ ok: false, cid: '', reason: 'timeout' })
  })
})
