import { options } from '../src/compiler/options'

jest.mock('estree-walker', () => ({ walk: jest.fn() }), { virtual: true })

describe('Alipay app option formatAppJson', () => {
  const originalPlatform = process.env.UNI_PLATFORM

  afterEach(() => {
    restoreEnv('UNI_PLATFORM', originalPlatform)
  })

  test.each([true, false])(
    'maps manifest darkmode=%s to appJson.darkMode',
    (darkmode) => {
      process.env.UNI_PLATFORM = 'mp-alipay'

      const appJson: Record<string, unknown> = {
        darkmode: true,
        window: {},
      }

      options.json!.formatAppJson!(
        appJson,
        {
          'mp-alipay': {
            darkmode,
          },
        },
        {}
      )

      expect(appJson).toEqual({
        darkMode: darkmode,
        window: {},
      })
    }
  )

  test('removes darkmode when manifest value is not boolean', () => {
    process.env.UNI_PLATFORM = 'mp-alipay'

    const appJson: Record<string, unknown> = {
      darkmode: true,
      window: {},
    }

    options.json!.formatAppJson!(appJson, { 'mp-alipay': {} }, {})

    expect(appJson).toEqual({
      window: {},
    })
  })
})

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    Reflect.deleteProperty(process.env, name)
  } else {
    process.env[name] = value
  }
}
