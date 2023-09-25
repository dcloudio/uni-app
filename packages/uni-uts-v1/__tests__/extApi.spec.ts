import { normalizeExtApiDefaultParameters } from '../src/utils'

describe('ext-api', () => {
  test('default parameters', () => {
    expect(
      normalizeExtApiDefaultParameters({
        'uni-route': {
          navigateBack: 'null',
        },
        'uni-ui': {
          startPullDownRefresh: 'null',
          hideTabBar: 'null',
          showTabBar: 'null',
        },
        'uni-exit': {
          exit: 'null',
        },
        'uni-getAppBaseInfo': {
          getAppBaseInfo: 'null',
        },
        'uni-getDeviceInfo': {
          getDeviceInfo: 'null',
        },
        'uni-storage': {
          clearStorage: 'null',
        },
      })
    ).toEqual({
      navigateBack: ['null'],
      startPullDownRefresh: ['null'],
      hideTabBar: ['null'],
      showTabBar: ['null'],
      exit: ['null'],
      getAppBaseInfo: ['null'],
      getDeviceInfo: ['null'],
      clearStorage: ['null'],
    })
    expect(
      normalizeExtApiDefaultParameters({
        'uni-route': {
          navigateBack: ['null'],
        },
        'uni-ui': {
          startPullDownRefresh: ['null'],
          hideTabBar: ['null'],
          showTabBar: ['null'],
        },
        'uni-exit': {
          exit: ['null'],
        },
        'uni-getAppBaseInfo': {
          getAppBaseInfo: ['null'],
        },
        'uni-getDeviceInfo': {
          getDeviceInfo: ['null'],
        },
        'uni-storage': {
          clearStorage: ['null'],
        },
      })
    ).toEqual({
      navigateBack: ['null'],
      startPullDownRefresh: ['null'],
      hideTabBar: ['null'],
      showTabBar: ['null'],
      exit: ['null'],
      getAppBaseInfo: ['null'],
      getDeviceInfo: ['null'],
      clearStorage: ['null'],
    })
    expect(
      normalizeExtApiDefaultParameters({
        'uni-route': {
          navigateBack: ['null'],
        },
        'uni-ui': {
          startPullDownRefresh: ['null'],
          hideTabBar: ['null'],
          showTabBar: ['null'],
        },
        'uni-exit': {
          exit: ['null'],
        },
        'uni-getAppBaseInfo': {
          getAppBaseInfo: ['null'],
        },
        'uni-getDeviceInfo': {
          getDeviceInfo: ['null'],
        },
        'uni-storage': {
          clearStorage: ['null'],
        },
        'uni-video': {
          createVideoContext: [null, 'null'],
        },
      })
    ).toEqual({
      navigateBack: ['null'],
      startPullDownRefresh: ['null'],
      hideTabBar: ['null'],
      showTabBar: ['null'],
      exit: ['null'],
      getAppBaseInfo: ['null'],
      getDeviceInfo: ['null'],
      clearStorage: ['null'],
      createVideoContext: ['', 'null'],
    })
  })
})
