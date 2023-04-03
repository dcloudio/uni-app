import { parseInjects } from '../src/uni_modules'

describe('uni_modules:uni-ext-api', () => {
  test('parseInjects', () => {
    expect(
      parseInjects(true, 'app', `@/uni_modules/uni-getbatteryinfo`, {
        uni: 'getBatteryInfo',
      })
    ).toEqual({
      'uni.getBatteryInfo': '@/uni_modules/uni-getbatteryinfo',
    })
    expect(
      parseInjects(true, 'app', `@/uni_modules/uni-getbatteryinfo`, {
        uni: ['getBatteryInfo'],
      })
    ).toEqual({
      'uni.getBatteryInfo': [
        '@/uni_modules/uni-getbatteryinfo',
        'getBatteryInfo',
      ],
    })
    expect(
      parseInjects(true, 'app', `@/uni_modules/uni-location`, {
        uni: ['openLocation', 'chooseLocation'],
      })
    ).toEqual({
      'uni.openLocation': ['@/uni_modules/uni-location', 'openLocation'],
      'uni.chooseLocation': ['@/uni_modules/uni-location', 'chooseLocation'],
    })
    expect(
      parseInjects(true, 'app', `@/uni_modules/uni-capturescreen`, {
        uni: {
          onUserCaptureScreen: 'onCaptureScreen',
          offUserCaptureScreen: 'offUserCaptureScreen',
        },
      })
    ).toEqual({
      'uni.onUserCaptureScreen': [
        '@/uni_modules/uni-capturescreen',
        'onCaptureScreen',
      ],
      'uni.offUserCaptureScreen': [
        '@/uni_modules/uni-capturescreen',
        'offUserCaptureScreen',
      ],
    })
  })
  test('parseInjects with platform', () => {
    expect(
      parseInjects(true, 'web', `@/uni_modules/uni-getbatteryinfo`, {
        uni: 'getBatteryInfo1',
        web: {
          uni: 'getBatteryInfo',
        },
      })
    ).toEqual({
      'uni.getBatteryInfo': '@/uni_modules/uni-getbatteryinfo',
    })
    expect(
      parseInjects(true, 'web', `@/uni_modules/uni-getbatteryinfo`, {
        uni: 'getBatteryInfo1',
        web: false,
      })
    ).toEqual({})
    expect(
      parseInjects(true, 'web', `@/uni_modules/uni-location`, {
        uni: ['openLocation'],
        web: {
          uni: ['chooseLocation'],
        },
      })
    ).toEqual({
      'uni.chooseLocation': ['@/uni_modules/uni-location', 'chooseLocation'],
    })

    expect(
      parseInjects(true, 'app', `@/uni_modules/uni-request`, {
        uni: {
          request: {
            app: {
              js: false,
            },
          },
        },
      })
    ).toEqual({
      'uni.request': ['@/uni_modules/uni-request', 'request', { js: false }],
    })
    expect(
      parseInjects(true, 'app', `@/uni_modules/uni-request`, {
        uni: {
          request: {
            app: false,
          },
        },
      })
    ).toEqual({})
  })
})
