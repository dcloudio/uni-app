import {
  initUTSProxyClass,
  initUTSProxyFunction,
  registerUTSInterface,
  registerUTSPlugin,
  requireUTSPlugin,
} from '../src/service/api/plugin/utsVaporAndroid'

const invokeSync = jest.fn()
const invokeAsync = jest.fn()

describe('utsVaporAndroid', () => {
  const originalNativeChannel = (globalThis as any).nativeChannel

  beforeAll(() => {
    ;(globalThis as any).nativeChannel = {
      invokeSync,
      invokeAsync,
    }
  })

  beforeEach(() => {
    invokeSync.mockReset()
    invokeAsync.mockReset()
  })

  afterAll(() => {
    if (originalNativeChannel !== undefined) {
      ;(globalThis as any).nativeChannel = originalNativeChannel
    }
  })

  test('registers and requires a UTS plugin', () => {
    const plugin = { name: 'test-plugin' }

    registerUTSPlugin('test-plugin', plugin)

    expect(requireUTSPlugin('test-plugin')).toBe(plugin)
    expect(requireUTSPlugin('unknown-plugin', true)).toBeUndefined()
  })

  test('invokes a synchronous proxy function', () => {
    invokeSync.mockReturnValue({
      type: 'return',
      params: 'success',
    })
    const request = initUTSProxyFunction('TestBridge', {
      name: 'request',
      utsBridgeName: 'TestBridge',
      methodId: 10,
      type: 'function',
      keepAlive: false,
      async: false,
    })

    expect(request('url', 1)).toBe('success')
    expect(invokeSync).toHaveBeenCalledWith('APP-SERVICE', {
      moduleName: 'TestBridge',
      methodId: 10,
      keepAlive: false,
      instance: undefined,
      instanceId: undefined,
      params: ['url', 1],
    })
  })

  test('serializes UniElement and component public instance parameters', () => {
    invokeSync.mockReturnValue({
      type: 'return',
      params: null,
    })
    const invoke = initUTSProxyFunction('TestBridge', {
      name: 'invoke',
      utsBridgeName: 'TestBridge',
      methodId: 11,
      type: 'function',
      keepAlive: false,
      async: false,
    })
    const element = {
      pageId: 'page-1',
      getNodeId: () => 101,
    }
    const component: any = { $el: element }
    component.$ = { proxy: component }
    const componentWithoutElement: any = {}
    componentWithoutElement.$ = { proxy: componentWithoutElement }
    const nested = {
      element,
      components: [component, componentWithoutElement],
    }

    invoke(element, nested)

    expect(invokeSync).toHaveBeenCalledWith(
      'APP-SERVICE',
      expect.objectContaining({
        params: [
          { __type__: 'UniElement', pageId: 'page-1', nodeId: 101 },
          {
            element: {
              __type__: 'UniElement',
              pageId: 'page-1',
              nodeId: 101,
            },
            components: [
              {
                __type__: 'ComponentPublicInstance',
                pageId: 'page-1',
                nodeId: 101,
              },
              {
                __type__: 'ComponentPublicInstance',
                pageId: '',
                nodeId: '',
              },
            ],
          },
        ],
      })
    )
    expect(nested.element).toBe(element)
    expect(nested.components[0]).toBe(component)
  })

  test('creates a proxy class and invokes an instance method', () => {
    invokeSync.mockImplementation((_channel, args) => ({
      type: 'return',
      params: args.methodId === 20 ? 100 : 'hello',
    }))
    const User = initUTSProxyClass({
      class: 'User',
      utsBridgeName: 'TestBridge',
      constructor: {
        name: 'User',
        methodId: 20,
        type: 'constructor',
        keepAlive: false,
        async: false,
      },
      staticMethods: [],
      methods: [
        {
          name: 'getName',
          methodId: 21,
          type: 'method',
          keepAlive: false,
          async: false,
        },
      ],
    })

    const user = new User('test') as any

    expect(user.__v_skip).toBe(true)
    expect(user).toBeInstanceOf(User)
    expect(user.getName()).toBe('hello')
    expect(invokeSync).toHaveBeenNthCalledWith(
      1,
      'APP-SERVICE',
      expect.objectContaining({
        moduleName: 'TestBridge',
        methodId: 20,
        params: ['test'],
      })
    )
    expect(invokeSync).toHaveBeenNthCalledWith(
      2,
      'APP-SERVICE',
      expect.objectContaining({
        moduleName: 'TestBridge',
        methodId: 21,
        instanceId: 100,
        params: [],
      })
    )
  })

  test('creates an interface proxy for a registered return type', () => {
    registerUTSInterface({
      name: 'RequestTask',
      utsBridgeName: 'TestBridge',
      methods: [
        {
          name: 'abort',
          methodId: 31,
          type: 'method',
          keepAlive: false,
          async: false,
        },
      ],
    })
    invokeSync.mockImplementation((_channel, args) => ({
      type: 'return',
      params: args.methodId === 30 ? 200 : 'aborted',
    }))
    const request = initUTSProxyFunction('TestBridge', {
      name: 'request',
      utsBridgeName: 'TestBridge',
      methodId: 30,
      type: 'function',
      keepAlive: false,
      async: false,
      returnType: 'RequestTask',
    })

    const task = request() as any

    expect(task.__v_skip).toBe(true)
    expect(task.abort()).toBe('aborted')
    expect(invokeSync).toHaveBeenLastCalledWith(
      'APP-SERVICE',
      expect.objectContaining({
        moduleName: 'TestBridge',
        methodId: 31,
        instanceId: 200,
        params: [],
      })
    )
  })

  test('creates an interface proxy for an async return type', async () => {
    registerUTSInterface({
      name: 'AsyncTask',
      utsBridgeName: 'TestBridge',
      methods: [
        {
          name: 'cancel',
          methodId: 41,
          type: 'method',
          keepAlive: false,
          async: false,
        },
      ],
    })
    invokeAsync.mockImplementation((_channel, _args, callback) => {
      callback({ type: 'return', params: 300 })
    })
    invokeSync.mockReturnValue({ type: 'return', params: 'cancelled' })
    const request = initUTSProxyFunction('TestBridge', {
      name: 'requestAsync',
      utsBridgeName: 'TestBridge',
      methodId: 40,
      type: 'function',
      keepAlive: false,
      async: true,
      returnType: 'AsyncTask',
    })

    const task = (await request()) as any

    expect(task.__v_skip).toBe(true)
    expect(task.cancel()).toBe('cancelled')
    expect(invokeSync).toHaveBeenLastCalledWith(
      'APP-SERVICE',
      expect.objectContaining({
        moduleName: 'TestBridge',
        methodId: 41,
        instanceId: 300,
        params: [],
      })
    )
  })

  test('creates class proxies for sync and async return types', async () => {
    const Profile = initUTSProxyClass({
      class: 'Profile',
      utsBridgeName: 'TestBridge',
      constructor: {
        name: 'Profile',
        methodId: 90,
        type: 'constructor',
        keepAlive: false,
        async: false,
      },
      staticMethods: [],
      methods: [
        {
          name: 'getName',
          methodId: 91,
          type: 'method',
          keepAlive: false,
          async: false,
        },
        {
          name: 'name',
          methodId: 92,
          type: 'getter',
          keepAlive: false,
          async: false,
        },
        {
          name: 'name',
          methodId: 93,
          type: 'setter',
          keepAlive: false,
          async: false,
        },
      ],
    })
    const getProfile = initUTSProxyFunction('TestBridge', {
      name: 'getProfile',
      utsBridgeName: 'TestBridge',
      methodId: 94,
      type: 'function',
      keepAlive: false,
      async: false,
      returnType: 'Profile',
    })
    const getProfileAsync = initUTSProxyFunction('TestBridge', {
      name: 'getProfileAsync',
      utsBridgeName: 'TestBridge',
      methodId: 95,
      type: 'function',
      keepAlive: false,
      async: true,
      returnType: 'Profile',
    })
    invokeSync.mockImplementation((_channel, args) => ({
      type: 'return',
      params:
        args.methodId === 94
          ? 501
          : args.methodId === 91
          ? 'method name'
          : args.methodId === 92
          ? 'property name'
          : null,
    }))
    invokeAsync.mockImplementation((_channel, _args, callback) => {
      callback({ type: 'return', params: 502 })
    })

    const profile = getProfile() as any
    const asyncProfile = (await getProfileAsync()) as any

    expect(profile).toBeInstanceOf(Profile)
    expect(asyncProfile).toBeInstanceOf(Profile)
    expect(profile.__v_skip).toBe(true)
    expect(profile.getName()).toBe('method name')
    expect(profile.name).toBe('property name')
    profile.name = 'updated name'
    expect(asyncProfile.getName()).toBe('method name')
    expect(invokeSync).toHaveBeenCalledWith(
      'APP-SERVICE',
      expect.objectContaining({
        methodId: 93,
        instanceId: 501,
        params: ['updated name'],
      })
    )
    expect(invokeSync).toHaveBeenLastCalledWith(
      'APP-SERVICE',
      expect.objectContaining({
        methodId: 91,
        instanceId: 502,
        params: [],
      })
    )
  })

  test('returns the current class proxy from sync and async methods', async () => {
    invokeSync.mockReturnValue({ type: 'return', params: 400 })
    invokeAsync.mockImplementation((_channel, _args, callback) => {
      callback({ type: 'return', params: 400 })
    })
    const SelfReturningClass = initUTSProxyClass({
      class: 'SelfReturningClass',
      utsBridgeName: 'TestBridge',
      constructor: {
        name: 'SelfReturningClass',
        methodId: 50,
        type: 'constructor',
        keepAlive: false,
        async: false,
      },
      staticMethods: [],
      methods: [
        {
          name: 'syncSelf',
          methodId: 51,
          type: 'method',
          keepAlive: false,
          async: false,
          returnType: 'SelfReturningClass',
        },
        {
          name: 'asyncSelf',
          methodId: 52,
          type: 'method',
          keepAlive: false,
          async: true,
          returnType: 'SelfReturningClass',
        },
      ],
    })

    const instance = new SelfReturningClass() as any

    expect(instance.syncSelf()).toBe(instance)
    await expect(instance.asyncSelf()).resolves.toBe(instance)
    expect(invokeAsync).toHaveBeenCalledWith(
      'APP-SERVICE',
      expect.objectContaining({
        moduleName: 'TestBridge',
        methodId: 52,
        instanceId: 400,
        params: [],
      }),
      expect.any(Function)
    )
  })

  test('converts a zero interface instance id to null', async () => {
    invokeSync.mockReturnValue({ type: 'return', params: 0 })
    invokeAsync.mockImplementation((_channel, _args, callback) => {
      callback({ type: 'return', params: 0 })
    })
    const syncRequest = initUTSProxyFunction('TestBridge', {
      name: 'syncRequest',
      utsBridgeName: 'TestBridge',
      methodId: 60,
      type: 'function',
      keepAlive: false,
      async: false,
      returnType: 'MissingTask',
    })
    const asyncRequest = initUTSProxyFunction('TestBridge', {
      name: 'asyncRequest',
      utsBridgeName: 'TestBridge',
      methodId: 61,
      type: 'function',
      keepAlive: false,
      async: true,
      returnType: 'MissingTask',
    })

    expect(syncRequest()).toBeNull()
    await expect(asyncRequest()).resolves.toBeNull()
  })

  test('preserves async values that cannot be converted to a proxy', async () => {
    const values = [500, 'success']
    invokeAsync.mockImplementation((_channel, _args, callback) => {
      callback({ type: 'return', params: values.shift() })
    })
    const request = initUTSProxyFunction('TestBridge', {
      name: 'requestUnknownTask',
      utsBridgeName: 'TestBridge',
      methodId: 70,
      type: 'function',
      keepAlive: false,
      async: true,
      returnType: 'UnknownTask',
    })

    await expect(request()).resolves.toBe(500)
    await expect(request()).resolves.toBe('success')
  })

  test('rejects an async invocation error', async () => {
    invokeAsync.mockImplementation((_channel, _args, callback) => {
      callback({ type: 'return', errMsg: 'request failed' })
    })
    const request = initUTSProxyFunction('TestBridge', {
      name: 'failedRequest',
      utsBridgeName: 'TestBridge',
      methodId: 80,
      type: 'function',
      keepAlive: false,
      async: true,
    })

    await expect(request()).rejects.toBe('request failed')
  })
})
