import {
  __resetReportGate,
  isReportEnabled,
} from '../../../src/public/runtime/reportGate'
import { storage } from '../../../src/public/infra/storage'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

const APP_ID = '__UNI__TEST'
const NOW = 1_700_000_000_000

function successRequest(enable: 0 | 1): jest.Mock {
  return jest.fn(({ success }) => {
    success?.({ statusCode: 200, data: { ret: 0, enable } })
  })
}

describe('public/runtime/reportGate', () => {
  beforeEach(() => {
    installMockUni()
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID = APP_ID
    storage.__resetCache()
    __resetReportGate()
  })

  afterEach(() => {
    __resetReportGate()
    storage.__resetCache()
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
    restoreMockUni()
  })

  test('首次查询 enable=1 → 允许上报并缓存 24 小时状态', async () => {
    const request = successRequest(1)
    await expect(
      isReportEnabled({ appId: APP_ID, usv: '5.07', nowMs: () => NOW, request })
    ).resolves.toBe(true)

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://tongji.dcloud.io/uni/stat',
        method: 'GET',
        data: {
          usv: '5.07',
          conf: JSON.stringify({ ak: APP_ID }),
          t: String(NOW),
        },
      })
    )
    expect(storage.get('report:control-status')).toBe(1)
    expect(storage.get('report:control-checked-at')).toBe(NOW)
  })

  test('首次查询 enable=0 → 禁止上报', async () => {
    await expect(
      isReportEnabled({
        appId: APP_ID,
        usv: '5.07',
        nowMs: () => NOW,
        request: successRequest(0),
      })
    ).resolves.toBe(false)
  })

  test('有效缓存直接生效，不重复请求', async () => {
    storage.batchSet({
      'report:control-status': 0,
      'report:control-checked-at': NOW - 1000,
    })
    const request = successRequest(1)
    await expect(
      isReportEnabled({ appId: APP_ID, usv: '5.07', nowMs: () => NOW, request })
    ).resolves.toBe(false)
    expect(request).not.toHaveBeenCalled()
  })

  test('缓存过期时本次沿用旧值，后台刷新供下次发送使用', async () => {
    storage.batchSet({
      'report:control-status': 0,
      'report:control-checked-at': NOW - 2000,
    })
    const request = successRequest(1)
    await expect(
      isReportEnabled({
        appId: APP_ID,
        usv: '5.07',
        nowMs: () => NOW,
        cacheTtlMs: 1000,
        request,
      })
    ).resolves.toBe(false)
    await Promise.resolve()
    await Promise.resolve()
    expect(request).toHaveBeenCalledTimes(1)
    expect(storage.get('report:control-status')).toBe(1)
    expect(storage.get('report:control-checked-at')).toBe(NOW)
  })

  test.each([
    ['请求失败', jest.fn(({ fail }) => fail?.(new Error('offline')))],
    ['响应非法', jest.fn(({ success }) => success?.({ data: { ret: 1 } }))],
  ])('%s且无缓存 → fail-open 允许上报', async (_name, request) => {
    await expect(
      isReportEnabled({ appId: APP_ID, usv: '5.07', nowMs: () => NOW, request })
    ).resolves.toBe(true)
    expect(storage.get('report:control-status')).toBeUndefined()
  })

  test('HTTP 非 2xx 即使响应体合法也 fail-open', async () => {
    const request = jest.fn(({ success }) =>
      success?.({ statusCode: 500, data: { ret: 0, enable: 0 } })
    )
    await expect(
      isReportEnabled({ appId: APP_ID, usv: '5.07', nowMs: () => NOW, request })
    ).resolves.toBe(true)
    expect(storage.get('report:control-status')).toBeUndefined()
  })

  test('请求超时且无缓存 → fail-open 允许上报', async () => {
    const request = jest.fn()
    await expect(
      isReportEnabled({
        appId: APP_ID,
        usv: '5.07',
        nowMs: () => NOW,
        timeoutMs: 1,
        request,
      })
    ).resolves.toBe(true)
    expect(request).toHaveBeenCalledTimes(1)
    expect(storage.get('report:control-status')).toBeUndefined()
  })

  test('并发首次查询合并为一个请求', async () => {
    let resolveRequest:
      | ((value: { ret: number; enable: number }) => void)
      | undefined
    const request = jest.fn(({ success }) => {
      resolveRequest = (data) => success?.({ statusCode: 200, data })
    })
    const opts = { appId: APP_ID, usv: '5.07', nowMs: () => NOW, request }
    const first = isReportEnabled(opts)
    const second = isReportEnabled(opts)
    expect(request).toHaveBeenCalledTimes(1)
    resolveRequest!({ ret: 0, enable: 1 })
    await expect(Promise.all([first, second])).resolves.toEqual([true, true])
  })

  test('不同 appid 的并发首次查询互不复用结果', async () => {
    const request = jest.fn(({ data, success }) => {
      const conf = JSON.parse(data.conf) as { ak: string }
      success?.({
        statusCode: 200,
        data: { ret: 0, enable: conf.ak === '__UNI__OFF' ? 0 : 1 },
      })
    })
    const [off, on] = await Promise.all([
      isReportEnabled({
        appId: '__UNI__OFF',
        usv: '5.07',
        nowMs: () => NOW,
        request,
      }),
      isReportEnabled({
        appId: '__UNI__ON',
        usv: '5.07',
        nowMs: () => NOW,
        request,
      }),
    ])

    expect([off, on]).toEqual([false, true])
    expect(request).toHaveBeenCalledTimes(2)
  })
})
