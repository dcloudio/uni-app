import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { initEasycoms, matchEasycom } from '../src/easycom'
import { normalizePath } from '../src/utils'

describe('Web 内置组件 easycom 扫描', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_HX_VERSION_DEV: process.env.UNI_HX_VERSION_DEV,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'easycom-web-builtin-'))
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [{ path: 'pages/index/index' }],
    })
    fs.outputFileSync(
      path.join(inputDir, 'pages/index/index.uvue'),
      '<template><button /></template>'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/uni-form/components/button/button.uvue'),
      '<template><view /></template>'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/uni-form/utssdk/app-android/index.uts'),
      ''
    )
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_HX_VERSION_DEV = 'true'
    delete process.env.UNI_COMPILE_TARGET
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
    fs.removeSync(inputDir)
  })

  function scan(
    platform: UniApp.PLATFORM,
    utsPlatform: NonNullable<typeof process.env.UNI_UTS_PLATFORM>
  ) {
    process.env.UNI_UTS_PLATFORM = utsPlatform
    initEasycoms(inputDir, { dirs: [], platform, isX: true })
    return matchEasycom('button')
  }

  test('Web 不要求插件存在 utssdk/web', () => {
    expect(scan('h5', 'web')).toBe(
      normalizePath(
        path.join(
          inputDir,
          'uni_modules/uni-form/components/button/button.uvue'
        )
      )
    )
  })

  test('App 仍要求插件存在对应的 utssdk 平台目录', () => {
    expect(scan('app', 'app-ios')).toBeUndefined()
    expect(scan('app', 'app-android')).toBe(
      normalizePath(
        path.join(
          inputDir,
          'uni_modules/uni-form/components/button/button.uvue'
        )
      )
    )
  })
})
