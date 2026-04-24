import { getLocation } from '../../../public/adapter/location'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

describe('adapter/location', () => {
  afterEach(() => {
    restoreMockUni()
    jest.useRealTimers()
  })

  test('enabled=false（默认）→ 不调 uni.getLocation，resolve 默认值', async () => {
    const spy = jest.fn()
    installMockUni({
      platform: 'mp-weixin',
      patch: { getLocation: spy },
    })
    await expect(getLocation()).resolves.toEqual({
      lat: '',
      lng: '',
      ok: false,
    })
    expect(spy).not.toHaveBeenCalled()
  })

  test('enabled=true 且 uni 缺失 → resolve 默认值', async () => {
    delete (globalThis as { uni?: unknown }).uni
    await expect(getLocation({ enabled: true })).resolves.toEqual({
      lat: '',
      lng: '',
      ok: false,
    })
  })

  test('success 返回精度 6 位的字符串坐标', async () => {
    installMockUni({
      platform: 'mp-weixin',
      patch: {
        getLocation: ({
          success,
        }: {
          success?: (r: { latitude: number; longitude: number }) => void
        }) => {
          success?.({ latitude: 31.123456789, longitude: 121.987654321 })
        },
      },
    })
    await expect(getLocation({ enabled: true })).resolves.toEqual({
      lat: '31.123457',
      lng: '121.987654',
      ok: true,
    })
  })

  test('fail → resolve 默认值（永不 reject）', async () => {
    installMockUni({
      platform: 'mp-weixin',
      patch: {
        getLocation: ({ fail }: { fail?: (e: unknown) => void }) => {
          fail?.(new Error('user denied'))
        },
      },
    })
    await expect(getLocation({ enabled: true })).resolves.toEqual({
      lat: '',
      lng: '',
      ok: false,
    })
  })

  test('超时 → resolve 默认值', async () => {
    jest.useFakeTimers()
    installMockUni({
      platform: 'mp-weixin',
      patch: {
        getLocation: () => {
          // 永不回调
        },
      },
    })
    const p = getLocation({ enabled: true, timeoutMs: 50 })
    jest.advanceTimersByTime(60)
    await expect(p).resolves.toEqual({ lat: '', lng: '', ok: false })
  })

  test('uni.getLocation 抛错 → 走超时不抛', async () => {
    jest.useFakeTimers()
    installMockUni({
      platform: 'mp-weixin',
      patch: {
        getLocation: () => {
          throw new Error('boom')
        },
      },
    })
    const p = getLocation({ enabled: true, timeoutMs: 30 })
    jest.advanceTimersByTime(40)
    await expect(p).resolves.toEqual({ lat: '', lng: '', ok: false })
  })

  test('NaN/Infinity 坐标 → 字符串空', async () => {
    installMockUni({
      platform: 'mp-weixin',
      patch: {
        getLocation: ({
          success,
        }: {
          success?: (r: { latitude: number; longitude: number }) => void
        }) => {
          success?.({ latitude: NaN, longitude: Infinity })
        },
      },
    })
    await expect(getLocation({ enabled: true })).resolves.toEqual({
      lat: '',
      lng: '',
      ok: true,
    })
  })

  test('type 默认 wgs84 透传给 uni.getLocation', async () => {
    let receivedType: string | undefined
    installMockUni({
      platform: 'mp-weixin',
      patch: {
        getLocation: (opts: {
          type?: string
          success?: (r: { latitude: number; longitude: number }) => void
        }) => {
          receivedType = opts.type
          opts.success?.({ latitude: 0, longitude: 0 })
        },
      },
    })
    await getLocation({ enabled: true })
    expect(receivedType).toBe('wgs84')
  })
})
