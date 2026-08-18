import { normalizeErrMsg } from '../../src/helpers/api/callback'
import {
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
} from '../../src/helpers/api'

describe('api', () => {
  test('normalizeErrMsg', () => {
    expect(normalizeErrMsg('', 'navigateTo')).toEqual('navigateTo:ok')
    expect(normalizeErrMsg('navigateTo:ok', 'navigateTo')).toEqual(
      'navigateTo:ok'
    )
    expect(normalizeErrMsg('navigateTo:fail', 'navigateTo')).toEqual(
      'navigateTo:fail'
    )
    expect(
      normalizeErrMsg('redirectTo:fail page not found', 'navigateTo')
    ).toEqual('navigateTo:fail page not found')
  })

  // see navigationBar.ts
  test('defineAsyncApi no protocol,no options', () => {
    const fn = jest.fn((opt, { resolve, reject }) => {
      resolve({})
    })
    const successFn = jest.fn()
    const failFn = jest.fn()
    const completeFn = jest.fn()
    const res = defineAsyncApi('test', fn)
    res({
      success: successFn,
      fail: failFn,
      complete: completeFn,
    })
    expect(res).toBeDefined()
    expect(res).toBeInstanceOf(Function)
    expect(successFn).toHaveBeenCalledTimes(1)
    expect(failFn).toHaveBeenCalledTimes(0)
    expect(completeFn).toHaveBeenCalledTimes(1)
  })

  test('defineSyncApi formatArgs should not crash when args is empty', () => {
    const fn = jest.fn()
    const createDramaAd = defineSyncApi('createDramaAd', fn as any, undefined, {
      formatArgs: {
        adpid(value, params) {
          if (!value) {
            return 'adpid should not be empty.'
          }
          params.adpid = value
        },
      },
    } as any)
    expect(() => (createDramaAd as any)()).toThrow('adpid should not be empty.')
    expect(fn).toHaveBeenCalledTimes(0)
  })

  test('defineOffApi only clears all listeners when explicitly enabled', () => {
    const bridge = UniServiceJSBridge as any
    const oldOn = bridge.on
    const oldOff = bridge.off
    const listeners: Record<string, Function> = {}
    bridge.on = jest.fn((name: string, callback: Function) => {
      listeners[name] = callback
    })
    bridge.off = jest.fn((name: string) => {
      delete listeners[name]
    })

    const onMethod = jest.fn()
    const offMethod = jest.fn()
    const onTestEvent = defineOnApi<(callback: Function) => void>(
      'onTestEvent',
      onMethod
    )
    const offTestEvent = defineOffApi<(callback: Function) => void>(
      'offTestEvent',
      offMethod
    )
    const listener1 = jest.fn()
    const listener2 = jest.fn()

    onTestEvent(listener1)
    onTestEvent(listener2)
    listeners['api.onTestEvent']('first')
    expect(onMethod).toHaveBeenCalledTimes(1)
    expect(listener1).toHaveBeenCalledWith('first')
    expect(listener2).toHaveBeenCalledWith('first')

    offTestEvent(listener1)
    listeners['api.onTestEvent']('second')
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledWith('second')
    expect(offMethod).not.toHaveBeenCalled()

    expect(() => (offTestEvent as any)()).toThrow(
      'Invalid args: type check failed for args "callback". Expected Function'
    )
    listeners['api.onTestEvent']('third')
    expect(listener2).toHaveBeenCalledWith('third')

    offTestEvent(listener2)
    expect(bridge.off).toHaveBeenCalledWith('api.onTestEvent')
    expect(offMethod).toHaveBeenCalledTimes(1)

    const onClearableEvent = defineOnApi<(callback: Function) => void>(
      'onClearableEvent',
      jest.fn()
    )
    const clearMethod = jest.fn()
    const offClearableEvent = defineOffApi<
      (callback?: Function | null) => void
    >('offClearableEvent', clearMethod, { allowClearAll: true })
    onClearableEvent(listener1)
    onClearableEvent(listener2)
    offClearableEvent(null)
    expect(bridge.off).toHaveBeenCalledWith('api.onClearableEvent')
    expect(clearMethod).toHaveBeenCalledTimes(1)

    bridge.on = oldOn
    bridge.off = oldOff
  })
})
