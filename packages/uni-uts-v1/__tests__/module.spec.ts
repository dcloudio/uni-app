import fs from 'fs-extra'
import os from 'os'
import { join } from 'path'
import { compile } from '../src/index'
import { getCompiler } from '../src/compiler'
import { runKotlinProd } from '../src/kotlin'
import { normalizePath } from '../src/shared'
import * as utils from '../src/utils'

jest.mock('../src/compiler', () => ({ getCompiler: jest.fn() }))
jest.mock('../src/code', () => ({
  ...jest.requireActual('../src/code'),
  prepareProxyCodeAndFillOptions: jest.fn(async (_module, options) => {
    options.types = {}
    return []
  }),
}))

describe('uni_modules native module proxy', () => {
  const originalEnv = process.env
  const root = fs.mkdtempSync(join(os.tmpdir(), 'uts-module-'))
  const inputDir = join(root, 'input')
  const pluginDir = join(inputDir, 'uni_modules/test-uts')
  const nativeEntry = join(pluginDir, 'utssdk/index.uts')
  const uvueDir = join(root, '.uvue')
  const uvuePluginDir = join(uvueDir, 'app-android/uni_modules/test-uts')
  const runProd = jest.fn()
  const bridge = {
    uts_bridge_name: 'TestBridge',
    functions: [
      {
        name: 'test',
        method_id: 17,
        type: 'function',
        keep_alive: false,
        async: false,
      },
    ],
    classes: [],
    interfaces: [],
  }

  beforeAll(() => {
    fs.outputJsonSync(join(pluginDir, 'package.json'), { id: 'test-uts' })
    fs.outputFileSync(
      nativeEntry,
      'export function test(): string { return "test" }'
    )
    // 兼容之前构建遗留的 JS 入口，显式原生入口必须优先。
    fs.outputFileSync(
      join(pluginDir, 'index.module.uts'),
      "import '@/uni_modules/test-uts?uts-proxy'"
    )
    fs.copySync(pluginDir, uvuePluginDir)
  })

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
      UNI_INPUT_DIR: inputDir,
      UNI_OUTPUT_DIR: join(root, 'output'),
      UNI_APP_X_UVUE_DIR: uvueDir,
      UNI_UTS_PLATFORM: 'app-android',
      UNI_COMPILE_TARGET: 'uni_modules',
      UNI_APP_X: 'true',
      UNI_APP_X_DOM2: 'true',
      UNI_APP_X_UVUE_SCRIPT_ENGINE: 'js',
      HX_DEPENDENCIES_DIR: '',
    }
    delete process.env.UNI_APP_PRODUCTION_TYPE
    delete process.env.UNI_APP_X_TSC
    runProd.mockReset().mockResolvedValue({
      uts_bridge: bridge,
      inject_apis: ['uni.test'],
      scoped_slots: ['test-slot'],
      custom_elements: { 'test-element': 'TestElement' },
    })
    jest.mocked(getCompiler).mockReturnValue({ runProd } as any)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    process.env = originalEnv
  })
  afterAll(() => fs.removeSync(root))

  test('使用真实入口编译 module 和 bridge，代理注册路径不包含临时目录', async () => {
    const result = await compile(pluginDir, {
      isX: true,
      isPlugin: true,
      isSingleThread: true,
      module: { nativeEntry },
      proxyCodeFormat: 'cjs',
    })
    expect(runProd).toHaveBeenCalledTimes(1)
    expect(runProd.mock.calls[0][0]).toBe(normalizePath(nativeEntry))
    expect(runProd.mock.calls[0][1]).toMatchObject({
      isModule: true,
      isPlugin: true,
      outFilename: '',
    })
    expect(result?.dir).toBe(
      normalizePath(join(root, 'output/uni_modules/test-uts'))
    )
    expect(result?.code).toContain('methodId: 17')
    expect(result?.code).toContain(
      "uni.registerUTSPlugin('uni_modules/test-uts', exports)"
    )
    expect(result?.code).not.toContain('?uts-proxy')
    expect(result?.inject_apis).toEqual(['uni.test'])
    expect(result?.scoped_slots).toEqual(['test-slot'])
    expect(result?.custom_elements).toEqual({ 'test-element': 'TestElement' })
  })

  test('Android 蒸汽模式仅内置插件生成 V3 懒加载代理', async () => {
    process.env.UNI_UTS_MODULE_TYPE = 'built-in'
    const result = await compile(pluginDir, {
      isX: true,
      isPlugin: true,
      isSingleThread: true,
      module: { nativeEntry },
      proxyCodeFormat: 'cjs',
    })
    expect(result?.code).toContain('globalThis.__utsRequireModule(')
    expect(result?.code).not.toContain('initUTSProxyFunction')
  })

  test('旧版代理也支持 module 注册产物', async () => {
    delete process.env.UNI_APP_X_DOM2
    const result = await compile(pluginDir, {
      isX: false,
      isPlugin: true,
      isSingleThread: true,
      module: { nativeEntry },
      proxyCodeFormat: 'cjs',
    })
    expect(result?.code).toContain(
      "uni.registerUTSPlugin('uni_modules/test-uts', exports)"
    )
  })

  test('仅导出常量的 module 仍生成代理', async () => {
    runProd.mockResolvedValue({
      uts_bridge: {
        ...bridge,
        functions: [],
        variables: [{ name: 'version', value: 1 }],
      },
    })
    const result = await compile(pluginDir, {
      isX: true,
      isPlugin: true,
      isSingleThread: true,
      module: { nativeEntry },
      proxyCodeFormat: 'cjs',
    })
    expect(result?.code).toContain('exports.version = 1')
    expect(result?.code).toContain('uni.registerUTSPlugin')
  })

  test('前端组件 module 保留原来的入口和编译模式', async () => {
    runProd.mockResolvedValue({})
    const result = await compile(uvuePluginDir, {
      isX: true,
      isPlugin: false,
      isSingleThread: true,
    })
    expect(runProd.mock.calls[0][0]).toBe(
      normalizePath(join(uvuePluginDir, 'index.module.uts'))
    )
    expect(runProd.mock.calls[0][1]).toMatchObject({
      isModule: true,
      isPlugin: false,
      outFilename: 'uni_modules/test-uts/utssdk/app-android/index.kt',
    })
    expect(result?.code).toBe('')
    expect(result?.dir).toBe(
      normalizePath(join(root, 'output/uni_modules/test-uts'))
    )
  })

  test('内置 TSC 插件的 C++ 与 R8 配置写入 Android 插件目录，WGT 只生成 JS', async () => {
    process.env.UNI_APP_X_TSC = 'true'
    process.env.UNI_UTS_MODULE_TYPE = 'built-in'
    const outputDir = join(root, 'V3 输出 [app](test)')
    process.env.UNI_OUTPUT_DIR = outputDir
    const bundle = jest.fn().mockResolvedValue({
      uts_bridge: {
        ...bridge,
        uts_bridge_name: '_test-uts',
        native: {
          version: 3,
          methods: [
            {
              method_id: 17,
              required: 0,
              params: [],
              receiver: false,
              completion: false,
              result: 'string',
            },
          ],
        },
      },
    })
    jest
      .spyOn(utils, 'getUTSCompiler')
      .mockReturnValue({ bundle, UTSTarget: { KOTLIN: 'kotlin' } } as any)
    const resources = jest
      .spyOn(utils, 'genUTSPlatformResource')
      .mockImplementation(() => {})
    const options = {
      isX: true,
      isModule: true,
      isPlugin: true,
      isSingleThread: true,
      sourceMap: false,
      components: {},
      uniModules: [],
      uniModuleId: 'test-uts',
      hookClass: '',
    }
    const cppDir = join(
      outputDir,
      'uni_modules/test-uts/utssdk/app-android/cpp'
    )
    await runKotlinProd(nativeEntry, { ...options, noEmit: true })
    expect(fs.existsSync(cppDir)).toBe(false)
    await runKotlinProd(nativeEntry, options)
    expect(bundle.mock.calls[1][1].output).toMatchObject({
      utsBridgeV3: true,
      utsBridgeName: '_test-uts',
    })
    expect(resources).toHaveBeenCalledWith(
      nativeEntry,
      expect.objectContaining({ utsBridge: 'v3' })
    )
    expect(
      fs.readFileSync(join(cppDir, 'UniUTSBridgeV3.cpp'), 'utf8')
    ).toContain('"_test-uts"')
    expect(fs.existsSync(join(cppDir, 'UniUTSBridgeV3.pro'))).toBe(true)
    bundle.mockResolvedValue({ uts_bridge: bridge })
    await expect(runKotlinProd(nativeEntry, options)).rejects.toThrow(/V3/)
    expect(fs.existsSync(join(cppDir, 'UniUTSBridgeV3.cpp'))).toBe(true)
    delete process.env.UNI_UTS_MODULE_TYPE
    await runKotlinProd(nativeEntry, options)
    expect(fs.existsSync(join(cppDir, 'UniUTSBridgeV3.cpp'))).toBe(false)
    expect(fs.existsSync(join(cppDir, 'UniUTSBridgeV3.pro'))).toBe(false)
  })

  test('V3 注册迁移保留配置值和 V2 的序列化格式', () => {
    const rootDir = join(root, 'bridge-config')
    const rel = 'uni_modules/test-uts'
    const dir = join(rel, 'utssdk/app-android')
    const input = join(rootDir, 'input')
    const output = join(rootDir, 'output')
    const source = join(input, dir, 'config.json')
    const generated = join(output, dir, 'config.json')
    const generate = (version: true | 'v3') =>
      utils.genConfigJson(
        'app-android',
        true,
        '',
        {},
        {},
        rel,
        true,
        input,
        output,
        '',
        undefined,
        version
      )
    fs.outputFileSync(
      source,
      '{/* dependency */ "minSdkVersion": "21", "dependencies": ["a:b:1"]}'
    )
    generate(true)
    const expected = fs.readJsonSync(generated)
    expect(expected.utsMethodRegister).toBeDefined()
    delete expected.utsMethodRegister
    generate('v3')
    expect(fs.readFileSync(generated, 'utf8')).toBe(
      JSON.stringify(expected, null, 2)
    )
    fs.unlinkSync(source)
    generate(true)
    generate('v3')
    expect(fs.existsSync(generated)).toBe(false)
  })

  test.each(['methods', 'constants'])(
    '原生 module 使用 TSC 入口，按需生成注册配置和资源（%s）',
    async (kind) => {
      process.env.UNI_APP_X_TSC = 'true'
      const withMethods = kind === 'methods'
      const bundle = jest.fn().mockResolvedValue({
        uts_bridge: withMethods
          ? bridge
          : {
              ...bridge,
              functions: [],
              variables: [{ name: 'version', value: 1 }],
            },
      })
      jest
        .spyOn(utils, 'getUTSCompiler')
        .mockReturnValue({ bundle, UTSTarget: { KOTLIN: 'kotlin' } } as any)
      const resources = jest
        .spyOn(utils, 'genUTSPlatformResource')
        .mockImplementation(() => {})
      await runKotlinProd(nativeEntry, {
        isX: true,
        isModule: true,
        isPlugin: true,
        isSingleThread: true,
        sourceMap: false,
        components: {},
        uniModules: [],
        uniModuleId: 'test-uts',
        hookClass: '',
      })
      expect(bundle.mock.calls[0][1]).toMatchObject({
        input: {
          root: join(uvueDir, 'app-android'),
          filename: normalizePath(join(uvuePluginDir, 'utssdk/index.uts')),
        },
        output: { isModule: true, isPlugin: true },
      })
      expect(resources).toHaveBeenCalledWith(
        nativeEntry,
        expect.objectContaining({
          utsBridge: withMethods,
          pluginId: 'test-uts',
        })
      )
    }
  )
})
