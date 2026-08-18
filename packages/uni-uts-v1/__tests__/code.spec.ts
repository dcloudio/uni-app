import { resolve } from 'path'
import type { UTSBridgeMethod, UTSResult } from '@dcloudio/uts'
import {
  FORMATS,
  type GenProxyCodeOptions,
  genProxyCode,
  genProxyCodeV2,
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

  defineGenProxyCodeV2Tests()
})
