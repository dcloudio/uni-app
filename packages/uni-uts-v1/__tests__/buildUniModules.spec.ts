import fs from 'fs-extra'
import path from 'path'
import { tmpdir } from 'os'
import { buildUniModules } from '../src'
import { compileArkTS } from '../src/arkts'

jest.mock('../src/arkts', () => {
  const actual = jest.requireActual('../src/arkts')
  return {
    ...actual,
    compileArkTS: jest.fn().mockResolvedValue(undefined),
  }
})

jest.mock('../src/uni_modules', () => {
  const actual = jest.requireActual('../src/uni_modules')
  return {
    ...actual,
    compileUniModuleWithTsc: jest.fn().mockResolvedValue(undefined),
    createUniXArkTSCompiler: jest.fn().mockReturnValue({}),
  }
})

const originalEnv = { ...process.env }

describe('buildUniModules', () => {
  let tempDir = ''

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(tmpdir(), 'uni-uts-build-'))
    process.env = {
      ...originalEnv,
      UNI_INPUT_DIR: tempDir,
      UNI_OUTPUT_DIR: path.resolve(tempDir, 'output'),
      UNI_APP_X_TSC: 'false',
      UNI_APP_X_TSC_DIR: path.resolve(tempDir, 'tsc'),
      UNI_APP_X_TSC_CACHE_DIR: path.resolve(tempDir, 'tsc-cache'),
      UNI_APP_X_UVUE_DIR: path.resolve(tempDir, 'uvue'),
    }
  })

  afterEach(() => {
    fs.removeSync(tempDir)
    process.env = { ...originalEnv }
    jest.restoreAllMocks()
  })

  test('forwards uni_modules to the Harmony compiler', async () => {
    const pluginDir = path.resolve(tempDir, 'uni_modules/zstd')
    fs.outputFileSync(
      path.resolve(pluginDir, 'utssdk/app-harmony/index.uts'),
      'export const zstd = 1'
    )

    await buildUniModules(
      'app-harmony',
      pluginDir,
      {
        syncUniModulesFilePreprocessors: {
          android: jest.fn(),
          ios: jest.fn(),
          harmony: jest.fn(),
        },
      },
      {
        isX: true,
        isPlugin: true,
        isSingleThread: true,
        uni_modules: ['zstd', 'plugin-b'],
      }
    )

    expect(compileArkTS).toHaveBeenCalledWith(
      pluginDir,
      expect.objectContaining({
        uni_modules: ['zstd', 'plugin-b'],
      })
    )
  })
})
