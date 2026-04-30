/**
 * pipeline/channel/image 单测：
 *   IM1 buildImageReportUrl 严格按照火山 TLS WebTrack 协议拼接
 *   IM2 available() 仅检查 host/projectId/topicId 是否齐全
 *   IM3 H5 默认：有 `Image` 时走 onload，不调用 `uni.request`
 *   IM3.b H5 Image onerror：仍视为送达（resolve），不调用 `uni.request`（对齐 TLS JSON 响应）
 *   IM4 无 Image / `preferImageBeacon: false`：退回 `uni.request` GET，2xx 视为成功
 *   IM5 uni.request 失败：经过 maxRetries 后 reject
 *   IM6 URL 长度超出 maxUrlLength：PermanentChannelError，不进 withRetry
 *   IM7 host 末尾多余 `/` 会被去除，避免拼出 `https://x//WebTrack.gif`
 */

import {
  buildImageReportUrl,
  buildWebTracksPostUrl,
  createImageChannel,
} from '../../../../src/public/pipeline/channel/image'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../../helpers/mockUni'

import {
  PermanentChannelError,
  type ReportPayload,
  isPermanentChannelError,
} from '../../../../src/public/pipeline/types'

const PAYLOAD: ReportPayload = {
  usv: '3',
  t: 1700000000,
  requests: '[{"lt":"1","t":1,"sk":"s1"}]',
  _id: 'b1',
}

const HOST = 'https://tls-cn-beijing.volces.com'
const PID = 'pid-x'
const TID = 'tid-y'
const noSleep = (): Promise<void> => Promise.resolve()

describe('pipeline/channel/image', () => {
  let handle: MockUniHandle

  beforeEach(() => {
    handle = installMockUni({
      platform: 'mp-weixin',
      patch: { request: () => undefined },
    })
  })

  afterEach(() => {
    restoreMockUni()
    delete (globalThis as { Image?: unknown }).Image
  })

  test('IM1 buildImageReportUrl 拼接合规', () => {
    const url = buildImageReportUrl(PAYLOAD, {
      host: HOST,
      projectId: PID,
      topicId: TID,
      nowMs: () => 1700000001000,
    })
    // 必带固定 query
    expect(url).toContain(HOST + '/WebTrack.gif?')
    expect(url).toContain('ProjectId=' + encodeURIComponent(PID))
    expect(url).toContain('TopicId=' + encodeURIComponent(TID))
    expect(url).toContain('Source=webImg')
    expect(url).toContain('Time=1700000001000')
    // Logs 是 encodeURIComponent(payload.requests)
    expect(url).toContain('Logs=' + encodeURIComponent(PAYLOAD.requests))
  })

  test('IM1.b buildWebTracksPostUrl 路径为 /WebTracks', () => {
    const url = buildWebTracksPostUrl(HOST, PID, TID)
    expect(url).toBe(
      HOST +
        '/WebTracks?ProjectId=' +
        encodeURIComponent(PID) +
        '&TopicId=' +
        encodeURIComponent(TID)
    )
  })

  test('IM2 available()：三参齐全 → true，缺一返回 false', () => {
    expect(
      createImageChannel({
        host: HOST,
        projectId: PID,
        topicId: TID,
      }).available()
    ).toBe(true)
    expect(
      createImageChannel({ host: '', projectId: PID, topicId: TID }).available()
    ).toBe(false)
    expect(
      createImageChannel({
        host: HOST,
        projectId: '',
        topicId: TID,
      }).available()
    ).toBe(false)
    expect(
      createImageChannel({
        host: HOST,
        projectId: PID,
        topicId: '',
      }).available()
    ).toBe(false)
  })

  test('IM3 H5：默认 Image onload 成功，不调用 uni.request', async () => {
    const requestSpy = jest.fn()
    handle.uni.request = requestSpy

    /** 模拟浏览器 Image：设置 src 后异步触发 onload。 */
    class FakeImage {
      naturalWidth = 1
      naturalHeight = 1
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      set src(_u: string) {
        queueMicrotask(() => this.onload?.())
      }
    }
    ;(globalThis as unknown as { Image: new () => unknown }).Image =
      FakeImage as unknown as new () => unknown

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      sleep: noSleep,
      nowMs: () => 1700000001000,
    })
    await ch.send(PAYLOAD)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  test('IM3.b H5：Image onerror 仍判成功（模拟 TLS 返回 JSON 触发 onerror），不调 uni.request', async () => {
    const requestSpy = jest.fn()
    handle.uni.request = requestSpy

    /** 模拟浏览器对非图片响应走 onerror（与 Network 里 HTTP 200 可并存）。 */
    class FakeImageNonImageBody {
      naturalWidth = 0
      naturalHeight = 0
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      set src(_u: string) {
        queueMicrotask(() => this.onerror?.())
      }
    }
    ;(globalThis as unknown as { Image: new () => unknown }).Image =
      FakeImageNonImageBody as unknown as new () => unknown

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      sleep: noSleep,
      maxRetries: 1,
    })
    await ch.send(PAYLOAD)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  test('IM3.d H5：Image 既不 onload 也不 onerror → 超时 reject', async () => {
    const requestSpy = jest.fn()
    handle.uni.request = requestSpy

    /** 模拟回调永不触发（仅用于超时路径）。 */
    class FakeImageHang {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      set src(_u: string) {
        /* intentionally empty */
      }
    }
    ;(globalThis as unknown as { Image: new () => unknown }).Image =
      FakeImageHang as unknown as new () => unknown

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      sleep: noSleep,
      timeoutMs: 100,
      maxRetries: 1,
    })
    await expect(ch.send(PAYLOAD)).rejects.toThrow(/统计上报超时/)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  test('IM3.c H5：关闭 preferImageBeacon 时 uni.request GET 403 → 含 HTTP 码与摘要', async () => {
    const requestSpy = jest.fn(
      ({
        success,
      }: {
        success: (res: {
          statusCode: number
          data: { ErrorCode: string; ErrorMessage: string }
        }) => void
      }) => {
        success({
          statusCode: 403,
          data: {
            ErrorCode: 'Forbidden',
            ErrorMessage: 'no permission',
          },
        })
      }
    )
    handle.uni.request = requestSpy

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      preferImageBeacon: false,
      sleep: noSleep,
      maxRetries: 1,
    })
    await expect(ch.send(PAYLOAD)).rejects.toThrow(
      /统计上报 HTTP 403:.*Forbidden/
    )
    expect(requestSpy).toHaveBeenCalled()
  })

  test('IM4 无 Image：退回 uni.request GET，2xx 成功', async () => {
    const requestSpy = jest.fn(
      ({ success }: { success: (res: { statusCode: number }) => void }) => {
        success({ statusCode: 200 })
      }
    )
    handle.uni.request = requestSpy

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      preferImageBeacon: false,
      sleep: noSleep,
    })
    await ch.send(PAYLOAD)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    const arg = requestSpy.mock.calls[0][0] as unknown as {
      url: string
      method: string
    }
    expect(arg.method).toBe('GET')
    expect(arg.url).toContain('/WebTrack.gif?')
  })

  test('IM5 uni.request 失败 N 次 → 经 maxRetries 后 reject', async () => {
    const requestSpy = jest.fn(({ fail }: { fail: (e: unknown) => void }) => {
      fail(new Error('net'))
    })
    handle.uni.request = requestSpy

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      preferImageBeacon: false,
      sleep: noSleep,
      maxRetries: 3,
    })
    await expect(ch.send(PAYLOAD)).rejects.toThrow()
    expect(requestSpy).toHaveBeenCalledTimes(3)
  })

  test('IM6 URL 长度超过上限 → 抛 PermanentChannelError，不进 withRetry', async () => {
    const requestSpy = jest.fn()
    handle.uni.request = requestSpy

    const big: ReportPayload = {
      ...PAYLOAD,
      requests: '[' + '"a",'.repeat(2048) + '"end"]',
    }
    // maxRetries=5 是为了证明：永久错走 preflight，根本不进 withRetry，
    // 即便重试次数设得很大，uni.request 也只应该被调 0 次。
    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      preferImageBeacon: false,
      sleep: noSleep,
      maxUrlLength: 1024,
      maxRetries: 5,
    })
    let caught: unknown
    try {
      await ch.send(big)
    } catch (e) {
      caught = e
    }
    expect(caught).toBeInstanceOf(PermanentChannelError)
    expect(isPermanentChannelError(caught)).toBe(true)
    expect((caught as Error).message).toMatch(/统计上报 URL 过长/)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  test('IM6.b 通道未配置 → 抛 PermanentChannelError，不进 withRetry', async () => {
    const requestSpy = jest.fn(({ fail }: { fail: (e: unknown) => void }) => {
      fail(new Error('net'))
    })
    handle.uni.request = requestSpy

    const ch = createImageChannel({
      host: '',
      projectId: PID,
      topicId: TID,
      preferImageBeacon: false,
      sleep: noSleep,
      maxRetries: 5,
    })
    let caught: unknown
    try {
      await ch.send(PAYLOAD)
    } catch (e) {
      caught = e
    }
    expect(isPermanentChannelError(caught)).toBe(true)
    expect((caught as Error).message).toMatch(/统计上报未配置/)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  test('IM6.c 无 Image 且 uni.request 不可用 → 抛 PermanentChannelError', async () => {
    handle.uni.request = undefined as unknown as typeof handle.uni.request

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      preferImageBeacon: false,
      sleep: noSleep,
      maxRetries: 3,
    })
    let caught: unknown
    try {
      await ch.send(PAYLOAD)
    } catch (e) {
      caught = e
    }
    expect(isPermanentChannelError(caught)).toBe(true)
    expect((caught as Error).message).toMatch(/当前环境无法完成统计上报/)
  })

  test('IM8 非 H5：maxRequestBytes 为 WebTracks POST 切片上限（4MiB）', () => {
    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'mp-weixin',
    })
    expect(typeof ch.maxRequestBytes).toBe('function')
    expect(ch.maxRequestBytes!()).toBe(4 * 1024 * 1024)
  })

  test('IM8.b H5：maxRequestBytes 按 maxUrlLength 反推原文上限', () => {
    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
    })
    expect(ch.maxRequestBytes!()).toBe(1962)

    const ch2 = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      maxUrlLength: 4 * 1024,
    })
    expect(ch2.maxRequestBytes!()).toBe(1280)

    const ch3 = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'h5',
      maxUrlLength: 100,
    })
    expect(ch3.maxRequestBytes!()).toBe(512)
  })

  test('IM10 非 H5：POST /WebTracks + 必选头 + JSON body', async () => {
    const requestSpy = jest.fn(
      ({ success }: { success: (res: { statusCode: number }) => void }) => {
        success({ statusCode: 200 })
      }
    )
    handle.uni.request = requestSpy

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'mp-weixin',
      preferImageBeacon: false,
      sleep: noSleep,
    })
    await ch.send(PAYLOAD)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    const arg = requestSpy.mock.calls[0][0] as unknown as {
      url: string
      method: string
      data: string
      header: Record<string, string>
    }
    expect(arg.method).toBe('POST')
    expect(arg.url).toContain('/WebTracks?')
    expect(arg.url).toContain('ProjectId=' + encodeURIComponent(PID))
    expect(arg.header['Content-Type']).toBe('application/json')
    expect(arg.header['x-tls-bodyrawsize']).toMatch(/^\d+$/)
    const body = JSON.parse(arg.data) as {
      Source: string
      Logs: Array<Record<string, string>>
    }
    expect(body.Source).toBe('webImg')
    // 火山 WebTracks：Logs 每条 value 必须为 string（数字等需规范化）
    expect(body.Logs).toHaveLength(1)
    expect(body.Logs[0].lt).toBe('1')
    expect(body.Logs[0].t).toBe('1')
    expect(body.Logs[0].sk).toBe('s1')
    expect(Number(arg.header['x-tls-bodyrawsize'])).toBe(
      new TextEncoder().encode(arg.data).length
    )
  })

  test('IM10.b 非 H5：对象/数组型字段 JSON 序列化为 string', async () => {
    const requestSpy = jest.fn(
      ({ success }: { success: (res: { statusCode: number }) => void }) => {
        success({ statusCode: 200 })
      }
    )
    handle.uni.request = requestSpy

    const payload: ReportPayload = {
      usv: '3',
      t: 1700000000,
      requests: '[{"lt":"21","t":1,"custom":{"a":1},"tags":["x","y"]}]',
      _id: 'b2',
    }
    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'mp-weixin',
      preferImageBeacon: false,
      sleep: noSleep,
    })
    await ch.send(payload)
    const arg = requestSpy.mock.calls[0][0] as unknown as { data: string }
    const body = JSON.parse(arg.data) as {
      Logs: Array<Record<string, string>>
    }
    expect(body.Logs[0].custom).toBe('{"a":1}')
    expect(body.Logs[0].tags).toBe('["x","y"]')
  })

  test('IM11 非 H5：requests 非法 JSON → PermanentChannelError', async () => {
    const requestSpy = jest.fn()
    handle.uni.request = requestSpy

    const ch = createImageChannel({
      host: HOST,
      projectId: PID,
      topicId: TID,
      ut: 'app',
      sleep: noSleep,
    })
    const bad: ReportPayload = { ...PAYLOAD, requests: 'not-json' }
    let caught: unknown
    try {
      await ch.send(bad)
    } catch (e) {
      caught = e
    }
    expect(isPermanentChannelError(caught)).toBe(true)
    expect((caught as Error).message).toMatch(/上报数据 JSON 无效/)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  test('IM9 切片阈值 1962B 时，事件经 encodeURIComponent 后 URL 不超 6KB（含中文）', () => {
    // 模拟 collector 切片后形成的 ~1900B 原文 requests，验证拼出的 URL ≤ 6144
    const events: Array<Record<string, unknown>> = []
    let json = ''
    while (json.length < 1900) {
      events.push({
        lt: '11',
        t: 1700000000,
        sk: 's1',
        url: '/pages/中文页面/index',
        evt: 'click_中文按钮',
      })
      json = JSON.stringify(events)
    }
    const payload: ReportPayload = {
      usv: '3',
      t: 1700000000,
      requests: json,
      _id: 'p1',
    }
    const url = buildImageReportUrl(payload, {
      host: HOST,
      projectId: PID,
      topicId: TID,
      nowMs: () => 1700000000000,
    })
    expect(url.length).toBeLessThanOrEqual(6 * 1024)
  })

  test('IM7 host 末尾斜杠会被裁剪', () => {
    const url = buildImageReportUrl(PAYLOAD, {
      host: HOST + '///',
      projectId: PID,
      topicId: TID,
      nowMs: () => 1,
    })
    // 不应出现连续 //WebTrack.gif（除了协议头里的 ://）
    expect(url.startsWith(HOST + '/WebTrack.gif?')).toBe(true)
  })
})
