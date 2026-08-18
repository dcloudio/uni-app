import { createDefine } from '../src/config/define'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  initDefine: jest.fn(() => ({})),
}))

describe('createDefine', () => {
  const originalUniAppX = process.env.UNI_APP_X

  afterEach(() => {
    if (originalUniAppX === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X')
    } else {
      process.env.UNI_APP_X = originalUniAppX
    }
  })

  test('keeps vue-i18n defaults for non uni-app x projects', () => {
    Reflect.deleteProperty(process.env, 'UNI_APP_X')

    expect(createDefine({} as any)).toMatchObject({
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_DROP_MESSAGE_COMPILER__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    })
  })

  test('disables unsupported vue-i18n APIs for uni-app x projects', () => {
    process.env.UNI_APP_X = 'true'

    expect(createDefine({} as any)).toMatchObject({
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_DROP_MESSAGE_COMPILER__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    })
  })
})
