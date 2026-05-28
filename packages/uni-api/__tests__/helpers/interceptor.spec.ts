import {
  globalInterceptors,
  invokeApi,
  scopedInterceptors,
} from '../../src/helpers/interceptor'

function resetInterceptors() {
  Object.keys(globalInterceptors).forEach((key) => {
    delete globalInterceptors[key as keyof typeof globalInterceptors]
  })
  Object.keys(scopedInterceptors).forEach((key) => {
    delete scopedInterceptors[key]
  })
}

describe('interceptor', () => {
  afterEach(() => {
    resetInterceptors()
  })

  test('blocks api invocation when invoke returns false synchronously', () => {
    const api = jest.fn()
    globalInterceptors.invoke = [
      () => {
        return false
      },
    ]

    const res = invokeApi('test', api, {}, [])

    expect(res).toBeUndefined()
    expect(api).not.toHaveBeenCalled()
  })

  test('blocks api invocation when invoke resolves false asynchronously', async () => {
    const api = jest.fn()
    globalInterceptors.invoke = [
      () => {
        return Promise.resolve(false)
      },
    ]

    invokeApi('test', api, {}, [])
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(api).not.toHaveBeenCalled()
  })

  test('passes resolved options to api invocation', async () => {
    const api = jest.fn((options) => options)
    const options = { url: '/old' }
    const resolvedOptions = { url: '/new' }
    globalInterceptors.invoke = [
      () => {
        return Promise.resolve(resolvedOptions)
      },
    ]

    const res = await invokeApi('test', api, options, [])

    expect(res).toBe(resolvedOptions)
    expect(api).toHaveBeenCalledTimes(1)
    expect(api).toHaveBeenCalledWith(resolvedOptions)
  })
})
