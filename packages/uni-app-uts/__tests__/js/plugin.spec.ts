import type { ResolvedConfig } from 'vite'
import { createUniAppJsEnginePlugin } from '../../src/plugins/js/plugin'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  injectCssPlugin: jest.fn(),
  injectCssPostPlugin: jest.fn(),
}))

jest.mock('../../src/plugins/utils', () => ({
  configResolved: jest.fn(),
  createUniOptions: jest.fn(() => ({})),
}))

describe('uni app JS engine plugin', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_TSC_DIR: process.env.UNI_APP_X_TSC_DIR,
    UNI_APP_X_UVUE_DIR: process.env.UNI_APP_X_UVUE_DIR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_OUTPUT_DIR: process.env.UNI_OUTPUT_DIR,
  }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_TSC_DIR = '/tmp/uni-app-uts-test-tsc'
    process.env.UNI_APP_X_UVUE_DIR = '/tmp/uni-app-uts-test-uvue'
    process.env.UNI_INPUT_DIR = '/tmp/uni-app-uts-test-input'
    process.env.UNI_OUTPUT_DIR = '/tmp/uni-app-uts-test-output'
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  test('skips the legacy JS collector in DOM2', () => {
    const plugin = createUniAppJsEnginePlugin('app-android')()
    const config = {
      plugins: [{ name: 'uni:app-main' }],
    } as unknown as ResolvedConfig
    const configResolved =
      typeof plugin.configResolved === 'function'
        ? plugin.configResolved
        : plugin.configResolved!.handler

    configResolved(config)

    expect(config.plugins.map((plugin) => plugin.name)).not.toContain(
      'uni:app-js'
    )
  })

  test('keeps the legacy JS collector for non-Vapor builds', () => {
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    const plugin = createUniAppJsEnginePlugin('app-android')()
    const config = {
      plugins: [{ name: 'uni:app-main' }],
    } as unknown as ResolvedConfig
    const configResolved =
      typeof plugin.configResolved === 'function'
        ? plugin.configResolved
        : plugin.configResolved!.handler

    configResolved(config)

    expect(config.plugins.map((plugin) => plugin.name)).toContain('uni:app-js')
  })
})
