import { buildOptions } from '../src/plugin/build'

describe('buildOptions', () => {
  const originalEnv = {
    UNI_APP_SOURCEMAP: process.env.UNI_APP_SOURCEMAP,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_OUTPUT_DIR: process.env.UNI_OUTPUT_DIR,
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

  test('UNI_APP_SOURCEMAP=false disables app build sourcemap', () => {
    process.env.UNI_APP_SOURCEMAP = 'false'
    process.env.UNI_INPUT_DIR = '/project'
    process.env.UNI_OUTPUT_DIR = '/project/unpackage/dist/dev'

    const result = buildOptions(
      { renderer: 'native', appService: false } as any,
      { build: { sourcemap: true } } as any,
      {} as any
    ) as NonNullable<ReturnType<typeof buildOptions>>

    expect(result.sourcemap).toBe(false)
  })
})
