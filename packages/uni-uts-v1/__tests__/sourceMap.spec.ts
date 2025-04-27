import { resolve } from 'path'
import {
  generatedPositionFor,
  originalPositionFor,
  resolveUTSPluginSourceMapFile,
  resolveUTSSourceMapFile,
} from '../src'
import { normalizePath } from '../src/shared'

const inputDir = resolve(__dirname, '../../playground/uts')
const outputDir = resolve(
  __dirname,
  '../../playground/uts/unpackage/dist/dev/app-plus'
)
const outputAppHarmonyDir = resolve(
  __dirname,
  '../../playground/uts/unpackage/dist/dev/.app-harmony'
)
const uniAppXCacheDir = resolve(
  __dirname,
  '../../playground/uts/unpackage/cache'
)

const utssdkPluginDir = 'utssdk/test-uts'

const uniModulesPluginDir = 'uni_modules/test-uniplugin'

describe('uts:sourceMap', () => {
  test('resolveUTSPluginSourceMapFile with uni_modules uts=>kotlin', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(inputDir, uniModulesPluginDir, 'utssdk/app-android/index.uts'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-android/index.kt.map'
      )
    ).toBe(true)
    expect(
      resolveUTSPluginSourceMapFile(
        'kotlin',
        resolve(inputDir, uniModulesPluginDir, 'utssdk/index.uts'),
        inputDir,
        outputDir
      )
    ).toBe(sourceMapFile)
    expect(
      resolveUTSPluginSourceMapFile(
        'kotlin',
        resolve(
          inputDir,
          uniModulesPluginDir,
          'utssdk/app-android/utils/utils.uts'
        ),
        inputDir,
        outputDir
      )
    ).toBe(sourceMapFile)
  })

  test('resolveUTSPluginSourceMapFile with uni_modules uts=>arkts', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'arkts',
      resolve(inputDir, uniModulesPluginDir, 'utssdk/app-harmony/index.uts'),
      inputDir,
      outputAppHarmonyDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-harmony/index.ets.map'
      )
    ).toBe(true)
    expect(
      resolveUTSPluginSourceMapFile(
        'arkts',
        resolve(inputDir, uniModulesPluginDir, 'utssdk/index.uts'),
        inputDir,
        outputDir
      )
    ).toBe(sourceMapFile)
    expect(
      resolveUTSPluginSourceMapFile(
        'arkts',
        resolve(
          inputDir,
          uniModulesPluginDir,
          'utssdk/app-harmony/utils/utils.uts'
        ),
        inputDir,
        outputAppHarmonyDir
      )
    ).toBe(sourceMapFile)
  })

  test('resolveUTSPluginSourceMapFile with uni_modules uts=>swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(inputDir, uniModulesPluginDir, 'utssdk/app-ios/index.uts'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-ios/index.swift.map'
      )
    ).toBe(true)
  })

  test('resolveUTSPluginSourceMapFile with utssdk uts=>kotlin', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(inputDir, utssdkPluginDir, 'app-android/index.uts'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'utssdk/test-uts/app-android/index.kt.map'
      )
    ).toBe(true)
  })
  test('resolveUTSPluginSourceMapFile with utssdk uts=>swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(inputDir, utssdkPluginDir, 'app-ios/index.uts'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'utssdk/test-uts/app-ios/index.swift.map'
      )
    ).toBe(true)
  })

  test('resolveUTSPluginSourceMapFile with uni_modules kt', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-android/index.kt'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-android/index.kt.map'
      )
    ).toBe(true)
  })
  test('resolveUTSPluginSourceMapFile with uni_modules swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-ios/index.swift'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-ios/index.swift.map'
      )
    ).toBe(true)
    const sourceMapFile2 = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-ios/src/index.swift'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile2).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-ios/index.swift.map'
      )
    ).toBe(true)
  })
  test('resolveUTSPluginSourceMapFile with utssdk kt', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(outputDir, utssdkPluginDir, 'app-android/index.kt'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'utssdk/test-uts/app-android/index.kt.map'
      )
    ).toBe(true)
  })
  test('resolveUTSPluginSourceMapFile with utssdk swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(outputDir, utssdkPluginDir, 'app-ios/index.swift'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'utssdk/test-uts/app-ios/index.swift.map'
      )
    ).toBe(true)
  })
  test('generatedPositionFor', async () => {
    const filename = resolve(
      inputDir,
      uniModulesPluginDir,
      'utssdk/app-android/login.uts'
    )
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      filename,
      inputDir,
      outputDir
    )
    const res = await generatedPositionFor({
      sourceMapFile,
      filename,
      line: 3,
      column: 18,
      outputDir,
    })
    expect(res).toEqual({
      line: 17,
      column: 16,
      lastColumn: null,
      source: resolve(
        outputDir,
        uniModulesPluginDir,
        'utssdk/app-android/index.kt'
      ),
      relativeSource: 'uni_modules/test-uniplugin/utssdk/app-android/index.kt',
    })
  })
  test('generatedPositionFor with uvue file', async () => {
    process.env.UNI_APP_X_CACHE_DIR = resolve(uniAppXCacheDir, '.app-android')
    const filename = resolve(inputDir, 'pages/index/index.uvue')
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      filename,
      inputDir,
      outputDir
    )
    const res = await generatedPositionFor({
      sourceMapFile,
      filename,
      line: 5,
      column: 0,
      outputDir,
    })
    expect(res).toEqual({
      line: 21,
      column: 12,
      lastColumn: 19,
      source: resolve(
        process.env.UNI_APP_X_CACHE_DIR,
        'src/pages/index/index.kt'
      ),
      relativeSource: 'pages/index/index.kt',
    })
    process.env.UNI_APP_X_CACHE_DIR = ''
  })
  test('originalPositionFor', async () => {
    const filename = resolve(
      outputDir,
      uniModulesPluginDir,
      'utssdk/app-android/index.kt'
    )
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      filename,
      inputDir,
      outputDir
    )
    const { line, column, source } = await originalPositionFor({
      sourceMapFile,
      line: 17,
      column: 16,
    })

    expect(line).toBe(3)
    expect(column).toBe(14)
    expect(source).toContain('login.uts')

    const originalPosition = await originalPositionFor({
      sourceMapFile,
      line: 67,
      column: 0,
      withSourceContent: true,
    })
    expect(originalPosition.line).toBe(73)
    expect(originalPosition.column).toBe(0)
    expect(originalPosition.sourceContent!.length > 0).toBe(true)
  })
  test('originalPositionFor ios', async () => {
    const filename = resolve(
      outputDir,
      uniModulesPluginDir,
      'utssdk/app-ios/index.swift'
    )
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      filename,
      inputDir,
      outputDir
    )
    const { line, column, source } = await originalPositionFor({
      sourceMapFile,
      line: 51,
      column: 0,
    })

    expect(line).toBe(19)
    expect(column).toBe(2)
    expect(source).toContain('index.uts')
  })

  test('resolveUTSSourceMapFile with uvue file', () => {
    process.env.UNI_APP_X_CACHE_DIR = resolve(uniAppXCacheDir, '.app-android')
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      resolve(inputDir, 'pages/index/index.uvue'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith('pages/index/index.kt.map')
    ).toBe(true)
  })

  test('resolveUTSSourceMapFile with main.uts', () => {
    process.env.UNI_APP_X_CACHE_DIR = resolve(uniAppXCacheDir, '.app-android')
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      resolve(inputDir, 'main.uts'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith('/sourcemap/index.kt.map')
    ).toBe(true)
    process.env.UNI_APP_X_CACHE_DIR = ''
  })

  test('resolveUTSSourceMapFile with index.kt', () => {
    process.env.UNI_APP_X_CACHE_DIR = resolve(uniAppXCacheDir, '.app-android')
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      resolve(process.env.UNI_APP_X_CACHE_DIR, 'src/index.kt'),
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith('/sourcemap/index.kt.map')
    ).toBe(true)
    process.env.UNI_APP_X_CACHE_DIR = ''
  })

  test('resolveUTSSourceMapFile with className', () => {
    process.env.UNI_APP_X_CACHE_DIR = resolve(uniAppXCacheDir, '.app-android')
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      'uni.UNIuniappx.GenPagesIndexIndex',
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith('pages/index/index.kt.map')
    ).toBe(true)
  })
  test('resolveUTSSourceMapFile with plugin className', () => {
    process.env.UNI_APP_X_CACHE_DIR = resolve(uniAppXCacheDir, '.app-android')
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      'uts.sdk.modules.testUniplugin.User',
      inputDir,
      outputDir
    )
    expect(
      normalizePath(sourceMapFile).endsWith(
        'uni_modules/test-uniplugin/utssdk/app-android/index.kt.map'
      )
    ).toBe(true)
  })
  test('resolveUTSSourceMapFile with plugin filename', async () => {
    const filename = resolve(
      outputDir,
      uniModulesPluginDir,
      'utssdk/app-android/index.kt'
    )
    const sourceMapFile = resolveUTSSourceMapFile(
      'kotlin',
      filename,
      inputDir,
      outputDir
    )
    const { line, column, source } = await originalPositionFor({
      sourceMapFile,
      line: 17,
      column: 16,
    })

    expect(line).toBe(3)
    expect(column).toBe(14)
    expect(source).toContain('login.uts')

    const originalPosition = await originalPositionFor({
      sourceMapFile,
      line: 67,
      column: 0,
      withSourceContent: true,
    })
    expect(originalPosition.line).toBe(73)
    expect(originalPosition.column).toBe(0)
    expect(originalPosition.sourceContent!.length > 0).toBe(true)
  })
})
