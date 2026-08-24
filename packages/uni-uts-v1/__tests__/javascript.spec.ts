import { createFilter } from '@rollup/pluginutils'
import { uts2js } from '../src/tsc/javascript'

describe('uts2js DOM2 routing', () => {
  const originalUts2js = globalThis.uts2js
  const originalVaporScriptLang = process.env.UNI_APP_X_VAPOR_SCRIPT_LANG
  const scriptMacros = {
    createUniAppXScriptMacrosTransformer: jest.fn(),
  }

  afterEach(() => {
    globalThis.uts2js = originalUts2js
    if (originalVaporScriptLang === undefined) {
      delete process.env.UNI_APP_X_VAPOR_SCRIPT_LANG
    } else {
      process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = originalVaporScriptLang
    }
  })

  test('excludes standard TypeScript and lang.ts requests', () => {
    process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = 'true'
    const runtimeUts2js = jest.fn((_options: Record<string, any>) => [])
    globalThis.uts2js = runtimeUts2js

    uts2js({
      dom2: true,
      platform: 'app-android',
      inputDir: '/project/src',
      version: 'test',
      modules: {},
      scriptMacros,
    })

    const options = runtimeUts2js.mock.calls[0][0]
    const filter = createFilter(undefined, options.exclude)
    const isExcluded = (id: string) => !filter(id)

    expect(isExcluded('/project/src/utils.ts')).toBe(true)
    expect(isExcluded('/project/src/utils.ts?v=1')).toBe(true)
    expect(isExcluded('/project/src/utils.tsx')).toBe(false)
    expect(isExcluded('/project/src/utils.tsx?v=1')).toBe(false)
    expect(isExcluded('/project/src/utils.cts')).toBe(false)
    expect(isExcluded('/project/src/utils.mts')).toBe(false)
    expect(
      isExcluded(
        '/project/src/pages/index.uvue?vue&type=script&setup=true&lang.ts'
      )
    ).toBe(true)
    expect(isExcluded('/project/src/utils.uts')).toBe(false)
    expect(
      isExcluded(
        '/project/src/pages/index.uvue?vue&type=script&setup=true&lang.uts'
      )
    ).toBe(false)
  })

  test('keeps TypeScript in uts2js without script lang support', () => {
    process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = 'false'
    const runtimeUts2js = jest.fn((_options: Record<string, any>) => [])
    globalThis.uts2js = runtimeUts2js

    uts2js({
      dom2: true,
      platform: 'app-android',
      inputDir: '/project/src',
      version: 'test',
      modules: {},
      scriptMacros,
    })

    expect(runtimeUts2js.mock.calls[0][0].exclude).toBeUndefined()
  })

  test('excludes standard TypeScript without enabling DOM2 transforms', () => {
    process.env.UNI_APP_X_VAPOR_SCRIPT_LANG = 'true'
    const runtimeUts2js = jest.fn((_options: Record<string, any>) => [])
    globalThis.uts2js = runtimeUts2js

    uts2js({
      excludeStandardTypeScript: true,
      platform: 'web',
      inputDir: '/project/src',
      version: 'test',
      modules: {},
      scriptMacros,
    })

    const options = runtimeUts2js.mock.calls[0][0]
    const filter = createFilter(undefined, options.exclude)

    expect(filter('/project/src/utils.ts')).toBe(false)
    expect(options.dom2).toBeUndefined()
    expect(options.excludeStandardTypeScript).toBeUndefined()
  })
})
