import { resolve } from 'path'
import {
  resolveUtsPluginSourceMapFile,
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
  test('resolveUtsPluginSourceMapFile with uni_modules uts=>kotlin', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'kotlin',
      resolve(inputDir, uniModulesPluginDir, 'utssdk/app-android/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
    expect(
      resolveUtsPluginSourceMapFile(
        'kotlin',
        resolve(inputDir, uniModulesPluginDir, 'utssdk/index.uts'),
        inputDir,
        outputDir
      )
    ).toBe(sourceMapFile)
    expect(
      resolveUtsPluginSourceMapFile(
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

  test('resolveUtsPluginSourceMapFile with uni_modules uts=>swift', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'swift',
      resolve(inputDir, uniModulesPluginDir, 'utssdk/app-ios/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })

  test('resolveUtsPluginSourceMapFile with utssdk uts=>kotlin', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'kotlin',
      resolve(inputDir, utssdkPluginDir, 'app-android/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })
  test('resolveUtsPluginSourceMapFile with utssdk uts=>swift', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'swift',
      resolve(inputDir, utssdkPluginDir, 'app-ios/index.uts'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })

  test('resolveUtsPluginSourceMapFile with uni_modules kt', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'kotlin',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-android/index.kt'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })
  test('resolveUtsPluginSourceMapFile with uni_modules swift', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'swift',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-ios/index.swift'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
    const sourceMapFile2 = resolveUtsPluginSourceMapFile(
      'swift',
      resolve(outputDir, uniModulesPluginDir, 'utssdk/app-ios/src/index.swift'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile2).toBeDefined()
  })
  test('resolveUtsPluginSourceMapFile with utssdk kt', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'kotlin',
      resolve(outputDir, utssdkPluginDir, 'app-android/index.kt'),
      inputDir,
      outputDir
    )
    expect(sourceMapFile).toBeDefined()
  })
  test('resolveUtsPluginSourceMapFile with utssdk swift', () => {
    const sourceMapFile = resolveUtsPluginSourceMapFile(
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
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'kotlin',
      filename,
      inputDir,
      outputDir
    )
    const res = await generatedPositionFor({
      sourceMapFile,
      filename,
      line: 3,
      column: 15,
      outputDir,
    })
    expect(res).toEqual({
      line: 15,
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
    const sourceMapFile = resolveUtsPluginSourceMapFile(
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

    expect(line).toBe(5)
    expect(column).toBe(11)
    expect(source).toContain('login.uts')
  })
  test('originalPositionFor ios', async () => {
    const filename = resolve(
      outputDir,
      uniModulesPluginDir,
      'utssdk/app-ios/src/index.kt'
    )
    const sourceMapFile = resolveUtsPluginSourceMapFile(
      'swift',
      filename,
      inputDir,
      outputDir
    )
    const { line, column, source } = await originalPositionFor({
      sourceMapFile,
      line: 18,
      column: 16,
    })

    expect(line).toBe(21)
    expect(column).toBe(4)
    expect(source).toContain('index.uts')
  })
})
