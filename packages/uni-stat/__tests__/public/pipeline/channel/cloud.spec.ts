import { createCloudChannel } from '../../../../src/public/pipeline/channel/cloud'
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
  _id: 'c1',
}

const noSleep = () => Promise.resolve()

interface SpaceMock {
  importObject: jest.Mock
}
interface ReceiverMock {
  report: jest.Mock
}

function makeSpace(receiver: ReceiverMock): SpaceMock {
  return {
    importObject: jest.fn(() => receiver),
  }
}

describe('pipeline/channel/cloud', () => {
  let handle: MockUniHandle

  beforeEach(() => {
    handle = installMockUni({ platform: 'mp-weixin' })
  })

  afterEach(() => {
    restoreMockUni()
  })

  describe('available()', () => {
    test('注入 space → true', () => {
      const space = makeSpace({ report: jest.fn() })
      const ch = createCloudChannel({ uniCloudSpace: space })
      expect(ch.available()).toBe(true)
    })

    test('global uni.__stat_uniCloud_space 存在 → true', () => {
      const space = makeSpace({ report: jest.fn() })
      ;(
        handle.uni as { __stat_uniCloud_space?: unknown }
      ).__stat_uniCloud_space = space
      const ch = createCloudChannel()
      expect(ch.available()).toBe(true)
    })

    test('space 缺失 → false', () => {
      const ch = createCloudChannel()
      expect(ch.available()).toBe(false)
    })

    test('space.importObject 不是函数 → false', () => {
      const ch = createCloudChannel({
        uniCloudSpace: {
          importObject: undefined as unknown as SpaceMock['importObject'],
        } as SpaceMock,
      })
      expect(ch.available()).toBe(false)
    })
  })

  describe('send 成功路径', () => {
    test('receiver.report 成功 → resolve', async () => {
      const receiver = { report: jest.fn(() => Promise.resolve({ ok: true })) }
      const space = makeSpace(receiver)
      const ch = createCloudChannel({ uniCloudSpace: space, sleep: noSleep })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
      expect(space.importObject).toHaveBeenCalledWith('uni-stat-receiver', {
        customUI: true,
      })
      expect(receiver.report).toHaveBeenCalledTimes(1)
      expect(receiver.report).toHaveBeenCalledWith(PAYLOAD)
    })

    test('receiver.report 返回非 Promise → 也能 resolve', async () => {
      const receiver = {
        report: jest.fn(() => undefined as unknown as Promise<unknown>),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
    })

    test('自定义 receiverName 透传', async () => {
      const receiver = { report: jest.fn(() => Promise.resolve()) }
      const space = makeSpace(receiver)
      const ch = createCloudChannel({
        uniCloudSpace: space,
        receiverName: 'custom-receiver',
        sleep: noSleep,
      })
      await ch.send(PAYLOAD)
      expect(space.importObject).toHaveBeenCalledWith('custom-receiver', {
        customUI: true,
      })
    })
  })

  describe('send 失败 + 重试（修复私有版无重试）', () => {
    test('前 1 次 reject，第 2 次成功 → resolve，调用 2 次', async () => {
      let called = 0
      const receiver = {
        report: jest.fn(() => {
          called++
          if (called < 2) return Promise.reject(new Error('cloud err'))
          return Promise.resolve()
        }),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
      expect(receiver.report).toHaveBeenCalledTimes(2)
    })

    test('全部 reject → reject', async () => {
      const receiver = {
        report: jest.fn(() => Promise.reject(new Error('always'))),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow('always')
      expect(receiver.report).toHaveBeenCalledTimes(2)
    })

    test('maxRetries=1 → 仅尝试 1 次', async () => {
      const receiver = { report: jest.fn(() => Promise.reject(new Error('x'))) }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 1,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow('x')
      expect(receiver.report).toHaveBeenCalledTimes(1)
    })
  })

  describe('业务结果校验（P2-6）', () => {
    test('resolve { errCode: 非0 } → 视为失败并重试后 reject', async () => {
      const receiver = {
        report: jest.fn(() =>
          Promise.resolve({ errCode: 500, errMsg: 'boom' })
        ),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow('errCode=500')
      expect(receiver.report).toHaveBeenCalledTimes(2)
    })

    test('resolve { success: false } → 视为失败', async () => {
      const receiver = {
        report: jest.fn(() => Promise.resolve({ success: false })),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 1,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow('success=false')
    })

    test('resolve { errCode: 0 } → 视为成功', async () => {
      const receiver = {
        report: jest.fn(() => Promise.resolve({ errCode: 0 })),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
      expect(receiver.report).toHaveBeenCalledTimes(1)
    })

    test('resolve 未知形态（无 errCode/success）→ 默认成功', async () => {
      const receiver = {
        report: jest.fn(() => Promise.resolve({ data: 'whatever' })),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
    })

    test('resolve { code: 200 } → 视为成功（不把 HTTP 风格 code 当失败）', async () => {
      const receiver = {
        report: jest.fn(() => Promise.resolve({ code: 200, msg: 'ok' })),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
      expect(receiver.report).toHaveBeenCalledTimes(1)
    })

    test('resolve { errCode: "E500" }（字符串错误码）→ 不误判，默认成功', async () => {
      const receiver = {
        report: jest.fn(() => Promise.resolve({ errCode: 'E500' })),
      }
      const ch = createCloudChannel({
        uniCloudSpace: makeSpace(receiver),
        maxRetries: 2,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).resolves.toBeUndefined()
    })
  })

  describe('space 边界', () => {
    test('space 缺失 → reject', async () => {
      const ch = createCloudChannel({ maxRetries: 1, sleep: noSleep })
      await expect(ch.send(PAYLOAD)).rejects.toThrow(
        'uniCloud space unavailable'
      )
    })

    test('importObject 抛错 → 视为不可用并 reject', async () => {
      const space: SpaceMock = {
        importObject: jest.fn(() => {
          throw new Error('boom')
        }),
      }
      const ch = createCloudChannel({
        uniCloudSpace: space,
        maxRetries: 1,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow(
        'uniCloud space unavailable'
      )
    })

    test('receiver.report 不是函数 → reject', async () => {
      const space: SpaceMock = {
        importObject: jest.fn(() => ({
          report: undefined as unknown as ReceiverMock['report'],
        })),
      }
      const ch = createCloudChannel({
        uniCloudSpace: space,
        maxRetries: 1,
        sleep: noSleep,
      })
      await expect(ch.send(PAYLOAD)).rejects.toThrow(
        'uniCloud space unavailable'
      )
    })
  })
})
