import fs from 'fs-extra'
import { tmpdir } from 'os'
import { resolve } from 'path'
import { compile } from '../src/index'
import { genManifestFile } from '../src/manifest'
import {
  getKotlinCompilerServer,
  getSwiftCompilerServer,
  getUTSCompiler,
} from '../src/utils'

jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  getKotlinCompilerServer: jest.fn(),
  getSwiftCompilerServer: jest.fn(),
  getUTSCompiler: jest.fn(),
}))
jest.mock('../src/manifest', () => {
  const manifest = jest.requireActual('../src/manifest')
  return { ...manifest, genManifestFile: jest.fn(manifest.genManifestFile) }
})

describe('UTS 插件编译提示', () => {
  const originalEnv = process.env
  const inputDir = resolve(__dirname, 'examples/uts')
  const pluginDir = resolve(inputDir, 'uni_modules/test-uts')
  const start = 'uts插件[test-uts]开始编译'
  const complete = 'uts插件[test-uts]编译完成'
  const failure = 'uts插件[test-uts]编译失败'
  const bundle = jest.fn()
  const compileFramework = jest.fn()
  let outputDir: string
  let log: jest.SpyInstance
  let error: jest.SpyInstance

  function writeSwiftFile() {
    fs.outputFileSync(
      resolve(outputDir, 'uni_modules/test-uts/utssdk/app-ios/index.swift'),
      ''
    )
    return {}
  }

  beforeEach(() => {
    outputDir = fs.mkdtempSync(resolve(tmpdir(), 'uts-compile-progress-'))
    process.env = {
      ...originalEnv,
      NODE_ENV: 'development',
      UNI_INPUT_DIR: inputDir,
      UNI_OUTPUT_DIR: outputDir,
      UNI_UTS_PLATFORM: 'app-ios',
      HX_DEPENDENCIES_DIR: '',
      UNI_HBUILDERX_LANGID: 'zh_CN',
      UNI_APP_X_TSC: 'false',
    }
    delete process.env.UNI_COMPILE_TARGET
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_PRODUCTION_TYPE
    bundle.mockReset().mockResolvedValue({})
    compileFramework.mockReset().mockResolvedValue({ code: 0 })
    jest.mocked(genManifestFile).mockClear()
    jest.mocked(getUTSCompiler).mockReturnValue({
      bundle,
      UTSTarget: { KOTLIN: 'kotlin', SWIFT: 'swift' },
    } as unknown as ReturnType<typeof getUTSCompiler>)
    jest.mocked(getSwiftCompilerServer).mockReturnValue({
      compile: compileFramework,
      compileCpp: jest.fn(),
    })
    log = jest.spyOn(console, 'log').mockImplementation(() => {})
    error = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    fs.removeSync(outputDir)
    process.env = originalEnv
    jest.restoreAllMocks()
  })

  test('生产模式双端只输出一组提示', async () => {
    process.env.NODE_ENV = 'production'
    process.env.UNI_UTS_PLATFORM = 'app'
    bundle.mockImplementation(async () => {
      expect(log.mock.calls).toEqual([[start]])
      return {}
    })

    await compile(pluginDir)

    expect(bundle.mock.calls.map(([target]) => target)).toEqual([
      'kotlin',
      'swift',
    ])
    expect(log.mock.calls).toEqual([[start], [complete]])
  })

  test('生产模式缺少入口时跳过进度提示', async () => {
    process.env.NODE_ENV = 'production'
    process.env.UNI_APP_X_TSC = 'true'
    process.env.UNI_APP_X_UVUE_DIR = resolve(outputDir, '.uvue')

    await compile(pluginDir)

    expect(bundle).not.toHaveBeenCalled()
    expect(log).not.toHaveBeenCalled()
  })

  test('生产编译抛错时只输出开始提示', async () => {
    process.env.NODE_ENV = 'production'
    bundle.mockRejectedValue(new Error('UTS syntax error'))

    await expect(compile(pluginDir)).rejects.toThrow('UTS syntax error')
    expect(log.mock.calls).toEqual([[start]])
  })

  test('Android 有 dex 时沿用原有的成功判定', async () => {
    process.env.UNI_UTS_PLATFORM = 'app-android'
    const nativeDir = resolve(
      outputDir,
      'uni_modules/test-uts/utssdk/app-android'
    )
    bundle.mockImplementation(async () => {
      expect(log.mock.calls).toEqual([[start]])
      fs.outputFileSync(resolve(nativeDir, 'index.kt'), '')
      return {}
    })
    const compileDex = jest.fn().mockImplementation(async () => {
      fs.outputFileSync(resolve(nativeDir, 'classes.dex'), '')
      return {}
    })
    jest.mocked(getKotlinCompilerServer).mockReturnValue({
      getKotlincHome: () => outputDir,
      getDefaultJar: () => [],
      compile: compileDex,
      compileCpp: jest.fn(),
    })

    await expect(compile(pluginDir)).resolves.toMatchObject({ errMsg: '' })
    expect(log.mock.calls).toEqual([[start], [complete]])
  })

  test('iOS 在 Swift 转译前打印开始，framework 编译后打印完成', async () => {
    bundle.mockImplementation(async () => {
      expect(log.mock.calls).toEqual([[start]])
      return writeSwiftFile()
    })
    compileFramework.mockImplementation(async () => {
      expect(log.mock.calls).toEqual([[start]])
      return { code: 0 }
    })

    await compile(pluginDir)

    expect(log.mock.calls).toEqual(
      process.platform === 'win32' ? [] : [[start], [complete]]
    )
  })

  test('iOS 缺少产物或成功结果时重试，编译成功后复用缓存', async () => {
    process.env.HX_USE_BASE_TYPE = 'standard'
    process.env.HX_Version = '5.0.0'
    process.env.HX_DEPENDENCIES_DIR = resolve(outputDir, 'cache')
    bundle
      .mockResolvedValueOnce({})
      .mockImplementation(async () => writeSwiftFile())
    compileFramework.mockResolvedValueOnce({})

    if (process.platform === 'win32') {
      await compile(pluginDir)
      expect(bundle).not.toHaveBeenCalled()
      expect(log).not.toHaveBeenCalled()
      return
    }
    for (let attempt = 0; attempt < 2; attempt++) {
      await expect(compile(pluginDir)).resolves.toMatchObject({
        errMsg: failure + '，无法使用',
      })
      expect(genManifestFile).not.toHaveBeenCalled()
    }
    expect(error.mock.calls).toEqual([[failure], [failure]])
    expect(compileFramework).toHaveBeenCalledTimes(1)
    await expect(compile(pluginDir)).resolves.toMatchObject({ errMsg: '' })
    await jest.mocked(genManifestFile).mock.results[0].value
    await compile(pluginDir)

    expect(bundle).toHaveBeenCalledTimes(3)
    expect(compileFramework).toHaveBeenCalledTimes(2)
    expect(log.mock.calls).toEqual([
      [start],
      [start],
      [start],
      [complete],
      ['uts插件[test-uts]文件未发生变化，跳过编译'],
    ])
  })
})
