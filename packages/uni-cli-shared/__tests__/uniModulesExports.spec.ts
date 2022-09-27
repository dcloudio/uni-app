import { parseExports } from '../src/vite/plugins/uniModules'

describe('uni_modules:exports', () => {
  test('parseExports', () => {
    expect(
      parseExports('app', `@/uni_modules/uni-getbatteryinfo`, {
        uni: 'getBatteryInfo',
      })
    ).toEqual([
      ["import getBatteryInfo from '@/uni_modules/uni-getbatteryinfo'"],
      ['uni.getBatteryInfo = getBatteryInfo'],
    ])
    expect(
      parseExports('app', `@/uni_modules/uni-getbatteryinfo`, {
        uni: ['getBatteryInfo'],
      })
    ).toEqual([
      ["import { getBatteryInfo } from '@/uni_modules/uni-getbatteryinfo'"],
      ['uni.getBatteryInfo = getBatteryInfo'],
    ])
    expect(
      parseExports('app', `@/uni_modules/uni-location`, {
        uni: ['openLocation', 'chooseLocation'],
      })
    ).toEqual([
      [
        "import { openLocation, chooseLocation } from '@/uni_modules/uni-location'",
      ],
      [
        'uni.openLocation = openLocation',
        'uni.chooseLocation = chooseLocation',
      ],
    ])
    expect(
      parseExports('app', `@/uni_modules/uni-capturescreen`, {
        uni: {
          onUserCaptureScreen: 'onCaptureScreen',
          offUserCaptureScreen: 'offUserCaptureScreen',
        },
      })
    ).toEqual([
      [
        "import { onCaptureScreen as onUserCaptureScreen, offUserCaptureScreen } from '@/uni_modules/uni-capturescreen'",
      ],
      [
        'uni.onUserCaptureScreen = onUserCaptureScreen',
        'uni.offUserCaptureScreen = offUserCaptureScreen',
      ],
    ])
  })
  test('parseExports with platform', () => {
    expect(
      parseExports('web', `@/uni_modules/uni-getbatteryinfo`, {
        uni: 'getBatteryInfo1',
        web: {
          uni: 'getBatteryInfo',
        },
      })
    ).toEqual([
      ["import getBatteryInfo from '@/uni_modules/uni-getbatteryinfo'"],
      ['uni.getBatteryInfo = getBatteryInfo'],
    ])
    expect(
      parseExports('web', `@/uni_modules/uni-getbatteryinfo`, {
        uni: 'getBatteryInfo1',
        web: false,
      })
    ).toEqual([[], []])
    expect(
      parseExports('web', `@/uni_modules/uni-location`, {
        uni: ['openLocation'],
        web: {
          uni: ['chooseLocation'],
        },
      })
    ).toEqual([
      ["import { chooseLocation } from '@/uni_modules/uni-location'"],
      ['uni.chooseLocation = chooseLocation'],
    ])
  })
})
