import {
  initUTSProxyClass,
  initUTSProxyFunction,
  normalizeArg,
} from '../src/service/api/plugin/uts'

describe('uts-module', () => {
  test('normalize args', () => {
    expect(normalizeArg(1, {}, false, { depth: 0, nested: false })).toBe(1)
    expect(normalizeArg('hello', {}, false, { depth: 0, nested: false })).toBe(
      'hello'
    )
    expect(normalizeArg(true, {}, false, { depth: 0, nested: false })).toBe(
      true
    )
    expect(
      normalizeArg({ callback: () => {} }, {}, false, {
        depth: 0,
        nested: false,
      })
    ).toEqual({
      callback: 1,
    })
    expect(
      normalizeArg(
        { success: () => {}, fail: () => {}, complete: () => {} },
        {},
        false,
        { depth: 0, nested: false }
      )
    ).toEqual({
      success: 2,
      fail: 3,
      complete: 4,
    })
    expect(
      normalizeArg(
        {
          user: {
            name: 'test',
            age: 10,
            callback() {},
          },
          success() {},
        },
        {},
        false,
        { depth: 0, nested: false }
      )
    ).toEqual({
      user: {
        name: 'test',
        age: 10,
        callback: 5,
      },
      success: 6,
    })

    const obj = {
      pageId: 1,
      getNodeId() {
        return 2
      },
    }
    const context1 = { depth: 0, nested: false }
    expect(normalizeArg(obj, {}, false, context1)).toEqual({
      pageId: 1,
      nodeId: 2,
      __type__: 'UniElement',
    })
    expect(context1.depth).toBe(0)
    expect(context1.nested).toBe(false)

    const context2 = { depth: 0, nested: false }
    const obj2 = {
      element: {
        pageId: 3,
        getNodeId() {
          return 4
        },
      },
    }
    expect(normalizeArg(obj2, {}, false, context2)).toEqual({
      element: {
        pageId: 3,
        nodeId: 4,
        __type__: 'UniElement',
      },
    })
    expect(context2.depth).toBe(1)
    expect(context2.nested).toBe(true)

    const context3 = { depth: 0, nested: false }
    const obj3 = [obj, obj2]
    expect(normalizeArg(obj3, {}, false, context3)).toEqual([
      {
        pageId: 1,
        nodeId: 2,
        __type__: 'UniElement',
      },
      {
        element: {
          pageId: 3,
          nodeId: 4,
          __type__: 'UniElement',
        },
      },
    ])
    expect(context3.depth).toBe(2)
    expect(context3.nested).toBe(true)

    const context4 = { depth: 0, nested: false }
    const obj4 = [
      {},
      {
        element: [1, 2, 3],
      },
    ]
    expect(normalizeArg(obj4, {}, false, context4)).toEqual([
      {},
      {
        element: [1, 2, 3],
      },
    ])
    expect(context4.depth).toBe(3)
    expect(context4.nested).toBe(false)
  })
  test(`initProxyFunction`, () => {
    const onMemory = initUTSProxyFunction(false, {
      moduleName: '内存监控',
      moduleType: 'built-in',
      package: 'uts.modules.MemoryPlugin',
      class: 'TestKt',
      name: 'onMemory',
      keepAlive: true,
      params: [{ name: 'callback', type: 'UTSCallback' }],
    })
    onMemory((res: any) => {
      console.log('onMemory callback', res)
    })
    ;[true, false].forEach((async) => {
      const preparePermission = initUTSProxyFunction(async, {
        moduleName: '权限管理',
        moduleType: 'built-in',
        package: 'uts.modules.TestPlugin',
        class: 'TestKt',
        name: 'preparePermission',
        keepAlive: false,
        params: [
          { name: 'options', type: 'PermissionOptions' },
          { name: 'callback', type: 'UTSCallback' },
        ],
      })
      /**
       * {"package":"testPlugin","class":"","method":"preparePermission","params":[{"name":"foo","age":10,"success":7,"fail":8},9]}
       */
      const options = {
        family: {
          father: 'f',
          mother: 'm',
        },
        name: 'foo',
        age: 10,
        success(res: any) {
          console.log('success', res)
        },
        fail(res: any) {
          console.log('fail', res)
        },
      }
      const callback = (res: any) => {
        console.log('callback', res)
      }
      preparePermission(options, callback)
      preparePermission(options, callback)

      const errMsg = 'xx插件编译失败，无法使用'
      expect(
        initUTSProxyFunction(async, {
          name: 'unknown',
          errMsg,
        } as any)
      ).toThrowError(errMsg)
    })
  })
  test(`initProxyClass`, () => {
    const WifiManager = initUTSProxyClass({
      moduleName: 'Wifi管理',
      moduleType: '',
      package: 'uni.modules.TestPlugin',
      class: 'WifiManager',
      constructor: {
        params: [],
      },
      methods: {
        preparePermission: {
          keepAlive: false,
          params: [
            { name: 'options', type: 'PermissionOptions' },
            { name: 'callback', type: 'UTSCallback' },
          ],
        },
      },
      staticMethods: {
        staticPreparePermission: {
          async: true,
          keepAlive: false,
          params: [{ name: 'num', type: 'number' }],
        },
      },
      props: ['count'],
      staticProps: ['staticCount'],
      setters: { count: { name: 'count', type: 'number' } },
      staticSetters: { staticCount: { name: 'staticCount', type: 'number' } },
    })
    const wifi = new WifiManager()
    wifi.preparePermission(1, 2, 3, () => {})
    wifi.count = 1
    WifiManager.staticCount = 2
    WifiManager.staticPreparePermission(1)

    const errMsg = 'xx插件编译失败，无法使用'
    const WifiManagerError = initUTSProxyClass({
      constructor: {
        params: [],
      },
      errMsg,
      staticMethods: {
        staticPreparePermission: {
          params: [],
        },
      },
      staticProps: ['staticCount'],
    } as any)
    expect(() => {
      new WifiManagerError()
    }).toThrowError(errMsg)
    expect(WifiManagerError.staticPreparePermission).toThrowError(errMsg)
    expect(() => {
      WifiManagerError.staticCount
    }).toThrowError(errMsg)
  })
})
