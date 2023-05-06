import { existsSync, rmSync } from 'fs'
import { resolve } from 'path'
import { toKotlin, toSwift } from '../src/index'

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
      isPlugin: true,
      components: {},
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
      isPlugin: true,
      components: {},
    })
    expect(existsSync(swiftFile)).toBeTruthy()
  })
})
