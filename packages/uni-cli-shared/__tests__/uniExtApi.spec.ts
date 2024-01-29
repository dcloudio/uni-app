import { parseInjects } from '../src/uni_modules'
import { injectsToAutoImports } from '../src/vite'

describe('uni_modules:uni-ext-api', () => {
  test('parseInjects', () => {
    expect(
      parseInjects(
        true,
        'app-android',
        'kotlin',
        `@/uni_modules/uni-getbatteryinfo`,
        '',
        {
          uni: 'getBatteryInfo',
        }
      )
    ).toEqual({
      'uni.getBatteryInfo': '@/uni_modules/uni-getbatteryinfo',
    })
    expect(
      parseInjects(
        true,
        'app-android',
        'kotlin',
        `@/uni_modules/uni-getbatteryinfo`,
        '',
        {
          uni: ['getBatteryInfo'],
        }
      )
    ).toEqual({
      'uni.getBatteryInfo': [
        '@/uni_modules/uni-getbatteryinfo',
        'getBatteryInfo',
      ],
    })
    expect(
      parseInjects(
        true,
        'app-android',
        'kotlin',
        `@/uni_modules/uni-location`,
        '',
        {
          uni: ['openLocation', 'chooseLocation'],
        }
      )
    ).toEqual({
      'uni.openLocation': ['@/uni_modules/uni-location', 'openLocation'],
      'uni.chooseLocation': ['@/uni_modules/uni-location', 'chooseLocation'],
    })
    expect(
      parseInjects(
        true,
        'app-android',
        'kotlin',
        `@/uni_modules/uni-capturescreen`,
        '',
        {
          uni: {
            onUserCaptureScreen: 'onCaptureScreen',
            offUserCaptureScreen: 'offUserCaptureScreen',
          },
        }
      )
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
      parseInjects(
        true,
        'web',
        'javascript',
        `@/uni_modules/uni-getbatteryinfo`,
        '',
        {
          uni: {
            getBatteryInfo: {
              name: 'getBatteryInfo1',
            },
          },
        }
      )
    ).toEqual({
      'uni.getBatteryInfo': [
        '@/uni_modules/uni-getbatteryinfo',
        'getBatteryInfo1',
      ],
    })
    expect(
      parseInjects(
        true,
        'web',
        'javascript',
        `@/uni_modules/uni-getbatteryinfo`,
        '',
        {
          uni: {
            getBatteryInfo: {
              web: false,
            },
          },
        }
      )
    ).toEqual({})
    expect(
      parseInjects(
        true,
        'web',
        'javascript',
        `@/uni_modules/uni-location`,
        '',
        {
          uni: ['openLocation'],
        }
      )
    ).toEqual({
      'uni.openLocation': ['@/uni_modules/uni-location', 'openLocation'],
    })

    expect(
      parseInjects(true, 'app-ios', 'swift', `@/uni_modules/uni-request`, '', {
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
      parseInjects(
        true,
        'app-android',
        'kotlin',
        `@/uni_modules/uni-request`,
        '',
        {
          uni: {
            request: {
              app: false,
            },
          },
        }
      )
    ).toEqual({})
    expect(
      parseInjects(
        true,
        'app-android',
        'javascript',
        `@/uni_modules/uni-request`,
        '',
        {
          uni: {
            request: {
              app: {
                js: false,
                kotlin: false,
                swift: true,
              },
            },
          },
        }
      )
    ).toEqual({})
    expect(
      parseInjects(
        true,
        'app-android',
        'kotlin',
        `@/uni_modules/uni-request`,
        '',
        {
          uni: {
            request: {
              app: {
                js: false,
                kotlin: false,
                swift: true,
              },
            },
          },
        }
      )
    ).toEqual({})
    expect(
      parseInjects(true, 'app-ios', 'swift', `@/uni_modules/uni-request`, '', {
        uni: {
          request: {
            app: {
              js: false,
              kotlin: false,
              swift: true,
            },
          },
        },
      })
    ).toEqual({
      'uni.request': [
        '@/uni_modules/uni-request',
        'request',
        { js: false, kotlin: false, swift: true },
      ],
    })
  })
  test(`injectsToAutoImports`, () => {
    expect(
      injectsToAutoImports(
        parseInjects(
          true,
          'app-android',
          'kotlin',
          `@/uni_modules/uni-getbatteryinfo`,
          '',
          {
            uni: ['getBatteryInfo', 'getBatteryInfoSync'],
          }
        )
      )
    ).toEqual([
      {
        from: '@/uni_modules/uni-getbatteryinfo',
        imports: [
          ['getBatteryInfo', 'uni_getBatteryInfo'],
          ['getBatteryInfoSync', 'uni_getBatteryInfoSync'],
        ],
      },
    ])
  })
})
