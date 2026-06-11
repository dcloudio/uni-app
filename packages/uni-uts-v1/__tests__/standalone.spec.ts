import fs from 'fs-extra'
import { tmpdir } from 'os'
import path from 'path'
import { buildStandaloneUTS } from '../src/standalone/uts'
import { buildUniModule } from '../src'

declare global {
  interface Require {
    main: NodeJS.Module | undefined
  }
}

jest.mock('../src', () => ({
  buildUniModule: jest.fn(),
}))

const buildUniModuleMock = buildUniModule as jest.MockedFunction<
  typeof buildUniModule
>
const originalEnv = { ...process.env }

function normalizePath(fileName: string) {
  return fileName.replace(/\\/g, '/')
}

describe('standalone uts', () => {
  let tempDir = ''

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(tmpdir(), 'uni-uts-standalone-'))
    buildUniModuleMock.mockReset()
  })

  afterEach(() => {
    fs.removeSync(tempDir)
    process.env = { ...originalEnv }
    jest.restoreAllMocks()
  })

  function createFileFixture() {
    const projectRoot = path.resolve(tempDir, 'project')
    const inputFile = path.resolve(projectRoot, 'src/foo.uts')
    const outputDir = path.resolve(projectRoot, 'dist/dev/app')

    fs.outputFileSync(path.resolve(projectRoot, 'manifest.json'), '{}')
    fs.outputFileSync(inputFile, 'export const foo = 1')

    return {
      inputFile,
      outputDir,
    }
  }

  function createUniModuleFixture() {
    const projectRoot = path.resolve(tempDir, 'project')
    const pluginDir = path.resolve(projectRoot, 'uni_modules/test-plugin')

    fs.outputFileSync(path.resolve(pluginDir, 'utssdk/index.uts'), '')

    return {
      pluginDir,
      projectRoot,
    }
  }

  test('file 模式会创建临时 uni_modules 插件并强制开启 sourcemap', async () => {
    const { inputFile, outputDir } = createFileFixture()
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    buildUniModuleMock.mockImplementationOnce(async (_platform, pluginDir) => {
      console.warn(
        `${path.resolve(pluginDir, 'utssdk/app-android/index.uts.ts')}:1:1`
      )
      return undefined
    })

    await expect(
      buildStandaloneUTS({
        file: inputFile,
        outputDir,
      })
    ).resolves.toBeUndefined()

    const [platform, pluginDir, , compilerOptions] =
      buildUniModuleMock.mock.calls[0]

    expect(platform).toBe('app-android')
    expect(normalizePath(pluginDir)).toContain(
      '/uni_modules/standalone-uts-foo-'
    )
    expect(
      fs.readFileSync(path.resolve(pluginDir, 'utssdk/index.uts'), 'utf8')
    ).toBe('export const foo = 1')
    expect(compilerOptions.sourceMap).toBe(true)
    expect(process.env.UNI_INPUT_DIR).toBe(path.resolve(outputDir))
    expect(process.env.UNI_PLATFORM).toBe('app')
    expect(process.env.UNI_UTS_TARGET_LANGUAGE).toBe('kotlin')
    expect(warnSpy).toHaveBeenCalledWith('src/foo.uts:1:1')
  })

  test('uni_module 模式会按 ios 平台初始化编译参数', async () => {
    const { pluginDir, projectRoot } = createUniModuleFixture()

    process.env.UNI_APP_SOURCEMAP = 'true'
    buildUniModuleMock.mockResolvedValueOnce(undefined)

    await expect(
      buildStandaloneUTS({
        uniModule: pluginDir,
        platform: 'ios',
      })
    ).resolves.toBeUndefined()

    const [platform, calledPluginDir, , compilerOptions] =
      buildUniModuleMock.mock.calls[0]

    expect(platform).toBe('app-ios')
    expect(calledPluginDir).toBe(path.resolve(pluginDir))
    expect(compilerOptions.sourceMap).toBe(true)
    expect(process.env.UNI_INPUT_DIR).toBe(path.resolve(projectRoot))
    expect(normalizePath(process.env.UNI_OUTPUT_DIR!)).toBe(
      normalizePath(path.resolve(projectRoot, 'dist/dev/app'))
    )
    expect(process.env.UNI_PLATFORM).toBe('app')
    expect(process.env.UNI_UTS_TARGET_LANGUAGE).toBe('swift')
  })

  test('file 模式编译失败时 customPrint 会输出原始文件路径', async () => {
    const { inputFile, outputDir } = createFileFixture()
    const error = new Error('compile failed') as Error & {
      customPrint?: () => void
    }
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    buildUniModuleMock.mockImplementationOnce(async (_platform, pluginDir) => {
      error.customPrint = () => {
        console.error(`${path.resolve(pluginDir, 'utssdk/index.uts')}:9:3`)
      }
      throw error
    })

    await expect(
      buildStandaloneUTS({
        file: inputFile,
        outputDir,
      })
    ).rejects.toBe(error)

    error.customPrint!()

    expect(errorSpy).toHaveBeenCalledWith('src/foo.uts:9:3')
  })
})
