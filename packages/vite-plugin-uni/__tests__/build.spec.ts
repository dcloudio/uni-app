import type { UserConfig } from 'vite'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  cssTarget: 'esnext',
  initEasycomsOnce: jest.fn(),
  resolveComponentsLibDirs: () => [],
}))

import { createBuild } from '../src/config/build'

describe('createBuild', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    UNI_APP_SOURCEMAP: process.env.UNI_APP_SOURCEMAP,
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
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

  test('UNI_APP_SOURCEMAP=false disables build sourcemap', () => {
    process.env.NODE_ENV = 'development'
    process.env.UNI_APP_SOURCEMAP = 'false'
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'app'

    const result = createBuild(
      { inputDir: '/project' } as any,
      { build: { sourcemap: true } } as UserConfig
    ) as NonNullable<ReturnType<typeof createBuild>>

    expect(result.sourcemap).toBe(false)
    expect((result.rolldownOptions as any).output.sourcemapExcludeSources).toBe(
      false
    )
  })
})
