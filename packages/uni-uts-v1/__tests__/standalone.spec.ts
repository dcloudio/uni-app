import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import { buildUTSFile, buildUniModule, buildUniModules } from '../src'

const mockRunDev = jest.fn()
const mockRunProd = jest.fn()
const mockDeactivate = jest.fn()

jest.mock('../src/compiler', () => ({
  getCompiler: jest.fn(() => ({
    checkVersionTips: jest.fn(() => ''),
    runDev: mockRunDev,
    runProd: mockRunProd,
  })),
}))

jest.mock('../src/utils', () => {
  const actual = jest.requireActual('../src/utils')
  return {
    ...actual,
    getKotlinCompilerServer: jest.fn(() => ({
      deactivate: mockDeactivate,
    })),
  }
})

jest.mock('../src/manifest', () => ({
  checkCompile: jest.fn(async () => ({ expired: true, files: [] })),
  clearManifestFiles: jest.fn(),
  genManifestFile: jest.fn(),
  initCheckOptionsEnv: jest.fn(() => ({})),
  restoreDex: jest.fn(),
  restoreSourceMap: jest.fn(),
  storeSourceMap: jest.fn(),
}))

const STANDALONE_ENV_KEYS = [
  'UNI_INPUT_DIR',
  'UNI_OUTPUT_DIR',
  'UNI_UTS_PLATFORM',
  'UNI_APP_X',
  'UNI_APP_X_DOM2',
  'NODE_ENV',
  'HX_DEPENDENCIES_DIR',
  'UNI_COMPILE_TARGET',
  'UNI_PLATFORM',
  'UNI_SUB_PLATFORM',
  'UNI_HBUILDERX_PLUGINS',
] as const

function createTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uts-standalone-'))
}

function createCompilerOptions() {
  return {
    isX: true,
    isPlugin: true,
    isSingleThread: true,
  }
}

describe('standalone uts', () => {
  let tempDir: string
  let consoleError: jest.SpyInstance
  let oldEnv: Record<string, string | undefined>

  beforeEach(() => {
    tempDir = createTempDir()
    oldEnv = saveEnv()
    mockRunDev.mockReset()
    mockRunProd.mockReset()
    mockDeactivate.mockReset()
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
    restoreEnv(oldEnv)
    fs.removeSync(tempDir)
  })

  test('buildUTSFile uses external env success', async () => {
    const sourceRoot = path.resolve(tempDir, 'src')
    const workDir = path.resolve(tempDir, 'uni-uts-v1-standalone')
    const sourceFile = path.resolve(sourceRoot, 'demo.uts')
    fs.outputFileSync(
      sourceFile,
      `export function add(a: number, b: number): number { return a + b }\n`
    )
    fs.outputFileSync(path.resolve(sourceRoot, 'config.json'), '{}')
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve(tempDir, 'hbx-plugins')
    setStandaloneEnv(workDir, {
      UNI_APP_X_DOM2: 'false',
    })

    mockRunDev.mockImplementation(async (filename: string) => {
      expect(process.env.UNI_OUTPUT_DIR).toBe(path.resolve(workDir, 'output'))
      expect(process.env.UNI_INPUT_DIR).toBe(path.resolve(workDir, 'input'))
      expect(process.env.UNI_UTS_PLATFORM).toBe('app-android')
      expect(process.env.UNI_APP_X_DOM2).toBe('false')
      expect(normalize(filename)).toContain(
        '/output/utssdk/__single_uts_file__/app-android/index.uts'
      )
      return { type: 'kotlin', changed: ['index.kt'], deps: [] }
    })

    const oldNodeEnv = process.env.NODE_ENV
    const result = await buildUTSFile(
      'app-android',
      sourceFile,
      { workDir, sourceRoot },
      createCompilerOptions()
    )

    expect(process.env.NODE_ENV).toBe(oldNodeEnv)
    expect(result?.errMsg).toBe('')
    expect(mockRunDev).toHaveBeenCalledTimes(1)
    expect(mockDeactivate).toHaveBeenCalledTimes(1)
    expect(
      fs.readFileSync(
        path.resolve(
          workDir,
          'output',
          'utssdk/__single_uts_file__/app-android/index.uts'
        ),
        'utf8'
      )
    ).toBe(`import "./__src__/demo"\nexport * from "./__src__/demo"\n`)
    expect(
      fs.existsSync(
        path.resolve(
          workDir,
          'output',
          'utssdk/__single_uts_file__/app-android/__src__/config.json'
        )
      )
    ).toBe(true)
  })

  test('buildUTSFile dom2 syntax error', async () => {
    const workDir = path.resolve(tempDir, 'work')
    const sourceFile = path.resolve(tempDir, 'broken.uts')
    fs.outputFileSync(sourceFile, `export function broken() {\n`)
    setStandaloneEnv(workDir)
    mockRunDev.mockResolvedValue({
      type: 'kotlin',
      code: 'syntax error',
      changed: [],
      deps: [],
    })

    const result = await buildUTSFile(
      'app-android',
      sourceFile,
      { workDir },
      createCompilerOptions()
    )

    expect(result?.errMsg).toBe(
      'uts插件[__single_uts_file__]编译失败，无法使用'
    )
    expect(mockRunDev).toHaveBeenCalledTimes(1)
  })

  test('buildUTSFile passes through compile error', async () => {
    const workDir = path.resolve(tempDir, 'work')
    const sourceFile = path.resolve(tempDir, 'error.uts')
    fs.outputFileSync(sourceFile, `console.log('error')\n`)
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve(tempDir, 'hbx-plugins')
    setStandaloneEnv(workDir)
    mockRunDev.mockRejectedValue(new Error('kotlin编译失败'))

    try {
      await buildUTSFile(
        'app-android',
        sourceFile,
        { workDir },
        createCompilerOptions()
      )
      throw new Error('buildUTSFile should fail')
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e)
      expect(message).toBe('kotlin编译失败')
      expect(message).not.toContain('buildUTSFile 编译上下文：')
    }
    expect(mockDeactivate).toHaveBeenCalledTimes(1)
  })

  test('buildUTSFile autoClose kills android compiler process', async () => {
    const workDir = path.resolve(tempDir, 'work')
    const sourceFile = path.resolve(tempDir, 'success.uts')
    const hbxPlugins = path.resolve(tempDir, 'hbx-plugins')
    const oldHandle = {}
    const fakeStdio = {
      destroy: jest.fn(),
      unref: jest.fn(),
    }
    const fakeChild = {
      spawnfile: 'java.exe',
      spawnargs: [
        'java.exe',
        '-cp',
        path.resolve(hbxPlugins, 'uniapp-runextension/kotlinc/lib/foo.jar'),
      ],
      kill: jest.fn(),
      unref: jest.fn(),
      stdio: [fakeStdio],
    }
    let getHandlesCount = 0
    const getHandles = jest
      .spyOn(process as any, '_getActiveHandles')
      .mockImplementation(() =>
        getHandlesCount++ === 0 ? [oldHandle] : [oldHandle, fakeChild]
      )

    fs.outputFileSync(sourceFile, `console.log('success')\n`)
    process.env.UNI_HBUILDERX_PLUGINS = hbxPlugins
    setStandaloneEnv(workDir)
    mockRunDev.mockResolvedValue({ type: 'kotlin', changed: ['index.kt'] })

    await buildUTSFile(
      'app-android',
      sourceFile,
      { workDir },
      createCompilerOptions()
    )

    expect(fakeChild.kill).toHaveBeenCalledTimes(1)
    expect(fakeChild.unref).toHaveBeenCalledTimes(1)
    expect(fakeStdio.destroy).toHaveBeenCalledTimes(1)
    expect(fakeStdio.unref).toHaveBeenCalledTimes(1)
    getHandles.mockRestore()
  })

  test('buildUTSFile requires external env', async () => {
    const sourceFile = path.resolve(tempDir, 'missing-env.uts')
    fs.outputFileSync(sourceFile, `console.log('missing env')\n`)
    for (const key of ['UNI_INPUT_DIR', 'UNI_OUTPUT_DIR', 'UNI_UTS_PLATFORM']) {
      delete (process.env as Record<string, string | undefined>)[key]
    }

    await expect(
      buildUTSFile(
        'app-android',
        sourceFile,
        { workDir: path.resolve(tempDir, 'work') },
        createCompilerOptions()
      )
    ).rejects.toThrow('buildUTSFile 必须由外部环境变量传入 UNI_INPUT_DIR')
    expect(mockRunDev).not.toHaveBeenCalled()
  })

  test('buildUniModule alias', () => {
    expect(buildUniModule).toBe(buildUniModules)
  })
})

function normalize(fileName: string) {
  return fileName.replace(/\\/g, '/')
}

function saveEnv() {
  const env: Record<string, string | undefined> = {}
  for (const key of STANDALONE_ENV_KEYS) {
    env[key] = process.env[key]
  }
  return env
}

function restoreEnv(env: Record<string, string | undefined>) {
  const processEnv = process.env as Record<string, string | undefined>
  for (const key of STANDALONE_ENV_KEYS) {
    const value = env[key]
    if (value === undefined) {
      delete processEnv[key]
    } else {
      processEnv[key] = value
    }
  }
}

function setStandaloneEnv(
  workDir: string,
  overrides: Record<string, string> = {}
) {
  Object.assign(process.env, {
    UNI_INPUT_DIR: path.resolve(workDir, 'input'),
    UNI_OUTPUT_DIR: path.resolve(workDir, 'output'),
    UNI_UTS_PLATFORM: 'app-android',
    UNI_APP_X: 'true',
    UNI_APP_X_DOM2: 'true',
    NODE_ENV: 'development',
    HX_DEPENDENCIES_DIR: path.resolve(workDir, 'cache'),
    UNI_COMPILE_TARGET: '',
    UNI_PLATFORM: 'app',
    UNI_SUB_PLATFORM: '',
    ...overrides,
  })
}
