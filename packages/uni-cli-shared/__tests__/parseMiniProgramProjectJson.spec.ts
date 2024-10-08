/**
 * 用户设置的平台 manifest.json 根据模版区分
 * 分别放入 project.config.json 或者 app.json
 */

import { parseMiniProgramProjectJson } from '../src/json/mp/project'
import { recursive } from 'merge'

// xhs 的默认配置
import mpXhsConfig from '../../uni-mp-xhs/src/compiler/project.config.json'
import mpWeixinConfig from '../../uni-mp-weixin/src/compiler/project.config.json'
import mpAlipayConfig from '../../uni-mp-alipay/src/compiler/mini.project.json'
import mpBaiduConfig from '../../uni-mp-baidu/src/compiler/project.swan.json'

const userManifestJSON: any = {
  name: 'uni-app',
  appid: '',
  description: '自定义描述',
  versionName: '1.0.0',
  versionCode: '100',
  transformPx: false,
  'uni-app-x': {},
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
    enableAppxNg: false,
    component2: false,
    enableNodeModuleBabelTransform: false,
  },
  'mp-baidu': {
    usingComponents: true,
    appid: 'test-baidu',
    setting: {
      autoAudits: true,
      urlCheck: true,
    },
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  'mp-xhs': {
    appid: '自定义 appid',
    libVersion: '3.105.1',
    setting: {
      urlCheck: false,
      minified: true,
    },
    usingComponents: true,
    optimization: {
      subPackages: true,
    },
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
const pagesJson = {
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
} as any

describe('parseMiniProgramProjectJson', () => {
  it('测试自定义 manifest.json - xhs', () => {
    const platfrom = 'mp-xhs'

    const projectJson = parseMiniProgramProjectJson(
      JSON.stringify(userManifestJSON),
      platfrom,
      {
        template: mpXhsConfig,
        pagesJson,
      }
    )

    expect(projectJson).toEqual({
      description: mpXhsConfig.description,
      appid: userManifestJSON[platfrom].appid,
      packOptions: mpXhsConfig.packOptions,
      setting: recursive(
        true,
        mpXhsConfig.setting,
        userManifestJSON[platfrom].setting
      ),
      compileType: mpXhsConfig.compileType,
      libVersion: userManifestJSON[platfrom].libVersion || '',
      projectname: userManifestJSON.name,
      condition: mpXhsConfig.condition,
    })
  })

  it('测试自定义 manifest.json - wx', () => {
    const platfrom = 'mp-weixin'

    const projectJson = parseMiniProgramProjectJson(
      JSON.stringify(userManifestJSON),
      platfrom,
      {
        template: mpWeixinConfig,
        pagesJson,
      }
    )

    expect(projectJson).toEqual({
      description: mpWeixinConfig.description,
      appid: userManifestJSON[platfrom].appid || 'touristappid',
      packOptions: mpXhsConfig.packOptions,
      setting: recursive(
        true,
        mpXhsConfig.setting,
        userManifestJSON[platfrom].setting
      ),
      compileType: mpXhsConfig.compileType,
      projectname: userManifestJSON.name,
      libVersion: (userManifestJSON[platfrom] as any)?.libVersion || '',
      condition: mpXhsConfig.condition,
    })
  })

  it('测试自定义 manifest.json - alipay', () => {
    // mpAlipayConfig
    const platfrom = 'mp-alipay'

    const userPlatformConfig: any = userManifestJSON[platfrom]

    const projectJson = parseMiniProgramProjectJson(
      JSON.stringify(userManifestJSON),
      platfrom,
      {
        template: mpAlipayConfig,
        pagesJson,
      }
    )

    expect(projectJson).toEqual({
      appid: userPlatformConfig.appid ?? mpAlipayConfig.appid,
      component2: userPlatformConfig.component2 ?? mpAlipayConfig.component2,
      enableAppxNg:
        userPlatformConfig.enableAppxNg ?? mpAlipayConfig.enableAppxNg,
      enableNodeModuleBabelTransform:
        userPlatformConfig.enableNodeModuleBabelTransform ??
        mpAlipayConfig.enableNodeModuleBabelTransform,
      projectname: userManifestJSON.name,
    })
  })

  it('测试自定义 manifest.json - baidu', () => {
    // mpBaiduConfig
    const platfrom = 'mp-baidu'

    const userPlatformConfig: any = userManifestJSON[platfrom]

    const projectJson = parseMiniProgramProjectJson(
      JSON.stringify(userManifestJSON),
      platfrom,
      {
        template: mpBaiduConfig,
        pagesJson,
      }
    )

    expect(projectJson).toEqual({
      appid: userPlatformConfig.appid,
      projectname: userManifestJSON.name,
      'compilation-args': {
        common: {
          babelSetting: {
            ignore: [],
          },
          enhance: true,
          ignorePrefixCss: false,
        },
        selected: -3,
      },
      host: 'baiduboxapp',
      setting: {
        autoAudits: true,
        urlCheck: true,
      },
    })
  })
})
