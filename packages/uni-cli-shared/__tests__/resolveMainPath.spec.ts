import fs from 'fs'
import os from 'os'
import path from 'path'

describe('resolve main path', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }
  let inputDir: string

  beforeEach(() => {
    jest.resetModules()
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-main-path-'))
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
  })

  afterEach(() => {
    restoreEnv('UNI_APP_X', originalEnv.UNI_APP_X)
    restoreEnv('UNI_APP_X_DOM2', originalEnv.UNI_APP_X_DOM2)
    restoreEnv('UNI_UTS_PLATFORM', originalEnv.UNI_UTS_PLATFORM)
    fs.rmSync(inputDir, { recursive: true, force: true })
  })

  test('prefers main.uts over main.ts in Android VDOM mode', () => {
    const mainUtsPath = createEntry('main.uts')
    createEntry('main.ts')

    expect(resolveMainPath()).toBe(mainUtsPath)
  })

  test('supports main.ts in Android VDOM mode', () => {
    const mainTsPath = createEntry('main.ts')

    expect(resolveMainPath()).toBe(mainTsPath)
  })

  test('does not fall back to main.js in Android VDOM mode', () => {
    createEntry('main.js')

    expect(resolveMainPath).toThrow(
      'uni-app x Android VDOM 模式仅支持 main.uts 或 main.ts 入口文件'
    )
  })

  test('supports main.js in Android DOM2 mode', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const mainJsPath = createEntry('main.js')

    expect(resolveMainPath()).toBe(mainJsPath)
  })

  test('supports main.js on other platforms', () => {
    process.env.UNI_UTS_PLATFORM = 'app-harmony'
    const mainJsPath = createEntry('main.js')

    expect(resolveMainPath()).toBe(mainJsPath)
  })

  function createEntry(filename: string) {
    const filepath = path.resolve(inputDir, filename)
    fs.writeFileSync(filepath, '')
    return filepath
  }

  function resolveMainPath() {
    const { resolveMainPathOnce } =
      require('../src/resolve') as typeof import('../src/resolve')
    return resolveMainPathOnce(inputDir)
  }
})

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    Reflect.deleteProperty(process.env, name)
  } else {
    process.env[name] = value
  }
}
