import {
  normalizeExtApiDefaultParameters,
  normalizeExtApiModules,
  // parseExtApiModules,
} from '../src/utils'

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
  test('modules', () => {
    expect(
      normalizeExtApiModules({
        'uni-getLocation-system': {
          uni: ['getLocation'],
        },
        'uni-video': {
          uni: {
            createVideoContext: {
              name: 'createVideoContext',
              app: {
                js: false,
                kotlin: true,
                swift: false,
              },
            },
          },
          components: ['video'],
        },
        'uni-storage': {
          uni: {
            getStorage: {
              name: 'getStorage',
              app: {
                js: false,
                kotlin: true,
                swift: true,
              },
            },
            getStorageInfo: {
              name: 'getStorageInfo',
              app: {
                js: false,
                kotlin: true,
                swift: true,
              },
            },
            clearStorage: {
              name: 'clearStorage',
              app: {
                js: false,
                kotlin: true,
                swift: true,
              },
            },
            clearStorageSync: {
              name: 'clearStorageSync',
              app: {
                js: false,
                kotlin: true,
                swift: true,
              },
            },
          },
        },
      })
    ).toEqual({
      'component.video': 'uni-video',
      'uni.clearStorage': 'uni-storage',
      'uni.clearStorageSync': 'uni-storage',
      'uni.createVideoContext': 'uni-video',
      'uni.getLocation': 'uni-getLocation-system',
      'uni.getStorage': 'uni-storage',
      'uni.getStorageInfo': 'uni-storage',
    })
    // TODO 目前暂时屏蔽了 uts-video 的编译
    // expect(parseExtApiModules()).toMatchObject({
    //   'uni.createVideoContext': 'uni-video',
    //   'component.video': 'uni-video',
    // })
  })
})
