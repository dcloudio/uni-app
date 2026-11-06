jest.mock('@dcloudio/uni-cli-shared', () => ({
  M: {},
  isUniAppXAndroidVapor: () =>
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android' &&
    process.env.UNI_APP_X_DOM2 === 'true',
  isUniAppXIOS: () =>
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-ios',
  initEasycomsOnce: jest.fn(),
  isInHBuilderX: () => false,
  output: jest.fn(),
  parseManifestJsonOnce: jest.fn(() => ({})),
  resetOutput: jest.fn(),
  resolveComponentsLibDirs: () => [],
  runByHBuilderX: () => false,
}))

jest.mock('../src/cli/build', () => ({
  buildByVite: jest.fn(),
  initBuildOptions: jest.fn(),
}))

jest.mock('../src/utils/easycom', () => ({
  initEasycom: jest.fn(),
}))

jest.mock('../src/cli/action', () => ({
  stopProfiler: jest.fn(),
}))

describe('cli uvue init', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_SINGLE_THREAD: process.env.UNI_APP_X_SINGLE_THREAD,
    UNI_APP_X_UVUE_SCRIPT_ENGINE: process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  beforeEach(() => {
    Object.keys(originalEnv).forEach((key) =>
      Reflect.deleteProperty(process.env, key)
    )
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    jest.resetAllMocks()
    jest.resetModules()
  })

  test.each(['app', 'h5', 'web'])(
    '%s 平台根据 manifest 统一识别 uni-app x 项目',
    (platform) => {
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']
      const { parseManifestJsonOnce } = jest.requireMock(
        '@dcloudio/uni-cli-shared'
      )
      parseManifestJsonOnce.mockReturnValue({
        'uni-app-x': { singleThread: false },
      })

      const { initUVueEnv } = require('../src/cli/uvue')
      initUVueEnv()

      expect(process.env.UNI_APP_X).toBe('true')
      expect(process.env.UNI_APP_X_SINGLE_THREAD).toBe('false')
    }
  )

  test.each(['app', 'h5', 'web'])(
    '%s 平台 manifest 无 uni-app-x 时保留普通项目状态',
    (platform) => {
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']
      const { parseManifestJsonOnce } = jest.requireMock(
        '@dcloudio/uni-cli-shared'
      )
      parseManifestJsonOnce.mockReturnValue({})

      const { initUVueEnv } = require('../src/cli/uvue')
      initUVueEnv()

      expect(process.env.UNI_APP_X).toBeUndefined()
    }
  )

  test.each(['app', 'h5', 'web'])(
    '%s 平台保留显式关闭的 UNI_APP_X',
    (platform) => {
      process.env.UNI_PLATFORM = platform as NodeJS.ProcessEnv['UNI_PLATFORM']
      process.env.UNI_APP_X = 'false'
      const { parseManifestJsonOnce } = jest.requireMock(
        '@dcloudio/uni-cli-shared'
      )
      parseManifestJsonOnce.mockReturnValue({ 'uni-app-x': {} })

      const { initUVueEnv } = require('../src/cli/uvue')
      initUVueEnv()

      expect(process.env.UNI_APP_X).toBe('false')
      expect(parseManifestJsonOnce).not.toHaveBeenCalled()
    }
  )

  test('app x Android vapor initializes js engine', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-android'

    const { initUVueEnv } = require('../src/cli/uvue')
    initUVueEnv()

    expect(process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE).toBe('js')
  })

  test('app x Android native keeps native engine', () => {
    process.env.UNI_APP_X = 'true'
    Reflect.set(process.env, 'UNI_APP_X_DOM2', 'false')
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-android'

    const { initUVueEnv } = require('../src/cli/uvue')
    initUVueEnv()

    expect(process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE).toBe('native')
  })

  test('app x iOS initializes js engine', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-ios'

    const { initUVueEnv } = require('../src/cli/uvue')
    initUVueEnv()

    expect(process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE).toBe('js')
  })
})
