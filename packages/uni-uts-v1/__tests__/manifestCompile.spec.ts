import { resolve } from 'path'
import { compile } from '../src/index'
import { getCompiler } from '../src/compiler'
import { genManifestFile, storeSourceMap } from '../src/manifest'

jest.mock('../src/compiler', () => ({ getCompiler: jest.fn() }))
jest.mock('../src/code', () => ({
  ...jest.requireActual('../src/code'),
  prepareProxyCodeAndFillOptions: jest.fn(async (_module, options) => {
    options.types = {}
    return []
  }),
}))
jest.mock('../src/manifest', () => ({
  ...jest.requireActual('../src/manifest'),
  genManifestFile: jest.fn().mockResolvedValue(true),
  storeSourceMap: jest.fn(),
}))

describe.each(['app-android', 'app-ios'] as const)(
  '%s 生产编译缓存清单',
  (platform) => {
    const originalEnv = process.env
    const inputDir = resolve(__dirname, 'examples/uts')
    const pluginDir = resolve(inputDir, 'uni_modules/test-uts')
    const runProd = jest.fn()

    beforeEach(() => {
      process.env = {
        ...originalEnv,
        NODE_ENV: 'production',
        UNI_INPUT_DIR: inputDir,
        UNI_OUTPUT_DIR: resolve(inputDir, 'unpackage/dist/build', platform),
        UNI_UTS_PLATFORM: platform,
        HX_DEPENDENCIES_DIR: resolve(inputDir, 'unpackage/cache'),
      }
      delete process.env.UNI_APP_PACK_TYPE
      delete process.env.UNI_APP_PRODUCTION_TYPE
      delete process.env.UNI_COMPILE_TARGET
      delete process.env.UNI_APP_X_DOM2
      jest.clearAllMocks()
      runProd.mockResolvedValue({})
      jest.mocked(getCompiler).mockReturnValue({ runProd } as any)
    })

    afterEach(() => {
      process.env = originalEnv
    })

    test.each([
      { name: '自定义基座', packType: 'debug', generate: true },
      { name: '未指定打包类型', generate: true },
      { name: '正式发行', packType: 'release', generate: false },
      {
        name: '本地打包资源',
        productionType: 'LOCAL_PACKAGING',
        generate: false,
      },
      {
        name: '带 debug 参数的本地打包资源',
        packType: 'debug',
        productionType: 'LOCAL_PACKAGING',
        generate: false,
      },
      { name: 'WGT', productionType: 'WGT', generate: false },
      {
        name: '蒸汽模式 WGT',
        productionType: 'WGT',
        vapor: true,
        generate: false,
      },
    ])('$name', async ({ packType, productionType, vapor, generate }) => {
      if (packType) {
        process.env.UNI_APP_PACK_TYPE = packType as 'debug' | 'release'
      }
      if (productionType) {
        process.env.UNI_APP_PRODUCTION_TYPE = productionType as
          | 'WGT'
          | 'LOCAL_PACKAGING'
      }
      if (vapor) {
        process.env.UNI_APP_X_DOM2 = 'true'
      }

      await compile(pluginDir)

      expect(genManifestFile).toHaveBeenCalledTimes(generate ? 1 : 0)
      if (generate) {
        expect(genManifestFile).toHaveBeenCalledWith(
          platform,
          expect.objectContaining({ pluginDir })
        )
      }
      // 发行和本地资源仍编译原生源码并保存 sourcemap，WGT 保持原有行为。
      if (productionType !== 'WGT') {
        expect(runProd).toHaveBeenCalledTimes(1)
        expect(storeSourceMap).toHaveBeenCalledTimes(1)
      }
    })
  }
)
