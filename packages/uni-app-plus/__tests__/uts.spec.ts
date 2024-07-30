import {
  initUTSProxyClass,
  initUTSProxyFunction,
  normalizeArg,
} from '../src/service/api/plugin/uts'

describe('uts-module', () => {
  test('normalize args', () => {
    expect(normalizeArg(1)).toBe(1)
    expect(normalizeArg('hello')).toBe('hello')
    expect(normalizeArg(true)).toBe(true)
    expect(normalizeArg({ callback: () => {} })).toEqual({
      callback: 1,
    })
    expect(
      normalizeArg({ success: () => {}, fail: () => {}, complete: () => {} })
    ).toEqual({
      success: 2,
      fail: 3,
      complete: 4,
    })
    expect(
      normalizeArg({
        user: {
          name: 'test',
          age: 10,
          callback() {},
        },
        success() {},
      })
    ).toEqual({
      user: {
        name: 'test',
        age: 10,
        callback: 5,
      },
      success: 6,
    })
  })
  test(`initProxyFunction`, () => {
    const onMemory = initUTSProxyFunction(false, {
      moduleName: '内存监控',
      moduleType: 'built-in',
      package: 'uts.modules.MemoryPlugin',
      class: 'TestKt',
      name: 'onMemory',
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
          params: [
            { name: 'options', type: 'PermissionOptions' },
            { name: 'callback', type: 'UTSCallback' },
          ],
        },
      },
      staticMethods: {
        staticPreparePermission: {
          async: true,
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
