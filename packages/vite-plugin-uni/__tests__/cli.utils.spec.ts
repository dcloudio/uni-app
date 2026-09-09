jest.mock('@dcloudio/uni-cli-shared', () => ({
  M: {
    'app.compiler.version': '编译器版本：{version}',
    compiling: '正在编译中...',
    'dev.performance':
      '请注意运行模式下，因日志输出、sourcemap 以及未压缩源码等原因，性能和包体积，均不及发行模式。',
    'view.render.compiler.target': '当前视图层编译目标：{target}',
    'view.render.compiler.target.bytecode': '字节码',
    'view.render.compiler.target.nativecode': '机器码',
    'style.isolation.version.upgrade':
      '当前样式隔离策略：{version}。推荐升级为 2.0。详见：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html',
    'style.isolation.version':
      '当前样式隔离策略：{version}。详见：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html',
  },
  getPlatformDir: jest.fn(() => 'app-harmony'),
  initModulePaths: jest.fn(),
  initPreContext: jest.fn(),
  isInHBuilderX: jest.fn(() => false),
  isNormalCompileTarget: jest.fn(() => true),
  isUniAppX: jest.fn(() => false),
  isUniAppXVapor: jest.fn(() => false),
  output: jest.fn(),
  parseManifestJsonOnce: jest.fn(),
  parseScripts: jest.fn(),
  runByHBuilderX: jest.fn(() => false),
}))

jest.mock('../src/cli/nvue', () => ({
  initNVueEnv: jest.fn(),
}))

jest.mock('../src/cli/uvue', () => ({
  initUVueEnv: jest.fn(),
}))

import {
  formatStyleIsolationVersionMessage,
  initBuildSourceMapEnv,
  initEnv,
} from '../src/cli/utils'

describe('formatStyleIsolationVersionMessage', () => {
  test.each(['1', '2.1', '3'])(
    'recommends upgrading style isolation version %s',
    (version) => {
      const message = formatStyleIsolationVersionMessage(version)

      expect(message).toContain('2.0')
      expect(message).toMatch(/recommended|推荐/i)
    }
  )

  test.each([
    ['2', '2.0'],
    ['2.0', '2.0'],
  ])(
    'does not recommend upgrading style isolation version %s',
    (version, displayVersion) => {
      const message = formatStyleIsolationVersionMessage(version)

      expect(message).toContain(displayVersion)
      expect(message).not.toMatch(/recommended|推荐/i)
    }
  )
})

describe('initBuildSourceMapEnv', () => {
  const originalEnv = {
    SOURCEMAP: process.env.SOURCEMAP,
    UNI_APP_SOURCEMAP: process.env.UNI_APP_SOURCEMAP,
  }

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  test('disables sourcemap by default for build watch', () => {
    Reflect.deleteProperty(process.env, 'SOURCEMAP')
    Reflect.deleteProperty(process.env, 'UNI_APP_SOURCEMAP')

    initBuildSourceMapEnv({ watch: true } as any)

    expect(process.env.UNI_APP_SOURCEMAP).toBe('false')
  })

  test('keeps explicit sourcemap in build watch', () => {
    Reflect.deleteProperty(process.env, 'SOURCEMAP')
    Reflect.deleteProperty(process.env, 'UNI_APP_SOURCEMAP')

    initBuildSourceMapEnv({ watch: true, sourcemap: true } as any)

    expect(process.env.UNI_APP_SOURCEMAP).toBe('true')
  })
})

describe('initEnv', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    SOURCEMAP: process.env.SOURCEMAP,
    UNI_APP_SOURCEMAP: process.env.UNI_APP_SOURCEMAP,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_CLI_CONTEXT: process.env.UNI_CLI_CONTEXT,
    VITE_ROOT_DIR: process.env.VITE_ROOT_DIR,
  }

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    jest.restoreAllMocks()
  })

  test('disables sourcemap in dev watch by default', () => {
    Reflect.deleteProperty(process.env, 'SOURCEMAP')
    Reflect.deleteProperty(process.env, 'UNI_APP_SOURCEMAP')
    process.env.UNI_INPUT_DIR = '/project'
    process.env.UNI_CLI_CONTEXT = '/project'
    process.env.VITE_ROOT_DIR = '/project'

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    initEnv('dev', {
      platform: 'app-harmony',
      watch: {},
    } as any)

    expect(process.env.UNI_APP_SOURCEMAP).toBe('false')
    expect(logSpy).toHaveBeenCalled()
  })
})
