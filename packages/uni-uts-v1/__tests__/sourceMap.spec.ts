import { resolve } from 'path'
import {
  resolveUTSPluginSourceMapFile,
  generatedPositionFor,
  originalPositionFor,
} from '../src'

const inputDir = resolve(__dirname, '../../playground/uts')
const outputDir = resolve(
  __dirname,
  '../../playground/uts/unpackage/dist/dev/app-plus'
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
    expect(sourceMapFile).toBeDefined()
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

  test('resolveUTSPluginSourceMapFile with uni_modules uts=>swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(inputDir, uniModulesPluginDir, 'utssdk/app-ios/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })

  test('resolveUTSPluginSourceMapFile with utssdk uts=>kotlin', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(inputDir, utssdkPluginDir, 'app-android/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })
  test('resolveUTSPluginSourceMapFile with utssdk uts=>swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(inputDir, utssdkPluginDir, 'app-ios/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })

  test('resolveUTSPluginSourceMapFile with uni_modules kt', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-android/index.kt'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })
  test('resolveUTSPluginSourceMapFile with uni_modules swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-ios/index.swift'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
    const sourceMapFile2 = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-ios/src/index.swift'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile2).toBeDefined()
  })
  test('resolveUTSPluginSourceMapFile with utssdk kt', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'kotlin',
      resolve(outputDir, utssdkPluginDir, 'app-android/index.kt'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })
  test('resolveUTSPluginSourceMapFile with utssdk swift', () => {
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      resolve(outputDir, utssdkPluginDir, 'app-ios/index.swift'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
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
      line: 18,
      column: 16,
      lastColumn: null,
      source: resolve(
        outputDir,
        uniModulesPluginDir,
        'utssdk/app-android/index.kt'
      ),
    })
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
      line: 18,
      column: 16,
    })

    expect(line).toBe(3)
    expect(column).toBe(14)
    expect(source).toContain('login.uts')

    const originalPosition = await originalPositionFor({
      sourceMapFile,
      line: 84,
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
      'utssdk/app-ios/src/index.kt'
    )
    const sourceMapFile = resolveUTSPluginSourceMapFile(
      'swift',
      filename,
      inputDir,
      outputDir
    )
    const { line, column, source } = await originalPositionFor({
      sourceMapFile,
      line: 50,
      column: 0,
    })

    expect(line).toBe(19)
    expect(column).toBe(2)
    expect(source).toContain('index.uts')
  })
})
