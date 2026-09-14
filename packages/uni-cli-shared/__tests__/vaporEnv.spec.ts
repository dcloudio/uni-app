import { normalizeUniAppXVaporEnv } from '../src/hbx/alias'

describe('normalizeUniAppXVaporEnv', () => {
  const originalArgv = process.argv
  const envNames = [
    'UNI_APP_X_VAPOR',
    'UNI_APP_X_DOM2',
    'UNI_APP_X_DOM2_DYNAMIC',
    'UNI_APP_X_VAPOR_RENDER_TARGET',
    'UNI_PLATFORM',
    'UNI_UTS_PLATFORM',
  ] as const
  const originalEnv = Object.fromEntries(
    envNames.map((name) => [name, process.env[name]])
  )

  beforeEach(() => {
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
  })

  test('公开 Vapor 开关启用内部 DOM2 状态', () => {
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'nativecode'
    process.env.UNI_PLATFORM = 'app'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBe('true')
    expect(process.env.UNI_APP_X_DOM2).toBe('true')
    expect(process.env.UNI_APP_X_VAPOR_RENDER_TARGET).toBe('nativecode')
  })

  test('公开 Vapor 开关可以关闭旧的内部 DOM2 状态', () => {
    process.env.UNI_APP_X_VAPOR = 'false'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_DOM2_DYNAMIC = 'true'
    process.env.UNI_APP_X_VAPOR_RENDER_TARGET = 'bytecode'
    process.env.UNI_PLATFORM = 'app'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2_DYNAMIC).toBeUndefined()
    expect(process.env.UNI_APP_X_VAPOR_RENDER_TARGET).toBeUndefined()
  })

  test('兼容旧的内部 DOM2 开关', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_PLATFORM = 'app'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBe('true')
    expect(process.env.UNI_APP_X_DOM2).toBe('true')
  })

  test.each(['h5', 'web', 'mp-weixin'])(
    '%s 平台同时关闭 Vapor 和 DOM2 状态',
    (platform) => {
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
    }
  )

  test.each([
    [[], false],
    [['-p', 'app'], true],
    [['--platform', 'mp-weixin'], false],
    [['--platform=app'], true],
  ])('uni CLI 参数 %j 在 alias 初始化前识别平台', (args, enabled) => {
    process.argv = ['node', '/project/node_modules/.bin/uni', ...args]
    process.env.UNI_APP_X_VAPOR = 'true'

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

  test('uni CLI 未指定平台时默认 h5 并覆盖旧的平台环境', () => {
    process.argv = ['node', '/project/node_modules/.bin/uni']
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'app'

    normalizeUniAppXVaporEnv()

    expect(process.env.UNI_APP_X_VAPOR).toBeUndefined()
    expect(process.env.UNI_APP_X_DOM2).toBeUndefined()
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
