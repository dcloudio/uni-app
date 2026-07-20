import { resolve } from 'path'
import type { UTSBridgeMethod, UTSResult } from '@dcloudio/uts'
import {
  FORMATS,
  type GenProxyCodeOptions,
  genProxyCode,
  genProxyCodeV2,
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

function createUTSResult(overrides: Partial<UTSBridge> = {}): UTSResult {
  return {
    uts_bridge: {
      uts_bridge_name: 'TestBridge',
      functions: [],
      classes: [],
      interfaces: [],
      ...overrides,
    },
  }
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

describe('code', () => {
  describe('genProxyCodeV2', () => {
    test('returns empty code without uts bridge metadata', async () => {
      await expect(genProxyCodeV2({})).resolves.toBe('')
    })

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
      const code = await genProxyCodeV2(
        createUTSResult({
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
            }),
          ],
        })
      )

      expect(code).toContain(
        "registerUTSInterface({ name: 'RequestTask', utsBridgeName: 'TestBridge', methods: " +
          '[{"name":"abort","methodId":20,"type":"function","keepAlive":false,"async":false}] })'
      )
      expect(code).toContain(
        "export const User = initUTSProxyClass({ utsBridgeName: 'TestBridge', class: 'User', " +
          'constructor: {"name":"User","methodId":10,"type":"constructor","keepAlive":false,"async":false}, ' +
          'staticMethods: [{"name":"create","methodId":11,"type":"staticMethod","keepAlive":false,"async":true}], ' +
          'methods: [{"name":"listen","methodId":12,"type":"method","keepAlive":true,"async":false}] })'
      )
      expect(code).toContain(
        "export const request = initUTSProxyFunction({ utsBridgeName: 'TestBridge', name: 'request', " +
          "methodId: 30, type: 'function', keepAlive: true, async: true })"
      )
    })

    test('generates default class and function exports', async () => {
      const defaultClassCode = await genProxyCodeV2(
        createUTSResult({
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
        })
      )
      const defaultFunctionCode = await genProxyCodeV2(
        createUTSResult({
          functions: [
            {
              ...createBridgeMethod('request', { type: 'function' }),
              is_default: true,
            },
          ],
        })
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
            createUTSResult({
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
            })
          )
      )

      expect(code).toContain(
        'export const UniViewElement = initUTSElementProxyClass('
      )
      expect(code).toContain('export const ViewController = initUTSProxyClass(')
    })
  })

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
    const res = await genProxyCode(pluginDir, options)
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
    expect(options.meta).toMatchSnapshot()
    expect(options.types).toMatchSnapshot()
  })
  test('genProxyCode cjs', async () => {
    expect(
      (
        await genProxyCode(pluginDir, {
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
        await genProxyCode(uniModuleDir, {
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
        await genProxyCode(uniModuleKeepAliveDir, {
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
      () => genProxyCode(pluginDir, options)
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
      () => genProxyCode(pluginDir, options)
    )
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
  })

  function genElementProxyCode(platform: UTSPlatform = 'app-android') {
    return genProxyCode(pluginElementProxyDir, {
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
})
