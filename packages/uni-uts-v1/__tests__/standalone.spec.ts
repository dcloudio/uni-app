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
    ).toBe('import "./foo.uts"\n')
    expect(
      fs.readFileSync(path.resolve(pluginDir, 'utssdk/foo.uts'), 'utf8')
    ).toBe('export const foo = 1')
    expect(compilerOptions.sourceMap).toBe(true)
    expect(process.env.UNI_INPUT_DIR).toBe(path.resolve(outputDir))
    expect(process.env.UNI_PLATFORM).toBe('app')
    expect(process.env.UNI_UTS_TARGET_LANGUAGE).toBe('kotlin')
    expect(warnSpy).toHaveBeenCalledWith('src/foo.uts:1:1')
  })

  test('file 模式复制入口同级源码时保留相对目录并忽略隐藏目录和 uni_modules', async () => {
    const { inputFile, outputDir } = createFileFixture()

    fs.outputFileSync(
      path.resolve(path.dirname(inputFile), 'utils/helper.uts'),
      'export const helper = 1'
    )
    fs.outputFileSync(
      path.resolve(path.dirname(inputFile), '.cache/hidden.uts'),
      'export const hidden = 1'
    )
    fs.outputFileSync(
      path.resolve(
        path.dirname(inputFile),
        'uni_modules/test-plugin/utssdk/index.uts'
      ),
      'export const plugin = 1'
    )
    fs.outputFileSync(path.resolve(path.dirname(inputFile), 'image.png'), '')

    buildUniModuleMock.mockResolvedValueOnce(undefined)

    await buildStandaloneUTS({
      file: inputFile,
      outputDir,
    })

    const [, pluginDir] = buildUniModuleMock.mock.calls[0]
    const utsDir = path.resolve(pluginDir, 'utssdk')

    expect(fs.existsSync(path.resolve(utsDir, 'utils/helper.uts'))).toBe(true)
    expect(fs.existsSync(path.resolve(utsDir, '.cache'))).toBe(false)
    expect(fs.existsSync(path.resolve(utsDir, 'uni_modules'))).toBe(false)
    expect(fs.existsSync(path.resolve(utsDir, 'image.png'))).toBe(false)
  })

  test('file 模式显式传入 UNI_INPUT_DIR 时 index 只引入入口文件', async () => {
    const projectRoot = path.resolve(tempDir, 'project')
    const inputDir = path.resolve(projectRoot, 'src')
    const inputFile = path.resolve(inputDir, 'pages/foo.uts')
    const outputDir = path.resolve(projectRoot, 'dist/dev/app')

    fs.outputFileSync(path.resolve(projectRoot, 'manifest.json'), '{}')
    fs.outputFileSync(inputFile, 'export const foo = 1')
    fs.outputFileSync(
      path.resolve(inputDir, 'pages/utils/helper.uts'),
      'export const helper = 1'
    )

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    buildUniModuleMock.mockImplementationOnce(async (_platform, pluginDir) => {
      console.warn(
        `${path.resolve(pluginDir, 'utssdk/pages/utils/helper.uts')}:2:4`
      )
      return undefined
    })

    await buildStandaloneUTS({
      file: inputFile,
      inputDir,
      outputDir,
    })

    const [, pluginDir] = buildUniModuleMock.mock.calls[0]
    const utsDir = path.resolve(pluginDir, 'utssdk')

    expect(fs.readFileSync(path.resolve(utsDir, 'index.uts'), 'utf8')).toBe(
      'import "./pages/foo.uts"\n'
    )
    expect(fs.existsSync(path.resolve(utsDir, 'pages/foo.uts'))).toBe(true)
    expect(fs.existsSync(path.resolve(utsDir, 'pages/utils/helper.uts'))).toBe(
      true
    )
    expect(warnSpy).toHaveBeenCalledWith('src/pages/utils/helper.uts:2:4')
  })

  test('file 模式命中 UNI_INPUT_DIR 下 uni_modules 文件时直接编译对应插件', async () => {
    const projectRoot = path.resolve(tempDir, 'project')
    const inputDir = path.resolve(projectRoot, 'src')
    const outputDir = path.resolve(projectRoot, 'dist/dev/app')
    const pluginDir = path.resolve(inputDir, 'uni_modules/test-plugin')
    const inputFile = path.resolve(pluginDir, 'utssdk/index.uts')

    fs.outputFileSync(path.resolve(projectRoot, 'manifest.json'), '{}')
    fs.outputFileSync(inputFile, 'export const plugin = 1')

    buildUniModuleMock.mockResolvedValueOnce(undefined)

    await buildStandaloneUTS({
      file: inputFile,
      inputDir,
      outputDir,
    })

    const [, calledPluginDir, , compilerOptions] =
      buildUniModuleMock.mock.calls[0]

    expect(calledPluginDir).toBe(path.resolve(pluginDir))
    expect(compilerOptions.sourceMap).toBe(true)
    expect(
      normalizePath(calledPluginDir).includes('/uni_modules/standalone-uts-')
    ).toBe(false)
    expect(process.env.UNI_INPUT_DIR).toBe(path.resolve(inputDir))
  })

  test('uni_module 模式会按 ios 平台初始化编译参数并强制开启 sourcemap', async () => {
    const { pluginDir, projectRoot } = createUniModuleFixture()

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
    const depFile = path.resolve(path.dirname(inputFile), 'bar.uts')
    const error = new Error('compile failed') as Error & {
      customPrint?: () => void
    }
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    fs.outputFileSync(depFile, 'export const bar = 1')
    buildUniModuleMock.mockImplementationOnce(async (_platform, pluginDir) => {
      error.customPrint = () => {
        console.error(`${path.resolve(pluginDir, 'utssdk/bar.uts')}:9:3`)
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

    expect(errorSpy).toHaveBeenCalledWith('src/bar.uts:9:3')
  })
})
