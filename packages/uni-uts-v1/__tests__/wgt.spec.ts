import { resolve } from 'path'
import { compile } from '../src/index'
import { getCompiler } from '../src/compiler'

jest.mock('../src/compiler', () => ({
  getCompiler: jest.fn(),
}))
jest.mock('../src/code', () => ({
  ...jest.requireActual('../src/code'),
  prepareProxyCodeAndFillOptions: jest.fn(
    async (_module, options: Record<string, any>) => {
      options.types = {}
      return []
    }
  ),
}))

describe('WGT UTS proxy', () => {
  const originalEnv = process.env
  const inputDir = resolve(__dirname, 'examples/uts')
  const pluginDir = resolve(inputDir, 'uni_modules/test-uts')
  const runProd = jest.fn()

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NODE_ENV: 'production',
      UNI_INPUT_DIR: inputDir,
      UNI_OUTPUT_DIR: resolve(inputDir, 'unpackage/dist/build/app-android'),
      UNI_UTS_PLATFORM: 'app-android',
      UNI_APP_X: 'true',
      UNI_APP_X_DOM2: 'true',
      UNI_APP_PRODUCTION_TYPE: 'WGT',
      HX_DEPENDENCIES_DIR: '',
    }
    delete process.env.UNI_COMPILE_TARGET
    delete process.env.UNI_COMPILE_EXT_API_TYPE
    delete process.env.UNI_COMPILE_EXT_API_PROXY_CODE
    delete process.env.UNI_COMPILE_EXT_API_PLUGIN_ID
    runProd.mockReset().mockResolvedValue({
      inject_apis: ['uni.test'],
      scoped_slots: ['test'],
      custom_elements: { test: 'TestElement' },
      uts_bridge: {
        uts_bridge_name: 'TestBridge',
        functions: [
          {
            name: 'createTest',
            method_id: 17,
            type: 'function',
            keep_alive: false,
            async: false,
          },
        ],
        classes: [],
        interfaces: [],
      },
    })
    jest.mocked(getCompiler).mockReturnValue({ runProd } as any)
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('Android 蒸汽模式使用转译结果生成带 methodId 的导出代理', async () => {
    const result = await compile(pluginDir, {
      isX: true,
      isPlugin: true,
      isSingleThread: true,
    })
    expect(runProd).toHaveBeenCalledTimes(1)
    expect(runProd.mock.calls[0][1]).toMatchObject({ noEmit: true })
    expect(result?.code).toContain('export const createTest =')
    expect(result?.code).toContain('methodId: 17')
    expect(result?.code).toContain("const moduleName = 'TestBridge'")
    expect(result?.inject_apis).toEqual([])
    expect(result?.scoped_slots).toEqual([])
    expect(result?.custom_elements).toEqual({})
  })

  test.each(['app-android', 'app-ios'] as const)(
    '%s 非蒸汽模式保持跳过原生转译',
    async (platform) => {
      delete process.env.UNI_APP_X_DOM2
      process.env.UNI_UTS_PLATFORM = platform
      const result = await compile(pluginDir, {
        isX: true,
        isPlugin: true,
        isSingleThread: true,
      })
      expect(runProd).not.toHaveBeenCalled()
      expect(result?.code).toBeTruthy()
    }
  )

  test('ext-api 组件继续复用前置编译的代理代码', async () => {
    process.env.UNI_COMPILE_TARGET = 'ext-api'
    process.env.UNI_COMPILE_EXT_API_TYPE = 'components'
    process.env.UNI_COMPILE_EXT_API_PROXY_CODE =
      'export const createTest = uni.test'
    const result = await compile(pluginDir, {
      isX: true,
      isPlugin: true,
      isSingleThread: true,
    })
    expect(runProd).not.toHaveBeenCalled()
    expect(result?.code).toBe(process.env.UNI_COMPILE_EXT_API_PROXY_CODE)
  })
})
