import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { initEasycoms, matchEasycom } from '../src/easycom'
import { normalizePath } from '../src/utils'

describe('内置组件 easycom 平台扫描', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_HX_VERSION_DEV: process.env.UNI_HX_VERSION_DEV,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'easycom [builtin]-'))
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
    utsPlatform: NonNullable<typeof process.env.UNI_UTS_PLATFORM>,
    name = 'button'
  ) {
    process.env.UNI_UTS_PLATFORM = utsPlatform
    initEasycoms(inputDir, { dirs: [], platform, isX: true })
    return matchEasycom(name)
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

  test.each([true, false])(
    'App 在 Dev=%s 时都要求插件存在对应的 utssdk 平台目录',
    (dev) => {
      process.env.UNI_HX_VERSION_DEV = String(dev)
      expect(scan('app', 'app-ios')).toBeUndefined()
      expect(scan('app', 'app-android')).toBe(
        normalizePath(
          path.join(
            inputDir,
            'uni_modules/uni-form/components/button/button.uvue'
          )
        )
      )
    }
  )
  test.each([true, false])(
    'camera 缺少 Harmony 实现时跳过，补齐后导入（Dev=%s）',
    (dev) => {
      process.env.UNI_HX_VERSION_DEV = String(dev)
      const moduleDir = path.join(inputDir, 'uni_modules/uni-camera')
      const component = path.join(moduleDir, 'components/camera/camera.uvue')
      fs.outputFileSync(component, '<template><view /></template>')
      fs.ensureDirSync(path.join(moduleDir, 'utssdk/app-android'))
      expect(scan('app-harmony', 'app-harmony', 'camera')).toBeUndefined()
      fs.ensureDirSync(path.join(moduleDir, 'utssdk/app-harmony'))
      expect(scan('app-harmony', 'app-harmony', 'camera')).toBe(
        normalizePath(component)
      )
    }
  )

  test('没有 utssdk 的内置同名组件及普通自定义组件继续扫描', () => {
    fs.removeSync(path.join(inputDir, 'uni_modules/uni-form/utssdk'))
    expect(scan('app-harmony', 'app-harmony')).toContain('/button/button.uvue')
    const component = path.join(
      inputDir,
      'uni_modules/example/components/example/example.uvue'
    )
    fs.outputFileSync(component, '<template><view /></template>')
    fs.ensureDirSync(
      path.join(inputDir, 'uni_modules/example/utssdk/app-android')
    )
    expect(scan('app-harmony', 'app-harmony', 'example')).toBe(
      normalizePath(component)
    )
  })

  test('普通 uni-app 不启用内置组件平台目录过滤', () => {
    process.env.UNI_APP_X = 'false'
    expect(scan('app-harmony', 'app-harmony')).toContain('/button/button.uvue')
  })
  test.each([true, false])(
    '非 Vapor App 和小程序保留旧扫描规则（Dev=%s）',
    (dev) => {
      delete process.env.UNI_APP_X_DOM2
      process.env.UNI_HX_VERSION_DEV = String(dev)
      for (const platform of ['app-harmony', 'mp-weixin'] as const) {
        const source = scan(platform, platform)
        if (dev) {
          expect(source).toBeUndefined()
        } else {
          expect(source).toContain('/button/button.uvue')
        }
      }
    }
  )

  test('小程序不会因残留的 DOM2 标志启用新过滤', () => {
    process.env.UNI_HX_VERSION_DEV = 'false'
    expect(scan('mp-weixin', 'mp-weixin')).toContain('/button/button.uvue')
  })

  test('Web 非 Dev 仍不要求 utssdk/web', () => {
    process.env.UNI_HX_VERSION_DEV = 'false'
    expect(scan('h5', 'web')).toContain('/button/button.uvue')
  })
})
