import fs from 'fs-extra'
import { tmpdir } from 'os'
import { resolve } from 'path'
import { compile } from '../src/index'
import { genManifestFile, initCheckOptionsEnv } from '../src/manifest'
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

  test('本地缺少编译环境时，取消清理标记后仍可使用云端缓存', async () => {
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.HX_USE_BASE_TYPE = 'custom'
    process.env.HX_Version = '5.0.0'
    process.env.HX_DEPENDENCIES_DIR = resolve(outputDir, 'cache')
    const cachedPluginDir = resolve(
      process.env.HX_DEPENDENCIES_DIR,
      'app-android/uts/uni_modules/test-uts'
    )
    await genManifestFile('app-android', {
      pluginDir,
      pluginRelativeDir: 'uni_modules/test-uts',
      is_uni_modules: true,
      cacheDir: process.env.HX_DEPENDENCIES_DIR,
      env: initCheckOptionsEnv(),
    })
    fs.writeFileSync(resolve(cachedPluginDir, 'classes.dex'), 'cloud-dex')
    const oldManifest = fs.readFileSync(
      resolve(cachedPluginDir, 'manifest.json')
    )
    const nativeDir = resolve(
      outputDir,
      'uni_modules/test-uts/utssdk/app-android'
    )
    bundle.mockImplementation(async () => {
      fs.outputFileSync(resolve(nativeDir, 'index.kt'), '')
      return {}
    })
    jest.mocked(getKotlinCompilerServer).mockReturnValue(undefined)

    process.env.HX_IS_CLEAN_CACHE = 'true'
    await expect(compile(pluginDir)).rejects.toThrow(
      '正在安装 uts Android 运行扩展'
    )
    expect(fs.readFileSync(resolve(cachedPluginDir, 'manifest.json'))).toEqual(
      oldManifest
    )
    expect(
      fs.readFileSync(resolve(cachedPluginDir, 'classes.dex'), 'utf8')
    ).toBe('cloud-dex')

    delete process.env.HX_IS_CLEAN_CACHE
    await expect(compile(pluginDir)).resolves.toMatchObject({ errMsg: '' })
    expect(bundle).toHaveBeenCalledTimes(1)
    expect(fs.readFileSync(resolve(nativeDir, 'classes.dex'), 'utf8')).toBe(
      'cloud-dex'
    )
    expect(log).toHaveBeenCalledWith(
      'uts插件[test-uts]文件未发生变化，跳过编译'
    )
  })

  test.each(['true', 'false'] as const)(
    'iOS 返回编译失败时按清理标记保留缓存（%s）',
    async (cleanCache) => {
      if (process.platform === 'win32') return
      const pluginDir = resolve(outputDir, 'project/uni_modules/test-uts')
      fs.copySync(resolve(inputDir, 'uni_modules/test-uts'), pluginDir)
      fs.outputJsonSync(resolve(pluginDir, 'utssdk/app-ios/config.json'), {
        deploymentTarget: '12',
      })
      process.env.UNI_INPUT_DIR = resolve(outputDir, 'project')
      process.env.HX_USE_BASE_TYPE = 'custom'
      process.env.HX_Version = '5.0.0'
      process.env.HX_DEPENDENCIES_DIR = resolve(outputDir, 'cache')
      const options = {
        pluginDir,
        pluginRelativeDir: 'uni_modules/test-uts',
        is_uni_modules: true,
        cacheDir: process.env.HX_DEPENDENCIES_DIR,
        env: initCheckOptionsEnv(),
      }
      await genManifestFile('app-ios', {
        ...options,
        env: cleanCache === 'true' ? options.env : { compilerVersion: 'old' },
      })
      const cachedPluginDir = resolve(
        options.cacheDir,
        'app-ios/uts',
        options.pluginRelativeDir
      )
      const manifestFile = resolve(cachedPluginDir, 'manifest.json')
      const configFile = resolve(cachedPluginDir, 'config.json')
      fs.writeFileSync(configFile, '{"cloud":true}')
      const oldManifest = fs.readFileSync(manifestFile)
      jest.mocked(genManifestFile).mockClear()

      process.env.HX_IS_CLEAN_CACHE = cleanCache
      bundle.mockImplementation(async () => writeSwiftFile())
      compileFramework.mockResolvedValue({ code: 1, msg: '本地原生编译失败' })
      await expect(compile(pluginDir)).resolves.toMatchObject({
        errMsg: failure + '，无法使用',
      })
      expect(genManifestFile).not.toHaveBeenCalled()
      if (cleanCache === 'false') {
        expect(fs.existsSync(manifestFile)).toBe(false)
        return
      }

      expect(fs.readFileSync(manifestFile)).toEqual(oldManifest)
      expect(fs.readFileSync(configFile, 'utf8')).toBe('{"cloud":true}')
      process.env.HX_IS_CLEAN_CACHE = 'false'
      await expect(compile(pluginDir)).resolves.toMatchObject({ errMsg: '' })
      expect(compileFramework).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenCalledWith(
        'uts插件[test-uts]文件未发生变化，跳过编译'
      )
      expect(
        fs.readFileSync(
          resolve(outputDir, 'uni_modules/test-uts/utssdk/app-ios/config.json'),
          'utf8'
        )
      ).toBe('{"cloud":true}')

      process.env.HX_IS_CLEAN_CACHE = 'true'
      compileFramework.mockResolvedValue({ code: 0 })
      await expect(compile(pluginDir)).resolves.toMatchObject({ errMsg: '' })
      await jest.mocked(genManifestFile).mock.results[0].value
      expect(fs.readJsonSync(configFile)).toEqual({ deploymentTarget: '12' })
    }
  )
})
