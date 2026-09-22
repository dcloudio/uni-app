import fs from 'fs-extra'
import path from 'path'
import { tmpdir } from 'os'
import { compileArkTS } from '../src/arkts'
import * as utsUtils from '../src/utils'

jest.mock('../src/utils', () => {
  const actual = jest.requireActual('../src/utils')
  return {
    ...actual,
    getUTSCompiler: jest.fn(),
  }
})

const getUTSCompiler = utsUtils.getUTSCompiler as jest.MockedFunction<
  typeof utsUtils.getUTSCompiler
>

const originalEnv = { ...process.env }

describe('arkts compiler', () => {
  let tempDir = ''

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(tmpdir(), 'uni-uts-arkts-'))
    process.env = {
      ...originalEnv,
      UNI_INPUT_DIR: tempDir,
      UNI_OUTPUT_DIR: path.resolve(tempDir, 'output'),
      UNI_APP_X_TSC: 'false',
      UNI_APP_X_DOM2: 'true',
      UNI_UTS_MODULE_PREFIX: '',
    }
  })

  afterEach(() => {
    fs.removeSync(tempDir)
    process.env = { ...originalEnv }
    jest.restoreAllMocks()
  })

  test('passes the current plugin identity for self-referencing uni_modules imports', async () => {
    const pluginDir = path.resolve(tempDir, 'uni_modules/zstd')
    fs.outputFileSync(
      path.resolve(pluginDir, 'utssdk/app-harmony/index.uts'),
      'export const zstd = 1'
    )

    const bundle = jest.fn().mockResolvedValue({ deps: [] })
    getUTSCompiler.mockReturnValue({
      bundle,
      UTSTarget: { ARKTS: 'arkts' } as any,
      parse: jest.fn() as any,
    })

    await compileArkTS(pluginDir, {
      isX: true,
      uni_modules: ['zstd', 'plugin-b'],
    })

    expect(bundle).toHaveBeenCalledWith(
      'arkts',
      expect.objectContaining({
        input: expect.objectContaining({
          pluginId: 'zstd',
          uniModules: ['zstd', 'plugin-b'],
          uniModulesPrefix: '',
        }),
      })
    )
  })
})
