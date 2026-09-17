import { initWrapper } from '../../src/api/wrapper'

jest.mock('../../src/api/promise', () => ({
  isContextApi: () => false,
  isSyncApi: () => false,
  isTaskApi: () => false,
}))

jest.mock('../../src/api/protocols/x', () => ({
  shouldKeepReturnValue: () => false,
}))

describe('api wrapper', () => {
  const originalX = global.__X__
  const originalGlobal = (global as any).__GLOBAL__

  afterEach(() => {
    global.__X__ = originalX
    ;(global as any).__GLOBAL__ = originalGlobal
  })

  test.each([false, true])('on/off 在 X=%s 时使用同一个包装回调', (isX) => {
    global.__X__ = isX
    const platform = {
      onTestEvent: jest.fn(),
      offTestEvent: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = platform
    const wrapper = initWrapper({
      returnValue(_methodName, result) {
        return Object.assign({}, result, { normalized: true })
      },
    })
    const onTestEvent = wrapper('onTestEvent', platform.onTestEvent) as Function
    const offTestEvent = wrapper(
      'offTestEvent',
      platform.offTestEvent
    ) as Function
    const callback = jest.fn()

    onTestEvent(callback)
    offTestEvent(callback)

    const onCallback = platform.onTestEvent.mock.calls[0][0]
    const offCallback = platform.offTestEvent.mock.calls[0][0]
    expect(onCallback).not.toBe(callback)
    expect(offCallback).toBe(onCallback)

    onCallback({ value: 1 })
    expect(callback).toHaveBeenCalledWith({ value: 1, normalized: true })
  })

  test('非 X 端只有 on 配置 protocol 时 off 仍使用同一个包装回调', () => {
    global.__X__ = false
    const platform = {
      onTestEvent: jest.fn(),
      offTestEvent: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = platform
    const wrapper = initWrapper({
      onTestEvent: {},
    })
    const callback = jest.fn()

    ;(wrapper('onTestEvent', platform.onTestEvent) as Function)(callback)
    ;(wrapper('offTestEvent', platform.offTestEvent) as Function)(callback)

    const onCallback = platform.onTestEvent.mock.calls[0][0]
    expect(onCallback).not.toBe(callback)
    expect(platform.offTestEvent).toHaveBeenCalledWith(onCallback)
  })

  test('无需包装的事件 API 保持平台原函数', () => {
    global.__X__ = false
    const platform = {
      onTestEvent: jest.fn(),
      offTestEvent: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = platform
    const wrapper = initWrapper({})

    expect(wrapper('onTestEvent', platform.onTestEvent)).toBe(
      platform.onTestEvent
    )
    expect(wrapper('offTestEvent', platform.offTestEvent)).toBe(
      platform.offTestEvent
    )
  })

  test('不同事件分别保存包装回调', () => {
    global.__X__ = false
    const platform = {
      onFirstEvent: jest.fn(),
      offFirstEvent: jest.fn(),
      onSecondEvent: jest.fn(),
      offSecondEvent: jest.fn(),
    }
    ;(global as any).__GLOBAL__ = platform
    const wrapper = initWrapper({
      returnValue: (_methodName, result) => result,
    })
    const callback = jest.fn()

    ;(wrapper('onFirstEvent', platform.onFirstEvent) as Function)(callback)
    ;(wrapper('onSecondEvent', platform.onSecondEvent) as Function)(callback)
    ;(wrapper('offFirstEvent', platform.offFirstEvent) as Function)(callback)
    ;(wrapper('offSecondEvent', platform.offSecondEvent) as Function)(callback)

    const firstCallback = platform.onFirstEvent.mock.calls[0][0]
    const secondCallback = platform.onSecondEvent.mock.calls[0][0]
    expect(firstCallback).not.toBe(secondCallback)
    expect(platform.offFirstEvent).toHaveBeenCalledWith(firstCallback)
    expect(platform.offSecondEvent).toHaveBeenCalledWith(secondCallback)
  })

  test('未注册和无参 off 保持平台原始语义', () => {
    global.__X__ = false
    const platform = { offTestEvent: jest.fn() }
    ;(global as any).__GLOBAL__ = platform
    const wrapper = initWrapper({
      returnValue: (_methodName, result) => result,
    })
    const offTestEvent = wrapper(
      'offTestEvent',
      platform.offTestEvent
    ) as Function
    const callback = jest.fn()

    offTestEvent(callback)
    offTestEvent()

    expect(platform.offTestEvent.mock.calls[0][0]).toBe(callback)
    expect(platform.offTestEvent.mock.calls[1][0]).toBeUndefined()
  })
})
