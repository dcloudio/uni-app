import path from 'path'
import fs from 'fs-extra'
import { sync } from 'fast-glob'
import { compileUniModuleWithTsc } from '../src'

const inputDir = path.resolve(__dirname, 'examples/tsc/src')
const distDir = path.resolve(__dirname, 'examples/tsc/dist')
const plugins = ['test-a', 'test-b']
const platforms = ['app-android', 'app-ios'] as const
describe('uni_modules', () => {
  for (const plugin of plugins) {
    const pluginDir = path.resolve(inputDir, 'uni_modules', plugin)
    for (const platform of platforms) {
      jest.setTimeout(60000)
      test(`tsc ${plugin} ${platform}`, async () => {
        const reset = initEnv(platform)
        await compileUniModuleWithTsc(platform, pluginDir)
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
  const oldInputDir = process.env.UNI_INPUT_DIR
  const oldOutputDir = process.env.UNI_OUTPUT_DIR
  const oldUTSPlatform = process.env.UNI_UTS_PLATFORM
  const oldCacheDir = process.env.UNI_APP_X_CACHE_DIR
  const oldTsc = process.env.UNI_APP_X_TSC

  process.env.UNI_INPUT_DIR = inputDir
  process.env.UNI_OUTPUT_DIR = path.resolve(distDir, 'build', platform)
  process.env.UNI_UTS_PLATFORM = platform
  process.env.UNI_APP_X_CACHE_DIR = path.resolve(
    process.env.UNI_OUTPUT_DIR,
    '../cache/.' + platform
  )

  return () => {
    process.env.UNI_INPUT_DIR = oldInputDir
    process.env.UNI_OUTPUT_DIR = oldOutputDir
    process.env.UNI_UTS_PLATFORM = oldUTSPlatform
    process.env.UNI_APP_X_CACHE_DIR = oldCacheDir
    process.env.UNI_APP_X_TSC = oldTsc
  }
}
