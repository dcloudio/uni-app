import { genUniAppXJsEngineIndexKotlinCode } from '../../src/plugins/android-dom2/utils'

describe('android-dom2 kotlin utils', () => {
  const originalEnv = {
    UNI_COMPILER_VERSION: process.env.UNI_COMPILER_VERSION,
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

  test('should generate kotlin index code with package and base app config', () => {
    process.env.UNI_COMPILER_VERSION = '4.0.0'

    const code = genUniAppXJsEngineIndexKotlinCode({
      name: 'TestApp',
      appid: '__UNI__TEST123',
      versionName: '1.0.0',
      versionCode: '100',
    })

    expect(code).toMatchSnapshot()
  })

  test('should generate dom2 kotlin config for theme splash and flex options', () => {
    const code = genUniAppXJsEngineIndexKotlinCode({
      appid: '__UNI__TEST123',
      defaultAppTheme: 'light',
      app: {
        defaultAppTheme: 'dark',
      },
      'uni-app-x': {
        singleThread: false,
        'flex-direction': 'row',
      },
      'app-android': {
        splashScreen: {
          autoclose: false,
          delay: 0,
          style: {
            background: '#fff',
          },
          channels: ['a', 'b'],
        },
      },
    })

    expect(code).toMatchSnapshot()
  })

  test('should escape kotlin string templates and fallback to default appid', () => {
    const code = genUniAppXJsEngineIndexKotlinCode({
      name: 'Price$Tag',
      'app-android': {
        splashScreen: {
          image: 'launch$screen',
        },
      },
    })

    expect(code).toMatchSnapshot()
  })
})
