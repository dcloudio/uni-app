import type { UserConfig } from 'vite'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  getPlatformManifestJson: () => ({}),
  isInHBuilderX: () => false,
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
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalVaporScriptLang = process.env.UNI_APP_X_VAPOR_SCRIPT_LANG

  afterEach(() => {
    if (originalDom2 === undefined) {
      delete process.env.UNI_APP_X_DOM2
    } else {
      process.env.UNI_APP_X_DOM2 = originalDom2
    }
    if (originalVaporScriptLang === undefined) {
      delete process.env.UNI_APP_X_VAPOR_SCRIPT_LANG
    } else {
      process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = originalVaporScriptLang
    }
  })

  test.each([
    [true, true, false],
    [true, false, true],
    [false, true, true],
  ] as const)(
    'routes UTS through esbuild with DOM2=%s and script lang=%s',
    (isDom2, enableVaporScriptLang, uts) => {
      if (isDom2) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }
      process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = enableVaporScriptLang
        ? 'true'
        : 'false'
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
})
