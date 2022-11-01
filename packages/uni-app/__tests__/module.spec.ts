import {
  normalizeArg,
  initUtsProxyFunction,
  initUtsProxyClass,
} from '../src/uts'

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
    ;[true, false].forEach((async) => {
      const preparePermission = initUtsProxyFunction(async, {
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
      preparePermission(
        {
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
        },
        (res: any) => {
          console.log('callback', res)
        }
      )
    })
  })
  test(`initProxyClass`, () => {
    const WifiManager = initUtsProxyClass({
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
    })
    const wifi = new WifiManager()
    wifi.preparePermission(1, 2, 3, () => {})
    wifi.count
    WifiManager.staticCount
    WifiManager.staticPreparePermission(1)
  })
})
