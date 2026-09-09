import type { UserConfig } from 'vite'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  getPlatformManifestJson: () => ({}),
  isInHBuilderX: () => false,
  isUniAppXStandardScriptSupported: () =>
    process.env.UNI_APP_X === 'true' &&
    (process.env.UNI_UTS_PLATFORM !== 'app-android' ||
      process.env.UNI_APP_X_DOM2 === 'true'),
  parseManifestJsonOnce: () => ({}),
}))

jest.mock('../src/config/build', () => ({ createBuild: () => ({}) }))
jest.mock('../src/config/css', () => ({ createCss: () => ({}) }))
jest.mock('../src/config/define', () => ({ createDefine: () => ({}) }))
jest.mock('../src/config/optimizeDeps', () => ({
  createOptimizeDeps: () => ({}),
}))
jest.mock('../src/config/resolve', () => ({ createResolve: () => ({}) }))

import { createConfig } from '../src/config'

describe('createConfig', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    })
  })

  test.each([
    ['non-app-x', false, 'web', false],
    ['android-vdom', true, 'app-android', false],
    ['android-vapor', true, 'app-android', true],
    ['ios', true, 'app-ios', false],
    ['harmony', true, 'app-harmony', false],
    ['web', true, 'web', false],
    ['mp', true, 'mp-weixin', false],
  ] as const)(
    'keeps UTS out of Oxc for %s',
    (_name, isAppX, platform, isDom2) => {
      process.env.UNI_APP_X = isAppX ? 'true' : 'false'
      process.env.UNI_UTS_PLATFORM = platform
      if (isDom2) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }
      const config = createConfig({ inputDir: '/project' } as any, [])!
      const handler = typeof config === 'function' ? config : config.handler
      const result = handler.call(
        {} as any,
        {},
        { command: 'build', mode: 'production' }
      ) as UserConfig
      const include = (result.oxc as { include: RegExp }).include

      expect(include).toBeInstanceOf(RegExp)
      expect(include.test('/project/utils.ts')).toBe(true)
      expect(
        include.test('/project/pages/index.uvue?vue&type=script&lang.ts')
      ).toBe(true)
      expect(include.test('/project/utils.uts')).toBe(false)
      expect(
        include.test('/project/pages/index.uvue?vue&type=script&lang.uts')
      ).toBe(false)
    }
  )
})
