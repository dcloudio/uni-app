import {
  initUTSProxyClass,
  initUTSProxyFunction,
  normalizeArg,
} from '../src/service/api/plugin/uts'

function createNativeChannel(os: string) {
  return {
    os,
    invokeSync(channel: string, args: any, callback: any) {
      return args
    },
    invokeAsync(channel: string, args: any, callback: any) {
      return
    },
  }
}

const TEST_PRESETS = [
  {
    __VAPOR__: true,
    __X__: true,
    platform: 'android',
    nativeChannel: createNativeChannel('android'),
  },
  {
    __VAPOR__: true,
    __X__: true,
    platform: 'ios',
    nativeChannel: createNativeChannel('ios'),
  },
  {
    __VAPOR__: false,
    __X__: true,
    platform: 'android',
    nativeChannel: createNativeChannel('ios'),
  },
  {
    __VAPOR__: false,
    __X__: false,
    platform: 'android',
    plus: {
      os: {
        name: 'Android',
      },
    },
    nativeChannel: createNativeChannel('android'),
  },
  {
    __VAPOR__: false,
    __X__: false,
    platform: 'ios',
    plus: {
      os: {
        name: 'iOS',
      },
    },
    nativeChannel: createNativeChannel('ios'),
  },
]

function applyTestPreset(preset: any) {
  const originalVapor = (globalThis as any).__VAPOR__
  const originalX = (globalThis as any).__X__
  const originalPlus = (globalThis as any).plus
  const originalNativeChannel = (globalThis as any).nativeChannel
  ;(globalThis as any).__VAPOR__ = preset.__VAPOR__
  ;(globalThis as any).__X__ = preset.__X__
  ;(globalThis as any).plus = preset.plus
  ;(globalThis as any).nativeChannel = preset.nativeChannel
  return () => {
    ;(globalThis as any).__VAPOR__ = originalVapor
    ;(globalThis as any).__X__ = originalX
    ;(globalThis as any).plus = originalPlus
    ;(globalThis as any).nativeChannel = originalNativeChannel
  }
}

let callbackCount = 0
function getCallbackId(offset: number = 1) {
  callbackCount += offset
  return callbackCount
}

describe.each(TEST_PRESETS)(
  'uts-module (__VAPOR__=$__VAPOR__, __X__=$__X__, platform=$platform)',
  (preset) => {
    let restorePreset: () => void
    beforeAll(() => {
      restorePreset = applyTestPreset(preset)
    })
    afterAll(() => {
      restorePreset()
    })

    const isVaporAndroid = preset.__VAPOR__ && preset.platform === 'android'
    test('normalize args', () => {
      expect(normalizeArg(1, {}, false, { depth: 0, nested: false })).toBe(1)
      expect(
        normalizeArg('hello', {}, false, { depth: 0, nested: false })
      ).toBe('hello')
      expect(normalizeArg(true, {}, false, { depth: 0, nested: false })).toBe(
        true
      )
      expect(
        normalizeArg({ callback: () => {} }, {}, false, {
          depth: 0,
          nested: false,
        })
      ).toEqual({
        callback: getCallbackId(),
      })
      expect(
        normalizeArg(
          { success: () => {}, fail: () => {}, complete: () => {} },
          {},
          false,
          { depth: 0, nested: false }
        )
      ).toEqual({
        success: getCallbackId(),
        fail: getCallbackId(),
        complete: getCallbackId(),
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
          callback: getCallbackId(),
        },
        success: getCallbackId(),
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
      expect(context1.nested).toBe(isVaporAndroid)

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

      const context5 = { depth: 0, nested: false }
      const obj5 = new ArrayBuffer(0)
      expect(normalizeArg(obj5, {}, false, context5)).toEqual(
        isVaporAndroid
          ? obj5
          : {
              __type__: 'ArrayBuffer',
              value: obj5,
            }
      )
      expect(context5.depth).toBe(0)
      expect(context5.nested).toBe(isVaporAndroid)

      const context6 = { depth: 0, nested: false }
      const obj6 = new ArrayBuffer(0)
      expect(normalizeArg([obj6], {}, false, context6)).toEqual([
        isVaporAndroid
          ? obj6
          : {
              __type__: 'ArrayBuffer',
              value: obj6,
            },
      ])
      expect(context6.depth).toBe(1)
      expect(context6.nested).toBe(true)
    })
  }
)

describe.each(TEST_PRESETS)(
  'uts-module mock module (__VAPOR__=$__VAPOR__, __X__=$__X__, platform=$platform)',
  (preset) => {
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
  }
)
