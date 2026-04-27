import { createHttpChannel } from '../../../../src/public/pipeline/channel/http'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../../helpers/mockUni'

import type { ReportPayload } from '../../../../src/public/pipeline/types'

const PAYLOAD: ReportPayload = {
  usv: '3',
  t: 1700000000,
  requests: '[{"lt":"1","t":1}]',
  _id: 'b1',
}

const noSleep = () => Promise.resolve()

describe('pipeline/channel/http', () => {
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

  describe('available()', () => {
    test('uni.request 存在 → true', () => {
      const ch = createHttpChannel()
      expect(ch.available()).toBe(true)
    })

    test('uni.request 缺失 → false', () => {
      ;(handle.uni as { request?: unknown }).request = undefined
      const ch = createHttpChannel()
      expect(ch.available()).toBe(false)
    })
  })

  describe('send 成功路径', () => {
    test('uni.request 200 → resolve', async () => {
      const reqSpy = jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { success?: (r: unknown) => void }) => {
          opts.success?.({ statusCode: 200, data: 'ok' })
        })
      const ch = createHttpChannel({ sleep: noSleep })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
      expect(reqSpy).toHaveBeenCalledTimes(1)
      const args = reqSpy.mock.calls[0][0] as {
        url: string
        method: string
        data: unknown
      }
      expect(args.method).toBe('POST')
      expect(args.url).toContain('tongji.dcloud.io')
      expect(args.data).toEqual(PAYLOAD)
    })

    test('opts.url 注入生效', async () => {
      const reqSpy = jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { success?: (r: unknown) => void }) => {
          opts.success?.({ statusCode: 204 })
        })
      const ch = createHttpChannel({
        url: 'http://test.local/x',
        sleep: noSleep,
      })
      await ch.send(PAYLOAD)
      expect((reqSpy.mock.calls[0][0] as { url: string }).url).toBe(
        'http://test.local/x'
      )
    })
  })

  describe('send 失败 + 重试（修复缺陷 #1）', () => {
    test('前 2 次 fail，第 3 次成功 → resolve，调用 3 次', async () => {
      let n = 0
      jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation(
          (opts: {
            success?: (r: unknown) => void
            fail?: (e: unknown) => void
          }) => {
            n++
            if (n < 3) opts.fail?.(new Error('boom ' + n))
            else opts.success?.({ statusCode: 200 })
          }
        )
      const ch = createHttpChannel({ sleep: noSleep })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
      expect(n).toBe(3)
    })

    test('3 次全 fail → reject', async () => {
      jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { fail?: (e: unknown) => void }) => {
          opts.fail?.(new Error('always fail'))
        })
      const ch = createHttpChannel({ sleep: noSleep })
      await expect(ch.send(PAYLOAD)).rejects.toBeInstanceOf(Error)
    })

    test('statusCode 5xx 视为失败并重试', async () => {
      let n = 0
      jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { success?: (r: unknown) => void }) => {
          n++
          opts.success?.({ statusCode: n < 2 ? 502 : 200 })
        })
      const ch = createHttpChannel({ sleep: noSleep })
      await ch.send(PAYLOAD)
      expect(n).toBe(2)
    })

    test('maxRetries=1 → 仅尝试 1 次', async () => {
      const reqSpy = jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { fail?: (e: unknown) => void }) => {
          opts.fail?.(new Error('x'))
        })
      const ch = createHttpChannel({ sleep: noSleep, maxRetries: 1 })
      await expect(ch.send(PAYLOAD)).rejects.toBeInstanceOf(Error)
      expect(reqSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('send 超时', () => {
    test('uni.request 不回调 → 超时 reject', async () => {
      jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation(() => {
          // never callback
        })
      const ch = createHttpChannel({
        sleep: noSleep,
        timeoutMs: 5,
        maxRetries: 1,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow(/timeout/i)
    })
  })

  describe('uni 缺失', () => {
    test('uni 不存在 → reject', async () => {
      restoreMockUni()
      delete (globalThis as { uni?: unknown }).uni
      const ch = createHttpChannel({ sleep: noSleep, maxRetries: 1 })
      await expect(ch.send(PAYLOAD)).rejects.toThrow(/unavailable/)
    })
  })

  describe('H5 image fallback（修复缺陷 #16）', () => {
    test('ut=h5 + Image 存在 → 走 image，不调 uni.request', async () => {
      const ImageMock = jest.fn().mockImplementation(() => {
        return { src: '' }
      })
      ;(globalThis as { Image?: unknown }).Image = ImageMock as unknown
      const reqSpy = jest.spyOn(handle.uni as { request: jest.Mock }, 'request')
      const ch = createHttpChannel({ ut: 'h5', sleep: noSleep })
      await ch.send(PAYLOAD)
      expect(ImageMock).toHaveBeenCalledTimes(1)
      expect(reqSpy).not.toHaveBeenCalled()
    })

    test('ut=h5 + Image 不存在 → 退回 uni.request（不抛 ReferenceError）', async () => {
      delete (globalThis as { Image?: unknown }).Image
      const reqSpy = jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { success?: (r: unknown) => void }) => {
          opts.success?.({ statusCode: 200 })
        })
      const ch = createHttpChannel({ ut: 'h5', sleep: noSleep })
      await ch.send(PAYLOAD)
      expect(reqSpy).toHaveBeenCalledTimes(1)
    })

    test('preferImageOnH5=false 强制关闭 image 通道', async () => {
      const ImageMock = jest.fn().mockImplementation(() => ({ src: '' }))
      ;(globalThis as { Image?: unknown }).Image = ImageMock as unknown
      const reqSpy = jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { success?: (r: unknown) => void }) => {
          opts.success?.({ statusCode: 200 })
        })
      const ch = createHttpChannel({
        ut: 'h5',
        preferImageOnH5: false,
        sleep: noSleep,
      })
      await ch.send(PAYLOAD)
      expect(ImageMock).not.toHaveBeenCalled()
      expect(reqSpy).toHaveBeenCalledTimes(1)
    })

    test('image 构造抛错 → 退回 uni.request', async () => {
      ;(globalThis as { Image?: unknown }).Image = function () {
        throw new Error('Image not allowed')
      } as unknown
      const reqSpy = jest
        .spyOn(handle.uni as { request: jest.Mock }, 'request')
        .mockImplementation((opts: { success?: (r: unknown) => void }) => {
          opts.success?.({ statusCode: 200 })
        })
      const ch = createHttpChannel({ ut: 'h5', sleep: noSleep })
      await ch.send(PAYLOAD)
      expect(reqSpy).toHaveBeenCalledTimes(1)
    })
  })
})
