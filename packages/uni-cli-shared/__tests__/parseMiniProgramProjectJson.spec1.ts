import { parseMiniProgramProjectJson } from '../src/json/mp/project'

describe('parseMiniProgramProjectJson', () => {
  it('测试自定义 manifest.json', () => {
    // todo

    // packages/uni-mp-xhs/dist/uni.compiler.js
    const userManifestJSON = {
      name: '',
      appid: '',
      description: '',
      versionName: '1.0.0',
      versionCode: '100',
      transformPx: false,
      /* 5+App特有相关 */
      'app-plus': {
        usingComponents: true,
        nvueStyleCompiler: 'uni-app',
        compilerVersion: 3,
        splashscreen: {
          alwaysShowBeforeRender: true,
          waiting: true,
          autoclose: true,
          delay: 0,
        },
        /* 模块配置 */
        modules: {},
        /* 应用发布信息 */
        distribute: {
          /* android打包配置 */
          android: {
            permissions: [
              '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
              '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
              '<uses-permission android:name="android.permission.VIBRATE"/>',
              '<uses-permission android:name="android.permission.READ_LOGS"/>',
              '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
              '<uses-feature android:name="android.hardware.camera.autofocus"/>',
              '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
              '<uses-permission android:name="android.permission.CAMERA"/>',
              '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
              '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
              '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
              '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
              '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
              '<uses-feature android:name="android.hardware.camera"/>',
              '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
            ],
          },
          /* ios打包配置 */
          ios: {},
          /* SDK配置 */
          sdkConfigs: {},
        },
      },
      /* 快应用特有相关 */
      quickapp: {},
      /* 小程序特有相关 */
      'mp-weixin': {
        appid: '',
        setting: {
          urlCheck: false,
        },
        usingComponents: true,
      },
      'mp-alipay': {
        usingComponents: true,
      },
      'mp-baidu': {
        usingComponents: true,
      },
      'mp-toutiao': {
        usingComponents: true,
      },
      uniStatistics: {
        enable: false,
      },
      'mp-xhs': {
        appid: '649bcf45be816d0051838458',
        libVersion: '3.105.1',
        setting: {
          urlCheck: false,
          minified: true,
        },
        usingComponents: true,
        optimization: {
          subPackages: true,
        },

        // packOptions

        _usePrivacyCheck_: true,
        permission: {
          'scope.userLocation': {
            desc: '小程序将会获取您的位置信息用于岗位列表的展示',
          },
        },
        requiredPrivateInfos: [
          'getLocation',
          'onLocationChange',
          'startLocationUpdate',
          'startLocationUpdateBackground',
          'chooseLocation',
          'choosePoi',
          'chooseAddress',
        ],
        plugins: {},
      },
      vueVersion: '3',
    }

    const platfrom = 'mp-xhs'
    const options = {
      template: {
        description: '项目配置文件。',
        packOptions: {
          ignore: [],
        },
        setting: {
          urlCheck: false,
          es6: true,
          postcss: false,
          minified: false,
          newFeature: true,
          bigPackageSizeSupport: true,
        },
        compileType: 'miniprogram',
        libVersion: '',
        appid: 'touristappid123',
        projectname: 'uniapp-playground-3',
        condition: {
          search: {
            current: -1,
            list: [],
          },
          conversation: {
            current: -1,
            list: [],
          },
          game: {
            current: -1,
            list: [],
          },
          miniprogram: {
            current: -1,
            list: [],
          },
        },
        requiredPrivateInfos: [],
        permission: {},
        usingComponents: true,
      },
      pagesJson: {
        pages: [
          {
            path: 'pages/index/index',
            style: {
              navigationBarTitleText: 'uni-app',
              isNVue: false,
            },
          },
        ],

        globalStyle: {
          navigationBarTitleText: 'uni-app',
        },
        tabBar: undefined,
      },
    }

    const projectJson = parseMiniProgramProjectJson(
      JSON.stringify(userManifestJSON),
      platfrom,
      options
    )
    console.log(projectJson)
    expect(1).toBe(1)
  })
})
