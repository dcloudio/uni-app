import fs from 'fs'
import os from 'os'
import path from 'path'

function normalizeUniAppXVaporEnv() {
  require('../src/hbx/alias').normalizeUniAppXVaporEnv()
}

describe('normalizeUniAppXVaporEnv', () => {
  const originalArgv = process.argv
  const envNames = [
    'UNI_APP_X',
    'UNI_APP_X_VAPOR',
    'UNI_APP_X_DOM2',
    'UNI_APP_X_DOM2_DYNAMIC',
    'UNI_APP_X_VAPOR_RENDER_TARGET',
    'UNI_APP_STYLE_ISOLATION_VERSION',
    'UNI_INPUT_DIR',
    'UNI_PLATFORM',
    'UNI_UTS_PLATFORM',
  ] as const
  const originalEnv = Object.fromEntries(
    envNames.map((name) => [name, process.env[name]])
  )
  const tempDirs: string[] = []

  function setProjectDir(withVapor = false) {
    const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-vapor-'))
    tempDirs.push(projectDir)
    if (withVapor) {
      fs.writeFileSync(path.join(projectDir, '.vapor'), '')
    }
    process.env.UNI_INPUT_DIR = projectDir
    return projectDir
  }

  beforeEach(() => {
    jest.resetModules()
    process.argv = originalArgv
    envNames.forEach((name) => Reflect.deleteProperty(process.env, name))
  })

  afterAll(() => {
    process.argv = originalArgv
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, name)
      } else {
        process.env[name] = value
      }
    })
    tempDirs.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }))
  })

  test.each(['app', 'h5', 'web'])(
    '%s 平台公开 Vapor 开关启用内部 DOM2 状态',
    (platform) => {
      process.env.UNI_APP_X_VAPOR = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']

      normalizeUniAppXVaporEnv()

      expect(process.env.UNI_APP_X_VAPOR).toBe('true')
      expect(process.env.UNI_APP_X_DOM2).toBe('true')
      expect(process.env.UNI_APP_X_VAPOR_RENDER_TARGET).toBe('nativecode')
    }
  )

  test.each(['app', 'h5', 'web'])(
    '%s 平台公开 Vapor 开关可以关闭旧的内部 DOM2 状态',
    (platform) => {
      process.env.UNI_APP_X_VAPOR = 'false'
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
      process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']

      normalizeUniAppXVaporEnv()

      expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
      expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
      expect(process.env.UNI_APP_X_DOM2_DYNAMIC).toBeUndefined()
      expect(process.env.UNI_APP_X_VAPOR_RENDER_TARGET).toBeUndefined()
    }
  )

  test.each(['app', 'h5', 'web'])(
    '%s 平台兼容旧的内部 DOM2 开关',
    (platform) => {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']

      normalizeUniAppXVaporEnv()

      expect(process.env.UNI_APP_X_VAPOR).toBe('true')
      expect(process.env.UNI_APP_X_DOM2).toBe('true')
      expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBe('2')
    }
  )

  test.each(['app', 'h5', 'web'])(
    '%s 平台 Vapor 归一化保留 UNI_APP_X，交由公共初始化识别项目',
    (platform) => {
      process.env.UNI_APP_X_VAPOR = 'true'
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']
      for (const value of [undefined, 'false', 'true'] as const) {
        if (value === undefined) delete process.env.UNI_APP_X
        else process.env.UNI_APP_X = value

        normalizeUniAppXVaporEnv()

        expect(process.env.UNI_APP_X).toBe(value)
        expect(process.env.UNI_APP_X_VAPOR).toBe('true')
        expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBe('2')
      }
    }
  )

  test.each(['mp-weixin'])('%s 平台关闭 Vapor 和 DOM2 状态', (platform) => {
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'
    process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2_DYNAMIC).toBeUndefined()
    expect(process.env.UNI_APP_X_VAPOR_RENDER_TARGET).toBeUndefined()
  })

  test.each(['h5', 'web'])(
    '%s 平台根目录有 .vapor 时不启用 Vapor',
    (platform) => {
      setProjectDir(true)
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']

      normalizeUniAppXVaporEnv()

      expect(process.env.UNI_APP_X).toBeUndefined()
      expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
      expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
      expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBeUndefined()
    }
  )

  test('Web 平台有 .vapor 时仍可关闭 Vapor', () => {
    setProjectDir(true)
    process.env.UNI_APP_X_VAPOR = 'false'
    process.env.UNI_PLATFORM = 'h5'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
  })

  test.each(['app', 'app-plus', 'app-harmony', 'h5', 'web'])(
    '%s 平台 Vapor 固定使用新隔离规则，不受旧隔离版本影响',
    (platform) => {
      process.env.UNI_APP_X_VAPOR = 'true'
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']
      for (const version of [undefined, '1', '2']) {
        if (version === undefined)
          delete process.env.UNI_APP_STYLE_ISOLATION_VERSION
        else
          Reflect.set(process.env, 'UNI_APP_STYLE_ISOLATION_VERSION', version)

        normalizeUniAppXVaporEnv()

        expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBe('2')
      }
    }
  )

  test.each(['h5', 'web', 'app', 'mp-weixin'])(
    '%s 非 Vapor 保留原有隔离版本',
    (platform) => {
      setProjectDir()
      process.env.UNI_APP_X = 'true'
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']
      for (const version of [undefined, '1', '2']) {
        if (version === undefined)
          delete process.env.UNI_APP_STYLE_ISOLATION_VERSION
        else
          Reflect.set(process.env, 'UNI_APP_STYLE_ISOLATION_VERSION', version)
        process.env.UNI_APP_X_VAPOR = 'false'

        normalizeUniAppXVaporEnv()

        expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBe(version)
      }
    }
  )

  test.each([
    [[], true],
    [['-p', 'app'], true],
    [['--platform', 'mp-weixin'], false],
    [['--platform=app'], true],
  ])('uni CLI 参数 %j 在 alias 初始化前识别平台', (args, enabled) => {
    process.argv = ['node', '/project/node_modules/.bin/uni', ...args]
    process.env.UNI_APP_X_VAPOR = 'true'
    if (args.includes('app')) {
      process.env.UNI_PLATFORM = 'app'
    } else if (args.length === 0) {
      setProjectDir()
    }

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR === 'true').toBe(enabled)
    expect(process.env.UNI_APP_X_DOM2 === 'true').toBe(enabled)
  })

  test('非 uni CLI 入口在平台未知时不默认禁用 Vapor', () => {
    process.argv = ['node', '/project/scripts/build.js']
    process.env.UNI_APP_X_VAPOR = 'true'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBe('true')
    expect(process.env.UNI_APP_X_DOM2).toBe('true')
  })

  test.each(['UNI_APP_X_VAPOR', 'UNI_APP_X_DOM2'])(
    '平台从未知变为 Web 时保留 %s 启用状态',
    (envName) => {
      process.argv = ['node', '/project/scripts/build.js']
      process.env[envName] = 'true'

      normalizeUniAppXVaporEnv()
      expect(process.env.UNI_APP_X_DOM2).toBe('true')

      process.env.UNI_PLATFORM = 'h5'
      normalizeUniAppXVaporEnv()
      normalizeUniAppXVaporEnv()
      expect(process.env.UNI_APP_X_DOM2).toBe('true')
      expect(process.env.UNI_APP_X_VAPOR).toBe('true')
      expect(process.env.UNI_APP_X).toBeUndefined()
      expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBe('2')
    }
  )

  test('uni CLI 未指定平台时默认 h5 并应用 Web Vapor 配置', () => {
    process.argv = ['node', '/project/node_modules/.bin/uni']
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'app'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBe('true')
    expect(process.env.UNI_APP_X_DOM2).toBe('true')
    expect(process.env.UNI_APP_X).toBeUndefined()
    expect(process.env.UNI_APP_STYLE_ISOLATION_VERSION).toBe('2')
  })

  test('uni CLI 显式 App 平台覆盖旧的 web 平台环境', () => {
    process.argv = ['node', '/project/node_modules/.bin/uni', '-p', 'app']
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'web'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBe('true')
    expect(process.env.UNI_APP_X_DOM2).toBe('true')
  })

  test('uni CLI 显式小程序平台覆盖旧的 App 平台环境', () => {
    process.argv = [
      'node',
      '/project/node_modules/.bin/uni',
      '--platform',
      'mp-weixin',
    ]
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
    process.env.UNI_PLATFORM = 'app'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2_DYNAMIC).toBeUndefined()
    expect(process.env.UNI_APP_X_VAPOR_RENDER_TARGET).toBeUndefined()
  })
})
