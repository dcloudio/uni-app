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
    ;(globalThis as any).nativeChannel = originalNativeChannel
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
      name: 'User',
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
})
