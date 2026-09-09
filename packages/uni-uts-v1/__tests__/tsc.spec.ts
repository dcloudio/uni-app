import path from 'path'
import fs from 'fs-extra'
import { sync } from 'fast-glob'
import {
  compileUniModuleWithTsc,
  createUniXKotlinCompilerOnce,
  createUniXSwiftCompilerOnce,
} from '../src'

const inputDir = path.resolve(__dirname, 'examples/tsc/src')
const distDir = path.resolve(__dirname, 'examples/tsc/dist')
const plugins = ['test-a', 'test-b']
const platforms = ['app-android', 'app-ios'] as const
describe('uni_modules', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('tsc batches root files into a single addRootFiles call', async () => {
    const tempDir = fs.mkdtempSync(
      path.join(process.env.TMPDIR || '/tmp', 'uni-uts-tsc-')
    )
    const inputDir = path.join(tempDir, 'input')
    const outputDir = path.join(tempDir, 'output')
    const pluginDir = path.join(inputDir, 'uni_modules', 'test-plugin')
    const tscOutputDir = path.join(outputDir, '.tsc')
    const outputPluginDir = path.join(
      tscOutputDir,
      'app-android',
      'uni_modules',
      'test-plugin'
    )
    const oldEnv = JSON.parse(JSON.stringify(process.env))
    const compiler = {
      init: jest.fn().mockResolvedValue(undefined),
      addRootFiles: jest.fn().mockResolvedValue(undefined),
      addRootFile: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
      debug: jest.fn(),
    } as any
    try {
      fs.ensureDirSync(path.join(pluginDir, 'utssdk', 'app-android'))
      fs.outputFileSync(
        path.join(pluginDir, 'utssdk', 'app-android', 'a.vue'),
        '<template><view>a</view></template>'
      )
      fs.outputFileSync(
        path.join(pluginDir, 'utssdk', 'app-android', 'b.uvue'),
        '<template><view>b</view></template>'
      )
      fs.outputFileSync(
        path.join(pluginDir, 'utssdk', 'index.uts'),
        'export default {}'
      )

      process.env.NODE_ENV = 'production'
      process.env.UNI_INPUT_DIR = inputDir
      process.env.UNI_OUTPUT_DIR = outputDir
      process.env.UNI_UTS_PLATFORM = 'app-android'
      process.env.UNI_APP_X_TSC_DIR = tscOutputDir
      process.env.UNI_APP_X_UVUE_DIR = path.join(outputDir, '.uvue')
      process.env.UNI_APP_X_TSC_CACHE_DIR = path.join(outputDir, '.cache')

      await compileUniModuleWithTsc('app-android', pluginDir, compiler, {
        rootFiles: [
          path.join(
            tscOutputDir,
            'app-android',
            'uni_modules',
            'test-plugin',
            'utssdk',
            'app-android',
            'b.uvue.ts'
          ),
          'extra.ts',
        ],
        preprocessor: async (content) => content,
      })

      expect(compiler.addRootFile).not.toHaveBeenCalled()
      expect(compiler.addRootFiles).toHaveBeenCalledTimes(1)
      expect(compiler.addRootFiles).toHaveBeenCalledWith([
        path.join(outputPluginDir, 'utssdk', 'app-android', 'a.vue.ts'),
        path.join(outputPluginDir, 'utssdk', 'app-android', 'b.uvue.ts'),
        path.join(outputPluginDir, 'utssdk', 'index.uts.ts'),
        'extra.ts',
      ])
    } finally {
      process.env = oldEnv
      fs.removeSync(tempDir)
    }
  })

  for (const plugin of plugins) {
    const pluginDir = path.resolve(inputDir, 'uni_modules', plugin)
    for (const platform of platforms) {
      jest.setTimeout(100000)
      test(`tsc ${plugin} ${platform}`, async () => {
        const reset = initEnv(platform)
        await compileUniModuleWithTsc(
          platform,
          pluginDir,
          platform === 'app-android'
            ? createUniXKotlinCompilerOnce({ resolveWorkers: () => ({}) })
            : createUniXSwiftCompilerOnce({ resolveWorkers: () => ({}) }),
          {
            rootFiles: [],
            preprocessor: async (content) => {
              return content
            },
          }
        )
        const outputUVuePluginDir = path.resolve(
          process.env.UNI_OUTPUT_DIR!,
          '../.uvue',
          platform,
          'uni_modules',
          plugin
        )
        sync('**/*.{uts,vue}', { cwd: outputUVuePluginDir }).forEach((file) => {
          expect(
            fs.readFileSync(path.resolve(outputUVuePluginDir, file), 'utf8')
          ).toMatchSnapshot(file)
        })
        reset()
      })
    }
  }
})

function initEnv(platform: 'app-android' | 'app-ios') {
  const oldEnv = JSON.parse(JSON.stringify(process.env))

  process.env.NODE_ENV = 'production'
  process.env.UNI_INPUT_DIR = inputDir
  process.env.UNI_OUTPUT_DIR = path.resolve(distDir, 'build', platform)
  process.env.UNI_UTS_PLATFORM = platform
  process.env.UNI_APP_X_CACHE_DIR = path.resolve(
    process.env.UNI_OUTPUT_DIR,
    '../cache/.' + platform
  )
  process.env.UNI_APP_X_TSC_DIR = path.resolve(
    process.env.UNI_OUTPUT_DIR,
    '../.tsc'
  )
  process.env.UNI_APP_X_UVUE_DIR = path.resolve(
    process.env.UNI_OUTPUT_DIR,
    '../.uvue'
  )
  process.env.UNI_APP_X_TSC_CACHE_DIR = path.resolve(
    process.env.UNI_APP_X_CACHE_DIR,
    `tsc`
  )

  return () => {
    process.env = oldEnv
  }
}
