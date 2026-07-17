jest.mock('@dcloudio/uni-mp-core', () => ({
  initGetProvider: () => ({}),
}))
jest.mock('../src/runtime/parseOptions', () => ({
  mocks: [],
}))

describe('api shims', () => {
  const originalGlobal = global.__GLOBAL__

  afterEach(() => {
    global.__GLOBAL__ = originalGlobal
    jest.resetModules()
  })

  test('preserves intersection observer component scope', () => {
    const observer = {}
    const createIntersectionObserver = jest.fn(() => observer)
    global.__GLOBAL__ = {
      createIntersectionObserver,
      getAppBaseInfo: () => ({ host: { env: '' } }),
      getWindowInfo: () => ({}),
      getDeviceInfo: () => ({}),
      getSystemInfoSync: () => ({}),
    }
    const scope = {}
    const options = { observeAll: true }

    jest.isolateModules(() => {
      const shims = require('../src/api/shims')
      expect(shims.createIntersectionObserver({ $scope: scope }, options)).toBe(
        observer
      )
    })

    expect(createIntersectionObserver).toHaveBeenCalledWith(scope, options)
  })
})
