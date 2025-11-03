import { normalizeErrMsg } from '../../src/helpers/api/callback'
import { defineAsyncApi } from '../../src/helpers/api'

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
})
