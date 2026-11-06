import { initFeatures } from '../src/vite/features'

describe('Web Vapor 的 Vue 功能开关', () => {
  const originalEnv = process.env
  afterEach(() => {
    process.env = originalEnv
  })

  test.each([
    ['h5', true, true, false, false],
    ['web', true, true, false, false],
    ['h5', true, false, false, true],
    ['h5', false, true, false, true],
    ['app', true, true, false, true],
    ['h5', true, true, true, true],
  ] as const)(
    '%s x=%s vapor=%s ssr=%s 的 Options API 开关为 %s',
    (platform, isX, vapor, ssr, expected) => {
      process.env = {
        ...originalEnv,
        UNI_PLATFORM: platform,
        UNI_APP_X: isX ? 'true' : 'false',
        UNI_APP_X_DOM2: vapor ? 'true' : undefined,
      }
      for (const command of ['build', 'serve'] as const) {
        expect(
          initFeatures({
            inputDir: __dirname,
            platform,
            command,
            ssr,
            manifestJson: {},
            pagesJson: {
              pages: [{ path: 'index', style: { navigationBar: {} } }],
              globalStyle: { navigationBar: {} },
            },
          }).__VUE_OPTIONS_API__
        ).toBe(expected)
      }
    }
  )
})
