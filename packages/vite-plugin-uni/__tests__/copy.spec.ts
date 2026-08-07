import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { pathToGlob } from '@dcloudio/uni-cli-shared'
import { isSameOrSubPath, uniCopyPlugin } from '../src/plugins/copy'

describe('copy path', () => {
  test('compare normalized Windows drive paths with directory boundaries', () => {
    const inputDir = 'C:/Users/Foo/Project(1)'
    const inputDirGlob = pathToGlob(inputDir, '', { windows: true })

    expect(isSameOrSubPath('C:/Users/Foo/Project(1)', inputDir)).toBe(true)
    expect(
      isSameOrSubPath('C:/Users/Foo/Project(1)/static/logo.png', inputDir)
    ).toBe(true)
    expect(
      isSameOrSubPath('C:/Users/Foo/Project[(]1[)]/static/**/*', inputDirGlob)
    ).toBe(true)
    expect(isSameOrSubPath(inputDir, 'C:/Users/Foo')).toBe(true)
    expect(isSameOrSubPath('C:/Users/Foo/Project-other', inputDir)).toBe(false)
    expect(isSameOrSubPath('c:/users/foo/project(1)', inputDir)).toBe(false)
  })

  test('keep POSIX path comparison case-sensitive', () => {
    expect(isSameOrSubPath('/Users/Foo/project', '/Users/Foo')).toBe(true)
    expect(isSameOrSubPath('/users/foo/project', '/Users/Foo')).toBe(false)
  })
})

describe('copy', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_DOM2_CPP_DIR: process.env.UNI_APP_X_DOM2_CPP_DIR,
  }
  let tempDir: string

  afterEach(() => {
    fs.removeSync(tempDir)
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    })
  })

  test('copy static files when project path contains glob symbols', async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-copy-'))
    const inputDir = path.join(tempDir, '【已支】(插件)-sample')
    const outputDir = path.join(tempDir, 'output')
    const staticFile = path.join(inputDir, 'static', 'logo.png')
    fs.outputFileSync(staticFile, 'logo')
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), { pages: [] })

    process.env.NODE_ENV = 'production'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_APP_X = 'true'
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_DOM2_CPP_DIR

    const plugin = uniCopyPlugin({
      outputDir,
      copyOptions: { assets: [], targets: [] },
    })
    ;(plugin.configResolved as Function)({ build: { ssr: false } })
    await (plugin.writeBundle as Function)()

    expect(
      fs.readFileSync(path.join(outputDir, 'static', 'logo.png'), 'utf8')
    ).toBe('logo')
  }, 10000)
})
