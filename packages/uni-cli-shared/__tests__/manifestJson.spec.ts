import { parseUniXSplashScreen } from '../src/json/uni-x'

describe('manifest.json', () => {
  test(`parse splashScreen`, () => {
    expect(
      parseUniXSplashScreen('app-android', {
        app: {
          splashScreen: {
            autoClose: 'onReady',
          },
        },
      })
    ).toEqual({
      autoClose: 'onReady',
    })
    expect(
      parseUniXSplashScreen('app-android', {
        'app-android': {
          splashScreen: {
            autoClose: 'onReady',
          },
        },
      })
    ).toEqual({
      autoClose: 'onReady',
    })
  })
})
