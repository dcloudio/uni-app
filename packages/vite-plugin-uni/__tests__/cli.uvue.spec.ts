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
  parseManifestJsonOnce: () => ({}),
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

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    jest.resetModules()
  })

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
