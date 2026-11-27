import { resolve } from 'path'
import type { UTSBridgeMethod, UTSResult } from '@dcloudio/uts'
import {
  FORMATS,
  type GenProxyCodeOptions,
  genProxyCode,
  genProxyCodeV2,
  genProxyCodeV3,
  parseInterfaceTypes,
  prepareProxyCodeAndFillOptions,
} from '../src/code'
import { ERR_MSG_PLACEHOLDER } from '../src/utils'

const inputDir = resolve(__dirname, 'examples/uts')
const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')
const uniModuleDir = resolve(__dirname, 'examples/uts/uni_modules/test-uts')
const uniModuleKeepAliveDir = resolve(
  __dirname,
  'examples/uts/uni_modules/test-keepAlive'
)
const pluginElementProxyDir = resolve(
  __dirname,
  'examples/uts/utssdk/test-element-proxy'
)
const pluginInterceptorDir = resolve(
  __dirname,
  'examples/uts/utssdk/test-interceptor'
)

type UTSPlatform = GenProxyCodeOptions['platform']
type UTSBridge = NonNullable<UTSResult['uts_bridge']>

function createBridgeMethod(
  name: string,
  overrides: Partial<UTSBridgeMethod> = {}
): UTSBridgeMethod {
  return {
    name,
    method_id: 1,
    type: 'method',
    keep_alive: false,
    async: false,
    ...overrides,
  }
}

function createUTSBridge(overrides: Partial<UTSBridge> = {}): UTSBridge {
  return {
    uts_bridge_name: 'TestBridge',
    functions: [],
    classes: [],
    interfaces: [],
    ...overrides,
  }
}

function createGenProxyCodeOptions(
  overrides: Partial<GenProxyCodeOptions> = {}
): GenProxyCodeOptions {
  return {
    id: 'test-uts',
    is_uni_modules: false,
    name: 'test-uts',
    namespace: 'uts.sdk.testUTS',
    extname: '.uts',
    inputDir,
    platform: 'app-android',
    ...overrides,
  }
}

async function genProxyCodeForTest(
  module: string,
  options: GenProxyCodeOptions
) {
  const decls = await prepareProxyCodeAndFillOptions(module, options)
  return genProxyCode(module, decls, options)
}

async function withUniAppXEnv<T>(
  env: {
    x?: 'true'
    dom2?: 'true'
    platform?: UTSPlatform
  },
  run: () => Promise<T>
) {
  const originalUniAppXDom2 = process.env.UNI_APP_X_DOM2
  const originalUniAppX = process.env.UNI_APP_X
  const originalUniUTSPlatform = process.env.UNI_UTS_PLATFORM
  if (env.dom2 === undefined) {
    delete process.env.UNI_APP_X_DOM2
  } else {
    process.env.UNI_APP_X_DOM2 = env.dom2
  }
  if (env.x === undefined) {
    delete process.env.UNI_APP_X
  } else {
    process.env.UNI_APP_X = env.x
  }
  if (env.platform === undefined) {
    Reflect.deleteProperty(process.env, 'UNI_UTS_PLATFORM')
  } else {
    process.env.UNI_UTS_PLATFORM = env.platform
  }
  try {
    return await run()
  } finally {
    if (originalUniAppXDom2 === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    } else {
      process.env.UNI_APP_X_DOM2 = originalUniAppXDom2
    }
    if (originalUniAppX === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X')
    } else {
      process.env.UNI_APP_X = originalUniAppX
    }
    if (originalUniUTSPlatform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_UTS_PLATFORM')
    } else {
      process.env.UNI_UTS_PLATFORM = originalUniUTSPlatform
    }
  }
}

function defineGenProxyCodeV2Tests() {
  describe('genProxyCodeV2', () => {
    test('generates interface, class, and function proxies', async () => {
      const constructor = createBridgeMethod('User', {
        method_id: 10,
        type: 'constructor',
      })
      const staticMethod = createBridgeMethod('create', {
        method_id: 11,
        type: 'staticMethod',
        async: true,
      })
      const method = createBridgeMethod('listen', {
        method_id: 12,
        keep_alive: true,
      })
      const options = createGenProxyCodeOptions()
      const code = await genProxyCodeV2(
        createUTSBridge({
          interfaces: [
            {
              name: 'RequestTask',
              methods: [
                createBridgeMethod('abort', {
                  method_id: 20,
                  type: 'function',
                }),
              ],
            },
          ],
          classes: [
            {
              name: 'User',
              constructor,
              static_methods: [staticMethod],
              methods: [method],
            },
          ],
          functions: [
            createBridgeMethod('request', {
              method_id: 30,
              type: 'function',
              keep_alive: true,
              async: true,
              return_type: 'RequestTask',
            }),
          ],
        }),
        pluginElementProxyDir,
        options
      )

      expect(code).toContain("const moduleName = 'TestBridge'")
      expect(code).toContain(
        "registerUTSInterface({ name: 'RequestTask', utsBridgeName: moduleName, methods: " +
          '[{name: "abort", methodId: 20, type: "function", keepAlive: false, async: false}] })'
      )
      expect(code).toContain(
        "export const User = initUTSProxyClass({ utsBridgeName: moduleName, class: 'User', " +
          'constructor: {name: "User", methodId: 10, type: "constructor", keepAlive: false, async: false}, ' +
          'staticMethods: [{name: "create", methodId: 11, type: "staticMethod", keepAlive: false, async: true}], ' +
          'methods: [{name: "listen", methodId: 12, type: "method", keepAlive: true, async: false}] })'
      )
      expect(code).toContain(
        'export const request = initUTSProxyFunction(moduleName, ' +
          '{name: "request", methodId: 30, type: "function", keepAlive: true, async: true, returnType: "RequestTask"})'
      )
    })

    test('generates default class and function exports', async () => {
      const defaultClassCode = await genProxyCodeV2(
        createUTSBridge({
          classes: [
            {
              name: 'User',
              is_default: true,
              constructor: createBridgeMethod('User', {
                type: 'constructor',
              }),
              static_methods: [],
              methods: [],
            },
          ],
        }),
        pluginElementProxyDir,
        createGenProxyCodeOptions()
      )
      const defaultFunctionCode = await genProxyCodeV2(
        createUTSBridge({
          functions: [
            {
              ...createBridgeMethod('request', { type: 'function' }),
              is_default: true,
            },
          ],
        }),
        pluginElementProxyDir,
        createGenProxyCodeOptions()
      )

      expect(defaultClassCode).toContain('export default initUTSProxyClass(')
      expect(defaultFunctionCode).toContain(
        'export default initUTSProxyFunction('
      )
    })

    test('generates CommonJS exports and registers the UTS plugin', async () => {
      const options = createGenProxyCodeOptions({
        format: FORMATS.CJS,
        pluginRelativeDir: 'uni_modules/test-uts',
      })
      const code = await genProxyCodeV2(
        createUTSBridge({
          classes: [
            {
              name: 'User',
              constructor: createBridgeMethod('User', {
                type: 'constructor',
              }),
              static_methods: [],
              methods: [],
            },
          ],
          functions: [
            createBridgeMethod('request', {
              type: 'function',
            }),
          ],
        }),
        pluginElementProxyDir,
        options
      )
      const defaultCode = await genProxyCodeV2(
        createUTSBridge({
          functions: [
            {
              ...createBridgeMethod('request', { type: 'function' }),
              is_default: true,
            },
          ],
        }),
        pluginElementProxyDir,
        options
      )

      expect(code).toContain('const exports = { __esModule: true }')
      expect(code).toContain('exports.User = initUTSProxyClass(')
      expect(code).toContain('exports.request = initUTSProxyFunction(')
      expect(code).not.toContain('export const ')
      expect(defaultCode).toContain('exports.default = initUTSProxyFunction(')
      ;[code, defaultCode].forEach((generatedCode) => {
        expect(generatedCode).toContain(
          "uni.registerUTSPlugin('uni_modules/test-uts', exports)"
        )
        expect(() => new Function('uni', generatedCode)).not.toThrow()
      })
    })

    test('uses element proxy class for Uni*Element classes in android DOM2', async () => {
      const code = await withUniAppXEnv(
        { dom2: 'true', x: 'true', platform: 'app-android' },
        () =>
          genProxyCodeV2(
            createUTSBridge({
              classes: [
                {
                  name: 'UniViewElement',
                  constructor: createBridgeMethod('UniViewElement', {
                    type: 'constructor',
                  }),
                  static_methods: [],
                  methods: [],
                },
                {
                  name: 'ViewController',
                  constructor: createBridgeMethod('ViewController', {
                    type: 'constructor',
                  }),
                  static_methods: [],
                  methods: [],
                },
              ],
            }),
            pluginElementProxyDir,
            createGenProxyCodeOptions()
          )
      )

      expect(code).toContain(
        'export const UniViewElement = initUTSElementProxyClass('
      )
      expect(code).toContain('export const ViewController = initUTSProxyClass(')
    })

    test('injects interceptor code and wraps matched proxy functions', async () => {
      const options = createGenProxyCodeOptions()
      const code = await genProxyCodeV2(
        createUTSBridge({
          functions: [
            createBridgeMethod('request', {
              method_id: 40,
              type: 'function',
            }),
            createBridgeMethod('other', {
              method_id: 41,
              type: 'function',
            }),
          ],
        }),
        pluginInterceptorDir,
        options
      )

      expect(code).toContain('function initRequest(method)')
      expect(code).not.toContain('export function initRequest')
      expect(code).toContain(
        'export const request = initRequest(initUTSProxyFunction(moduleName, '
      )
      expect(code).toContain(
        'export const other = initUTSProxyFunction(moduleName, '
      )
    })
  })
}

describe('genProxyCodeV3', () => {
  test('首次调用安装整个模块，返回值和回调参数共用原型', async () => {
    const method = (name: string, id: number, type: UTSBridgeMethod['type']) =>
      createBridgeMethod(name, { method_id: id, type })
    const bridge = createUTSBridge({
      uts_bridge_name: '_test',
      functions: [
        method('request', 1, 'function'),
        { ...method('fetch', 2, 'function'), async: true },
      ],
      classes: [
        {
          name: 'Task',
          constructor: method('Task', 3, 'constructor'),
          methods: [
            method('abort', 4, 'method'),
            method('abort', 8, 'getter'),
            method('abort', 9, 'setter'),
          ],
          static_methods: [method('active', 5, 'staticGetter')],
        },
      ],
      interfaces: [
        {
          name: 'Result',
          methods: [
            method('status', 6, 'getter'),
            method('status', 7, 'setter'),
          ],
        },
      ],
      variables: [{ name: 'READY', value: 1 }],
    })
    const code = await genProxyCodeV3(
      bridge,
      pluginInterceptorDir,
      createGenProxyCodeOptions({
        format: FORMATS.CJS,
        pluginRelativeDir: 'uni_modules/test',
      })
    )
    const load = jest.fn((key, prototypes) => {
      expect(key).toBe('_test')
      const task = Object.create(prototypes.Task)
      const result = Object.create(prototypes.Result)
      let status = 100
      return {
        1: (cb: (value: unknown) => void) => {
          cb(result)
          return task
        },
        2: (error: unknown, cb: Function) => cb(task, error),
        3: () => task,
        4: (receiver: unknown) => receiver === task,
        5: () => true,
        8: () => {
          throw Error('duplicate getter')
        },
        9: (_receiver: unknown, value: Function) => value(),
        6: (receiver: unknown) => (receiver === result ? status : -1),
        7: (_receiver: unknown, value: number) => {
          status = value
        },
      }
    })
    const registerUTSPlugin = jest.fn()
    new Function('uni', 'globalThis', code)(
      { registerUTSPlugin },
      { __utsRequireModule: load }
    )
    const [path, api] = registerUTSPlugin.mock.calls[0]
    expect(path).toBe('uni_modules/test')
    expect(api.READY).toBe(1)
    expect(load).not.toHaveBeenCalled()
    const request = api.request((result: { status: number }) => {
      expect(result.status).toBe(100)
      result.status = 200
      expect(result.status).toBe(200)
    })
    const abort = request.abort
    expect(abort()).toBe(true)
    expect(request.abort).toBe(abort)
    const set = jest.fn()
    request.abort = set
    expect(set).toHaveBeenCalledWith()
    expect(request.abort).toBe(abort)
    expect(request).toBeInstanceOf(api.Task)
    expect(new api.Task()).toBe(request)
    expect(api.Task.active).toBe(true)
    await expect(api.fetch(null)).resolves.toBe(request)
    await expect(api.fetch('error')).rejects.toBe('error')
    expect(load).toHaveBeenCalledTimes(1)
    expect(code).toContain('initRequest(')
  })

  test('跨多层本地 UTS 基类继承方法、属性和 instanceof', async () => {
    const method = (name: string, id: number, type: UTSBridgeMethod['type']) =>
      createBridgeMethod(name, { method_id: id, type })
    const bridge = createUTSBridge({
      uts_bridge_name: '_inheritance',
      functions: [method('create', 0, 'function')],
      classes: [
        {
          name: 'Child',
          base_class: 'Middle',
          constructor: method('Child', 1, 'constructor'),
          methods: [method('label', 2, 'method')],
          static_methods: [],
        },
        {
          name: 'Base',
          constructor: method('Base', 3, 'constructor'),
          methods: [
            method('label', 4, 'method'),
            method('read', 5, 'method'),
            method('value', 6, 'getter'),
            method('value', 7, 'setter'),
          ],
          static_methods: [],
        },
        {
          name: 'Middle',
          base_class: 'Base',
          prototype_only: true,
          constructor: method('Middle', 8, 'constructor'),
          methods: [],
          static_methods: [],
        },
      ],
    })
    const code = await genProxyCodeV3(
      bridge,
      pluginElementProxyDir,
      createGenProxyCodeOptions({
        format: FORMATS.CJS,
        pluginRelativeDir: 'uni_modules/example',
      })
    )
    const registerUTSPlugin = jest.fn()
    const load = jest.fn((_key, prototypes) => {
      const child = Object.create(prototypes.Child)
      const base = Object.create(prototypes.Base)
      let value = 'base'
      return {
        0: (cb: Function) => {
          cb(child)
          return child
        },
        1: () => child,
        2: () => 'child',
        3: () => base,
        4: () => 'base',
        5: (receiver: unknown) => receiver === child,
        6: () => value,
        7: (_receiver: unknown, input: string) => {
          value = input
        },
      }
    })
    new Function('uni', 'globalThis', code)(
      { registerUTSPlugin },
      { __utsRequireModule: load }
    )
    const api = registerUTSPlugin.mock.calls[0][1]
    expect(load).not.toHaveBeenCalled()
    expect(api.Middle).toBeUndefined()
    const child = api.create((obj: any) => {
      const read = obj.read
      expect(read()).toBe(true)
      expect(obj.value).toBe('base')
      obj.value = 'changed'
    })
    expect(child.value).toBe('changed')
    expect(child.label()).toBe('child')
    expect(new api.Child()).toBe(child)
    expect(child).toBeInstanceOf(api.Child)
    expect(child).toBeInstanceOf(api.Base)
    expect(new api.Base()).not.toBeInstanceOf(api.Child)
    expect(new api.Base().label()).toBe('base')
    expect(load).toHaveBeenCalledTimes(1)
  })

  test('报告循环继承和缺失基类的元数据路径', async () => {
    const classMeta = (name: string, base_class: string) => ({
      name,
      base_class,
      constructor: createBridgeMethod(name, { type: 'constructor' }),
      static_methods: [],
      methods: [],
    })
    const generate = (classes: UTSBridge['classes']) =>
      genProxyCodeV3(
        createUTSBridge({ uts_bridge_name: '_bad', classes }),
        pluginElementProxyDir,
        createGenProxyCodeOptions()
      )
    await expect(
      generate([classMeta('A', 'B'), classMeta('B', 'A')])
    ).rejects.toThrow(
      'Invalid UTS class hierarchy in _bad (cyclic): A -> B -> A'
    )
    await expect(generate([classMeta('A', 'Missing')])).rejects.toThrow(
      'Invalid UTS class hierarchy in _bad (unknown base): A -> Missing'
    )
  })

  test('模块安装失败后可重试，并保留默认导出和模块键', async () => {
    const bridge = createUTSBridge({
      uts_bridge_name: 'test',
      functions: [
        {
          ...createBridgeMethod('hello', { method_id: 8, type: 'function' }),
          is_default: true,
        },
      ],
    })
    const es = await genProxyCodeV3(
      bridge,
      pluginElementProxyDir,
      createGenProxyCodeOptions()
    )
    expect(es).toContain('export default ')
    const code = await genProxyCodeV3(
      bridge,
      pluginElementProxyDir,
      createGenProxyCodeOptions({
        format: FORMATS.CJS,
        pluginRelativeDir: 'uni_modules/test',
      })
    )
    const registerUTSPlugin = jest.fn()
    const load = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error('install')
      })
      .mockReturnValue({ 8: (n: number) => n + 1 })
    new Function('uni', 'globalThis', code)(
      { registerUTSPlugin },
      { __utsRequireModule: load }
    )
    const api = registerUTSPlugin.mock.calls[0][1]
    expect(() => api.default(1)).toThrow('install')
    expect(api.default(1)).toBe(2)
    expect(load.mock.calls[0][0]).toBe('test')
  })
})

describe('code', () => {
  test('genProxyCode', async () => {
    const options: GenProxyCodeOptions = {
      moduleName: '测试',
      moduleType: 'built-in',
      id: 'test-uts',
      is_uni_modules: false,
      name: 'test-uts',
      namespace: 'uts.sdk.testUTS',
      extname: '.uts',
      androidComponents: { TestUTS: '' },
      inputDir,
      platform: 'app-android',
    }
    const res = await genProxyCodeForTest(pluginDir, options)
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
    expect(options.meta).toMatchSnapshot()
    expect(options.types).toMatchSnapshot()
  })
  test('genProxyCode cjs', async () => {
    expect(
      (
        await genProxyCodeForTest(pluginDir, {
          id: 'test-uts',
          is_uni_modules: false,
          name: 'test-uts',
          namespace: 'uts.sdk.testUTS',
          extname: '.uts',
          format: FORMATS.CJS,
          pluginRelativeDir: 'utssdk/test-uts',
          androidComponents: { TestUTS: '' },
          inputDir,
          platform: 'app-android',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })

  test('genProxyCode uni_modules', async () => {
    expect(
      (
        await genProxyCodeForTest(uniModuleDir, {
          id: 'test-uts',
          is_uni_modules: true,
          name: 'test-uts',
          namespace: 'uts.sdk.testUTS',
          extname: '.uts',
          androidComponents: {},
          inputDir,
          platform: 'app-android',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })

  test('genProxyCode uni_modules keepAlive', async () => {
    expect(
      (
        await genProxyCodeForTest(uniModuleKeepAliveDir, {
          id: 'test-keepAlive',
          is_uni_modules: true,
          name: 'test-keepAlive',
          namespace: 'uts.sdk.testKeepAlive',
          extname: '.uts',
          androidComponents: {},
          inputDir,
          platform: 'app-android',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })

  test('genProxyCode single platform app-android', async () => {
    const options: GenProxyCodeOptions = {
      moduleName: '测试',
      moduleType: 'built-in',
      id: 'test-uts',
      is_uni_modules: false,
      name: 'test-uts',
      namespace: 'uts.sdk.testUTS',
      extname: '.uts',
      androidComponents: { TestUTS: '' },
      inputDir,
      platform: 'app-android',
    }
    const res = await withUniAppXEnv(
      { dom2: 'true', x: 'true', platform: 'app-android' },
      () => genProxyCodeForTest(pluginDir, options)
    )
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
  })

  test('genProxyCode single platform app-ios', async () => {
    const options: GenProxyCodeOptions = {
      moduleName: '测试',
      moduleType: 'built-in',
      id: 'test-uts',
      is_uni_modules: false,
      name: 'test-uts',
      namespace: 'uts.sdk.testUTS',
      extname: '.uts',
      androidComponents: { TestUTS: '' },
      inputDir,
      platform: 'app-ios',
    }
    const res = await withUniAppXEnv(
      { dom2: 'true', x: 'true', platform: 'app-ios' },
      () => genProxyCodeForTest(pluginDir, options)
    )
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
  })

  function genElementProxyCode(platform: UTSPlatform = 'app-android') {
    return genProxyCodeForTest(pluginElementProxyDir, {
      id: 'test-element',
      is_uni_modules: false,
      name: 'test-element',
      namespace: 'uts.sdk.testElement',
      extname: '.uts',
      androidComponents: {},
      inputDir,
      platform,
    })
  }

  test('genProxyCode uses element proxy class for Uni*Element and Uni*ElementImpl classes in android DOM2', async () => {
    const res = await withUniAppXEnv(
      { dom2: 'true', x: 'true', platform: 'app-android' },
      () => genElementProxyCode('app-android')
    )

    expect(res).toContain('initUTSElementProxyClass')
    expect(res).toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).toContain(
      'export const ViewController = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain('export default /*#__PURE__*/ initUTSProxyClass')
    expect(res).not.toContain(
      'export default /*#__PURE__*/ initUTSElementProxyClass'
    )
  })

  test('genProxyCode uses normal proxy class for Uni*Element and Uni*ElementImpl classes outside DOM2', async () => {
    const res = await withUniAppXEnv({ platform: 'app-android' }, () =>
      genElementProxyCode('app-android')
    )

    expect(res).toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain(
      'export const ViewController = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain('export default /*#__PURE__*/ initUTSProxyClass')
    expect(res).not.toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).not.toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSElementProxyClass'
    )
  })

  test('genProxyCode uses normal proxy class for Uni*Element and Uni*ElementImpl classes in iOS DOM2', async () => {
    const res = await withUniAppXEnv(
      { dom2: 'true', x: 'true', platform: 'app-ios' },
      () => genElementProxyCode('app-ios')
    )
    expect(res).toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain(
      'export const ViewController = /*#__PURE__*/ initUTSProxyClass'
    )
    expect(res).toContain('export default /*#__PURE__*/ initUTSProxyClass')
    expect(res).not.toContain(
      'export const UniViewElement = /*#__PURE__*/ initUTSElementProxyClass'
    )
    expect(res).not.toContain(
      'export const UniCanvasElementImpl = /*#__PURE__*/ initUTSElementProxyClass'
    )
  })

  describe.each([undefined, 'true'] as const)(
    'interface alias return values in iOS (DOM2: %s)',
    (dom2) => {
      async function prepareInterfaceAliasProxy(
        overrides: Partial<GenProxyCodeOptions> = {}
      ) {
        const module = resolve(
          __dirname,
          'examples/uts/utssdk/test-interface-alias'
        )
        const options = createGenProxyCodeOptions({
          platform: 'app-ios',
          ...overrides,
        })
        const decls = await withUniAppXEnv(
          { x: 'true', dom2, platform: 'app-ios' },
          () => prepareProxyCodeAndFillOptions(module, options)
        )
        return { module, options, decls }
      }

      test('only collects exported aliases from interface.uts', async () => {
        const module = resolve(
          __dirname,
          'examples/uts/utssdk/test-interface-alias'
        )
        const types = await parseInterfaceTypes(
          module,
          createGenProxyCodeOptions({ platform: 'app-ios' })
        )
        expect(Object.keys(types.alias).sort()).toEqual(
          [
            'PushChannelManager',
            'NestedPushChannelManager',
            'ListedManager',
            'SharedJSExportManagerAlias',
            'SecondaryManagerAlias',
            'CycleA',
            'CycleB',
          ].sort()
        )
      })

      test('excludes private aliases from module and platform metadata', async () => {
        const { options } = await prepareInterfaceAliasProxy({
          androidPreprocessor: async (code) => code,
          iosPreprocessor: async (code) => code,
        })
        for (const meta of [
          options.meta!,
          options.meta!.android!,
          options.meta!.ios!,
        ]) {
          expect(meta.types).toMatchObject({
            ChannelManager: 'interface',
            PushChannelManager: 'typealias',
            ListedManager: 'typealias',
            SharedJSExportManagerAlias: 'typealias',
          })
          for (const name of [
            'ForwardManager',
            'InternalManager',
            'UnusedManager',
            'PrivateGeneric',
            'InternalJSExportParent',
            'InternalJSExportManager',
          ]) {
            expect(meta.types).not.toHaveProperty(name)
            expect(meta.typeParams).not.toContain(name)
          }
        }
      })

      test('uses one canonical proxy for cross-file, forward, and local aliases', async () => {
        const { module, options, decls } = await prepareInterfaceAliasProxy()
        for (const method of [
          'getChannelManager',
          'getPushChannelManager',
          'getNestedPushChannelManager',
          'getListedManager',
          'getPlatformManager',
          'getNullableManager',
          'getManager',
        ]) {
          expect(
            decls.find(
              (decl) =>
                decl.type === 'FunctionDeclaration' && decl.method === method
            )
          ).toMatchObject({
            return: { type: 'interface', options: 'ChannelManager' },
          })
        }
        expect(
          decls.find(
            (decl) => decl.type === 'Class' && decl.cls === 'ManagerFactory'
          )
        ).toMatchObject({
          options: {
            methods: {
              getManagerByJs: {
                return: { type: 'interface', options: 'ChannelManager' },
              },
            },
          },
        })
        const code = await genProxyCode(module, decls, options)
        expect(
          code.match(/registerUTSInterface\('ChannelManagerOptions'/g)
        ).toHaveLength(1)
        expect(code).toContain(
          'return: {"type":"interface","options":"ChannelManagerOptions"}'
        )
        expect(code).not.toContain(
          "registerUTSInterface('PushChannelManagerOptions'"
        )
        expect(options.meta!.types.PushChannelManager).toBe('typealias')
      })

      test('registers interface aliases returned by other interfaces', async () => {
        const { decls } = await prepareInterfaceAliasProxy()
        expect(
          decls.find(
            (decl) =>
              decl.type === 'InterfaceDeclaration' &&
              decl.cls === 'ChannelManager'
          )
        ).toMatchObject({
          options: {
            methods: {
              selfByJs: {
                return: { type: 'interface', options: 'ChannelManager' },
              },
              getSecondaryByJs: {
                return: { type: 'interface', options: 'SecondaryManager' },
              },
            },
          },
        })
        expect(
          decls.some(
            (decl) =>
              decl.type === 'InterfaceDeclaration' &&
              decl.cls === 'SecondaryManager'
          )
        ).toBe(true)
      })

      test('preserves JSExport alias returns and stops at cyclic aliases', async () => {
        const { decls } = await prepareInterfaceAliasProxy()
        for (const method of [
          'getExportedManagerAlias',
          'getNestedExportedManagerAlias',
          'getChildExportedManagerAlias',
          'getSharedJSExportManagerAlias',
          'getCyclicManager',
        ]) {
          expect(
            decls.find(
              (decl) =>
                decl.type === 'FunctionDeclaration' && decl.method === method
            )
          ).toHaveProperty('return', undefined)
        }
        expect(
          decls.find(
            (decl) =>
              decl.type === 'FunctionDeclaration' &&
              decl.method === 'getExportedManager'
          )
        ).toMatchObject({
          return: { type: 'interface', options: 'ExportedManager' },
        })
      })
    }
  )

  describe.each([undefined, 'true'] as const)(
    'interface JSDoc keepAlive in iOS (DOM2: %s)',
    (dom2) => {
      test('uses interface tags for methods and callable properties without class decorators', async () => {
        const module = resolve(
          __dirname,
          'examples/uts/utssdk/test-jsdoc-keep-alive'
        )
        const options = createGenProxyCodeOptions({ platform: 'app-ios' })
        const decls = await withUniAppXEnv(
          { x: 'true', dom2, platform: 'app-ios' },
          () => prepareProxyCodeAndFillOptions(module, options)
        )
        const iface = decls.find(
          (decl) => decl.type === 'InterfaceDeclaration' && decl.cls === 'BA'
        )
        expect(iface).toMatchObject({
          options: {
            methods: {
              helloByJs: { keepAlive: true, params: [] },
              methodByJs: { keepAlive: true },
              aliasByJs: { keepAlive: true },
              selfByJs: {
                keepAlive: true,
                return: { type: 'interface', options: 'BA' },
              },
              inheritedByJs: { keepAlive: true },
              ordinaryByJs: { keepAlive: false },
              nearMatchByJs: { keepAlive: false },
              lineCommentByJs: { keepAlive: false },
              blockCommentByJs: { keepAlive: false },
            },
            props: ['label'],
          },
        })
        expect(
          decls.find(
            (decl) => decl.type === 'Class' && decl.cls === 'ExportedBA'
          )
        ).toMatchObject({
          options: {
            methods: {
              pingByJs: { keepAlive: true },
              pongByJs: { keepAlive: true },
            },
          },
        })
        const code = await genProxyCode(module, decls, options)
        expect(code).toContain('"helloByJs":{"async":false,"keepAlive":true')
        expect(code).toContain(
          '"ordinaryByJs":{"async":false,"keepAlive":false'
        )
        expect(code).not.toContain('worldByJs')
        expect(options.meta!.types).not.toHaveProperty('Hello')
      })
    }
  )

  defineGenProxyCodeV2Tests()
})
