import { existsSync, rmSync } from 'fs'
import fs from 'fs-extra'
import { tmpdir } from 'os'
import { resolve } from 'path'
import {
  compile,
  compileUniModuleWithTsc,
  createUniXKotlinCompiler,
  createUniXSwiftCompiler,
  originalPositionForSync,
  resolveUTSPluginSourceMapFile,
  toKotlin,
  toSwift,
} from '../src/index'
import { normalizePath } from '../src/shared'

const inputDir = resolve(__dirname, 'examples/demo')
const outputDir = resolve(
  __dirname,
  'examples/demo/unpackage/dist/dev/app-plus'
)

const pluginDir = resolve(inputDir, 'uni_modules/test-uts')

const outputPluginDir = resolve(outputDir, 'uni_modules/test-uts')

describe('compiler', () => {
  test('toKotlin', async () => {
    const relativeFile = 'utssdk/app-android/index'
    const kotlinFile = resolve(outputPluginDir, relativeFile + '.kt')
    if (existsSync(kotlinFile)) {
      rmSync(kotlinFile)
    }
    await toKotlin(resolve(pluginDir, relativeFile + '.uts'), {
      inputDir,
      outputDir,
      sourceMap: false,
      isX: false,
      isSingleThread: false,
      isPlugin: true,
      components: {},
      uniModules: [],
    })
    expect(existsSync(kotlinFile)).toBeTruthy()
  })
  test('toSwift', async () => {
    const relativeFile = 'utssdk/app-ios/index'
    const swiftFile = resolve(outputPluginDir, relativeFile + '.swift')
    if (existsSync(swiftFile)) {
      rmSync(swiftFile)
    }
    await toSwift(resolve(pluginDir, relativeFile + '.uts'), {
      inputDir,
      outputDir,
      sourceMap: false,
      isX: false,
      isSingleThread: false,
      isPlugin: true,
      components: {},
      uniModules: [],
    })
    expect(existsSync(swiftFile)).toBeTruthy()
  })
})

describe('云打包 UTS 插件 sourcemap', () => {
  test.each([
    ['app-android', 'kotlin', 'kt', 'release', createUniXKotlinCompiler],
    ['app-ios', 'swift', 'swift', 'debug', createUniXSwiftCompiler],
  ] as const)(
    '%s 关闭发行映射时仍能还原源码',
    async (platform, target, ext, packType, createCompiler) => {
      const originalEnv = process.env
      const root = fs.mkdtempSync(resolve(tmpdir(), 'uts [云打包]-'))
      const inputDir = resolve(root, 'src')
      const outputDir = resolve(root, 'dist', platform)
      const pluginPath = 'uni_modules/test-plugin'
      const entry = `utssdk/${platform}/index`
      const pluginDir = resolve(inputDir, pluginPath)
      const sourceFile = resolve(pluginDir, entry + '.uts')
      const source =
        'export function test(): string {\n  return "packaging-map"\n}\n'

      process.env = {
        ...originalEnv,
        NODE_ENV: 'production',
        UNI_APP_PACK_TYPE: packType,
        UNI_APP_SOURCEMAP: 'false',
        UNI_APP_X: 'true',
        UNI_APP_X_TSC: 'true',
        UNI_APP_X_TSC_DIR: resolve(root, '.tsc'),
        UNI_APP_X_TSC_CACHE_DIR: resolve(root, 'cache'),
        UNI_APP_X_UVUE_DIR: resolve(root, '.uvue'),
        UNI_INPUT_DIR: inputDir,
        UNI_OUTPUT_DIR: outputDir,
        UNI_PLATFORM: 'app',
        UNI_UTS_PLATFORM: platform,
      }
      delete process.env.UNI_APP_PRODUCTION_TYPE
      delete process.env.UNI_COMPILE_TARGET
      Reflect.deleteProperty(process.env, 'UNI_SUB_PLATFORM')
      delete process.env.UNI_APP_X_DOM2
      delete process.env.HX_DEPENDENCIES_DIR

      try {
        fs.outputJsonSync(resolve(pluginDir, 'package.json'), {
          id: 'test-plugin',
        })
        fs.outputFileSync(sourceFile, source)

        await compileUniModuleWithTsc(platform, pluginDir, createCompiler({}), {
          preprocessor: async (content) => content,
        })
        const result = await compile(pluginDir, {
          isX: true,
          isPlugin: true,
          isSingleThread: true,
          sourceMap: false,
        })
        expect(result).toMatchObject({ errMsg: '' })

        const sourceMapFile = resolveUTSPluginSourceMapFile(
          target,
          sourceFile,
          inputDir,
          outputDir
        )
        expect(sourceMapFile.endsWith(`index.${ext}.map`)).toBe(true)
        const nativeFile = resolve(
          outputDir,
          pluginPath,
          'utssdk',
          platform,
          'src',
          `index.${ext}`
        )
        const nativeLines = fs.readFileSync(nativeFile, 'utf8').split('\n')
        const line = nativeLines.findIndex((text) =>
          text.includes('"packaging-map"')
        )
        expect(line).toBeGreaterThanOrEqual(0)
        const position = originalPositionForSync({
          sourceMapFile,
          line: line + 1,
          column: nativeLines[line].indexOf('"packaging-map"'),
          withSourceContent: true,
        })
        expect(normalizePath(position.source!)).toMatch(
          new RegExp(`${pluginPath}/${entry}\\.uts$`)
        )
        expect(position).toMatchObject({ line: 2, sourceContent: source })
      } finally {
        process.env = originalEnv
        fs.removeSync(root)
      }
    },
    30_000
  )
})
