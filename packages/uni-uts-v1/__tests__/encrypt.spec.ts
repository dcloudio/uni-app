import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { compileEncrypt } from '../src/encrypt'

describe('compileEncrypt', () => {
  const originalEnv = { ...process.env }
  let tempDir: string
  let inputDir: string
  let outputDir: string
  let cacheDir: string
  let pluginDir: string

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uts-encrypt-'))
    inputDir = path.join(tempDir, 'input')
    outputDir = path.join(tempDir, 'output')
    cacheDir = path.join(tempDir, 'cache')
    pluginDir = path.join(inputDir, 'uni_modules', 'test-encrypt')
    fs.ensureDirSync(path.join(pluginDir, 'encrypt'))
    fs.ensureDirSync(path.join(pluginDir, 'utssdk'))

    process.env.NODE_ENV = 'development'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_OUTPUT_DIR = outputDir
    process.env.HX_DEPENDENCIES_DIR = cacheDir
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_UTS_USING_ROLLUP = 'true'
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    fs.removeSync(tempDir)
    jest.restoreAllMocks()
  })

  test('Android vapor 使用 JS code 缓存', async () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'native'
    const indexJs = path.join(
      cacheDir,
      'app-android',
      'uts',
      'uni_modules',
      'test-encrypt',
      'index.js'
    )
    fs.outputFileSync(indexJs, 'const encryptedPlugin = true\n')
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await compileEncrypt(pluginDir, true)

    expect(errorSpy).not.toHaveBeenCalled()
    expect(result.code).toContain('const encryptedPlugin = true')
    expect(result.code).toContain(
      "uni.requireUTSPlugin('uni_modules/test-encrypt')"
    )
  })

  test('Android vapor 缺少 JS code 缓存时提示重新打包基座', async () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'native'
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    await compileEncrypt(pluginDir, true)

    expect(errorSpy).toHaveBeenCalledWith(
      'uts插件[test-encrypt]不存在，请重新打包自定义基座'
    )
  })

  test('Android 原生模式使用 jar 缓存', async () => {
    delete process.env.UNI_APP_X_DOM2
    const indexJar = path.join(
      cacheDir,
      'app-android',
      'uts',
      'uni_modules',
      'test-encrypt',
      'index.jar'
    )
    fs.outputFileSync(indexJar, '')
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await compileEncrypt(pluginDir, true)

    expect(errorSpy).not.toHaveBeenCalled()
    expect(result.code).toBe('export default {}')
  })
})
