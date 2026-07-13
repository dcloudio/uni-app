import {
  initUTSElementProxyClass,
  initUTSPackageName,
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

const uniElementText = new WeakMap<object, string>()
const uniElementAttributes = new WeakMap<object, Map<string, unknown>>()

function applyTestPreset(preset: any) {
  const originalVapor = (globalThis as any).__VAPOR__
  const originalVaporPlatform = (globalThis as any).__VAPOR_PLATFORM__
  const originalX = (globalThis as any).__X__
  const originalPlus = (globalThis as any).plus
  const originalUni = (globalThis as any).uni
  const originalNativeChannel = (globalThis as any).nativeChannel
  const originalUniElementImpl = (globalThis as any).UniViewElementImpl
  ;(globalThis as any).__VAPOR__ = preset.__VAPOR__
  ;(globalThis as any).__VAPOR_PLATFORM__ = preset.__VAPOR__
    ? `app-${preset.platform}`
    : ''
  ;(globalThis as any).__X__ = preset.__X__
  ;(globalThis as any).plus = preset.plus
  ;(globalThis as any).uni = {
    requireNativePlugin() {
      return {
        invokeSync(args: any, callback: any) {
          return preset.nativeChannel.invokeSync('APP-SERVICE', args, callback)
        },
        invokeAsync(args: any, callback: any) {
          return preset.nativeChannel.invokeAsync('APP-SERVICE', args, callback)
        },
      }
    },
  }
  ;(globalThis as any).nativeChannel = preset.nativeChannel
  ;(globalThis as any).UniViewElementImpl = class UniViewElementImpl {
    constructor(
      public nodeId: number,
      public page: any,
      public tagName: string
    ) {
      uniElementText.set(this, '')
      uniElementAttributes.set(
        this,
        new Map<string, unknown>([
          ['id', 'native-id'],
          ['data-count', 1],
        ])
      )
    }
    getNodeId() {
      return this.nodeId
    }
    hasTagName(tagName: string) {
      return this.tagName === tagName
    }
    get text() {
      return uniElementText.get(this) || ''
    }
    set text(value: string) {
      uniElementText.set(this, value)
    }
    focus() {
      throw new Error('native focus should be overridden')
    }
    hasAttribute(name: string) {
      return !!uniElementAttributes.get(this)?.has(name)
    }
    getAttribute(name: string) {
      return uniElementAttributes.get(this)?.get(name) || null
    }
    getAnyAttribute(name: string) {
      return uniElementAttributes.get(this)?.get(name)
    }
  }
  return () => {
    ;(globalThis as any).__VAPOR__ = originalVapor
    ;(globalThis as any).__VAPOR_PLATFORM__ = originalVaporPlatform
    ;(globalThis as any).__X__ = originalX
    ;(globalThis as any).plus = originalPlus
    ;(globalThis as any).uni = originalUni
    ;(globalThis as any).nativeChannel = originalNativeChannel
    ;(globalThis as any).UniViewElementImpl = originalUniElementImpl
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
    test('Vapor 平台判断不读取 nativeChannel', () => {
      if (!preset.__VAPOR__) {
        return
      }
      const nativeChannel = (globalThis as any).nativeChannel
      let nativeChannelReadCount = 0
      ;(globalThis as any).nativeChannel = new Proxy(nativeChannel, {
        get(target, key, receiver) {
          nativeChannelReadCount++
          return Reflect.get(target, key, receiver)
        },
      })
      try {
        expect(initUTSPackageName('Test', true)).toBe(
          isVaporAndroid ? 'uts.sdk.modules.Test' : ''
        )
        expect(nativeChannelReadCount).toBe(0)
      } finally {
        ;(globalThis as any).nativeChannel = nativeChannel
      }
    })

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

      const sparseArr: unknown[] = []
      sparseArr[2] = 1
      const normalizedSparseArr = normalizeArg(sparseArr, {}, false, {
        depth: 0,
        nested: false,
      }) as unknown[]
      expect(normalizedSparseArr).toHaveLength(3)
      expect(0 in normalizedSparseArr).toBe(false)
      expect(normalizedSparseArr[2]).toBe(1)

      const context7 = { depth: 0, nested: false }
      const shared = { value: 1 }
      const normalizedShared = normalizeArg(
        {
          first: shared,
          second: shared,
        },
        {},
        false,
        context7
      ) as Record<string, unknown>
      expect(normalizedShared).toEqual({
        first: { value: 1 },
        second: { value: 1 },
      })

      const circularObj: Record<string, unknown> = { value: undefined }
      circularObj.self = circularObj
      const normalizedCircularObj = normalizeArg(circularObj, {}, false, {
        depth: 0,
        nested: false,
      }) as Record<string, unknown>
      expect(normalizedCircularObj.value).toBeUndefined()
      expect('value' in normalizedCircularObj).toBe(true)
      expect('self' in normalizedCircularObj).toBe(false)

      const circularArr: unknown[] = [undefined]
      circularArr.push(circularArr, 2)
      const normalizedCircularArr = normalizeArg(circularArr, {}, false, {
        depth: 0,
        nested: false,
      }) as unknown[]
      expect(normalizedCircularArr).toHaveLength(3)
      expect(normalizedCircularArr[0]).toBeUndefined()
      expect(0 in normalizedCircularArr).toBe(true)
      expect(1 in normalizedCircularArr).toBe(false)
      expect(normalizedCircularArr[2]).toBe(2)

      const circularRaw: Record<string, unknown> = { value: 1 }
      circularRaw.__v_raw = circularRaw
      const normalizedCircularRaw = normalizeArg(circularRaw, {}, false, {
        depth: 0,
        nested: false,
      }) as Record<string, unknown>
      expect(normalizedCircularRaw.value).toBe(1)
      expect('__v_raw' in normalizedCircularRaw).toBe(false)
    })
  }
)

describe.each(TEST_PRESETS)(
  'uts-module mock module (__VAPOR__=$__VAPOR__, __X__=$__X__, platform=$platform)',
  (preset) => {
    let restorePreset: () => void
    beforeAll(() => {
      restorePreset = applyTestPreset(preset)
    })
    afterAll(() => {
      restorePreset()
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
      const invokeSync = jest.spyOn(preset.nativeChannel, 'invokeSync')
      invokeSync.mockClear()
      const wifiWithConstructorArgs = new WifiManager()
      expect(wifiWithConstructorArgs).toBeDefined()
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          moduleName: 'Wifi管理',
          moduleType: '',
          package: 'uni.modules.TestPlugin',
          class: 'WifiManager',
          type: 'constructor',
          name: 'constructor',
          params: [],
        }),
        expect.any(Function)
      )
      expect(invokeSync.mock.calls[0][1]).not.toHaveProperty('id')
      invokeSync.mockRestore()
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

    test(`initUTSElementProxyClass`, () => {
      const UniViewElement = initUTSElementProxyClass({
        moduleName: 'Element扩展',
        moduleType: '',
        package: 'uni.modules.TestPlugin',
        class: 'UniViewElement',
        constructor: {
          params: [],
        },
        methods: {
          focus: {
            keepAlive: false,
            params: [],
          },
          hasAttribute: {
            keepAlive: false,
            params: [{ name: 'name', type: 'string' }],
          },
          getAttribute: {
            keepAlive: false,
            params: [{ name: 'name', type: 'string' }],
          },
          getAnyAttribute: {
            keepAlive: false,
            params: [{ name: 'name', type: 'string' }],
          },
        },
        staticMethods: {
          staticPreparePermission: {
            async: false,
            keepAlive: false,
            params: [{ name: 'num', type: 'number' }],
          },
        },
        props: ['dataset'],
        staticProps: ['staticCount'],
        setters: { dataset: { name: 'dataset', type: 'JSONObject' } },
        staticSetters: { staticCount: { name: 'staticCount', type: 'number' } },
      })
      const page = { pageId: 100 }
      const element = new UniViewElement(200, page, 'view')
      const ins = { __type__: 'UniElement', pageId: 100, nodeId: 200 }
      const invokeSync = jest.spyOn(preset.nativeChannel, 'invokeSync')
      invokeSync.mockClear()

      expect(element.__v_skip).toBe(true)
      expect(element instanceof UniViewElement).toBe(true)
      if (preset.__VAPOR__) {
        expect(element.tagName).toBe('view')
        expect(element.getNodeId()).toBe(200)
        expect(element.hasTagName('view')).toBe(true)
        element.text = 'hello'
        expect(element.text).toBe('hello')
        const getAttribute = element.getAttribute
        expect(getAttribute('id')).toBe('native-id')
        expect(element.hasAttribute('id')).toBe(true)
        expect(element.getAnyAttribute('data-count')).toBe(1)
      }
      expect(invokeSync).not.toHaveBeenCalled()
      element.focus()
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          moduleName: 'Element扩展',
          moduleType: '',
          ins,
          type: 'method',
          name: 'focus',
          keepAlive: false,
          nested: false,
          params: [],
        }),
        expect.any(Function)
      )
      void element.dataset
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          ins,
          type: 'getter',
          name: 'dataset',
          keepAlive: false,
          nested: true,
        }),
        expect.any(Function)
      )
      element.dataset = { id: 'box' }
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          ins,
          type: 'setter',
          name: 'dataset',
          keepAlive: false,
          nested: false,
          params: [{ id: 'box' }],
        }),
        expect.any(Function)
      )

      UniViewElement.staticPreparePermission(1)
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          package: 'uni.modules.TestPlugin',
          class: 'UniViewElement',
          moduleName: 'Element扩展',
          moduleType: '',
          type: 'method',
          name: 'staticPreparePermission',
          companion: true,
          params: [1],
        }),
        expect.any(Function)
      )
      expect(
        invokeSync.mock.calls[invokeSync.mock.calls.length - 1][1]
      ).not.toHaveProperty('id')
      void UniViewElement.staticCount
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          package: 'uni.modules.TestPlugin',
          class: 'UniViewElement',
          type: 'getter',
          name: 'staticCount',
          companion: true,
        }),
        expect.any(Function)
      )
      UniViewElement.staticCount = 2
      expect(invokeSync).toHaveBeenLastCalledWith(
        'APP-SERVICE',
        expect.objectContaining({
          package: 'uni.modules.TestPlugin',
          class: 'UniViewElement',
          moduleName: 'Element扩展',
          moduleType: '',
          type: 'setter',
          name: 'staticCount',
          params: [2],
        }),
        expect.any(Function)
      )
      expect(
        invokeSync.mock.calls[invokeSync.mock.calls.length - 1][1]
      ).not.toHaveProperty('id')

      expect(invokeSync).toHaveBeenCalledTimes(6)
      invokeSync.mockRestore()

      const ElementError = initUTSElementProxyClass({
        constructor: {
          params: [],
        },
        methods: {},
        props: ['dataset'],
        setters: {},
        errMsg: 'xx插件编译失败，无法使用',
      } as any)
      const errorElement = new ElementError(200, page, 'view')
      expect(() => {
        errorElement.dataset
      }).toThrowError('xx插件编译失败，无法使用')
    })
  }
)
