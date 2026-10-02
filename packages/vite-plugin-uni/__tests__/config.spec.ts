import { execFileSync } from 'child_process'
import path from 'path'
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
    ['non-app-x', false, 'web', false, true],
    ['android-vdom', true, 'app-android', false, true],
    ['android-vapor', true, 'app-android', true, false],
    ['ios', true, 'app-ios', false, false],
    ['harmony', true, 'app-harmony', false, false],
    ['web', true, 'web', false, false],
    ['mp', true, 'mp-weixin', false, false],
  ] as const)(
    'routes UTS through esbuild for %s',
    (_name, isAppX, platform, isDom2, uts) => {
      process.env.UNI_APP_X = isAppX ? 'true' : 'false'
      process.env.UNI_UTS_PLATFORM = platform
      if (isDom2) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }
      const config = createConfig({ inputDir: '/project' } as any, [])!
      const handler = typeof config === 'function' ? config : config.handler
      const result = handler(
        {},
        { command: 'build', mode: 'production' }
      ) as UserConfig
      const include = (result.esbuild as { include: RegExp }).include

      expect(include).toBeInstanceOf(RegExp)
      expect(include.test('/project/utils.ts')).toBe(true)
      expect(
        include.test('/project/pages/index.uvue?vue&type=script&lang.ts')
      ).toBe(true)
      expect(include.test('/project/utils.uts')).toBe(uts)
      expect(
        include.test('/project/pages/index.uvue?vue&type=script&lang.uts')
      ).toBe(uts)
    }
  )

  test('builds independent SFC scripts after stripping TS types', () => {
    process.env.UNI_APP_X = 'false'
    const config = createConfig({ inputDir: '/project' } as any, [])!
    const handler = typeof config === 'function' ? config : config.handler
    const result = handler(
      {},
      { command: 'build', mode: 'production' }
    ) as UserConfig
    const esbuild = result.esbuild as {
      include: RegExp
      exclude: RegExp
      loader: string
    }
    // 使用独立 Node 进程运行 Vite，避开 Jest 的 CommonJS 沙箱
    const output = execFileSync(
      process.execPath,
      [
        path.resolve(__dirname, 'fixtures/independent-script.mjs'),
        JSON.stringify({
          include: esbuild.include.source,
          exclude: esbuild.exclude.source,
          loader: esbuild.loader,
        }),
      ],
      { encoding: 'utf8' }
    )

    expect(JSON.parse(output)).toEqual(['message', 'render'])
  })

  test.each(['meta=lang.ts', 'lang.ts-other'])(
    'does not treat %s as a script language query',
    (query) => {
      process.env.UNI_APP_X = 'false'
      const config = createConfig({ inputDir: '/project' } as any, [])!
      const handler = typeof config === 'function' ? config : config.handler
      const result = handler(
        {},
        { command: 'build', mode: 'production' }
      ) as UserConfig
      const include = (result.esbuild as { include: RegExp }).include

      expect(
        include.test(
          `/project/index.vue?${query}&uni_mp_independent_root=package-a`
        )
      ).toBe(false)
    }
  )
})
