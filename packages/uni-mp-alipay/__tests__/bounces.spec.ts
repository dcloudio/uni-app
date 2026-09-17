import { parseWindowOptions } from '../../uni-cli-shared/src/json/mp/utils'
import { options } from '../src/compiler/options'

jest.mock('estree-walker', () => ({ walk: jest.fn() }), { virtual: true })

describe('Alipay bounces page option', () => {
  const originalAppX = process.env.UNI_APP_X

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
  })

  afterEach(() => {
    restoreEnv('UNI_APP_X', originalAppX)
  })

  test.each([true, false])('maps bounces=%s in uni-app x', (bounces) => {
    expect(parseOptions({ bounces })).toEqual({
      allowsBounceVertical: bounces ? 'YES' : 'NO',
    })
  })

  test('prefers bounces and falls back to allowsBounceVertical in uni-app x', () => {
    expect(
      parseOptions({ bounces: false, allowsBounceVertical: true })
    ).toEqual({ allowsBounceVertical: 'NO' })
    expect(parseOptions({ allowsBounceVertical: true })).toEqual({
      allowsBounceVertical: 'YES',
    })
  })

  test('keeps the original mapping outside uni-app x', () => {
    Reflect.deleteProperty(process.env, 'UNI_APP_X')

    expect(parseOptions({ bounces: true })).toEqual({})
    expect(parseOptions({ allowsBounceVertical: false })).toEqual({
      allowsBounceVertical: false,
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

function parseOptions(style: Record<string, unknown>) {
  const windowOptions = parseWindowOptions(
    style as unknown as UniApp.PagesJsonPageStyle,
    'mp-alipay',
    options.json!.windowOptionsMap
  )
  options.json!.formatAppJson!(
    { window: windowOptions },
    {},
    {
      page: windowOptions,
    }
  )
  return windowOptions
}
